import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface NavigationState {
  selectedPath: string[];
}

const initialState: NavigationState = {
  selectedPath: ["All Data"],
};

export const navigationSlice = createSlice({
  name: "navigation",
  initialState,
  reducers: {
    setPath: (state, action: PayloadAction<string[]>) => {
      state.selectedPath = action.payload;
    },
  },
});

export const { setPath } = navigationSlice.actions;
export default navigationSlice.reducer;
