import React, { useEffect, useState } from "react";
import storage from "../chrome/storage";
import { StorageKeys } from "../constants";
import { Prefix, Shortcut } from "../types";

const NewShortcutForm = () => {
  const [key, setKey] = useState("");
  const [value, setValue] = useState("");
  const [shortcuts, setShortcuts] = useState<Array<Shortcut>>([]);
  const [loading, setLoading] = useState<boolean>(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!key || !value) return;
    setLoading(true);
    storage.newShortcut({
      key,
      value,
      prefix: Prefix.Slash,
    });
    setKey("");
    setValue("");
    setLoading(false);
  }

  useEffect(() => {
    storage.getShortcuts().then((shortcuts) => {
      setShortcuts(shortcuts);
    });
  }, [loading]);

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div style={{ padding: "4px" }}>
          <strong> {Prefix.Slash} </strong>
          <input
            type="text"
            placeholder="Key"
            value={key}
            onChange={(e) => setKey(e.target.value)}
          />
        </div>
        <input
          type="text"
          placeholder="Value"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button type="submit">Add</button>
        <span>{loading ? "loading" : ""}</span>
      </form>
      <ul>
        {shortcuts.map(({ key, value, prefix }) => (
          <li key={prefix + key}>
            <span>{prefix}</span>
            <span>{key}</span> -- <span>{value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NewShortcutForm;
