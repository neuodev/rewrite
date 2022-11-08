import { MessageType, Shortcut } from "../types";

let shortcuts = [];

chrome.runtime.sendMessage(
  { type: MessageType.GetShortcuts },
  function (res: Shortcut[]) {
    shortcuts = res;
  }
);
