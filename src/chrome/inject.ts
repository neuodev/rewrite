import { DOMMessage, GetDOMResponse } from "../types";

const messagesFromReactAppListener = (
  msg: DOMMessage,
  sender: chrome.runtime.MessageSender,
  sendResponse: (response: GetDOMResponse) => void
) => {
  console.log("[content.js]. Message received", msg);

  const headlines = Array.from(document.getElementsByTagName<"h1">("h1")).map(
    (h1) => h1.innerText
  );

  // Prepare the response object with information about the site
  const response: any = {
    title: document.title,
    headlines,
  };

  sendResponse(response);
};

chrome.runtime.onMessage.addListener(messagesFromReactAppListener);
