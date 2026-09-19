import React from 'react';
import { ExtractedField, VerifiedField } from '../types';
import { ArrowRight, CheckCircle, AlertTriangle, AlertOctagon, XCircle, Sparkles, Check, ArrowDownRight } from 'lucide-react';

interface StageDiffComparisonProps {
  stage1Fields: ExtractedField[];
  stage2Fields: VerifiedField[];
  onAcceptCorrection?: (fieldKey: string, correctedValue: string) => void;
}

export const StageDiffComparison: React.FC<StageDiffComparisonProps> = ({
  stage1Fields,
  stage2Fields,
  onAcceptCorrection,
}) => {
  // Map stage1 fields by key
  const stage1Map = new Map<string, ExtractedField>();
  stage1Fields.forEach((f) => stage1Map.set(f.fieldKey, f));

  // Filter or sort so fields with discrepancies or flags appear first!
  const sortedVerified = [...stage2Fields].sort((a, b) => {
    const aPriority = a.status === 'Contradiction Detected' ? 3 : a.errorDetected ? 2 : 1;
    const bPriority = b.status === 'Contradiction Detected' ? 3 : b.errorDetected ? 2 : 1;
    return bPriority - aPriority;
  });

  const getStatusBadge = (status: VerifiedField['status']) => {
    switch (status) {
      case 'Verified':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200 gap-1">
            <CheckCircle className="w-3 h-3 text-emerald-600" />
            Verified
          </span>
        );
      case 'Needs Review':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-amber-100 text-amber-800 border border-amber-200 gap-1">
            <AlertTriangle className="w-3 h-3 text-amber-600" />
            Needs Review
          </span>
        );
      case 'Contradiction Detected':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-rose-100 text-rose-800 border border-rose-200 gap-1">
            <AlertOctagon className="w-3 h-3 text-rose-600" />
            Contradiction Detected
          </span>
        );
      case 'Missing':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-slate-100 text-slate-700 border border-slate-200 gap-1">
            <XCircle className="w-3 h-3 text-slate-500" />
            Missing
          </span>
        );
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs mb-6">
      <div className="bg-slate-50 border-b border-slate-200 p-4 sm:px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <div className="flex items-center space-x-2">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              Stage 1 vs. Stage 2 Pipeline Diff
            </h3>
            <span className="text-xs bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded-full font-semibold border border-indigo-200">
              Self-Checking Audit
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Side-by-side inspection showing initial unverified extraction versus ground-truth verified &amp; corrected values.
          </p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-slate-100/75 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider text-[11px]">
              <th className="py-3 px-4 w-[22%]">Field &amp; Category</th>
              <th className="py-3 px-4 w-[26%] text-slate-600">
                Stage 1: Raw Extraction
              </th>
              <th className="py-3 px-4 w-[30%] text-slate-900">
                Stage 2: Self-Verified &amp; Corrected
              </th>
              <th className="py-3 px-4 w-[22%]">Audit Status &amp; Evidence</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {sortedVerified.map((vField) => {
              const s1Field = stage1Map.get(vField.fieldKey);
              const hasCorrection = Boolean(vField.correctedValue && vField.correctedValue !== vField.extractedValue);
              const isFlagged = vField.errorDetected || vField.status !== 'Verified';

              return (
                <tr
                  key={vField.fieldKey}
                  className={`hover:bg-slate-50/80 transition-colors ${
                    vField.status === 'Contradiction Detected'
                      ? 'bg-rose-50/30'
                      : isFlagged
                      ? 'bg-amber-50/20'
                      : ''
                  }`}
                >
                  {/* Field Label */}
                  <td className="py-3 px-4 align-top">
                    <div className="font-bold text-slate-800">{vField.label}</div>
                    <div className="text-[10px] text-slate-400 capitalize font-mono mt-0.5">
                      {vField.category} &bull; {vField.fieldKey}
                    </div>
                  </td>

                  {/* Stage 1 Raw Value */}
                  <td className="py-3 px-4 align-top font-mono text-slate-600">
                    <div className="p-2 bg-slate-50 rounded border border-slate-200/80 break-words">
                      {s1Field?.extractedValue || vField.extractedValue || (
                        <span className="text-slate-400 italic">null / unextracted</span>
                      )}
                    </div>
                    {s1Field && (
                      <span className="text-[10px] text-slate-400 block mt-1">
                        Initial confidence: {s1Field.confidence}%
                      </span>
                    )}
                  </td>

                  {/* Stage 2 Verified / Corrected */}
                  <td className="py-3 px-4 align-top">
                    {hasCorrection ? (
                      <div className="p-2 bg-emerald-50 border border-emerald-300 rounded font-mono text-emerald-950 font-semibold break-words">
                        <div className="text-[10px] text-emerald-700 font-bold uppercase tracking-wider mb-0.5 flex items-center gap-1">
                          <Check className="w-3 h-3" />
                          Self-Corrected Value:
                        </div>
                        {vField.correctedValue}
                      </div>
                    ) : (
                      <div className="p-2 bg-slate-50 border border-slate-200 rounded font-mono text-slate-800 break-words">
                        {vField.extractedValue || (
                          <span className="text-rose-500 font-semibold italic">Missing / Blank</span>
                        )}
                      </div>
                    )}

                    {vField.verificationNotes && (
                      <p className="text-[11px] text-slate-600 mt-1 leading-snug">
                        {vField.verificationNotes}
                      </p>
                    )}
                  </td>

                  {/* Status & Evidence */}
                  <td className="py-3 px-4 align-top space-y-1.5">
                    <div>{getStatusBadge(vField.status)}</div>
                    {vField.evidence && (
                      <div className="text-[11px] text-slate-500 bg-slate-50 p-2 rounded border border-slate-200 leading-snug">
                        <span className="font-semibold text-slate-700 block text-[10px] uppercase">
                          Source Evidence:
                        </span>
                        &ldquo;{vField.evidence}&rdquo;
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
