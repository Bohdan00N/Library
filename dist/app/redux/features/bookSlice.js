"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadBooks = exports.setBook = exports.selectBooksByUser = void 0;
var toolkit_1 = require("@reduxjs/toolkit");
var initialState = {};
var bookSlice = (0, toolkit_1.createSlice)({
    name: "book",
    initialState: initialState,
    reducers: {
        setBook: function (state, action) {
            var _a = action.payload, userId = _a.userId, book = _a.book;
            if (state[userId]) {
                state[userId].push(book);
            }
        },
        loadBooks: function (state, action) {
            var userId = action.payload;
            var books = localStorage.getItem("books_".concat(userId));
            if (books) {
                state[userId] = JSON.parse(books);
            }
            else {
                state[userId] = [];
            }
        },
        clearBooks: function (state, action) {
            var userId = action.payload;
            delete state[userId];
            localStorage.removeItem("books_".concat(userId));
        },
    },
});
var selectBooksByUser = function (state, userId) {
    return state.book[userId] || [];
};
exports.selectBooksByUser = selectBooksByUser;
exports.setBook = (_a = bookSlice.actions, _a.setBook), exports.loadBooks = _a.loadBooks;
exports.default = bookSlice.reducer;
