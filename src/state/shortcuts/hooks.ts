import { useAppDispatch, useAppSelector } from "../../store";
import { Prefix, Shortcut } from "../../types";
import {
  createShotcut as createShortcutAction,
  updateShortcut as updateShortcutAction,
  deleteShortcut as deleteShortcutAction,
} from "./actions";

export const useShortcut = () => {
  const dispatch = useAppDispatch();
  const { shortcuts } = useAppSelector((state) => state.shortcuts);

  function createShortcut(shortcut: Shortcut) {
    dispatch(createShortcutAction(shortcut));
  }

  function toggleShortcut(prefix: Prefix, command: string, enabled: boolean) {
    dispatch(
      updateShortcutAction({
        query: {
          prefix,
          command,
        },
        update: {
          enabled,
        },
      })
    );
  }

  function updateShortcut(
    prefix: Prefix,
    command: string,
    update: {
      prefix?: Prefix;
      command?: string;
      text?: string;
      enabled?: boolean;
    }
  ) {
    dispatch(
      updateShortcutAction({
        query: {
          prefix,
          command,
        },
        update,
      })
    );
  }

  function deleteShortcut(prefix: Prefix, command: string) {
    dispatch(deleteShortcutAction({ prefix, command }));
  }

  function isExist(prefix: Prefix, command: string): boolean {
    return shortcuts.some((s) => s.prefix === prefix && s.command === command);
  }

  return {
    createShortcut,
    toggleShortcut,
    updateShortcut,
    deleteShortcut,
    isExist,
  };
};
