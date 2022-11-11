import { createAction } from "@reduxjs/toolkit";
import { Prefix, Shortcut } from "../../types";

export const getShortcuts = createAction<Shortcut[]>("shortcut/get");
export const createShotcut = createAction<Shortcut>("shortcuts/create");
export const deleteShortcut = createAction<{ prefix: Prefix; command: string }>(
  "shortcuts/delete"
);
export const updateShortcut = createAction<{
  query: {
    prefix: Prefix;
    command: string;
  };
  update: {
    prefix?: Prefix;
    command?: string;
    text?: string;
    enabled?: boolean;
  };
}>("shortucts/update");
