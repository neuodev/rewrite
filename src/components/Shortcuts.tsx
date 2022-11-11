import React from "react";
import { ROUTES } from "../constants";
import { useNavigate } from "react-router-dom";
import ShortcutItem from "./ShortcutItem";
import { Button, List } from "@mui/material";
import { useAppSelector } from "../store";

const Shortcuts: React.FC<{}> = () => {
  const navigate = useNavigate();
  const { shortcuts } = useAppSelector((state) => state.shortcuts);
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
