import { MessageType, Shortcut } from "../types";

let shortcuts: Array<Shortcut> = [];

chrome.runtime.sendMessage(
  { type: MessageType.GetShortcuts },
  function (res: Shortcut[]) {
    shortcuts = res;
  }
);

const textareas = document.querySelectorAll("textarea");
textareas.forEach((textarea) => {
  textarea.addEventListener("input", (e) => {
    let text = (e.target as HTMLTextAreaElement).value;

    shortcuts.forEach(({ prefix, key, value }) => {
      const keyword = `${prefix}${key} `;
      let regexp = new RegExp(keyword, "g");
      if (regexp.test(text)) {
        textarea.value = text.replace(keyword, value);
      }
    });
  });
});
