import React, { useEffect, useState } from "react";
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
    const res = (await chrome.storage.sync.get(StorageKeys.shortcuts)) as {
      [StorageKeys.shortcuts]: Array<Shortcut>;
    };
    const allShortcuts = res[StorageKeys.shortcuts] || [];
    allShortcuts.push({ value, key, prefix: Prefix.Slash });
    // todo: Read/write should be move to its own utils
    await chrome.storage.sync.set({
      [StorageKeys.shortcuts]: allShortcuts,
    });

    setKey("");
    setValue("");
    setLoading(false);
  }

  useEffect(() => {
    chrome.storage.sync.get(StorageKeys.shortcuts, (result) => {
      const shortcuts = result[StorageKeys.shortcuts] || [];
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
