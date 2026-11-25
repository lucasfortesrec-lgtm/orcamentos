const BG = "#121110";
const A4_W = 210;
const A4_H = 297;
const WIDTH = 1200;

/** Gera um PDF A4 escuro igual à página, sem cortar blocos [data-pdf-block]. */
export async function downloadProposalPdf(root: HTMLElement, filename: string) {
  const [{ default: html2canvas }, { jsPDF }] = await Promise.all([import("html2canvas-pro"), import("jspdf")]);

  await document.fonts.ready;
  await Promise.all(
    Array.from(root.querySelectorAll("img")).map((img) =>
      img.complete
        ? Promise.resolve()
        : new Promise((r) => {
            img.onload = img.onerror = () => r(null);
          }),
    ),
  );

  let blocks: { top: number; bottom: number }[] = [];
  let totalH = 0;
  const scale = 2;

  const canvas = await html2canvas(root, {
    scale,
    backgroundColor: BG,
    useCORS: true,
    windowWidth: WIDTH,
    width: WIDTH,
    onclone: (doc, el) => {
      doc.documentElement.classList.add("pdf-capture");
      el.style.width = `${WIDTH}px`;
      el.style.maxWidth = `${WIDTH}px`;
      const base = el.getBoundingClientRect().top;
      blocks = Array.from(el.querySelectorAll<HTMLElement>("[data-pdf-block]"))
        .filter((b) => b.offsetParent !== null)
        .map((b) => {
          const r = b.getBoundingClientRect();
          return { top: r.top - base, bottom: r.bottom - base };
        });
      totalH = el.getBoundingClientRect().height;
    },
  });

  // Página em px CSS (largura do conteúdo + margens)
  const marginX = 48;
  const marginTop = 56;
  const marginBottom = 72;
  const pageWpx = WIDTH + marginX * 2;
  const pageHpx = (pageWpx * A4_H) / A4_W;
  const usable = pageHpx - marginTop - marginBottom;

  // Agrupa blocos em páginas
  const pages: { start: number; end: number }[] = [];
  let start = 0;
  let end = 0;
  const sorted = blocks.length ? blocks : [{ top: 0, bottom: totalH }];
  for (const b of sorted) {
    if (b.bottom - start <= usable) {
      end = b.bottom;
      continue;
    }
    if (end > start) pages.push({ start, end });
    start = b.top;
    // Bloco maior que a página: fatia em pedaços
    while (b.bottom - start > usable) {
      pages.push({ start, end: start + usable });
      start += usable;
    }
    end = b.bottom;
  }
  if (end > start) pages.push({ start, end });

  const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4", compress: true });
  const mmPerPx = A4_W / pageWpx;

  pages.forEach((pg, i) => {
    if (i > 0) pdf.addPage();
    pdf.setFillColor(BG);
    pdf.rect(0, 0, A4_W, A4_H, "F");

    const h = Math.ceil(pg.end - pg.start);
    const slice = document.createElement("canvas");
    slice.width = WIDTH * scale;
    slice.height = h * scale;
    const ctx = slice.getContext("2d")!;
    ctx.fillStyle = BG;
    ctx.fillRect(0, 0, slice.width, slice.height);
    ctx.drawImage(canvas, 0, pg.start * scale, WIDTH * scale, h * scale, 0, 0, WIDTH * scale, h * scale);
    pdf.addImage(
      slice.toDataURL("image/jpeg", 0.92),
      "JPEG",
      marginX * mmPerPx,
      marginTop * mmPerPx,
      WIDTH * mmPerPx,
      h * mmPerPx,
    );

    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(7);
    pdf.setTextColor("#B5A693");
    pdf.setCharSpace(1.2);
    pdf.text("LUCAS FORTES · FILMMAKER", marginX * mmPerPx, A4_H - 10);
    pdf.text(
      `${String(i + 1).padStart(2, "0")} / ${String(pages.length).padStart(2, "0")}`,
      A4_W - marginX * mmPerPx,
      A4_H - 10,
      { align: "right" },
    );
    pdf.setCharSpace(0);
  });

  pdf.setProperties({ title: filename.replace(/\.pdf$/, ""), author: "Lucas Fortes · Filmmaker" });
  pdf.save(filename);
}
