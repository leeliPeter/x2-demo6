import { configureStore } from "@reduxjs/toolkit";
import navigationReducer from "./features/navigationSlice";
import filterReducer from "./features/filterSlice";

export const store = configureStore({
  reducer: {
    navigation: navigationReducer,
    filter: filterReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
