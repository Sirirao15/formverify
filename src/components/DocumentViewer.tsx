import React, { useState, useRef } from 'react';
import { ZoomIn, ZoomOut, Maximize2, RotateCcw, Upload, FileText, Image as ImageIcon, Eye, Layers } from 'lucide-react';
import { VerifiedField } from '../types';

interface DocumentViewerProps {
  dataUrl: string | null;
  mimeType: string;
  fileName: string;
  onFileUpload: (file: File) => void;
  isProcessing: boolean;
  verifiedFields?: VerifiedField[];
  highlightStatus?: 'all' | 'flagged' | 'none';
}

export const DocumentViewer: React.FC<DocumentViewerProps> = ({
  dataUrl,
  mimeType,
  fileName,
  onFileUpload,
  isProcessing,
  verifiedFields = [],
  highlightStatus = 'flagged',
}) => {
  const [zoom, setZoom] = useState<number>(100);
  const [showOverlays, setShowOverlays] = useState<boolean>(true);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState<boolean>(false);

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 25, 200));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 25, 50));
  const handleZoomReset = () => setZoom(100);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onFileUpload(e.target.files[0]);
    }
  };

  const isPdf = mimeType === 'application/pdf';

  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs flex flex-col h-full">
      {/* Top toolbar */}
      <div className="bg-slate-50 border-b border-slate-200 px-4 py-2.5 flex items-center justify-between text-xs">
        <div className="flex items-center space-x-2 truncate">
          <span className="font-semibold text-slate-700 flex items-center gap-1.5 truncate">
            {isPdf ? <FileText className="w-4 h-4 text-rose-500 shrink-0" /> : <ImageIcon className="w-4 h-4 text-blue-500 shrink-0" />}
            <span className="truncate">{fileName || 'No document loaded'}</span>
          </span>
          <span className="text-[10px] text-slate-400 bg-slate-200/70 px-1.5 py-0.5 rounded uppercase font-medium">
            {isPdf ? 'PDF' : 'IMAGE'}
          </span>
        </div>

        <div className="flex items-center space-x-1.5">
          <button
            id="btn-upload-manual"
            onClick={() => fileInputRef.current?.click()}
            disabled={isProcessing}
            className="p-1.5 rounded hover:bg-slate-200 text-slate-600 transition flex items-center gap-1 cursor-pointer font-medium"
            title="Upload another form"
          >
            <Upload className="w-3.5 h-3.5 text-slate-600" />
            <span className="hidden md:inline text-[11px]">Upload New</span>
          </button>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/png, image/jpeg, image/webp, application/pdf"
            className="hidden"
            onChange={handleFileChange}
          />

          <div className="h-4 w-px bg-slate-200 mx-1" />

          {/* Zoom controls */}
          <button
            onClick={handleZoomOut}
            className="p-1.5 rounded hover:bg-slate-200 text-slate-600 transition cursor-pointer"
            title="Zoom Out"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <span className="text-[11px] font-mono text-slate-500 w-9 text-center">
            {zoom}%
          </span>
          <button
            onClick={handleZoomIn}
            className="p-1.5 rounded hover:bg-slate-200 text-slate-600 transition cursor-pointer"
            title="Zoom In"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handleZoomReset}
            className="p-1.5 rounded hover:bg-slate-200 text-slate-600 transition cursor-pointer"
            title="Reset Zoom"
          >
            <RotateCcw className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Main viewer body */}
      <div
        className={`relative flex-1 bg-slate-100 min-h-[480px] max-h-[620px] overflow-auto flex items-center justify-center p-4 transition-colors ${
          isDragOver ? 'bg-emerald-50 ring-2 ring-emerald-500 ring-inset' : ''
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {dataUrl ? (
          <div
            className="transition-transform duration-150 origin-top shadow-lg bg-white rounded-sm"
            style={{ transform: `scale(${zoom / 100})` }}
          >
            {isPdf ? (
              <object
                data={dataUrl}
                type="application/pdf"
                className="w-[680px] h-[920px] border border-slate-300"
              >
                <div className="p-8 text-center">
                  <p className="text-slate-600 text-sm">PDF viewer preview active.</p>
                  <a
                    href={dataUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 underline text-xs mt-2 block"
                  >
                    Open PDF in new tab
                  </a>
                </div>
              </object>
            ) : (
              <img
                src={dataUrl}
                alt="Application Form Preview"
                className="max-w-[700px] w-auto h-auto object-contain select-none"
                referrerPolicy="no-referrer"
              />
            )}
          </div>
        ) : (
          <div
            onClick={() => fileInputRef.current?.click()}
            className="text-center p-8 border-2 border-dashed border-slate-300 rounded-xl hover:border-emerald-500 hover:bg-emerald-50/20 transition cursor-pointer max-w-sm"
          >
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-3">
              <Upload className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-bold text-slate-800">Upload an Application Form</h3>
            <p className="text-xs text-slate-500 mt-1">
              Drag &amp; drop an image (PNG, JPG, WEBP) or PDF, or click to browse.
            </p>
            <p className="text-[11px] text-slate-400 mt-2">
              Or pick one of the stress-test preset scenarios above.
            </p>
          </div>
        )}
      </div>

      {/* Footer info */}
      <div className="bg-slate-50 border-t border-slate-200 px-4 py-2 flex items-center justify-between text-[11px] text-slate-500">
        <span>Ground-Truth Source Document Canvas</span>
        <span className="text-slate-400">Drag &amp; drop supported anytime</span>
      </div>
    </div>
  );
};
