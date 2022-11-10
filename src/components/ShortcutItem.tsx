import React from "react";
import { Shortcut } from "../types";

const ShortcutItem: React.FC<{ shortcut: Shortcut }> = ({ shortcut }) => {
  const { prefix, command, text } = shortcut;
  return (
    <div className="flex items-center justify-between mb-4">
      <p>
        {prefix}
        {command}
      </p>
      <p>{text}</p>
    </div>
  );
};

export default ShortcutItem;
