import { createSlice } from "@reduxjs/toolkit";
const initialState = {
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
        setUser: (state, action) => {
            localStorage.setItem("user", JSON.stringify(action.payload));
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
            state.sid = action.payload.sid;
            state.userData = action.payload.userData;
        },
        logout: () => {
            localStorage.clear();
            return initialState;
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
            state = initialState;
            return state;
        },
    },
});
export const selectAuth = (state) => state.auth;
export const { setUser, logout, loadUser } = authSlice.actions;
export default authSlice.reducer;
