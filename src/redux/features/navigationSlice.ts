import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface NavigationState {
  selectedPath: string[];
  selectedPathIds: string[];
  selectedCommunityNumber: number | null;
  selectedTextUnitIds: string[];
}

const initialState: NavigationState = {
  selectedPath: ["All Data"],
  selectedPathIds: ["company_1"],
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
    setPathIds: (state, action: PayloadAction<string[]>) => {
      state.selectedPathIds = action.payload;
    },
    setCommunityNumber: (state, action: PayloadAction<number | null>) => {
      state.selectedCommunityNumber = action.payload;
    },
    setTextUnitIds: (state, action: PayloadAction<string[]>) => {
      state.selectedTextUnitIds = action.payload;
    },
  },
});

export const { setPath, setPathIds, setCommunityNumber, setTextUnitIds } =
  navigationSlice.actions;
export default navigationSlice.reducer;
