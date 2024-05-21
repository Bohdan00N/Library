import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

export type AuthState = {
  name: string | null;
  token: string | null;
  id: string | null;
};
const initialState: AuthState = {
  name: null,
  token: null,
  id: null,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{ name: string; token: string; id: string }>
    ) => {
      localStorage.setItem(
        "user",
        JSON.stringify({
          name: action.payload.name,
          token: action.payload.token,
          id: action.payload.id,
        })
      );
      state.name = action.payload.name;
      state.token = action.payload.token;
      state.id = action.payload.id;
    },
    logout: () => {
      localStorage.clear();
      
      return initialState;
    },
    loadUser: (state) => {
      const user = localStorage.getItem('user');
      if (user) {
        const parsedUser = JSON.parse(user);
        state.name = parsedUser.name;
        state.token = parsedUser.token;
        state.id = parsedUser.id;
      }
    },
  },
});
export const selectAuth = (state: RootState) => state.auth;

export const { setUser, logout, loadUser } = authSlice.actions;

export default authSlice.reducer;
