import React, { useState } from 'react';
import { VerifiedField, VerificationStatus } from '../types';
import {
  CheckCircle2,
  AlertTriangle,
  AlertOctagon,
  FileX2,
  Search,
  Check,
  Edit3,
  Sparkles,
  FileText,
  HelpCircle,
  Filter,
} from 'lucide-react';

interface FieldAuditListProps {
  fields: VerifiedField[];
  onAcceptCorrection: (fieldKey: string, value: string) => void;
  onManualOverride: (fieldKey: string, value: string) => void;
}

export const FieldAuditList: React.FC<FieldAuditListProps> = ({
  fields,
  onAcceptCorrection,
  onManualOverride,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [editingFieldKey, setEditingFieldKey] = useState<string | null>(null);
  const [overrideText, setOverrideText] = useState<string>('');

  // Counts for filter pills
  const totalCount = fields.length;
  const verifiedCount = fields.filter((f) => f.status === 'Verified').length;
  const contradictionCount = fields.filter((f) => f.status === 'Contradiction Detected').length;
  const needsReviewCount = fields.filter((f) => f.status === 'Needs Review').length;
  const missingCount = fields.filter((f) => f.status === 'Missing').length;

  const filteredFields = fields.filter((field) => {
    const matchesFilter =
      selectedFilter === 'all' ||
      (selectedFilter === 'Verified' && field.status === 'Verified') ||
      (selectedFilter === 'Contradiction Detected' && field.status === 'Contradiction Detected') ||
      (selectedFilter === 'Needs Review' && field.status === 'Needs Review') ||
      (selectedFilter === 'Missing' && field.status === 'Missing');

    const matchesSearch =
      searchQuery.trim() === '' ||
      field.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      field.fieldKey.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (field.extractedValue && field.extractedValue.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (field.evidence && field.evidence.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesFilter && matchesSearch;
  });

  const handleStartEdit = (field: VerifiedField) => {
    setEditingFieldKey(field.fieldKey);
    setOverrideText(field.userManualValue || field.correctedValue || field.extractedValue || '');
  };

  const handleSaveEdit = (fieldKey: string) => {
    onManualOverride(fieldKey, overrideText);
    setEditingFieldKey(null);
  };

  const getStatusBadge = (status: VerificationStatus) => {
    switch (status) {
      case 'Verified':
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 gap-1.5 shadow-xs">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            Verified
          </span>
        );
      case 'Needs Review':
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300 gap-1.5 shadow-xs">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
            Needs Review
          </span>
        );
      case 'Contradiction Detected':
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold bg-rose-100 text-rose-800 border border-rose-300 gap-1.5 shadow-xs animate-pulse">
            <AlertOctagon className="w-3.5 h-3.5 text-rose-600" />
            Contradiction Detected
          </span>
        );
      case 'Missing':
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold bg-slate-100 text-slate-700 border border-slate-300 gap-1.5 shadow-xs">
            <FileX2 className="w-3.5 h-3.5 text-slate-500" />
            Missing
          </span>
        );
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs mb-8">
      {/* Header controls */}
      <div className="p-4 sm:p-5 border-b border-slate-200 bg-slate-50/70">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-emerald-600" />
              Field-by-Field Verification Inspection &amp; Audit Dossier
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Review extracted values, confidence grades, source evidence quotations, and auditor corrections.
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-64">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              id="search-fields-input"
              type="text"
              placeholder="Search fields or evidence..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 text-slate-900"
            />
          </div>
        </div>

        {/* Filter Badges */}
        <div className="flex items-center space-x-2 mt-4 overflow-x-auto no-scrollbar pb-1">
          <button
            onClick={() => setSelectedFilter('all')}
            className={`px-3 py-1 rounded-full text-xs font-semibold transition cursor-pointer flex items-center gap-1 ${
              selectedFilter === 'all'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-slate-200/70 text-slate-700 hover:bg-slate-300'
            }`}
          >
            <span>All Fields</span>
            <span className="text-[10px] opacity-75 font-mono">({totalCount})</span>
          </button>

          <button
            onClick={() => setSelectedFilter('Contradiction Detected')}
            className={`px-3 py-1 rounded-full text-xs font-semibold transition cursor-pointer flex items-center gap-1 ${
              selectedFilter === 'Contradiction Detected'
                ? 'bg-rose-600 text-white shadow-xs'
                : 'bg-rose-100 text-rose-800 hover:bg-rose-200'
            }`}
          >
            <AlertOctagon className="w-3 h-3" />
            <span>Contradictions</span>
            <span className="text-[10px] font-mono">({contradictionCount})</span>
          </button>

          <button
            onClick={() => setSelectedFilter('Needs Review')}
            className={`px-3 py-1 rounded-full text-xs font-semibold transition cursor-pointer flex items-center gap-1 ${
              selectedFilter === 'Needs Review'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'bg-amber-100 text-amber-800 hover:bg-amber-200'
            }`}
          >
            <AlertTriangle className="w-3 h-3" />
            <span>Needs Review</span>
            <span className="text-[10px] font-mono">({needsReviewCount})</span>
          </button>

          <button
            onClick={() => setSelectedFilter('Missing')}
            className={`px-3 py-1 rounded-full text-xs font-semibold transition cursor-pointer flex items-center gap-1 ${
              selectedFilter === 'Missing'
                ? 'bg-slate-700 text-white shadow-xs'
                : 'bg-slate-200 text-slate-800 hover:bg-slate-300'
            }`}
          >
            <FileX2 className="w-3 h-3" />
            <span>Missing</span>
            <span className="text-[10px] font-mono">({missingCount})</span>
          </button>

          <button
            onClick={() => setSelectedFilter('Verified')}
            className={`px-3 py-1 rounded-full text-xs font-semibold transition cursor-pointer flex items-center gap-1 ${
              selectedFilter === 'Verified'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
            }`}
          >
            <CheckCircle2 className="w-3 h-3" />
            <span>Verified</span>
            <span className="text-[10px] font-mono">({verifiedCount})</span>
          </button>
        </div>
      </div>

      {/* Field Cards list */}
      <div className="divide-y divide-slate-200">
        {filteredFields.length > 0 ? (
          filteredFields.map((field) => {
            const isEditing = editingFieldKey === field.fieldKey;
            const hasCorrection = Boolean(
              field.correctedValue && field.correctedValue !== field.extractedValue
            );
            const isContradiction = field.status === 'Contradiction Detected';

            return (
              <div
                key={field.fieldKey}
                id={`field-row-${field.fieldKey}`}
                className={`p-4 sm:p-5 transition-colors ${
                  isContradiction
                    ? 'bg-rose-50/25'
                    : field.errorDetected
                    ? 'bg-amber-50/15'
                    : 'hover:bg-slate-50/60'
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-3">
                  {/* Left Column: Label, Category, Values */}
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center space-x-2 flex-wrap gap-y-1">
                      <span className="text-xs font-bold text-slate-900 tracking-tight">
                        {field.label}
                      </span>
                      <span className="text-[10px] bg-slate-100 text-slate-500 font-mono px-2 py-0.5 rounded uppercase">
                        {field.category}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">
                        #{field.fieldKey}
                      </span>
                    </div>

                    {/* Extracted vs Corrected Values */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                      {/* Extracted value box */}
                      <div className="bg-slate-50 border border-slate-200 rounded-lg p-2.5">
                        <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                          Stage 1 Extracted Value:
                        </span>
                        <div className="font-mono text-xs font-medium text-slate-800 break-words">
                          {field.extractedValue || (
                            <span className="text-slate-400 italic">None / Blank</span>
                          )}
                        </div>
                      </div>

                      {/* Corrected / Verified value box */}
                      <div
                        className={`rounded-lg p-2.5 border ${
                          hasCorrection
                            ? 'bg-emerald-50 border-emerald-300 ring-1 ring-emerald-500/20'
                            : 'bg-white border-slate-200'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span
                            className={`text-[10px] uppercase font-bold ${
                              hasCorrection ? 'text-emerald-700' : 'text-slate-400'
                            }`}
                          >
                            {hasCorrection
                              ? 'Stage 2 Self-Corrected Value:'
                              : 'Verified Ground Truth:'}
                          </span>

                          {hasCorrection && !field.userAcceptedCorrection && (
                            <button
                              onClick={() =>
                                onAcceptCorrection(field.fieldKey, field.correctedValue!)
                              }
                              className="text-[10px] px-2 py-0.5 rounded bg-emerald-600 hover:bg-emerald-700 text-white font-semibold flex items-center gap-1 transition cursor-pointer"
                              title="Accept verifier correction"
                            >
                              <Check className="w-2.5 h-2.5" />
                              Accept
                            </button>
                          )}
                        </div>

                        {isEditing ? (
                          <div className="flex items-center space-x-2 mt-1">
                            <input
                              type="text"
                              value={overrideText}
                              onChange={(e) => setOverrideText(e.target.value)}
                              className="w-full text-xs font-mono px-2 py-1 border border-slate-300 rounded bg-white text-slate-900 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                            />
                            <button
                              onClick={() => handleSaveEdit(field.fieldKey)}
                              className="px-2.5 py-1 text-xs font-semibold bg-emerald-600 text-white rounded hover:bg-emerald-700 cursor-pointer"
                            >
                              Save
                            </button>
                          </div>
                        ) : (
                          <div className="font-mono text-xs font-semibold text-slate-900 flex items-center justify-between break-words">
                            <span>
                              {field.userManualValue ||
                                field.correctedValue ||
                                field.extractedValue || (
                                  <span className="text-rose-500 italic">Unfilled / Missing</span>
                                )}
                            </span>
                            <button
                              onClick={() => handleStartEdit(field)}
                              className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
                              title="Manual Human Override"
                            >
                              <Edit3 className="w-3 h-3" />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Source Evidence & Verification Notes */}
                    <div className="bg-slate-100/60 rounded-lg p-3 text-xs space-y-1.5 mt-2 border border-slate-200/70">
                      {field.evidence && (
                        <div>
                          <span className="font-bold text-slate-700 text-[11px] block">
                            Source Document Evidence:
                          </span>
                          <blockquote className="text-slate-600 italic font-mono text-[11px] mt-0.5 border-l-2 border-emerald-500 pl-2">
                            &ldquo;{field.evidence}&rdquo;
                          </blockquote>
                        </div>
                      )}

                      {field.verificationNotes && (
                        <div className="pt-1 text-slate-600 text-[11px]">
                          <span className="font-semibold text-slate-700">Audit Finding: </span>
                          {field.verificationNotes}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right Column: Status Badge & Confidence Grade */}
                  <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-start gap-2 pt-1 md:w-48 shrink-0">
                    <div>{getStatusBadge(field.status)}</div>

                    <div className="text-right">
                      <span className="text-[10px] text-slate-400 font-bold uppercase block">
                        Confidence Grade
                      </span>
                      <span className="text-xs font-mono font-bold text-slate-700">
                        {field.confidence}% Match
                      </span>
                    </div>

                    {field.errorType && field.errorType !== 'none' && (
                      <span className="text-[10px] px-2 py-0.5 rounded bg-slate-200/80 text-slate-700 font-mono font-semibold uppercase">
                        Type: {field.errorType}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="p-8 text-center text-slate-500 text-xs">
            No fields match the active filter or search query.
          </div>
        )}
      </div>
    </div>
  );
};
