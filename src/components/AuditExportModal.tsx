import React from 'react';
import { X, Download, Copy, Check, FileCheck, ShieldCheck } from 'lucide-react';
import { VerificationPipelineResult } from '../types';

interface AuditExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  result: VerificationPipelineResult | null;
}

export const AuditExportModal: React.FC<AuditExportModalProps> = ({
  isOpen,
  onClose,
  result,
}) => {
  const [copied, setCopied] = React.useState(false);

  if (!isOpen || !result) return null;

  const exportPayload = {
    system: 'FormVerify – AI-Powered Application Form Verification System',
    version: '2.0-two-stage-pipeline',
    auditTimestamp: result.timestamp,
    documentId: result.documentId,
    documentName: result.documentName,
    verificationScore: result.stage2.verificationScore,
    recommendation: result.stage2.recommendation,
    metrics: {
      totalFields: result.stage2.totalFields,
      verifiedCount: result.stage2.verifiedCount,
      contradictionCount: result.stage2.contradictionCount,
      needsReviewCount: result.stage2.needsReviewCount,
      missingCount: result.stage2.missingCount,
      ocrErrorsIntercepted: result.stage2.ocrErrorsCaught,
    },
    contradictions: result.stage2.contradictionDetails,
    pipelineSummary: result.stage2.pipelineSummary,
    verifiedFields: result.stage2.fields,
    initialStage1Fields: result.stage1.fields,
  };

  const jsonString = JSON.stringify(exportPayload, null, 2);

  const handleDownload = () => {
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `FormVerify-Audit-${result.documentId}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
      <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[85vh] flex flex-col border border-slate-200">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <FileCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Official Verification Audit Package (JSON)
              </h3>
              <p className="text-xs text-slate-500">
                Machine-readable provenance data containing Stage 1 &amp; Stage 2 verification logs.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* JSON Preview */}
        <div className="p-4 flex-1 overflow-auto bg-slate-900 text-emerald-400 font-mono text-xs leading-relaxed">
          <pre>{jsonString}</pre>
        </div>

        {/* Footer controls */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="text-xs text-slate-500">
            Score: <strong>{result.stage2.verificationScore}% Consistency</strong> &bull; {result.stage2.totalFields} Fields
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleCopy}
              className="px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition flex items-center gap-1.5 cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy JSON'}</span>
            </button>

            <button
              onClick={handleDownload}
              className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-xs font-semibold text-white transition flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download File</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
