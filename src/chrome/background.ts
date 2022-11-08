import { ExtensionRes, Message, MessageType } from "../types";
import storage from "./storage";

chrome.runtime.onMessage.addListener(function (
  msg: Message,
  _sender: chrome.runtime.MessageSender,
  sendResponse: (res: ExtensionRes) => void
) {
  if (msg.type === MessageType.GetShortcuts) {
    // Todo: handler error case
    storage.getShortcuts().then((shortcuts) => {
      sendResponse(shortcuts);
    });
  }

  return true;
});
