import { Button, TextField, CircularProgress } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import storage from "../chrome/storage";
import { ROUTES } from "../constants";
import { Prefix, Shortcut } from "../types";

const initalErrState = {
  commandErr: null,
  generalErr: null,
};

const NewShortcutForm = () => {
  const navigate = useNavigate();
  const [command, setCommand] = useState<string>("");
  const [text, setText] = useState<string>("");
  const [enabled, setEnabled] = useState<boolean>(true);
  const [prefix, setPrefix] = useState<Prefix>(Prefix.Slash);
  const [errors, setErrors] = useState<{
    commandErr: string | null;
    generalErr: string | null;
  }>({
    ...initalErrState,
  });
  const [loading, setLoading] = useState<boolean>(false);

  const resetErrors = () => setErrors({ ...initalErrState });

  async function newShortcut() {
    if (!command || !text) return;

    setLoading(true);
    try {
      const isExist = await storage.isExist(prefix, command);
      setErrors({
        ...errors,
        commandErr: isExist ? "Shortcut already exist" : null,
      });
      if (!isExist) {
        await storage.newShortcut({
          command,
          text,
          prefix,
        });

        setErrors({ ...initalErrState });
        navigate(ROUTES.ROOT);
      }
    } catch (error) {
      let err = "Unexpected error happend, please retry";
      if (typeof error === "string") err = error;
      else if (error instanceof Error) err = error.message;
      setErrors({ ...errors, generalErr: err });
    }
    setLoading(false);
  }

  return (
    <div className="py-8 px-4">
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="mb-4">
          <TextField
            label="Shortcut"
            placeholder="Type your shortcut eg: email"
            helperText={errors.commandErr || "Make it memorable"}
            error={errors.commandErr !== null}
            name="command"
            onChange={(e) => {
              setCommand(e.target.value);
              resetErrors();
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
              resetErrors();
            }}
            value={text}
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
            disabled={
              !command ||
              !text ||
              loading ||
              errors.commandErr !== null ||
              errors.generalErr !== null
            }
            size="large"
          >
            {loading ? <CircularProgress size={20} /> : "Create"}
          </Button>
        </Stack>
      </form>
    </div>
  );
};

export default NewShortcutForm;
