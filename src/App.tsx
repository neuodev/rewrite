import React, { useEffect } from "react";
import Navbar from "./components/Navbar";
import { Message, MessageType } from "./types";
import NewShortcutForm from "./components/NewShortcutForm";
import "./index.css";
import storage from "./chrome/storage";

function App() {
  useEffect(() => {
    chrome.tabs &&
      chrome.tabs.query(
        {
          active: true,
          currentWindow: true,
        },
        async (tabs) => {
          // console.log({ tabs });
          // chrome.tabs.sendMessage(tabs[0].id || 0, {
          //   type: MessageType.ShortcutsList,
          //   shortcuts: await storage.getShortcuts(),
          // } as Message);
        }
      );
  }, []);

  return (
    <div>
      <Navbar />
      <NewShortcutForm />
    </div>
  );
}

export default App;
