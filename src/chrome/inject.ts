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
function inputEventHandler(el: TextField) {
  return (e: Event) => {
    let value = (e.target as TextField).value;
    shortcuts
      // todo: Should be filtered on the server worker side
      .filter(({ enabled }) => enabled === true)
      .forEach(({ prefix, command, text }) => {
        const keyword = `${prefix}${command} `;
        let regexp = new RegExp(keyword, "g");
        if (regexp.test(value)) {
          const newText = value.replace(keyword, text + " ");
          el.value = newText;
        }
      });
  };
}

function toggleEvent(el: TextField) {
  const handler = inputEventHandler(el);
  el.removeEventListener("input", handler);
  el.addEventListener("input", handler);
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
