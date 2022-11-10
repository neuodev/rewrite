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
    let value = (e.target as InputElement).value;
    shortcuts.forEach(({ prefix, command, text }) => {
      const keyword = `${prefix}${command} `;
      let regexp = new RegExp(keyword, "g");
      if (regexp.test(value)) {
        el.value = value.replace(keyword, text + " ");
      }
    });
  });
}
