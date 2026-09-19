import React from 'react';
import { DEMO_FORMS } from '../data/demoForms';
import { DemoFormPreset } from '../types';
import { AlertTriangle, CheckCircle, FileSpreadsheet, Sparkles, ArrowUpRight } from 'lucide-react';

interface DemoPresetSelectorProps {
  selectedPresetId: string | null;
  onSelectPreset: (preset: DemoFormPreset) => void;
  isProcessing: boolean;
}

export const DemoPresetSelector: React.FC<DemoPresetSelectorProps> = ({
  selectedPresetId,
  onSelectPreset,
  isProcessing,
}) => {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5 shadow-xs mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-100">
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              Preloaded Stress-Test &amp; Anomaly Forms
            </h2>
            <span className="text-[11px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-medium border border-slate-200">
              4 Scenarios
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Test cases engineered with intentional OCR ambiguities, missing sections, and numerical contradictions to showcase the two-stage self-checking pipeline.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {DEMO_FORMS.map((preset) => {
          const isSelected = selectedPresetId === preset.id;
          return (
            <button
              key={preset.id}
              id={`preset-${preset.id}`}
              onClick={() => onSelectPreset(preset)}
              disabled={isProcessing}
              className={`text-left p-3 rounded-lg border transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'border-emerald-600 bg-emerald-50/50 shadow-sm ring-1 ring-emerald-500/20'
                  : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/80 bg-white'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                      preset.difficultyTag === 'Severe Contradictions'
                        ? 'bg-rose-100 text-rose-700 border border-rose-200'
                        : preset.difficultyTag === 'Moderate OCR Noise'
                        ? 'bg-amber-100 text-amber-800 border border-amber-200'
                        : preset.difficultyTag === 'Complex Ambiguities'
                        ? 'bg-indigo-100 text-indigo-700 border border-indigo-200'
                        : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                    }`}
                  >
                    {preset.difficultyTag}
                  </span>

                  <ArrowUpRight
                    className={`w-3.5 h-3.5 ${
                      isSelected ? 'text-emerald-600' : 'text-slate-400'
                    }`}
                  />
                </div>

                <h3 className="text-xs font-bold text-slate-800 line-clamp-1 leading-snug">
                  {preset.title}
                </h3>
                <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                  {preset.subtitle}
                </p>

                {preset.knownFlaws.length > 0 ? (
                  <div className="mt-2.5 pt-2 border-t border-slate-100">
                    <span className="text-[10px] font-semibold text-slate-600 block mb-1 flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3 text-amber-500" />
                      Embedded Flaws:
                    </span>
                    <ul className="text-[10px] text-slate-500 space-y-0.5 list-disc pl-3.5">
                      {preset.knownFlaws.slice(0, 2).map((flaw, i) => (
                        <li key={i} className="line-clamp-1">
                          {flaw}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <div className="mt-2.5 pt-2 border-t border-slate-100">
                    <span className="text-[10px] font-semibold text-emerald-700 flex items-center gap-1">
                      <CheckCircle className="w-3 h-3 text-emerald-600" />
                      Clean Baseline Control
                    </span>
                    <p className="text-[10px] text-slate-500 mt-0.5">
                      100% ground-truth consistency test
                    </p>
                  </div>
                )}
              </div>

              <div className="mt-3 pt-2 flex items-center justify-between text-[11px]">
                <span className="text-slate-400 font-medium">{preset.category}</span>
                <span
                  className={`font-semibold ${
                    isSelected ? 'text-emerald-700' : 'text-slate-700'
                  }`}
                >
                  {isSelected ? 'Active Selection' : 'Load Scenario'}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
