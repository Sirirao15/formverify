import React from 'react';
import { ShieldCheck, AlertOctagon, HelpCircle, FileX2, Eye, Info, CheckCircle2, TrendingUp, AlertTriangle } from 'lucide-react';
import { Stage2Result } from '../types';

interface VerificationSummaryDashboardProps {
  stage2: Stage2Result;
  totalFieldsCount: number;
}

export const VerificationSummaryDashboard: React.FC<VerificationSummaryDashboardProps> = ({
  stage2,
  totalFieldsCount,
}) => {
  const {
    verificationScore,
    totalFields,
    verifiedCount,
    needsReviewCount,
    missingCount,
    contradictionCount,
    ocrErrorsCaught,
    pipelineSummary,
    contradictionDetails,
    recommendation,
  } = stage2;

  // Score color grading
  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-emerald-600 stroke-emerald-500';
    if (score >= 65) return 'text-amber-600 stroke-amber-500';
    return 'text-rose-600 stroke-rose-500';
  };

  const getScoreBg = (score: number) => {
    if (score >= 85) return 'bg-emerald-50 border-emerald-200 text-emerald-800';
    if (score >= 65) return 'bg-amber-50 border-amber-200 text-amber-800';
    return 'bg-rose-50 border-rose-200 text-rose-800';
  };

  const getRecommendationBadge = () => {
    switch (recommendation) {
      case 'VERIFIED_CLEAR':
        return {
          label: 'Certified Consistent',
          bg: 'bg-emerald-100 text-emerald-800 border-emerald-300',
          icon: <CheckCircle2 className="w-4 h-4 text-emerald-600" />,
        };
      case 'ACCEPTABLE_WITH_FLAGS':
        return {
          label: 'Review Recommended (Minor Flags)',
          bg: 'bg-amber-100 text-amber-800 border-amber-300',
          icon: <AlertTriangle className="w-4 h-4 text-amber-600" />,
        };
      case 'ACTION_REQUIRED_CONTRADICTIONS':
        return {
          label: 'Action Required: Contradictions Detected',
          bg: 'bg-rose-100 text-rose-800 border-rose-300',
          icon: <AlertOctagon className="w-4 h-4 text-rose-600" />,
        };
      default:
        return {
          label: 'Audit Completed',
          bg: 'bg-slate-100 text-slate-800 border-slate-300',
          icon: <Info className="w-4 h-4 text-slate-600" />,
        };
    }
  };

  const rec = getRecommendationBadge();
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (verificationScore / 100) * circumference;

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 shadow-xs mb-6">
      {/* Top Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="text-base font-bold text-slate-900 tracking-tight">
              Two-Stage Self-Verification Audit Report
            </h2>
            <div className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border flex items-center gap-1.5 ${rec.bg}`}>
              {rec.icon}
              <span>{rec.label}</span>
            </div>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Multimodal OCR extraction audited against the ground-truth document context.
          </p>
        </div>

        <div className="text-xs text-slate-400 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200 flex items-center gap-1.5">
          <TrendingUp className="w-3.5 h-3.5 text-slate-500" />
          <span>Stage 2 Auditor: <strong>gemini-3.8-flash</strong></span>
        </div>
      </div>

      {/* Main Score & Metrics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mt-5 items-center">
        {/* Verification Score Gauge (4 cols) */}
        <div className="lg:col-span-4 bg-slate-50/80 border border-slate-200/80 rounded-xl p-4 flex flex-col items-center text-center">
          <div className="relative w-28 h-28 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r={radius}
                className="stroke-slate-200 fill-none"
                strokeWidth="8"
              />
              <circle
                cx="50"
                cy="50"
                r={radius}
                className={`fill-none transition-all duration-700 ease-out ${getScoreColor(verificationScore).split(' ')[1]}`}
                strokeWidth="8"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className={`text-2xl font-black ${getScoreColor(verificationScore).split(' ')[0]}`}>
                {verificationScore}%
              </span>
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                Consistency
              </span>
            </div>
          </div>

          <h3 className="text-xs font-bold text-slate-800 mt-2">
            Verification Consistency Score
          </h3>
          <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
            {verifiedCount} of {totalFields} fields verified with high confidence.
          </p>

          {/* Strict Compliance Disclaimer */}
          <div className="mt-2.5 pt-2 border-t border-slate-200/70 text-[10px] text-slate-400 leading-tight">
            * Note: Score represents field consistency against visible source tokens, not legal proof of document authenticity.
          </div>
        </div>

        {/* Breakdown Metric Tiles (8 cols) */}
        <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
          {/* Verified */}
          <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-3 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider">Verified</span>
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="mt-2">
              <span className="text-2xl font-black text-emerald-700">{verifiedCount}</span>
              <span className="text-xs text-emerald-600 font-medium ml-1">fields</span>
            </div>
            <p className="text-[10px] text-emerald-700/80 mt-1">Ground truth verified</p>
          </div>

          {/* Contradictions */}
          <div className="bg-rose-50/70 border border-rose-200 rounded-xl p-3 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-rose-800 uppercase tracking-wider">Contradictions</span>
              <AlertOctagon className="w-4 h-4 text-rose-600" />
            </div>
            <div className="mt-2">
              <span className="text-2xl font-black text-rose-700">{contradictionCount}</span>
              <span className="text-xs text-rose-600 font-medium ml-1">caught</span>
            </div>
            <p className="text-[10px] text-rose-700/80 mt-1">Internal data conflicts</p>
          </div>

          {/* Needs Review */}
          <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-3 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wider">Needs Review</span>
              <HelpCircle className="w-4 h-4 text-amber-600" />
            </div>
            <div className="mt-2">
              <span className="text-2xl font-black text-amber-700">{needsReviewCount}</span>
              <span className="text-xs text-amber-600 font-medium ml-1">fields</span>
            </div>
            <p className="text-[10px] text-amber-700/80 mt-1">Ambiguity or misreads</p>
          </div>

          {/* Missing */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">Missing</span>
              <FileX2 className="w-4 h-4 text-slate-500" />
            </div>
            <div className="mt-2">
              <span className="text-2xl font-black text-slate-700">{missingCount}</span>
              <span className="text-xs text-slate-500 font-medium ml-1">omitted</span>
            </div>
            <p className="text-[10px] text-slate-500 mt-1">Unfilled required fields</p>
          </div>

          {/* Special Pipeline Self-Checking Stat Tile */}
          <div className="col-span-2 sm:col-span-4 bg-indigo-50/80 border border-indigo-200/80 rounded-lg p-3 flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <div className="w-7 h-7 rounded-md bg-indigo-600 text-white flex items-center justify-center shrink-0">
                <Eye className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-bold text-indigo-900">
                  Verification Layer Performance: {ocrErrorsCaught} OCR misreads &amp; {stage2.contradictionsCaught} contradictions intercepted
                </span>
                <p className="text-[11px] text-indigo-700">
                  Demonstrates the verifier catching subtle errors that the initial naive extraction passed through uncorrected.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Executive Pipeline Summary Text */}
      {pipelineSummary && (
        <div className="mt-4 p-3.5 bg-slate-50 border border-slate-200 rounded-lg">
          <div className="flex items-start space-x-2">
            <Info className="w-4 h-4 text-slate-500 mt-0.5 shrink-0" />
            <div>
              <span className="text-xs font-bold text-slate-800 block">Executive Audit Summary</span>
              <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">{pipelineSummary}</p>
            </div>
          </div>
        </div>
      )}

      {/* Contradictions Alert Box */}
      {contradictionDetails && contradictionDetails.length > 0 && (
        <div className="mt-3 p-3.5 bg-rose-50 border border-rose-200 rounded-lg">
          <div className="flex items-start space-x-2">
            <AlertOctagon className="w-4 h-4 text-rose-600 mt-0.5 shrink-0" />
            <div className="w-full">
              <span className="text-xs font-bold text-rose-900 block">
                Flagged Contradictions (Critical Review Required):
              </span>
              <ul className="mt-1 space-y-1 list-disc pl-4 text-xs text-rose-800">
                {contradictionDetails.map((detail, idx) => (
                  <li key={idx} className="leading-snug">{detail}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
