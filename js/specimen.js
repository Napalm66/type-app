const SPECIMEN_TEXT = "Aa Gg Qy";
const SPECIMEN_STORAGE_KEY = "type-classified:custom-specimen";

const SPECIMEN_SIZES = {
  row: { default: "1.5rem", custom: "1.15rem" },
  detail: { default: null, custom: "1.6rem" },
  compare: { default: "2rem", custom: "1.25rem" },
  quizResult: { default: "2.6rem", custom: "1.5rem" },
};

let customSpecimenText = "";
try {
  customSpecimenText = localStorage.getItem(SPECIMEN_STORAGE_KEY) || "";
} catch (e) {
  customSpecimenText = "";
}

function getCustomSpecimenText() {
  return customSpecimenText;
}

function setCustomSpecimenText(text) {
  customSpecimenText = (text || "").trim();
  try {
    if (customSpecimenText) {
      localStorage.setItem(SPECIMEN_STORAGE_KEY, customSpecimenText);
    } else {
      localStorage.removeItem(SPECIMEN_STORAGE_KEY);
    }
  } catch (e) {
    // storage unavailable — custom text still works for this session
  }
}

function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function renderSpecimenHTML(item, context) {
  const isCustom = customSpecimenText.length > 0;
  const text = isCustom ? customSpecimenText : SPECIMEN_TEXT;
  const sizes = SPECIMEN_SIZES[context] || SPECIMEN_SIZES.detail;
  const size = isCustom ? sizes.custom : sizes.default || item.specimenSize || "2.5rem";
  const style = isCustom
    ? `font-family:${item.fontStack}; font-size:${size}; line-height:1.4; white-space:normal; word-break:break-word;`
    : `font-family:${item.fontStack}; font-size:${size};`;
  return `<span style="${style}">${escapeHtml(text)}</span>`;
}
