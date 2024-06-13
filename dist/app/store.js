"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.useTypedSelector = exports.useAppDispatch = exports.persistor = exports.store = void 0;
var toolkit_1 = require("@reduxjs/toolkit");
var react_redux_1 = require("react-redux");
var authApi_1 = require("./redux/api/authApi");
var bookApi_1 = require("./redux/api/bookApi");
var authSlice_1 = require("./redux/features/authSlice");
var storage_1 = require("redux-persist/lib/storage");
var redux_persist_1 = require("redux-persist");
var bookSlice_1 = require("./redux/features/bookSlice");
var planningApi_1 = require("./redux/api/planningApi");
var planningSlice_1 = require("./redux/features/planningSlice");
var persistConfig = {
    key: "root",
    storage: storage_1.default,
    whitelist: ["auth", "book", "planning"],
};
var persistedReducer = (0, redux_persist_1.persistReducer)(persistConfig, (0, toolkit_1.combineReducers)((_a = {},
    _a[authApi_1.authApi.reducerPath] = authApi_1.authApi.reducer,
    _a[bookApi_1.bookApi.reducerPath] = bookApi_1.bookApi.reducer,
    _a[planningApi_1.planningApi.reducerPath] = planningApi_1.planningApi.reducer,
    _a.auth = authSlice_1.default,
    _a.book = bookSlice_1.default,
    _a.planning = planningSlice_1.default,
    _a)));
exports.store = (0, toolkit_1.configureStore)({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV === "development",
    middleware: function (getDefaultMiddleware) {
        return getDefaultMiddleware({
            serializableCheck: false,
        }).concat([authApi_1.authApi.middleware, bookApi_1.bookApi.middleware, planningApi_1.planningApi.middleware]);
    },
});
exports.persistor = (0, redux_persist_1.persistStore)(exports.store);
var useAppDispatch = function () { return (0, react_redux_1.useDispatch)(); };
exports.useAppDispatch = useAppDispatch;
exports.useTypedSelector = react_redux_1.useSelector;
