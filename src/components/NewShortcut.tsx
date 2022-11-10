import React, { useEffect, useState } from "react";
import storage from "../chrome/storage";
import { Prefix, Shortcut } from "../types";
import Button from "./common/Button";
import Input from "./common/Input";

const NewShortcutForm = () => {
  const [state, setState] = useState<{
    key: string;
    value: string;
    prefix: Prefix;
  }>({
    key: "",
    value: "",
    prefix: Prefix.Slash,
  });

  const [key, setKey] = useState("");
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState<boolean>(false);

  async function newShortcut() {
    if (!key || !value) return;
    setLoading(true);
    await storage.newShortcut({
      key,
      value,
      prefix: Prefix.Slash,
    });
    setKey("");
    setValue("");
    setLoading(false);
  }

  return (
    <div className="py-8 px-4">
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="mb-4">
          <Input
            label="Shortcut"
            placeholder="Type your shortcut eg: email"
            helperText="Make it short."
            as="input"
            onChange={setKey}
            value={key}
          />
        </div>

        <Input
          label="Value"
          placeholder="What you want to store..."
          helperText=""
          as="textarea"
          onChange={setValue}
          value={key}
        />
        <div className="mt-4">
          <button className="btn-primary text-sm" onClick={newShortcut}>
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewShortcutForm;
