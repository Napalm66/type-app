const SPECIMEN_TEXT = "Aa Gg Qy";

function renderSpecimenHTML(item, sizeOverride) {
  const size = sizeOverride || item.specimenSize || "2.5rem";
  return `<span style="font-family:${item.fontStack}; font-size:${size};">${SPECIMEN_TEXT}</span>`;
}
