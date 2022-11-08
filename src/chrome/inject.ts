import { MessageType, Shortcut } from "../types";

let shortcuts: Array<Shortcut> = [];

chrome.runtime.sendMessage(
  { type: MessageType.GetShortcuts },
  function (res: Shortcut[]) {
    shortcuts = res;
  }
);

const textareas = document.querySelectorAll("textarea");
const inputs = document.querySelectorAll("input");

textareas.forEach(onChange);
inputs.forEach(onChange);

type InputElement = HTMLInputElement | HTMLTextAreaElement;
function onChange(el: InputElement) {
  el.addEventListener("input", (e) => {
    let text = (e.target as InputElement).value;
    shortcuts.forEach(({ prefix, key, value }) => {
      const keyword = `${prefix}${key} `;
      let regexp = new RegExp(keyword, "g");
      if (regexp.test(text)) {
        el.value = text.replace(keyword, value + " ");
      }
    });
  });
}
