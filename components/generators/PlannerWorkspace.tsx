"use client";

import React, { useRef, useEffect, useCallback } from "react";
import { drawPlanner, PlannerType } from "@/lib/plannerRender";

interface PlannerWorkspaceProps {
  type: PlannerType;
}

export default function PlannerWorkspace({ type }: PlannerWorkspaceProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const renderPlanner = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const w = 800;
    const h = 1131; // A4 standard pixel size for PDF alignment
    const dpr = window.devicePixelRatio || 1;

    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = "100%";
    canvas.style.height = "auto";

    const ctx = canvas.getContext("2d")!;
    ctx.scale(dpr, dpr);

    drawPlanner(ctx, type, w, h);
  }, [type]);

  useEffect(() => {
    const id = setTimeout(renderPlanner, 50);
    return () => clearTimeout(id);
  }, [renderPlanner]);

  const handleDownloadPNG = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = `printable-${type}-template.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  const handleDownloadPDF = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const { jsPDF } = await import("jspdf");
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "pt",
      format: "a4",
    });

    const imgData = canvas.toDataURL("image/png");
    pdf.addImage(imgData, "PNG", 0, 0, pdf.internal.pageSize.getWidth(), pdf.internal.pageSize.getHeight());
    pdf.save(`printable-${type}-template.pdf`);
  };

  const handlePrint = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dataUrl = canvas.toDataURL("image/png");
    const windowContent = `<iframe src="${dataUrl}" style="width:100%; height:100%; border:none;" onload="window.print()"></iframe>`;
    const printWindow = window.open("", "_blank");
    if (printWindow) {
      printWindow.document.write(windowContent);
      printWindow.document.close();
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 items-start">
      {/* Sidebar Controls */}
      <aside className="w-full md:w-80 bg-white rounded-2xl shadow border border-gray-100 p-6">
        <h3 className="font-bold text-gray-800 text-lg mb-4 capitalize">{type} Template</h3>
        <p className="text-sm text-gray-500 mb-6 leading-relaxed">
          This template is pre-formatted to fit standard A4 or Letter sizes. Print it directly from your home printer or download the high-resolution files.
        </p>

        <div className="flex flex-col gap-3">
          <button
            onClick={handleDownloadPDF}
            className="w-full py-2.5 px-4 rounded-lg bg-indigo-600 text-white font-bold text-sm hover:bg-indigo-700 transition-colors shadow-sm"
          >
            ↓ Download Printable PDF
          </button>
          <button
            onClick={handleDownloadPNG}
            className="w-full py-2 px-4 rounded-lg bg-white border border-gray-200 text-gray-700 font-semibold text-sm hover:bg-gray-50 transition-colors"
          >
            Download PNG Image
          </button>
          <button
            onClick={handlePrint}
            className="w-full py-2 px-4 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold text-sm transition-colors"
          >
            🖨️ Print Direct
          </button>
        </div>
      </aside>

      {/* Preview Canvas Area */}
      <div className="flex-1 bg-white rounded-2xl shadow border border-gray-100 p-5 flex flex-col items-center justify-center">
        <span className="self-start text-xs font-bold uppercase tracking-wider text-gray-400 mb-4">
          Printable Layout Preview
        </span>
        <div className="w-full max-w-lg border border-gray-200 rounded-xl shadow-inner bg-gray-50 p-4">
          <canvas ref={canvasRef} className="w-full bg-white shadow-md border border-gray-100 rounded" />
        </div>
      </div>
    </div>
  );
}
