import { configureStore } from "@reduxjs/toolkit";
import basketReducer from "lib/redux/slices/basketSlice";

export const store = configureStore({
  reducer: {
    basket: basketReducer,
  },
});
