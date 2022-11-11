import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { save, load } from "redux-localstorage-simple";
import { shortcutsReducer } from "./state/shortcuts/reducer";

const savedStates = ["shortcuts"];
const namespace = "app_state";

export const store = configureStore({
  reducer: {
    shortcuts: shortcutsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      thunk,
      save({ states: savedStates, namespace }),
    ]),
  preloadedState: load({ states: savedStates, namespace }),
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
