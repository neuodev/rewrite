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

function textboxHandler(textbox: HTMLElement) {
  const value = textbox.innerHTML;
  shortcuts
    .filter(({ enabled }) => enabled === true)
    .forEach(({ prefix, command, text }) => {
      const keyword = `${prefix}${command}`;
      let regexp = new RegExp(`${keyword}( |&nbsp;)`, "g");
      if (regexp.test(value)) {
        textbox.innerHTML = value.replace(keyword, text);
      }
    });
}
function toggleEvent(el: TextField) {
  const handler = inputEventHandler(el);
  el.removeEventListener("input", handler);
  el.addEventListener("input", handler);
}

const body = document.querySelector("body")!;
const config = {
  childList: true,
  subtree: true,
  attributeFilter: ["type", "role", "placeholder", "aria-multiline"],
};
const callback = () => {
  console.count("Callback");
  const textareas = document.querySelectorAll("textarea");
  const inputs = document.querySelectorAll("input");
  const textboxes = document.querySelectorAll(
    "[role='textbox']"
  ) as NodeListOf<HTMLElement>;
  textareas.forEach(toggleEvent);
  inputs.forEach(toggleEvent);
  textboxes.forEach(textboxHandler);
};
const observer = new MutationObserver(callback);
observer.observe(body, config);
