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

  function toggleShortcut(id: string, enabled: boolean) {
    dispatch(
      updateShortcutAction({
        id,
        update: {
          enabled,
        },
      })
    );
  }

  function updateShortcut(
    id: string,
    update: {
      prefix?: Prefix;
      command?: string;
      text?: string;
      enabled?: boolean;
    }
  ) {
    dispatch(
      updateShortcutAction({
        id,
        update,
      })
    );
  }

  function deleteShortcut(id: string) {
    dispatch(deleteShortcutAction({ id }));
  }

  function isExist(prefix: Prefix, command: string): boolean {
    return shortcuts.some((s) => s.prefix === prefix && s.command === command);
  }

  function getShortcut(id: string | null): Shortcut | null {
    return shortcuts.find((s) => s.id === id) ?? null;
  }

  return {
    createShortcut,
    toggleShortcut,
    updateShortcut,
    deleteShortcut,
    isExist,
    getShortcut,
  };
};
