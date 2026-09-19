import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Generous body limit for high-resolution document images and scanned PDFs
app.use(express.json({ limit: '35mb' }));
app.use(express.urlencoded({ extended: true, limit: '35mb' }));

// Lazy init for Gemini API client
let aiClient: GoogleGenAI | null = null;

function getGenAI(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;

    aiClient = new GoogleGenAI({
      apiKey: apiKey || '',
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }

  return aiClient;
}

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    hasApiKey: Boolean(
      process.env.GEMINI_API_KEY &&
      process.env.GEMINI_API_KEY !== 'MY_GEMINI_API_KEY'
    ),
    timestamp: new Date().toISOString(),
  });
});

// Helper to extract clean base64 data & mimeType
function parseDataUrl(
  dataUrl: string,
  fallbackMime = 'image/png'
) {
  if (!dataUrl) {
    return {
      mimeType: fallbackMime,
      base64: '',
    };
  }

  if (dataUrl.startsWith('data:')) {
    const [header, base64] = dataUrl.split(',', 2);

    const mimeMatch = header.match(/data:([^;]+)/);

    return {
      mimeType: mimeMatch ? mimeMatch[1] : fallbackMime,
      base64: base64 || '',
    };
  }

  return {
    mimeType: fallbackMime,
    base64: dataUrl,
  };
}

// Helper: robust JSON parse from Gemini text
function parseJsonFromText(rawText: string) {
  try {
    let clean = rawText.trim();

    if (clean.startsWith('```json')) {
      clean = clean
        .replace(/^```json\s*/i, '')
        .replace(/```\s*$/i, '');
    } else if (clean.startsWith('```')) {
      clean = clean
        .replace(/^```\s*/, '')
        .replace(/```\s*$/i, '');
    }

    return JSON.parse(clean);
  } catch (err) {
    const firstBrace = rawText.indexOf('{');
    const lastBrace = rawText.lastIndexOf('}');

    if (
      firstBrace !== -1 &&
      lastBrace !== -1 &&
      lastBrace > firstBrace
    ) {
      const sub = rawText.substring(firstBrace, lastBrace + 1);
      return JSON.parse(sub);
    }

    throw new Error(
      `Failed to parse structured JSON from model output: ${
        err instanceof Error ? err.message : String(err)
      }`
    );
  }
}

// ============================================================
// STAGE 1: MULTIMODAL EXTRACTION
// ============================================================

app.post('/api/extract', async (req, res) => {
  const startTime = Date.now();

  try {
    const {
      fileDataUrl,
      mimeType,
      fileName,
    } = req.body;

    if (!fileDataUrl) {
      return res.status(400).json({
        error: 'fileDataUrl is required',
      });
    }

    const {
      mimeType: parsedMime,
      base64,
    } = parseDataUrl(
      fileDataUrl,
      mimeType || 'image/png'
    );

    const apiKey = process.env.GEMINI_API_KEY;

    if (
      !apiKey ||
      apiKey === 'MY_GEMINI_API_KEY'
    ) {
      return res.status(500).json({
        error:
          'GEMINI_API_KEY is not configured in environment variables. Please provide an API key in Settings > Secrets.',
      });
    }

    const ai = getGenAI();

    const systemInstruction = `You are a specialized Multimodal Document Information Extraction AI.

Your objective is to thoroughly extract all fields and values visible in this application form into structured JSON.

Look for:
- Full Applicant Name, Surnames, Titles
- Identification numbers (SSN, ID numbers, License numbers, Passport numbers, CWID, etc.)
- Dates (Date of Birth, Application date, Attestation/Signature date, Issue/Expiry dates)
- Contact details (Email address, Phone numbers, Physical/Mailing addresses)
- Education details (Institutions, Degrees, Graduation years, Honors)
- Employment / Experience claims (Position, Years of experience, Affiliations)
- Financial entries (Incomes, Figures, Wages)
- Signatures and Declarations (Applicant signature presence, Jurat/Attestation text)
- Checkboxes and selections

For every field provide:
- fieldKey: lowercase snake_case identifier
- label: Human readable label
- category: one of 'personal' | 'contact' | 'identification' | 'education' | 'employment' | 'financial' | 'declaration' | 'other'
- extractedValue: string or null if blank
- confidence: integer from 1 to 100
- rawLocationHint: short description of where it appears on the document

Be thorough.
Extract raw text as visible.
Do NOT perform verification or fact-checking yet.`;

    const promptText = `Extract all visible fields from this application form document.

Return a JSON object with this exact structure:

{
  "documentTypeDetected": string,
  "extractionSummary": string,
  "fields": [
    {
      "fieldKey": string,
      "label": string,
      "category": "personal" | "contact" | "identification" | "education" | "employment" | "financial" | "declaration" | "other",
      "extractedValue": string or null,
      "confidence": number,
      "rawLocationHint": string
    }
  ]
}`;

    const contents = {
      parts: [
        {
          inlineData: {
            mimeType:
              parsedMime === 'application/pdf'
                ? 'application/pdf'
                : parsedMime,
            data: base64,
          },
        },
        {
          text: promptText,
        },
      ],
    };

    const response =
      await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents,
        config: {
          systemInstruction,
          responseMimeType: 'application/json',
        },
      });

    const parsed = parseJsonFromText(
      response.text || '{}'
    );

    const processingTimeMs =
      Date.now() - startTime;

    res.json({
      fields: parsed.fields || [],
      documentTypeDetected:
        parsed.documentTypeDetected ||
        'Application Form',
      extractionSummary:
        parsed.extractionSummary ||
        'Extraction completed',
      processingTimeMs,
    });
  } catch (error: any) {
    console.error(
      'Extraction error:',
      error
    );

    res.status(500).json({
      error:
        error?.message ||
        'Failed to extract document information',
      details: String(error),
    });
  }
});

// ============================================================
// STAGE 2: ADVERSARIAL SELF-VERIFICATION
// ============================================================

app.post('/api/verify', async (req, res) => {
  const startTime = Date.now();

  try {
    const {
      fileDataUrl,
      mimeType,
      stage1Fields,
    } = req.body;

    if (
      !fileDataUrl ||
      !stage1Fields ||
      !Array.isArray(stage1Fields)
    ) {
      return res.status(400).json({
        error:
          'fileDataUrl and stage1Fields array are required',
      });
    }

    const {
      mimeType: parsedMime,
      base64,
    } = parseDataUrl(
      fileDataUrl,
      mimeType || 'image/png'
    );

    const apiKey = process.env.GEMINI_API_KEY;

    if (
      !apiKey ||
      apiKey === 'MY_GEMINI_API_KEY'
    ) {
      return res.status(500).json({
        error:
          'GEMINI_API_KEY is not configured in environment variables.',
      });
    }

    const ai = getGenAI();

    const systemInstruction = `You are the Lead Verification Auditor in an AI reliability & self-checking pipeline.

You have received:
1. The ORIGINAL source document (image or PDF).
2. The initial Stage 1 extraction fields.

YOUR SOLE MISSION:
Rigorously audit, cross-check, and verify each extracted field against the GROUND TRUTH visible in the original document.

STRICT AUDIT GUIDELINES:

1. DO NOT ASSUME OR HALLUCINATE:
Only verify facts that are explicitly, visually supported by the source document.

2. DETECT OCR MISREADS:
Look for character confusions:
- '0' (zero) vs 'O' (letter O)
- '1' vs 'I' vs 'l'
- '5' vs 'S'
- '8' vs 'B'
- '2' vs 'Z'
- Transposed numbers
- Misspelled surnames
- Wrong middle initials

3. DETECT INTERNAL CONTRADICTIONS:
- Date of birth vs declared age
- Conflicting monetary figures
- Chronological paradoxes
- Conflicting addresses, phone numbers, or dates

4. DETECT OMISSIONS / MISSING FIELDS:
Required fields that are left blank.

5. DETECT AMBIGUITIES & STRIKETHROUGHS:
Handwritten overwrites and crossed-out text.

6. FOR EVERY FIELD PROVIDE:
- status
- errorDetected
- errorType
- evidence
- correctedValue
- verificationNotes
- confidence

7. FINAL SUMMARY:
- verificationScore
- ocrErrorsCaught
- contradictionsCaught
- omissionsCaught
- pipelineSummary
- contradictionDetails
- recommendation`;

    const promptText = `Audit the Stage 1 extraction against the provided document.

Stage 1 fields:
${JSON.stringify(stage1Fields)}

Output strict JSON with this exact schema:

{
  "fields": [
    {
      "fieldKey": string,
      "label": string,
      "category": "personal" | "contact" | "identification" | "education" | "employment" | "financial" | "declaration" | "other",
      "extractedValue": string or null,
      "status": "Verified" | "Needs Review" | "Missing" | "Contradiction Detected",
      "errorDetected": boolean,
      "errorType": "none" | "ocr_misread" | "contradiction" | "omission" | "hallucination" | "format_discrepancy" | "ambiguity",
      "evidence": string,
      "correctedValue": string or null,
      "verificationNotes": string,
      "confidence": number
    }
  ],
  "verificationScore": number,
  "totalFields": number,
  "verifiedCount": number,
  "needsReviewCount": number,
  "missingCount": number,
  "contradictionCount": number,
  "ocrErrorsCaught": number,
  "contradictionsCaught": number,
  "omissionsCaught": number,
  "pipelineSummary": string,
  "contradictionDetails": [string],
  "recommendation": "VERIFIED_CLEAR" | "ACCEPTABLE_WITH_FLAGS" | "ACTION_REQUIRED_CONTRADICTIONS" | "REJECT_UNREADABLE"
}`;

    const contents = {
      parts: [
        {
          inlineData: {
            mimeType:
              parsedMime === 'application/pdf'
                ? 'application/pdf'
                : parsedMime,
            data: base64,
          },
        },
        {
          text: promptText,
        },
      ],
    };

    const response =
      await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents,
        config: {
          systemInstruction,
          responseMimeType: 'application/json',
        },
      });

    const parsed = parseJsonFromText(
      response.text || '{}'
    );

    const fields = parsed.fields || [];

    const totalFields = fields.length;

    const verifiedCount =
      fields.filter(
        (f: any) =>
          f.status === 'Verified'
      ).length;

    const needsReviewCount =
      fields.filter(
        (f: any) =>
          f.status === 'Needs Review'
      ).length;

    const missingCount =
      fields.filter(
        (f: any) =>
          f.status === 'Missing'
      ).length;

    const contradictionCount =
      fields.filter(
        (f: any) =>
          f.status ===
          'Contradiction Detected'
      ).length;

    const ocrErrorsCaught =
      fields.filter(
        (f: any) =>
          f.errorType === 'ocr_misread'
      ).length;

    const contradictionsCaught =
      fields.filter(
        (f: any) =>
          f.errorType ===
            'contradiction' ||
          f.status ===
            'Contradiction Detected'
      ).length;

    const omissionsCaught =
      fields.filter(
        (f: any) =>
          f.errorType === 'omission' ||
          f.status === 'Missing'
      ).length;

    const verificationScore =
      totalFields > 0
        ? Math.round(
            (verifiedCount /
              totalFields) *
              100
          )
        : 0;

    let recommendation =
      parsed.recommendation;

    if (!recommendation) {
      if (contradictionCount > 0) {
        recommendation =
          'ACTION_REQUIRED_CONTRADICTIONS';
      } else if (
        needsReviewCount > 0 ||
        missingCount > 0
      ) {
        recommendation =
          'ACCEPTABLE_WITH_FLAGS';
      } else {
        recommendation =
          'VERIFIED_CLEAR';
      }
    }

    const processingTimeMs =
      Date.now() - startTime;

    res.json({
      fields,
      totalFields,
      verifiedCount,
      needsReviewCount,
      missingCount,
      contradictionCount,
      ocrErrorsCaught,
      contradictionsCaught,
      omissionsCaught,
      verificationScore,
      pipelineSummary:
        parsed.pipelineSummary ||
        `Verification completed: ${verifiedCount} of ${totalFields} fields verified (${verificationScore}% consistency score).`,
      contradictionDetails:
        parsed.contradictionDetails ||
        [],
      recommendation,
      processingTimeMs,
    });
  } catch (error: any) {
    console.error(
      'Verification error:',
      error
    );

    res.status(500).json({
      error:
        error?.message ||
        'Failed to verify document fields',
      details: String(error),
    });
  }
});

// ============================================================
// FULL PIPELINE ROUTE: STAGE 1 + STAGE 2
// ============================================================

app.post(
  '/api/run-pipeline',
  async (req, res) => {
    const pipelineStartTime =
      Date.now();

    try {
      const {
        fileDataUrl,
        mimeType,
        fileName,
      } = req.body;

      if (!fileDataUrl) {
        return res.status(400).json({
          error:
            'fileDataUrl is required',
        });
      }

      const {
        mimeType: parsedMime,
        base64,
      } = parseDataUrl(
        fileDataUrl,
        mimeType || 'image/png'
      );

      const ai = getGenAI();

      // ========================================================
      // 1. STAGE 1: EXTRACTION
      // ========================================================

      const stage1Start =
        Date.now();

      const extractionResponse =
        await ai.models.generateContent({
          model: 'gemini-3.8-flash',

          contents: {
            parts: [
              {
                inlineData: {
                  mimeType: parsedMime,
                  data: base64,
                },
              },
              {
                text: `Extract all fields from this document into JSON:

{
  "documentTypeDetected": string,
  "extractionSummary": string,
  "fields": [
    {
      "fieldKey": string,
      "label": string,
      "category": "personal" | "contact" | "identification" | "education" | "employment" | "financial" | "declaration" | "other",
      "extractedValue": string or null,
      "confidence": number,
      "rawLocationHint": string
    }
  ]
}`,
              },
            ],
          },

          config: {
            responseMimeType:
              'application/json',
          },
        });

      const stage1Parsed =
        parseJsonFromText(
          extractionResponse.text ||
            '{}'
        );

      const stage1Fields =
        stage1Parsed.fields || [];

      const stage1TimeMs =
        Date.now() -
        stage1Start;

      // ========================================================
      // 2. STAGE 2: SELF-VERIFICATION
      // ========================================================

      const stage2Start =
        Date.now();

      const verificationResponse =
        await ai.models.generateContent({
          model: 'gemini-3.8-flash',

          contents: {
            parts: [
              {
                inlineData: {
                  mimeType: parsedMime,
                  data: base64,
                },
              },
              {
                text: `Audit the Stage 1 extraction fields:

${JSON.stringify(stage1Fields)}

Check each field against the ground-truth document for:
- OCR mistakes
- Contradictions
- Missing items
- Ambiguities

Output JSON:

{
  "fields": [
    {
      "fieldKey": string,
      "label": string,
      "category": "personal" | "contact" | "identification" | "education" | "employment" | "financial" | "declaration" | "other",
      "extractedValue": string or null,
      "status": "Verified" | "Needs Review" | "Missing" | "Contradiction Detected",
      "errorDetected": boolean,
      "errorType": "none" | "ocr_misread" | "contradiction" | "omission" | "hallucination" | "format_discrepancy" | "ambiguity",
      "evidence": string,
      "correctedValue": string or null,
      "verificationNotes": string,
      "confidence": number
    }
  ],
  "pipelineSummary": string,
  "contradictionDetails": [string],
  "recommendation": "VERIFIED_CLEAR" | "ACCEPTABLE_WITH_FLAGS" | "ACTION_REQUIRED_CONTRADICTIONS" | "REJECT_UNREADABLE"
}`,
              },
            ],
          },

          config: {
            responseMimeType:
              'application/json',
          },
        });

      const stage2Parsed =
        parseJsonFromText(
          verificationResponse.text ||
            '{}'
        );

      const stage2Fields =
        stage2Parsed.fields || [];

      const stage2TimeMs =
        Date.now() -
        stage2Start;

      // ========================================================
      // CALCULATE RESULTS
      // ========================================================

      const totalFields =
        stage2Fields.length;

      const verifiedCount =
        stage2Fields.filter(
          (f: any) =>
            f.status === 'Verified'
        ).length;

      const needsReviewCount =
        stage2Fields.filter(
          (f: any) =>
            f.status ===
            'Needs Review'
        ).length;

      const missingCount =
        stage2Fields.filter(
          (f: any) =>
            f.status === 'Missing'
        ).length;

      const contradictionCount =
        stage2Fields.filter(
          (f: any) =>
            f.status ===
            'Contradiction Detected'
        ).length;

      const ocrErrorsCaught =
        stage2Fields.filter(
          (f: any) =>
            f.errorType ===
            'ocr_misread'
        ).length;

      const contradictionsCaught =
        stage2Fields.filter(
          (f: any) =>
            f.errorType ===
              'contradiction' ||
            f.status ===
              'Contradiction Detected'
        ).length;

      const omissionsCaught =
        stage2Fields.filter(
          (f: any) =>
            f.errorType ===
              'omission' ||
            f.status ===
              'Missing'
        ).length;

      const verificationScore =
        totalFields > 0
          ? Math.round(
              (verifiedCount /
                totalFields) *
                100
            )
          : 0;

      let recommendation =
        stage2Parsed.recommendation;

      if (!recommendation) {
        if (
          contradictionCount >
          0
        ) {
          recommendation =
            'ACTION_REQUIRED_CONTRADICTIONS';
        } else if (
          needsReviewCount > 0 ||
          missingCount > 0
        ) {
          recommendation =
            'ACCEPTABLE_WITH_FLAGS';
        } else {
          recommendation =
            'VERIFIED_CLEAR';
        }
      }

      // ========================================================
      // FINAL RESPONSE
      // ========================================================

      res.json({
        documentId:
          'doc-' +
          Date.now(),

        documentName:
          fileName ||
          'Uploaded Document',

        mimeType:
          parsedMime,

        timestamp:
          new Date().toISOString(),

        fileDataUrl,

        stage1: {
          fields:
            stage1Fields,

          processingTimeMs:
            stage1TimeMs,

          documentTypeDetected:
            stage1Parsed.documentTypeDetected,

          extractionSummary:
            stage1Parsed.extractionSummary,
        },

        stage2: {
          fields:
            stage2Fields,

          processingTimeMs:
            stage2TimeMs,

          verificationScore,

          totalFields,

          verifiedCount,

          needsReviewCount,

          missingCount,

          contradictionCount,

          ocrErrorsCaught,

          contradictionsCaught,

          omissionsCaught,

          pipelineSummary:
            stage2Parsed.pipelineSummary,

          contradictionDetails:
            stage2Parsed.contradictionDetails ||
            [],

          recommendation,
        },

        totalDurationMs:
          Date.now() -
          pipelineStartTime,
      });
    } catch (error: any) {
      console.error(
        'Pipeline error:',
        error
      );

      res.status(500).json({
        error:
          error?.message ||
          'Verification pipeline execution failed',

        details:
          String(error),
      });
    }
  }
);

// ============================================================
// VITE MIDDLEWARE / STATIC SERVING
// ============================================================

async function startServer() {
  if (
    process.env.NODE_ENV !==
    'production'
  ) {
    const vite =
      await createViteServer({
        server: {
          middlewareMode: true,
        },

        appType: 'spa',
      });

    app.use(vite.middlewares);
  } else {
    const distPath =
      path.join(
        process.cwd(),
        'dist'
      );

    app.use(
      express.static(
        distPath
      )
    );

    app.get(
      '*',
      (req, res) => {
        res.sendFile(
          path.join(
            distPath,
            'index.html'
          )
        );
      }
    );
  }

  app.listen(
    PORT,
    '0.0.0.0',
    () => {
      console.log(
        `[FormVerify] Server running on http://0.0.0.0:${PORT}`
      );
    }
  );
}

startServer();
