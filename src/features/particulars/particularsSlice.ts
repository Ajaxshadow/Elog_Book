import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";
import { User, UserCredential } from "firebase/auth";
import { ParticularsInterface } from "../../interface/particulars";

// Define a type for the slice state
interface appState {
  particulars: ParticularsInterface | null;
}

// Define the initial state using that type
const initialState: appState = {
  particulars: null,
};

export const particularsSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setParticulars: (
      state,
      action: PayloadAction<ParticularsInterface | null>
    ) => {
      state.particulars = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setParticulars } = particularsSlice.actions;
export const selectParticulars = (state: RootState) =>
  state.particulars.particulars;
export default particularsSlice.reducer;
