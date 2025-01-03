import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FilterState {
  selectedFilters: {
    [key: string]: string;
  };
}

const initialState: FilterState = {
  selectedFilters: {},
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setFilter: (
      state,
      action: PayloadAction<{ label: string; value: string }>
    ) => {
      state.selectedFilters[action.payload.label] = action.payload.value;
    },
    clearFilters: (state) => {
      state.selectedFilters = {};
    },
  },
});

export const { setFilter, clearFilters } = filterSlice.actions;
export default filterSlice.reducer;
