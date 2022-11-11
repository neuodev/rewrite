import { Button, TextField, Checkbox, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import uuid from "uuid";
import { ROUTES } from "../constants";
import { useShortcut } from "../state/shortcuts/hooks";
import { Prefix } from "../types";

const NewShortcutForm = () => {
  const navigate = useNavigate();
  const { createShortcut, isExist } = useShortcut();
  const [command, setCommand] = useState<string>("");
  const [text, setText] = useState<string>("");
  const [enabled, setEnabled] = useState<boolean>(true);
  const [prefix, setPrefix] = useState<Prefix>(Prefix.Slash);

  async function newShortcut() {
    if (!command || !text || isShortcutExist) return;
    const id = uuid.v4();
    createShortcut({
      id,
      text,
      command,
      enabled,
      prefix,
    });
    setCommand("");
    setText("");
    setEnabled(true);
    navigate(ROUTES.ROOT);
  }

  const isShortcutExist = isExist(prefix, command);

  return (
    <div className="py-8 px-4">
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="mb-4">
          <TextField
            label="Shortcut"
            placeholder="Type your shortcut eg: email"
            helperText={
              isShortcutExist ? "Shortcut already exist" : "Make it memorable"
            }
            error={isShortcutExist}
            name="command"
            onChange={(e) => {
              setCommand(e.target.value);
            }}
            value={command}
            sx={{ width: "100%" }}
          />
        </div>

        <div>
          <TextField
            label="Text"
            placeholder="What you want to rewrite..."
            name="text"
            onChange={(e) => {
              setText(e.target.value);
            }}
            value={text}
            sx={{ width: "100%" }}
            rows={10}
            multiline
          />
        </div>
        <Stack direction="row" alignItems="center" justifyContent="flex-start">
          <Checkbox
            value={enabled}
            defaultChecked
            onChange={() => setEnabled(!enabled)}
            sx={{ ml: "-8px" }}
          />
          <Typography>Enable</Typography>
        </Stack>
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
            disabled={!command || !text || isShortcutExist}
            size="large"
          >
            Create
          </Button>
        </Stack>
      </form>
    </div>
  );
};

export default NewShortcutForm;
