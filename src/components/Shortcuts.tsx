import React from "react";
import { Shortcut } from "../types";

const Shortcuts: React.FC<{ shortcuts: Shortcut[] }> = ({ shortcuts }) => {
  return (
    <div>
      <div>
        <h1>Shortcuts</h1>
        <button>New</button>
      </div>

      <ul>
        {shortcuts.map(({ prefix, key, value }) => (
          <li
            className="flex items-center justify-between mb-4"
            key={prefix + key}
          >
            <p>
              {prefix}
              {key}
            </p>
            <p>{value}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Shortcuts;
