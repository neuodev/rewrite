import { MessageType, Shortcut } from "../types";

let shortcuts: Array<Shortcut> = [];

chrome.runtime.sendMessage(
  { type: MessageType.GetShortcuts },
  function (res: Shortcut[] | undefined) {
    shortcuts = res || [];
  }
);

const textareas = document.querySelectorAll("textarea");
const inputs = document.querySelectorAll("input");

textareas.forEach(onChange);
inputs.forEach(onChange);

type TextField = HTMLInputElement | HTMLTextAreaElement;
function onChange(el: TextField) {
  el.addEventListener("input", (e) => {
    let value = (e.target as TextField).value;
    shortcuts
      .filter(({ enabled }) => enabled === true)
      .forEach(({ prefix, command, text }) => {
        const keyword = `${prefix}${command} `;
        let regexp = new RegExp(keyword, "g");
        if (regexp.test(value)) {
          el.value = value.replace(keyword, text + " ");
        }
      });
  });
}
