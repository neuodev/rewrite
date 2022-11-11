import { Message, MessageType, Shortcut } from "../types";

let shortcuts: Array<Shortcut> = [];
chrome.runtime.sendMessage(
  { type: MessageType.GetShortcuts },
  function (res: Shortcut[] | undefined) {
    shortcuts = res || [];
  }
);
chrome.runtime.onMessage.addListener((msg: Message) => {
  if (msg.type === MessageType.ShortcutsRes) {
    shortcuts = msg.shortcuts;
  }
});

type TextField = HTMLInputElement | HTMLTextAreaElement;
function inputEventHandler(e: Event, el: TextField) {
  let value = (e.target as TextField).value;

  shortcuts
    .filter(({ enabled }) => enabled === true)
    .forEach(({ prefix, command, text }) => {
      const keyword = `${prefix}${command} `;
      let regexp = new RegExp(keyword, "g");
      if (regexp.test(value)) {
        const newText = value.replace(keyword, text + " ");
        el.value = newText;
      }
    });
}

function toggleEvent(el: TextField) {
  el.removeEventListener("input", (e) => {
    inputEventHandler(e, el);
  });

  el.addEventListener("input", (e) => {
    inputEventHandler(e, el);
  });
}

const body = document.querySelector("body")!;
const config = { attributes: true, childList: true, subtree: true };
const callback = () => {
  const textareas = document.querySelectorAll("textarea");
  const inputs = document.querySelectorAll("input");
  textareas.forEach(toggleEvent);
  inputs.forEach(toggleEvent);
};
const observer = new MutationObserver(callback);
observer.observe(body, config);
