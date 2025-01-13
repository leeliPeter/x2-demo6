import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface NavigationState {
  selectedPath: string[];
  selectedCommunityNumber: number | null;
  selectedTextUnitIds: string[];
}

const initialState: NavigationState = {
  selectedPath: ["All Data"],
  selectedCommunityNumber: null,
  selectedTextUnitIds: [],
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
    setTextUnitIds: (state, action: PayloadAction<string[]>) => {
      state.selectedTextUnitIds = action.payload;
    },
  },
});

export const { setPath, setCommunityNumber, setTextUnitIds } =
  navigationSlice.actions;
export default navigationSlice.reducer;
