import { ExtensionRes, Message, MessageType } from "../types";
import storage from "./storage";

chrome.runtime.onMessage.addListener(function (
  msg: Message,
  _sender: chrome.runtime.MessageSender,
  sendResponse: (res: ExtensionRes) => void
) {
  if (msg.type === MessageType.GetShortcuts) {
    storage
      .getShortcuts()
      .then((shortcuts) => {
        sendResponse(shortcuts);
      })
      .catch((err) => {
        console.log(err);
        sendResponse([]);
      });
  }

  return true;
});
