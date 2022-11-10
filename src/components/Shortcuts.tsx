import React, { useState, useEffect } from "react";
import storage from "../chrome/storage";
import { ROUTES } from "../constants";
import { Shortcut } from "../types";
import { Link } from "react-router-dom";
import ShortcutItem from "./ShortcutItem";

const Shortcuts: React.FC<{}> = () => {
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
    <div className="px-4">
      <div className="flex items-center justify-between py-4">
        <h1 className="text-xl capitalize font-bold text-gray-800">
          Shortcuts
        </h1>
        <Link to={ROUTES.NEW_SHORTCUT} className="btn-primary">
          New
        </Link>
      </div>

      <ul>
        {shortcuts.map((s) => (
          <ShortcutItem key={s.prefix + s.command} shortcut={s} />
        ))}
      </ul>
    </div>
  );
};

export default Shortcuts;
