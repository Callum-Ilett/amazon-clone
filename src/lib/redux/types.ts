import { store } from "./store";
import { ThunkAction, Action } from "@reduxjs/toolkit";

type AppDispatch = typeof store.dispatch;
type RootState = ReturnType<typeof store.getState>;
type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export type { AppDispatch, RootState, AppThunk };
