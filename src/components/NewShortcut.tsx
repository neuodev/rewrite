import { Button, TextField, Checkbox, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { v4 as uuid } from "uuid";
import { ROUTES } from "../constants";
import { useShortcut } from "../state/shortcuts/hooks";
import { Prefix } from "../types";

const ShortcutForm = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const shortcutId = params.get("id");

  const { createShortcut, isExist, getShortcut, updateShortcut } =
    useShortcut();
  const shortcut = getShortcut(shortcutId);
  const [command, setCommand] = useState<string>(
    shortcut ? shortcut.command : ""
  );
  const [text, setText] = useState<string>(shortcut ? shortcut.text : "");
  const [enabled, setEnabled] = useState<boolean>(
    shortcut ? shortcut.enabled : true
  );
  const [prefix, _setPrefix] = useState<Prefix>(
    shortcut ? shortcut.prefix : Prefix.Slash
  );

  const isShortcutExist = isExist(prefix, command);
  const isInvalid = shortcut
    ? isShortcutExist && shortcut.command !== command
    : isShortcutExist;

  function shortcutHandler() {
    if (!command || !text || isInvalid) return;
    if (shortcut) {
      updateShortcut(shortcut.id, {
        prefix,
        text,
        enabled,
        command,
      });
    } else {
      const id = uuid();
      createShortcut({
        id,
        text,
        command,
        enabled,
        prefix,
      });
    }
    setCommand("");
    setText("");
    setEnabled(true);
    navigate(ROUTES.ROOT);
  }

  return (
    <div className="py-8 px-4">
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="mb-4">
          <TextField
            label="Shortcut"
            placeholder="Type your shortcut eg: email"
            helperText={
              isInvalid ? "Shortcut already exist" : "Make it memorable"
            }
            error={isInvalid}
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
            checked={enabled}
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
            onClick={shortcutHandler}
            disabled={!command || !text || isInvalid}
            size="large"
          >
            {shortcutId ? "Update" : "Create"}
          </Button>
        </Stack>
      </form>
    </div>
  );
};

export default ShortcutForm;
