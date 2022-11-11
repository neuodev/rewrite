import { createReducer } from "@reduxjs/toolkit";
import { Shortcut } from "../../types";
import {
  createShotcut,
  deleteShortcut,
  getShortcuts,
  updateShortcut,
} from "./actions";
import produce from "immer";

export const shortcutsReducer = createReducer<{ shortcuts: Shortcut[] }>(
  { shortcuts: [] },
  (builder) => {
    builder
      .addCase(createShotcut, (state, { payload }) =>
        produce(state, (draftState) => {
          draftState.shortcuts.unshift(payload);
        })
      )
      .addCase(deleteShortcut, (state, { payload }) =>
        produce(state, (draftState) => {
          draftState.shortcuts = draftState.shortcuts.filter(
            (s) => s.id !== payload.id
          );
        })
      )
      .addCase(updateShortcut, (state, { payload: { id, update } }) =>
        produce(state, (draftState) => {
          const shortcut = draftState.shortcuts.find((s) => s.id === id);
          if (!shortcut) return;
          console.log({ update });
          shortcut.command = update.command || shortcut.command;
          shortcut.prefix = update.prefix || shortcut.prefix;
          shortcut.text = update.text || shortcut.text;
          shortcut.enabled =
            typeof update.enabled === "undefined"
              ? shortcut.enabled
              : update.enabled;
        })
      );
  }
);
