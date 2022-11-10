import React, { useState } from "react";
import storage from "../chrome/storage";
import { Prefix, Shortcut } from "../types";
import TextField from "./common/TextField";

const defaultState = {
  command: "",
  text: "",
  prefix: Prefix.Slash,
};
const NewShortcutForm = () => {
  const [state, setState] = useState<Shortcut>({
    ...defaultState,
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [duplicatedKeyErr, setDuplicatedKeyErr] = useState<boolean>(false);

  function updateState(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    let name = e.target.name;
    let value = e.target.value;
    setState({ ...state, [name]: value });
  }

  async function newShortcut() {
    if (!state.command || !state.text) return;

    try {
      setLoading(true);
      await storage.newShortcut(state);
      setState({ ...defaultState });
      setLoading(false);
    } catch (error) {
      alert("error!");
    }
  }

  return (
    <div className="py-8 px-4">
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="mb-4">
          <TextField
            label="Shortcut"
            placeholder="Type your shortcut eg: email"
            helperText="Make it short."
            as="input"
            name="command"
            onChange={updateState}
            value={state.command}
          />
        </div>

        <TextField
          label="Text"
          placeholder="What you want to store..."
          helperText=""
          name="text"
          as="textarea"
          onChange={updateState}
          value={state.text}
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
