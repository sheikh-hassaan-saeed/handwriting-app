"use client";

import React, { useState } from "react";
import Link from "next/link";
import { drawPlanner, PlannerType } from "@/lib/plannerRender";

interface PrintableItem {
  id: string;
  title: string;
  desc: string;
  category: "planners" | "students" | "teachers" | "papers";
  type: PlannerType | "notebook-preset";
  presetParam?: string; // used for notebook paper presets
  customizeUrl: string;
}

const PRINTABLES: PrintableItem[] = [
  {
    id: "daily-planner",
    title: "Daily Planner & Schedule",
    desc: "Hourly schedule (6 AM - 9 PM), top priorities, checklist, water tracker, and notes. Perfect for daily organization.",
    category: "planners",
    type: "daily",
    customizeUrl: "/printables/?preview=daily",
  },
  {
    id: "weekly-planner",
    title: "Weekly Planner Organizer",
    desc: "7-day column view blocks with ruled lines and checkbox goals section to map out your full week.",
    category: "planners",
    type: "weekly",
    customizeUrl: "/printables/?preview=weekly",
  },
  {
    id: "monthly-planner",
    title: "Blank Monthly Calendar",
    desc: "Clean 5x7 grid calendar with blank date cells, monthly focus areas, and extra note taking space.",
    category: "planners",
    type: "monthly",
    customizeUrl: "/printables/?preview=monthly",
  },
  {
    id: "todo-list",
    title: "Detailed Task To-Do List",
    desc: "Two-column checkboxes for completing tasks, tracking habits, and organizing daily errands.",
    category: "planners",
    type: "todo",
    customizeUrl: "/printables/?preview=todo",
  },
  {
    id: "reading-log",
    title: "Student Reading Log Tracker",
    desc: "Record book titles, authors, start/end dates, coloring rating stars, and completion checklists.",
    category: "students",
    type: "reading",
    customizeUrl: "/printables/?preview=reading",
  },
  {
    id: "assignment-tracker",
    title: "Student Assignment Planner",
    desc: "Keep track of classes, homework tasks, due dates, project priority levels, grades, and statuses.",
    category: "students",
    type: "assignment",
    customizeUrl: "/printables/?preview=assignment",
  },
  {
    id: "study-planner",
    title: "Master Study Planner & Pomodoro",
    desc: "Map concepts, track 25m Pomodoro study intervals, make revision checklists, and write summary formulas.",
    category: "students",
    type: "study",
    customizeUrl: "/printables/?preview=study",
  },
  {
    id: "cornell-notes-lined",
    title: "Cornell Notes Lined Grid",
    desc: "Classic Cornell page structure with a cue questions column, horizontal notes grid, and summary box.",
    category: "students",
    type: "notebook-preset",
    presetParam: "cornell",
    customizeUrl: "/cornell-notes/",
  },
  {
    id: "graph-paper-grid",
    title: "Math Graph Grid Paper",
    desc: "Square blue-lined 5mm grids for algebra, sketching, graphs, geometry equations, and engineering drawings.",
    category: "papers",
    type: "notebook-preset",
    presetParam: "graph",
    customizeUrl: "/notebook-paper/college-ruled/",
  },
  {
    id: "dot-grid-paper",
    title: "Dot Grid Journal Page",
    desc: "Perfect dot grid patterns for bullet journals, creative doodles, drawing layouts, and structural grids.",
    category: "papers",
    type: "notebook-preset",
    presetParam: "dot-grid",
    customizeUrl: "/notebook-paper/",
  },
  {
    id: "kindergarten-writing",
    title: "Kindergarten Ruled Paper",
    desc: "Spacious guidelines with wide solid bounds and dashed helper lines, perfect for toddler letter traces.",
    category: "teachers",
    type: "notebook-preset",
    presetParam: "kindergarten",
    customizeUrl: "/notebook-paper/",
  },
  {
    id: "primary-ruled",
    title: "Primary Guidelines Sheet",
    desc: "Three-line system with primary spacing lines for school writing drills, helping children write straight.",
    category: "teachers",
    type: "notebook-preset",
    presetParam: "primary",
    customizeUrl: "/notebook-paper/",
  },
];

export default function PrintablesLibrary() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  const filteredItems = PRINTABLES.filter(
    (item) => activeCategory === "all" || item.category === activeCategory
  );

  const triggerDownload = async (item: PrintableItem) => {
    setDownloadingId(item.id);
    try {
      const { jsPDF } = await import("jspdf");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "pt",
        format: "a4",
      });

      const tempCanvas = document.createElement("canvas");
      // Use standard A4 pixel dimensions
      tempCanvas.width = 800;
      tempCanvas.height = 1131;
      const tempCtx = tempCanvas.getContext("2d")!;

      if (item.type === "notebook-preset") {
        // Draw the notebook preset
        tempCtx.fillStyle = "#ffffff";
        tempCtx.fillRect(0, 0, 800, 1131);
        
        // Faint drawing for default preset preview
        const preset = item.presetParam;
        tempCtx.strokeStyle = "#cbd5e1";
        tempCtx.lineWidth = 0.8;

        if (preset === "graph") {
          for (let x = 20; x < 800; x += 20) {
            tempCtx.beginPath(); tempCtx.moveTo(x, 0); tempCtx.lineTo(x, 1131); tempCtx.stroke();
          }
          for (let y = 20; y < 1131; y += 20) {
            tempCtx.beginPath(); tempCtx.moveTo(0, y); tempCtx.lineTo(800, y); tempCtx.stroke();
          }
        } else if (preset === "dot-grid") {
          tempCtx.fillStyle = "#9ca3af";
          for (let x = 20; x < 800; x += 20) {
            for (let y = 20; y < 1131; y += 20) {
              tempCtx.beginPath(); tempCtx.arc(x, y, 1, 0, Math.PI * 2); tempCtx.fill();
            }
          }
        } else if (preset === "cornell") {
          // Draw standard cornell frame
          tempCtx.strokeStyle = "#9ca3af";
          tempCtx.lineWidth = 1.5;
          tempCtx.beginPath();
          tempCtx.moveTo(40, 100); tempCtx.lineTo(760, 100);
          tempCtx.moveTo(40, 930); tempCtx.lineTo(760, 930);
          tempCtx.moveTo(240, 100); tempCtx.lineTo(240, 930);
          tempCtx.stroke();
          // Horizontal ruled lines inside notes
          tempCtx.strokeStyle = "#e5e7eb";
          tempCtx.lineWidth = 0.8;
          for (let y = 128; y < 930; y += 28) {
            tempCtx.beginPath(); tempCtx.moveTo(240, y); tempCtx.lineTo(760, y); tempCtx.stroke();
          }
        } else {
          // Primary / Kindergarten
          const spacing = preset === "kindergarten" ? 64 : 48;
          let y = 100;
          while (y + spacing < 1050) {
            tempCtx.beginPath(); tempCtx.moveTo(40, y); tempCtx.lineTo(760, y); tempCtx.stroke();
            tempCtx.beginPath(); tempCtx.moveTo(40, y + spacing); tempCtx.lineTo(760, y + spacing); tempCtx.stroke();
            y += spacing * 1.75;
          }
        }
      } else {
        // Draw the planner layout
        drawPlanner(tempCtx, item.type as PlannerType, 800, 1131);
      }

      const imgData = tempCanvas.toDataURL("image/png");
      pdf.addImage(imgData, "PNG", 0, 0, pdf.internal.pageSize.getWidth(), pdf.internal.pageSize.getHeight());
      pdf.save(`printable-${item.id}.pdf`);
    } catch (e) {
      console.error(e);
    } finally {
      setDownloadingId(null);
    }
  };

  return (
    <div className="w-full">
      {/* Category selector pills */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
        {[
          { id: "all", label: "All Templates" },
          { id: "planners", label: "Planners & Organizers" },
          { id: "students", label: "Student Resources" },
          { id: "teachers", label: "Teacher Checklists" },
          { id: "papers", label: "Grid & Lined Papers" },
        ].map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-4 py-2 text-sm font-semibold rounded-full transition-all shadow-sm ${
              activeCategory === cat.id
                ? "bg-indigo-600 text-white"
                : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-100"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Grid of printables cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="flex flex-col bg-white rounded-2xl shadow border border-gray-100 hover:shadow-md hover:border-indigo-100 transition-all p-5"
          >
            {/* Header info */}
            <div className="flex-1">
              <span className="inline-block text-xxs font-bold uppercase tracking-wider text-indigo-500 bg-indigo-50 px-2 py-0.5 rounded mb-2">
                {item.category === "planners"
                  ? "Planner"
                  : item.category === "students"
                  ? "Student Resource"
                  : item.category === "teachers"
                  ? "Teacher Resource"
                  : "Ruled Grid Paper"}
              </span>
              <h3 className="text-lg font-bold text-gray-800 mb-2">{item.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
            </div>

            {/* Bottom Actions */}
            <div className="flex flex-col gap-2 mt-6">
              <button
                onClick={() => triggerDownload(item)}
                disabled={downloadingId !== null}
                className="w-full py-2 px-4 rounded-lg bg-indigo-600 text-white font-semibold text-xs hover:bg-indigo-700 disabled:opacity-55 transition-colors shadow-sm"
              >
                {downloadingId === item.id ? "Generating PDF..." : "↓ One-Click Download (PDF)"}
              </button>
              <Link
                href={item.customizeUrl}
                className="block text-center py-2 px-4 border border-gray-200 hover:border-indigo-300 rounded-lg text-xs font-semibold text-gray-700 bg-white hover:bg-gray-50 transition-colors"
              >
                Customize Template →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
