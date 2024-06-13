"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadUser = exports.logout = exports.setUser = exports.selectAuth = void 0;
var toolkit_1 = require("@reduxjs/toolkit");
var initialState = {
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
var authSlice = (0, toolkit_1.createSlice)({
    name: "auth",
    initialState: initialState,
    reducers: {
        setUser: function (state, action) {
            localStorage.setItem("user", JSON.stringify(action.payload));
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
            state.sid = action.payload.sid;
            state.userData = action.payload.userData;
        },
        logout: function () {
            localStorage.clear();
            return initialState;
        },
        loadUser: function (state) {
            var user = localStorage.getItem("user");
            if (user) {
                var parsedUser = JSON.parse(user);
                state.accessToken = parsedUser.accessToken;
                state.refreshToken = parsedUser.refreshToken;
                state.sid = parsedUser.sid;
                state.userData = parsedUser.userData;
            }
        },
        clearUserData: function (state) {
            localStorage.removeItem("user");
            state = initialState;
            return state;
        },
    },
});
var selectAuth = function (state) { return state.auth; };
exports.selectAuth = selectAuth;
exports.setUser = (_a = authSlice.actions, _a.setUser), exports.logout = _a.logout, exports.loadUser = _a.loadUser;
exports.default = authSlice.reducer;
