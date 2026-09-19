import React from 'react';
import { ShieldCheck, RefreshCw, FileDown, UploadCloud, Sparkles } from 'lucide-react';

interface NavbarProps {
  onRunVerificationAgain: () => void;
  onExportReport: () => void;
  onReset: () => void;
  isProcessing: boolean;
  hasDocument: boolean;
  verificationScore?: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  onRunVerificationAgain,
  onExportReport,
  onReset,
  isProcessing,
  hasDocument,
  verificationScore,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-slate-900 border-b border-slate-800 text-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand & Subtitle */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-slate-950 font-bold shadow-md shadow-emerald-500/20">
            <ShieldCheck className="w-6 h-6 text-slate-950" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-bold text-lg tracking-tight text-white">FormVerify</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-medium border border-emerald-500/30 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-emerald-400" />
                Two-Stage AI Pipeline
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">
              Multimodal Application Form Extraction &amp; Self-Verification System
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {hasDocument && (
            <>
              <button
                id="btn-run-verify-again"
                onClick={onRunVerificationAgain}
                disabled={isProcessing}
                className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white transition shadow-sm cursor-pointer"
                title="Re-run Stage 2 self-verification against the source document"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isProcessing ? 'animate-spin' : ''}`} />
                <span className="hidden sm:inline">Run Verification Again</span>
                <span className="sm:hidden">Re-verify</span>
              </button>

              <button
                id="btn-export-audit"
                onClick={onExportReport}
                disabled={isProcessing}
                className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition cursor-pointer"
                title="Export complete verification audit log"
              >
                <FileDown className="w-3.5 h-3.5 text-slate-400" />
                <span className="hidden sm:inline">Export Audit</span>
              </button>
            </>
          )}

          <button
            id="btn-new-upload"
            onClick={onReset}
            disabled={isProcessing}
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition cursor-pointer"
          >
            <UploadCloud className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">New Form</span>
          </button>
        </div>
      </div>
    </header>
  );
};
