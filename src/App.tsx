import React, { useEffect } from "react";
import Navbar from "./components/Navbar";
import { DOMMessage, GetDOMResponse } from "./types";
import "./index.css";
import NewShortcutForm from "./components/NewShortcutForm";

function App() {
  useEffect(() => {
    chrome.tabs &&
      chrome.tabs.query(
        {
          active: true,
          currentWindow: true,
        },
        (tabs) => {
          chrome.tabs.sendMessage(
            tabs[0].id || 0,
            { type: "GET_DOM" } as DOMMessage,
            (res: GetDOMResponse) => {
              console.log(res);
            }
          );
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
