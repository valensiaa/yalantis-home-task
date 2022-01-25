import { createSlice } from "@reduxjs/toolkit";
import { getOrigins } from "./thunks";

export const originsSlice = createSlice({
  name: "origins",
  initialState: {
    origins: [],
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrigins.fulfilled, (state, action) => {
        state.origins = action.payload.items.map((o) => ({
          value: o.value,
          label: o.displayName,
        }));
      });
  },
});

export const {
  setOrigins
} = originsSlice.actions;
export default originsSlice.reducer;
