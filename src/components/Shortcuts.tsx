import React from "react";
import { ROUTES } from "../constants";
import { useNavigate } from "react-router-dom";
import ShortcutItem from "./ShortcutItem";
import { Button, List } from "@mui/material";
import { useAppSelector } from "../store";
import AddIcon from "@mui/icons-material/Add";

const Shortcuts: React.FC<{}> = () => {
  const navigate = useNavigate();
  const { shortcuts } = useAppSelector((state) => state.shortcuts);
  return (
    <div className="pr-4 overflow-auto">
      <div className="flex items-center justify-between pr-1 pl-4 pt-4">
        <h1 className="text-xl capitalize font-bold text-gray-800">
          Shortcuts
        </h1>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
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
