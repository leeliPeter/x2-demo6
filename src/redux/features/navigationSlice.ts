import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface NavigationState {
  selectedPath: string[];
  selectedCommunityNumber: number | null;
}

const initialState: NavigationState = {
  selectedPath: ["All Data"],
  selectedCommunityNumber: null,
};

export const navigationSlice = createSlice({
  name: "navigation",
  initialState,
  reducers: {
    setPath: (state, action: PayloadAction<string[]>) => {
      state.selectedPath = action.payload;
    },
    setCommunityNumber: (state, action: PayloadAction<number | null>) => {
      state.selectedCommunityNumber = action.payload;
    },
  },
});

export const { setPath, setCommunityNumber } = navigationSlice.actions;
export default navigationSlice.reducer;
