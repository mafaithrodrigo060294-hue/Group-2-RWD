
/* Lesson setup: starter HTML and CSS are stored in lessons.json. */
const params = new URLSearchParams(location.search);
const lessonKey = params.get("lesson") || "viewport";
let lessons = {};
let currentTab = "html";
let editors = {};
let activeLesson = null;

const title = document.getElementById("lesson-title");
const preview = document.getElementById("preview");
const statusLine = document.getElementById("status");

async function startLab() {
  try {
    const response = await fetch("lessons.json");
    if (!response.ok) throw new Error("Could not load lessons.json");
    lessons = await response.json();
    activeLesson = lessons[lessonKey] || lessons.viewport;
    title.textContent = `RWD CODE LAB // ${activeLesson.title.toUpperCase()}`;

    editors.html = CodeMirror.fromTextArea(document.getElementById("editor"), {
      mode: "htmlmixed",
      theme: "dracula",
      lineNumbers: true,
      lineWrapping: true,
      tabSize: 2,
      indentUnit: 2,
      autoCloseTags: true,
      autoCloseBrackets: true,
    });

    editors.html.setValue(activeLesson.html);

    editors.css = CodeMirror(document.createElement("div"), {
      mode: "css",
      theme: "dracula",
      lineNumbers: true,
      lineWrapping: true,
      tabSize: 2,
      indentUnit: 2,
      autoCloseBrackets: true,
    });

    editors.css.setValue(activeLesson.css);

    document
      .querySelector(".editor-wrap")
      .appendChild(editors.css.getWrapperElement());

    editors.css.getWrapperElement().style.display = "none";

    runCode();

  } catch (error) {
    statusLine.textContent =
      "Playground could not start. Check your internet connection and make sure lessons.json is beside playground.html.";
    console.error(error);
  }
}

function showTab(tab) {
  currentTab = tab;

  editors.html.getWrapperElement().style.display =
    tab === "html" ? "block" : "none";

  editors.css.getWrapperElement().style.display =
    tab === "css" ? "block" : "none";

  document
    .querySelectorAll("[data-tab]")
    .forEach((button) =>
      button.classList.toggle("active", button.dataset.tab === tab),
    );

  editors[tab].refresh();
}

function runCode() {
  if (!activeLesson) return;

  const html = editors.html.getValue();
  const css = editors.css.getValue();

  const documentText = `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>${css.replace(/<\/style/gi, "<\\/style")}</style></head><body>${html.replace(/<\/body/gi, "<\\/body")}</body></html>`;

  preview.srcdoc = documentText;

  statusLine.textContent =
    "Preview updated. Try resizing the preview panel or editing the code again.";
}

function resetCode() {
  if (!activeLesson) return;

  editors.html.setValue(activeLesson.html);
  editors.css.setValue(activeLesson.css);

  showTab("html");
  runCode();

  statusLine.textContent = "Starter code restored.";
}

document
  .querySelectorAll("[data-tab]")
  .forEach((button) =>
    button.addEventListener("click", () => showTab(button.dataset.tab)),
  );

document.getElementById("run").addEventListener("click", runCode);
document.getElementById("reset").addEventListener("click", resetCode);

startLab();
