import React, { useState, useEffect } from "react";
import storage from "../chrome/storage";
import { ROUTES } from "../constants";
import { Shortcut } from "../types";
import { Link, useNavigate } from "react-router-dom";
import ShortcutItem from "./ShortcutItem";
import { Button, List } from "@mui/material";

const Shortcuts: React.FC<{}> = () => {
  const navigate = useNavigate();
  const [shortcuts, setShortcuts] = useState<Shortcut[]>([]);
  useEffect(() => {
    storage
      .getShortcuts()
      .then(setShortcuts)
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="px-4 overflow-auto">
      <div className="flex items-center justify-between py-4 px-1">
        <h1 className="text-xl pl-2 capitalize font-bold text-gray-800">
          Shortcuts
        </h1>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate(ROUTES.NEW_SHORTCUT)}
        >
          New
        </Button>
      </div>

      <List>
        {shortcuts.map((s) => (
          <ShortcutItem key={s.prefix + s.command} shortcut={s} />
        ))}
      </List>
    </div>
  );
};

export default Shortcuts;
