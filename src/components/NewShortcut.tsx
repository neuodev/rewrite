import { Button, TextField, CircularProgress } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import storage from "../chrome/storage";
import { ROUTES } from "../constants";
import { Prefix, Shortcut } from "../types";

type State = Shortcut & {
  enabled: boolean;
  isDuplicated: boolean;
  unableToCreate: boolean;
  loading: boolean;
};

const defaultState: State = {
  command: "",
  text: "",
  prefix: Prefix.Slash,
  enabled: true,
  isDuplicated: false,
  unableToCreate: false,
  loading: false,
};

const NewShortcutForm = () => {
  const navigate = useNavigate();
  const [state, setState] = useState<State>({
    ...defaultState,
  });

  function updateFormFields(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    let name = e.target.name;
    let value = e.target.value;
    setState({ ...state, [name]: value });
  }

  async function newShortcut() {
    if (!state.command || !state.text) return;

    setState({ ...state, loading: true });
    try {
      const isExist = await storage.isExist(state.prefix, state.command);
      console.log({ isExist });
      if (isExist) {
        setState({ ...state, isDuplicated: true });
      } else {
        await storage.newShortcut(state);
        setState({ ...defaultState });
      }
    } catch (error) {
      alert("error!");
    }
    setState({ ...state, loading: false });
  }

  return (
    <div className="py-8 px-4">
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="mb-4">
          <TextField
            label="Shortcut"
            placeholder="Type your shortcut eg: email"
            helperText={
              state.isDuplicated
                ? "Shortcut already exist"
                : "Make it memorable"
            }
            error={state.isDuplicated}
            name="command"
            onChange={updateFormFields}
            value={state.command}
            sx={{ width: "100%" }}
          />
        </div>

        <div>
          <TextField
            label="Text"
            placeholder="What you want to rewrite..."
            name="text"
            onChange={updateFormFields}
            value={state.text}
            sx={{ width: "100%" }}
            rows={10}
            multiline
          />
        </div>
        <Stack direction="row" spacing={2} sx={{ mt: "16px" }}>
          <Button
            onClick={() => navigate(ROUTES.ROOT)}
            variant="outlined"
            color="primary"
            fullWidth
            size="large"
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
            onClick={newShortcut}
            disabled={!state.command || !state.text || state.loading}
            size="large"
          >
            {state.loading ? <CircularProgress size={20} /> : "Create"}
          </Button>
        </Stack>
      </form>
    </div>
  );
};

export default NewShortcutForm;
