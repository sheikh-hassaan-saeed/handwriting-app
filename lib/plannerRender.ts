export type PlannerType =
  | "daily"
  | "weekly"
  | "monthly"
  | "todo"
  | "reading"
  | "assignment"
  | "study"
  | "habit"
  | "journal";

// Helper: draw checkbox
function drawCheckbox(ctx: CanvasRenderingContext2D, x: number, y: number, size = 12) {
  ctx.save();
  ctx.strokeStyle = "#9ca3af";
  ctx.lineWidth = 1.2;
  ctx.strokeRect(x, y - size + 2, size, size);
  ctx.restore();
}

// Helper: draw line
function drawHorizontalLine(ctx: CanvasRenderingContext2D, x1: number, x2: number, y: number, color = "#e5e7eb", width = 1) {
  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.beginPath();
  ctx.moveTo(x1, y);
  ctx.lineTo(x2, y);
  ctx.stroke();
  ctx.restore();
}

// Helper: draw dashed line
function drawDashedLine(ctx: CanvasRenderingContext2D, x1: number, x2: number, y: number, color = "#d1d5db", width = 0.75) {
  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.setLineDash([3, 3]);
  ctx.beginPath();
  ctx.moveTo(x1, y);
  ctx.lineTo(x2, y);
  ctx.stroke();
  ctx.restore();
}

// Helper: draw rating stars
function drawStarOutline(ctx: CanvasRenderingContext2D, cx: number, cy: number, spikes = 5, outerRadius = 8, innerRadius = 4) {
  let rot = (Math.PI / 2) * 3;
  let x = cx;
  let y = cy;
  const step = Math.PI / spikes;

  ctx.save();
  ctx.beginPath();
  ctx.moveTo(cx, cy - outerRadius);
  for (let i = 0; i < spikes; i++) {
    x = cx + Math.cos(rot) * outerRadius;
    y = cy + Math.sin(rot) * outerRadius;
    ctx.lineTo(x, y);
    rot += step;

    x = cx + Math.cos(rot) * innerRadius;
    y = cy + Math.sin(rot) * innerRadius;
    ctx.lineTo(x, y);
    rot += step;
  }
  ctx.lineTo(cx, cy - outerRadius);
  ctx.closePath();
  ctx.strokeStyle = "#9ca3af";
  ctx.lineWidth = 1;
  ctx.stroke();
  ctx.restore();
}

export function drawPlanner(ctx: CanvasRenderingContext2D, type: PlannerType, w: number, h: number) {
  // Background
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, w, h);

  // Styling Constants
  const brandColor = "#4f46e5"; // Indigo-600
  const textColor = "#1f2937"; // Gray-800
  const lightTextColor = "#6b7280"; // Gray-500
  const gridColor = "#e5e7eb";

  // Clean layout
  if (type === "daily") {
    // HEADER
    ctx.fillStyle = brandColor;
    ctx.font = "bold 26px sans-serif";
    ctx.fillText("DAILY PLANNER", 50, 75);

    ctx.fillStyle = lightTextColor;
    ctx.font = "14px sans-serif";
    ctx.fillText("Date: ________________________", w - 280, 70);

    // Day of the week boxes
    const days = ["M", "T", "W", "T", "F", "S", "S"];
    ctx.font = "bold 11px sans-serif";
    days.forEach((day, index) => {
      const dx = 50 + index * 30;
      ctx.fillStyle = "#f3f4f6";
      ctx.fillRect(dx, 100, 22, 22);
      ctx.strokeStyle = "#d1d5db";
      ctx.strokeRect(dx, 100, 22, 22);
      ctx.fillStyle = textColor;
      ctx.fillText(day, dx + 7, 115);
    });

    // LEFT: SCHEDULE (6:00 AM - 9:00 PM)
    ctx.fillStyle = textColor;
    ctx.font = "bold 16px sans-serif";
    ctx.fillText("Today's Schedule", 50, 160);
    drawHorizontalLine(ctx, 50, 360, 170, brandColor, 2);

    const hours = [
      "06:00 AM", "07:00 AM", "08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM",
      "12:00 PM", "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM",
      "06:00 PM", "07:00 PM", "08:00 PM", "09:00 PM"
    ];
    ctx.font = "11px sans-serif";
    hours.forEach((hr, i) => {
      const y = 200 + i * 50;
      ctx.fillStyle = lightTextColor;
      ctx.fillText(hr, 50, y);
      drawHorizontalLine(ctx, 120, 360, y, gridColor, 1);
    });

    // RIGHT: PRIORITIES, TO-DO, NOTES, WATER
    // 1. Top Priorities
    ctx.fillStyle = textColor;
    ctx.font = "bold 16px sans-serif";
    ctx.fillText("Top Priorities", 400, 160);
    drawHorizontalLine(ctx, 400, 750, 170, brandColor, 2);

    for (let i = 0; i < 3; i++) {
      const y = 205 + i * 36;
      drawCheckbox(ctx, 400, y, 14);
      drawHorizontalLine(ctx, 425, 750, y, gridColor, 1);
    }

    // 2. To-Do List
    ctx.fillStyle = textColor;
    ctx.font = "bold 16px sans-serif";
    ctx.fillText("To-Do List", 400, 330);
    drawHorizontalLine(ctx, 400, 750, 340, brandColor, 2);

    for (let i = 0; i < 10; i++) {
      const y = 375 + i * 36;
      drawCheckbox(ctx, 400, y, 14);
      drawHorizontalLine(ctx, 425, 750, y, gridColor, 1);
    }

    // 3. Water Intake
    ctx.fillStyle = textColor;
    ctx.font = "bold 16px sans-serif";
    ctx.fillText("Water Intake", 400, 760);
    drawHorizontalLine(ctx, 400, 750, 770, brandColor, 2);

    ctx.font = "12px sans-serif";
    ctx.fillStyle = lightTextColor;
    ctx.fillText("8 Glasses Target:", 400, 805);
    for (let i = 0; i < 8; i++) {
      const cx = 520 + i * 26;
      ctx.beginPath();
      ctx.arc(cx, 801, 8, 0, Math.PI * 2);
      ctx.strokeStyle = "#60a5fa";
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }

    // 4. Notes Section
    ctx.fillStyle = textColor;
    ctx.font = "bold 16px sans-serif";
    ctx.fillText("Notes / Reminders", 400, 860);
    drawHorizontalLine(ctx, 400, 750, 870, brandColor, 2);
    for (let i = 0; i < 5; i++) {
      drawHorizontalLine(ctx, 400, 750, 910 + i * 32, gridColor, 0.75);
    }

  } else if (type === "weekly") {
    // HEADER
    ctx.fillStyle = brandColor;
    ctx.font = "bold 26px sans-serif";
    ctx.fillText("WEEKLY PLANNER", 50, 75);

    ctx.fillStyle = lightTextColor;
    ctx.font = "14px sans-serif";
    ctx.fillText("Week of: ________________________", w - 280, 70);

    // 7 Days Grid
    const days = [
      { name: "MONDAY", code: "Mon" },
      { name: "TUESDAY", code: "Tue" },
      { name: "WEDNESDAY", code: "Wed" },
      { name: "THURSDAY", code: "Thu" },
      { name: "FRIDAY", code: "Fri" },
      { name: "SATURDAY", code: "Sat" },
      { name: "SUNDAY", code: "Sun" },
    ];

    const colW = 330;
    const boxH = 200;

    days.forEach((day, index) => {
      const isLeft = index < 4;
      const colX = isLeft ? 50 : 420;
      const rowY = 120 + (isLeft ? index : index - 4) * boxH;

      ctx.fillStyle = "#fafafa";
      ctx.fillRect(colX, rowY, colW, boxH - 20);
      ctx.strokeStyle = "#e5e7eb";
      ctx.lineWidth = 1;
      ctx.strokeRect(colX, rowY, colW, boxH - 20);

      ctx.fillStyle = brandColor;
      ctx.fillRect(colX, rowY, colW, 4);

      ctx.fillStyle = textColor;
      ctx.font = "bold 13px sans-serif";
      ctx.fillText(day.name, colX + 15, rowY + 22);

      for (let l = 0; l < 4; l++) {
        drawDashedLine(ctx, colX + 15, colX + colW - 15, rowY + 55 + l * 32, "#e5e7eb", 0.75);
      }
    });

    const goalsX = 420;
    const goalsY = 120 + 3 * boxH;
    ctx.fillStyle = "#fcfdfd";
    ctx.fillRect(goalsX, goalsY, colW, boxH - 20);
    ctx.strokeStyle = "#e5e7eb";
    ctx.strokeRect(goalsX, goalsY, colW, boxH - 20);

    ctx.fillStyle = "#10b981";
    ctx.fillRect(goalsX, goalsY, colW, 4);

    ctx.fillStyle = textColor;
    ctx.font = "bold 13px sans-serif";
    ctx.fillText("WEEKLY GOALS & NOTES", goalsX + 15, goalsY + 22);

    for (let l = 0; l < 4; l++) {
      drawCheckbox(ctx, goalsX + 15, goalsY + 58 + l * 32, 12);
      drawHorizontalLine(ctx, goalsX + 35, goalsX + colW - 15, goalsY + 58 + l * 32, "#e5e7eb", 0.75);
    }

  } else if (type === "monthly") {
    // HEADER
    ctx.fillStyle = brandColor;
    ctx.font = "bold 26px sans-serif";
    ctx.fillText("MONTHLY PLANNER", 50, 75);

    ctx.fillStyle = lightTextColor;
    ctx.font = "14px sans-serif";
    ctx.fillText("Month: __________________ Year: ______", w - 320, 70);

    const startX = 50;
    const startY = 120;
    const gridW = 700;
    const gridH = 650;
    const rows = 5;
    const cols = 7;
    const cellW = gridW / cols;
    const cellH = gridH / rows;

    const weekdayNames = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
    ctx.fillStyle = textColor;
    ctx.font = "bold 12px sans-serif";
    weekdayNames.forEach((day, index) => {
      const dx = startX + index * cellW + (cellW / 2) - 14;
      ctx.fillText(day, dx, startY - 12);
    });

    ctx.strokeStyle = "#d1d5db";
    ctx.lineWidth = 1.2;
    for (let r = 0; r <= rows; r++) {
      drawHorizontalLine(ctx, startX, startX + gridW, startY + r * cellH, "#d1d5db", 1);
    }
    for (let c = 0; c <= cols; c++) {
      ctx.beginPath();
      ctx.moveTo(startX + c * cellW, startY);
      ctx.lineTo(startX + c * cellW, startY + gridH);
      ctx.stroke();
    }

    ctx.fillStyle = "#fafafa";
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const cx = startX + c * cellW + 4;
        const cy = startY + r * cellH + 4;
        ctx.fillRect(cx, cy, 18, 16);
        ctx.strokeStyle = "#e5e7eb";
        ctx.strokeRect(cx, cy, 18, 16);
      }
    }

    const notesY = startY + gridH + 30;
    ctx.fillStyle = textColor;
    ctx.font = "bold 16px sans-serif";
    ctx.fillText("Monthly Focus & Notes", startX, notesY);
    drawHorizontalLine(ctx, startX, startX + gridW, notesY + 10, brandColor, 2);

    for (let i = 0; i < 4; i++) {
      drawHorizontalLine(ctx, startX, startX + gridW, notesY + 45 + i * 36, gridColor, 1);
    }

  } else if (type === "todo") {
    // HEADER
    ctx.fillStyle = brandColor;
    ctx.font = "bold 28px sans-serif";
    ctx.fillText("TO-DO LIST", 50, 75);

    ctx.fillStyle = lightTextColor;
    ctx.font = "italic 13px sans-serif";
    ctx.fillText("Get Things Done. Stay Organized.", 50, 100);

    const colW = 330;
    const startY = 140;
    const rowH = 38;
    const rowsPerCol = 22;

    ctx.fillStyle = textColor;
    ctx.font = "bold 15px sans-serif";
    ctx.fillText("Tasks to Complete", 50, startY);
    drawHorizontalLine(ctx, 50, 50 + colW, startY + 8, brandColor, 1.5);

    for (let r = 0; r < rowsPerCol; r++) {
      const y = startY + 40 + r * rowH;
      drawCheckbox(ctx, 50, y, 14);
      drawHorizontalLine(ctx, 75, 50 + colW, y, gridColor, 1);
    }

    ctx.fillText("Personal / Habits", 420, startY);
    drawHorizontalLine(ctx, 420, 420 + colW, startY + 8, brandColor, 1.5);

    for (let r = 0; r < rowsPerCol; r++) {
      const y = startY + 40 + r * rowH;
      drawCheckbox(ctx, 420, y, 14);
      drawHorizontalLine(ctx, 445, 420 + colW, y, gridColor, 1);
    }

  } else if (type === "reading") {
    // HEADER
    ctx.fillStyle = brandColor;
    ctx.font = "bold 26px sans-serif";
    ctx.fillText("READING LOG", 50, 75);

    ctx.fillStyle = lightTextColor;
    ctx.font = "14px sans-serif";
    ctx.fillText("Reader Name: ________________________", w - 340, 70);

    const startX = 50;
    const startY = 120;
    const tableW = 700;
    const rowH = 46;
    const colWidths = [180, 140, 95, 95, 110, 80];
    const headers = ["BOOK TITLE", "AUTHOR", "STARTED", "FINISHED", "RATING", "DONE"];

    ctx.fillStyle = "#f9fafb";
    ctx.fillRect(startX, startY, tableW, 35);
    ctx.strokeStyle = "#d1d5db";
    ctx.strokeRect(startX, startY, tableW, 35);

    ctx.fillStyle = textColor;
    ctx.font = "bold 11px sans-serif";
    let curX = startX;
    headers.forEach((h, idx) => {
      ctx.fillText(h, curX + 10, startY + 22);
      curX += colWidths[idx];
    });

    const numRows = 17;
    for (let r = 0; r < numRows; r++) {
      const y = startY + 35 + r * rowH;
      ctx.fillStyle = r % 2 === 0 ? "#ffffff" : "#fcfcfc";
      ctx.fillRect(startX, y, tableW, rowH);
      ctx.strokeStyle = "#e5e7eb";
      ctx.strokeRect(startX, y, tableW, rowH);

      let cx = startX;
      colWidths.forEach((w, idx) => {
        if (idx > 0) {
          ctx.beginPath();
          ctx.moveTo(cx, y);
          ctx.lineTo(cx, y + rowH);
          ctx.stroke();
        }

        if (idx === 4) {
          for (let s = 0; s < 5; s++) {
            drawStarOutline(ctx, cx + 18 + s * 17, y + rowH / 2);
          }
        } else if (idx === 5) {
          drawCheckbox(ctx, cx + 32, y + rowH / 2 + 3, 14);
        }

        cx += w;
      });
    }

  } else if (type === "assignment") {
    // HEADER
    ctx.fillStyle = brandColor;
    ctx.font = "bold 26px sans-serif";
    ctx.fillText("ASSIGNMENT TRACKER", 50, 75);

    ctx.fillStyle = lightTextColor;
    ctx.font = "14px sans-serif";
    ctx.fillText("Semester / Grade: ________________", w - 290, 70);

    const startX = 50;
    const startY = 120;
    const tableW = 700;
    const rowH = 44;
    const colWidths = [120, 240, 100, 80, 80, 80];
    const headers = ["SUBJECT/CLASS", "ASSIGNMENT DETAILS", "DUE DATE", "PRIORITY", "DONE", "GRADE"];

    ctx.fillStyle = "#f9fafb";
    ctx.fillRect(startX, startY, tableW, 35);
    ctx.strokeStyle = "#d1d5db";
    ctx.strokeRect(startX, startY, tableW, 35);

    ctx.fillStyle = textColor;
    ctx.font = "bold 11px sans-serif";
    let curX = startX;
    headers.forEach((h, idx) => {
      ctx.fillText(h, curX + 10, startY + 22);
      curX += colWidths[idx];
    });

    const numRows = 18;
    for (let r = 0; r < numRows; r++) {
      const y = startY + 35 + r * rowH;
      ctx.fillStyle = r % 2 === 0 ? "#ffffff" : "#fcfcfc";
      ctx.fillRect(startX, y, tableW, rowH);
      ctx.strokeStyle = "#e5e7eb";
      ctx.strokeRect(startX, y, tableW, rowH);

      let cx = startX;
      colWidths.forEach((w, idx) => {
        if (idx > 0) {
          ctx.beginPath();
          ctx.moveTo(cx, y);
          ctx.lineTo(cx, y + rowH);
          ctx.stroke();
        }

        if (idx === 4) {
          drawCheckbox(ctx, cx + 33, y + rowH / 2 + 3, 14);
        }

        cx += w;
      });
    }

  } else if (type === "study") {
    // HEADER
    ctx.fillStyle = brandColor;
    ctx.font = "bold 26px sans-serif";
    ctx.fillText("STUDY PLANNER & TRACKER", 50, 75);

    ctx.fillStyle = lightTextColor;
    ctx.font = "14px sans-serif";
    ctx.fillText("Subject: ________________________", w - 300, 70);

    const colW = 330;

    ctx.fillStyle = textColor;
    ctx.font = "bold 15px sans-serif";
    ctx.fillText("Core Study Topics / Concepts", 50, 150);
    drawHorizontalLine(ctx, 50, 50 + colW, 160, brandColor, 2);

    for (let i = 0; i < 8; i++) {
      const y = 200 + i * 44;
      ctx.fillStyle = "#fafafa";
      ctx.fillRect(50, y - 24, colW, 36);
      ctx.strokeStyle = "#e5e7eb";
      ctx.strokeRect(50, y - 24, colW, 36);

      ctx.fillStyle = lightTextColor;
      ctx.font = "12px sans-serif";
      ctx.fillText(`${i + 1}.`, 62, y - 1);
      drawHorizontalLine(ctx, 80, 50 + colW - 15, y - 1, "#e5e7eb", 0.5);
    }

    ctx.fillStyle = textColor;
    ctx.font = "bold 15px sans-serif";
    ctx.fillText("Pomodoro Focus Tracker", 50, 550);
    drawHorizontalLine(ctx, 50, 50 + colW, 560, brandColor, 2);

    ctx.font = "italic 11px sans-serif";
    ctx.fillStyle = lightTextColor;
    ctx.fillText("Color a circle for each 25-minute focus session:", 50, 582);

    for (let r = 0; r < 2; r++) {
      for (let c = 0; c < 8; c++) {
        const cx = 70 + c * 40;
        const cy = 620 + r * 40;
        ctx.beginPath();
        ctx.arc(cx, cy, 14, 0, Math.PI * 2);
        ctx.strokeStyle = "#818cf8";
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.font = "9px sans-serif";
        ctx.fillStyle = "#a5b4fc";
        ctx.fillText(`25m`, cx - 9, cy + 3);
      }
    }

    ctx.fillStyle = textColor;
    ctx.font = "bold 15px sans-serif";
    ctx.fillText("Notes & Study Summary", 50, 740);
    drawHorizontalLine(ctx, 50, 50 + colW, 750, brandColor, 2);

    for (let i = 0; i < 9; i++) {
      drawHorizontalLine(ctx, 50, 50 + colW, 790 + i * 33, gridColor, 1);
    }

    ctx.fillStyle = textColor;
    ctx.font = "bold 15px sans-serif";
    ctx.fillText("Key Terms / Formulas / Rules", 420, 150);
    drawHorizontalLine(ctx, 420, 420 + colW, 160, brandColor, 2);

    for (let i = 0; i < 10; i++) {
      const y = 205 + i * 40;
      drawHorizontalLine(ctx, 420, 420 + colW, y, gridColor, 1);
    }

    ctx.fillStyle = textColor;
    ctx.font = "bold 15px sans-serif";
    ctx.fillText("Revision Checklist & Tasks", 420, 600);
    drawHorizontalLine(ctx, 420, 420 + colW, 610, brandColor, 2);

    for (let i = 0; i < 10; i++) {
      const y = 650 + i * 40;
      drawCheckbox(ctx, 420, y, 14);
      drawHorizontalLine(ctx, 445, 420 + colW, y, gridColor, 1);
    }

  } else if (type === "habit") {
    // HABIT TRACKER (12 habit rows, 31 checkboxes)
    ctx.fillStyle = brandColor;
    ctx.font = "bold 26px sans-serif";
    ctx.fillText("MONTHLY HABIT TRACKER", 50, 75);

    ctx.fillStyle = lightTextColor;
    ctx.font = "14px sans-serif";
    ctx.fillText("Month: __________________", w - 240, 70);

    const startX = 50;
    const startY = 120;
    const rowH = 46;
    const textColW = 160;
    const checkW = (700 - textColW) / 31; // width of each day box

    // Table Header
    ctx.fillStyle = "#f9fafb";
    ctx.fillRect(startX, startY, 700, 30);
    ctx.strokeStyle = "#cbd5e1";
    ctx.strokeRect(startX, startY, 700, 30);

    ctx.fillStyle = textColor;
    ctx.font = "bold 10px sans-serif";
    ctx.fillText("HABIT / ROUTINE", startX + 10, startY + 18);

    for (let d = 1; d <= 31; d++) {
      const cx = startX + textColW + (d - 1) * checkW;
      ctx.textAlign = "center";
      ctx.fillText(String(d), cx + checkW / 2, startY + 18);
    }
    ctx.textAlign = "left";

    // Habit Rows
    for (let r = 0; r < 15; r++) {
      const y = startY + 30 + r * rowH;
      ctx.fillStyle = r % 2 === 0 ? "#ffffff" : "#fcfcfc";
      ctx.fillRect(startX, y, 700, rowH);
      ctx.strokeStyle = "#e5e7eb";
      ctx.strokeRect(startX, y, 700, rowH);

      // Line inside for habit title
      drawHorizontalLine(ctx, startX + 10, startX + textColW - 10, y + rowH / 2 + 6, "#e5e7eb", 0.5);

      // Day boxes
      for (let d = 1; d <= 31; d++) {
        const cx = startX + textColW + (d - 1) * checkW;
        ctx.beginPath();
        ctx.moveTo(cx, y);
        ctx.lineTo(cx, y + rowH);
        ctx.stroke();

        // Small circle tick bounds
        ctx.strokeStyle = "#cbd5e1";
        ctx.beginPath();
        ctx.arc(cx + checkW / 2, y + rowH / 2, 6, 0, Math.PI * 2);
        ctx.stroke();
      }
    }

  } else if (type === "journal") {
    // Ruled Journal Page
    ctx.fillStyle = brandColor;
    ctx.font = "italic 28px Georgia, serif";
    ctx.fillText("Journal", 60, 75);

    ctx.fillStyle = lightTextColor;
    ctx.font = "12px sans-serif";
    ctx.fillText("Date: ____/____/________", w - 200, 70);

    ctx.strokeStyle = brandColor;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(60, 90);
    ctx.lineTo(w - 60, 90);
    ctx.stroke();

    // 28 Ruled lines
    ctx.strokeStyle = "#bfdbfe";
    ctx.lineWidth = 0.8;
    for (let i = 0; i < 28; i++) {
      const y = 135 + i * 32;
      ctx.beginPath();
      ctx.moveTo(60, y);
      ctx.lineTo(w - 60, y);
      ctx.stroke();
    }
  }
}
