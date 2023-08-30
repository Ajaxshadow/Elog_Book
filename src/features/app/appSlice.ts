import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";
import { User, UserCredential } from "firebase/auth";

// Define a type for the slice state
interface appState {
  user: User | null;
  firstTime: boolean | undefined;
}

// Define the initial state using that type
const initialState: appState = {
  user: null,
  firstTime: false,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setFirstTime: (state, action: PayloadAction<boolean | undefined>) => {
      state.firstTime = action.payload;
    },
    login: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.firstTime = false;
    },
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logout, setFirstTime, setUser } =
  appSlice.actions;
export const selectUser = (state: RootState) => state.app.user;
export default appSlice.reducer;
