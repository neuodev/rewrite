import { createAction } from "@reduxjs/toolkit";

export const getShortcutsReq = createAction("get-shortcuts/req");
export const getShortcutsErr = createAction("get-shortcuts/err");
export const getShortcutsRes = createAction("get-shortcuts/res");

export const newShortcutReq = createAction("new-shortcuts/req");
export const newShortcutErr = createAction("new-shortcuts/err");
export const newShortcutRes = createAction("new-shortcuts/res");

export const delShortcutReq = createAction("delete-shortcuts/req");
export const delShortcutErr = createAction("delete-shortcuts/req");
export const delShortcutRes = createAction("delete-shortcuts/res");

export const updateShortcutReq = createAction("update-shortcuts/req");
export const updateShortcutErr = createAction("update-shortcuts/req");
export const updateShortcutRes = createAction("update-shortcuts/res");
