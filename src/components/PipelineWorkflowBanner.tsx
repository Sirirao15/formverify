import React from 'react';
import { UploadCloud, Cpu, ShieldAlert, CheckCircle2, FileText, ArrowRight } from 'lucide-react';

export type PipelineStep = 'upload' | 'extract' | 'verify' | 'reconcile' | 'completed';

interface PipelineWorkflowBannerProps {
  currentStep: PipelineStep;
  stage1TimeMs?: number;
  stage2TimeMs?: number;
  isProcessing: boolean;
}

export const PipelineWorkflowBanner: React.FC<PipelineWorkflowBannerProps> = ({
  currentStep,
  stage1TimeMs,
  stage2TimeMs,
  isProcessing,
}) => {
  const steps: { id: PipelineStep; label: string; sub: string; icon: React.ReactNode }[] = [
    {
      id: 'upload',
      label: '1. Form Ingestion',
      sub: 'Multimodal Image / PDF',
      icon: <UploadCloud className="w-4 h-4" />,
    },
    {
      id: 'extract',
      label: '2. Stage 1: Extraction',
      sub: stage1TimeMs ? `${(stage1TimeMs / 1000).toFixed(1)}s` : 'Multimodal Parser',
      icon: <Cpu className="w-4 h-4" />,
    },
    {
      id: 'verify',
      label: '3. Stage 2: Self-Check',
      sub: stage2TimeMs ? `${(stage2TimeMs / 1000).toFixed(1)}s` : 'Adversarial Auditor',
      icon: <ShieldAlert className="w-4 h-4" />,
    },
    {
      id: 'reconcile',
      label: '4. Self-Correction',
      sub: 'Evidence Cross-Check',
      icon: <CheckCircle2 className="w-4 h-4" />,
    },
    {
      id: 'completed',
      label: '5. Audit Report',
      sub: 'Certified Field Dossier',
      icon: <FileText className="w-4 h-4" />,
    },
  ];

  const stepOrder: PipelineStep[] = ['upload', 'extract', 'verify', 'reconcile', 'completed'];
  const currentIndex = stepOrder.indexOf(currentStep);

  return (
    <div className="bg-white border-b border-slate-200 px-4 py-3 sm:px-6 shadow-xs">
      <div className="max-w-7xl mx-auto flex items-center justify-between overflow-x-auto no-scrollbar py-1">
        <div className="flex items-center min-w-max space-x-2 sm:space-x-4 w-full justify-between">
          {steps.map((step, idx) => {
            const stepIdx = stepOrder.indexOf(step.id);
            const isCompleted = stepIdx < currentIndex || currentStep === 'completed';
            const isCurrent = stepIdx === currentIndex && isProcessing;
            const isNext = stepIdx > currentIndex;

            return (
              <React.Fragment key={step.id}>
                <div className="flex items-center space-x-2.5">
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                      isCompleted
                        ? 'bg-emerald-100 text-emerald-700 border border-emerald-300'
                        : isCurrent
                        ? 'bg-blue-600 text-white animate-pulse shadow-sm shadow-blue-500/20'
                        : 'bg-slate-100 text-slate-400 border border-slate-200'
                    }`}
                  >
                    {step.icon}
                  </div>
                  <div>
                    <div className="flex items-center space-x-1.5">
                      <span
                        className={`text-xs font-semibold ${
                          isCompleted
                            ? 'text-slate-800'
                            : isCurrent
                            ? 'text-blue-600 font-bold'
                            : 'text-slate-400'
                        }`}
                      >
                        {step.label}
                      </span>
                    </div>
                    <span className="text-[10px] text-slate-500 block leading-tight">
                      {step.sub}
                    </span>
                  </div>
                </div>

                {idx < steps.length - 1 && (
                  <ArrowRight
                    className={`w-4 h-4 shrink-0 ${
                      stepIdx < currentIndex ? 'text-emerald-500' : 'text-slate-300'
                    }`}
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
};
