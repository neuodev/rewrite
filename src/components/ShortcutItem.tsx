import React from "react";
import { Shortcut } from "../types";

const ShortcutItem: React.FC<{ shortcut: Shortcut }> = ({ shortcut }) => {
  const { prefix, key, value } = shortcut;
  return (
    <div className="flex items-center justify-between mb-4">
      <p>
        {prefix}
        {key}
      </p>
      <p>{value}</p>
    </div>
  );
};

export default ShortcutItem;
