import { refreshTokenResponse } from './../api/types';
import { PayloadAction,  createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { LoginResponse } from "../api/types";

const initialState: LoginResponse = {
  accessToken: null,
  refreshToken: null,
  sid: null,
  userData: {
    name: null,
    email: null,
    goingToRead: [
      {
        title: null,
        author: null,
        publishYear: null,
        pagesTotal: null,
        pagesFinished: null,
        _id: null,
        _v: null,
      },
    ],
    currentlyReading: [],
    finishedReading: [],
    id: null,
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<LoginResponse>) => {
      localStorage.setItem("user", JSON.stringify(action.payload));
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.sid = action.payload.sid;
      state.userData = action.payload.userData;
    },
    logOut: (state) => {
      localStorage.clear();
      state.accessToken = null;
      state.refreshToken = null;
      state.sid = null;
      state.userData = initialState.userData;
    },
    loadUser: (state) => {
      const user = localStorage.getItem("user");
      if (user) {
        const parsedUser = JSON.parse(user);
        state.accessToken = parsedUser.accessToken;
        state.refreshToken = parsedUser.refreshToken;
        state.sid = parsedUser.sid;
        state.userData = parsedUser.userData;
      }
    },
    clearUserData: (state) => {
      localStorage.removeItem("user");
      state.accessToken = initialState.accessToken;
      state.refreshToken = initialState.refreshToken;
      state.sid = initialState.sid;
      state.userData = initialState.userData;
    },
    updateTokens: (
      state,
      action: PayloadAction< refreshTokenResponse >
    ) => {
      state.accessToken = action.payload.newAccessToken;
      state.refreshToken = action.payload.newRefreshToken;
      state.sid = action.payload.newSid
      localStorage.setItem("user", JSON.stringify(state));
    },
  },
});

export const selectAuth = (state: RootState) => state.auth;

export const { setUser, logOut, loadUser, clearUserData, updateTokens } =
  authSlice.actions;

export default authSlice.reducer;
