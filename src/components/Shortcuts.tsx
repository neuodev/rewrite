import React from "react";
import { Shortcut } from "../types";
import Button from "./common/Button";
import ShortcutItem from "./ShortcutItem";

const Shortcuts: React.FC<{ shortcuts: Shortcut[] }> = ({ shortcuts }) => {
  return (
    <div className="px-4">
      <div className="flex items-center justify-between py-4">
        <h1 className="text-xl capitalize font-bold text-gray-800">
          Shortcuts
        </h1>
        <Button variant="primary">New</Button>
      </div>

      <ul>
        {shortcuts.map((s) => (
          <ShortcutItem key={s.key + s.prefix} shortcut={s} />
        ))}
      </ul>
    </div>
  );
};

export default Shortcuts;
