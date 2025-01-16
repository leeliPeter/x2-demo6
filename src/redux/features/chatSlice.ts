import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ChatState {
  pendingMessage: string | null;
  isOpen: boolean;
}

const initialState: ChatState = {
  pendingMessage: null,
  isOpen: false,
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setPendingMessage: (state, action: PayloadAction<string | null>) => {
      state.pendingMessage = action.payload;
    },
    setIsOpen: (state, action: PayloadAction<boolean>) => {
      state.isOpen = action.payload;
    },
  },
});

export const { setPendingMessage, setIsOpen } = chatSlice.actions;
export default chatSlice.reducer;
