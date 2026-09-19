export type VerificationStatus = 'Verified' | 'Needs Review' | 'Missing' | 'Contradiction Detected';

export type ErrorType = 
  | 'none' 
  | 'ocr_misread' 
  | 'contradiction' 
  | 'omission' 
  | 'hallucination' 
  | 'format_discrepancy' 
  | 'ambiguity';

export type FieldCategory = 
  | 'personal' 
  | 'contact' 
  | 'identification' 
  | 'education' 
  | 'employment' 
  | 'financial' 
  | 'declaration' 
  | 'other';

export interface ExtractedField {
  fieldKey: string;
  label: string;
  category: FieldCategory;
  extractedValue: string | null;
  confidence: number; // 0 - 100
  rawLocationHint?: string;
}

export interface VerifiedField {
  fieldKey: string;
  label: string;
  category: FieldCategory;
  extractedValue: string | null;
  status: VerificationStatus;
  errorDetected: boolean;
  errorType: ErrorType;
  evidence: string;
  correctedValue: string | null;
  verificationNotes: string;
  confidence: number;
  userAcceptedCorrection?: boolean;
  userManualValue?: string;
}

export interface Stage1Result {
  fields: ExtractedField[];
  processingTimeMs: number;
  documentTypeDetected?: string;
  extractionSummary?: string;
}

export interface Stage2Result {
  fields: VerifiedField[];
  processingTimeMs: number;
  verificationScore: number; // 0 - 100
  totalFields: number;
  verifiedCount: number;
  needsReviewCount: number;
  missingCount: number;
  contradictionCount: number;
  ocrErrorsCaught: number;
  contradictionsCaught: number;
  omissionsCaught: number;
  pipelineSummary: string;
  contradictionDetails: string[];
  recommendation: 'VERIFIED_CLEAR' | 'ACCEPTABLE_WITH_FLAGS' | 'ACTION_REQUIRED_CONTRADICTIONS' | 'REJECT_UNREADABLE';
}

export interface VerificationPipelineResult {
  documentId: string;
  documentName: string;
  mimeType: string;
  timestamp: string;
  fileDataUrl: string;
  stage1: Stage1Result;
  stage2: Stage2Result;
}

export interface DemoFormPreset {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  category: string;
  difficultyTag: 'Moderate OCR Noise' | 'Severe Contradictions' | 'Complex Ambiguities' | 'Clean Control';
  description: string;
  knownFlaws: string[];
  mockDataUrl: string;
  sampleDocumentData: {
    stage1Fields: ExtractedField[];
    stage2Fields: VerifiedField[];
    summary: string;
    contradictions: string[];
  };
}
