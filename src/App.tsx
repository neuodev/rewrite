import { useEffect, useState } from "react";
import storage from "./chrome/storage";
import Navbar from "./components/Navbar";
import Shortcuts from "./components/Shortcuts";
import "./index.css";
import { Shortcut } from "./types";

function App() {
  const [shortcuts, setShortcuts] = useState<Shortcut[]>([]);
  useEffect(() => {
    storage
      .getShortcuts()
      .then(setShortcuts)
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <Navbar />
      <Shortcuts shortcuts={shortcuts} />
    </div>
  );
}

export default App;
