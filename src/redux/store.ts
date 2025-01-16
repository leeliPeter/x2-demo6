import { configureStore } from "@reduxjs/toolkit";
import navigationReducer from "./features/navigationSlice";
import filterReducer from "./features/filterSlice";
import chatReducer from "./features/chatSlice";

export const store = configureStore({
  reducer: {
    navigation: navigationReducer,
    filter: filterReducer,
    chat: chatReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
