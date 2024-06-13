import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { authApi } from "./redux/api/authApi";
import { bookApi } from "./redux/api/bookApi";
import authReducer from "./redux/features/authSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import bookReducer from "./redux/features/bookSlice";
import { planningApi } from "./redux/api/planningApi";
import planningReducer from './redux/features/planningSlice';
const persistConfig = {
    key: "root",
    storage,
    whitelist: ["auth", "book", "planning"],
};
const persistedReducer = persistReducer(persistConfig, combineReducers({
    [authApi.reducerPath]: authApi.reducer,
    [bookApi.reducerPath]: bookApi.reducer,
    [planningApi.reducerPath]: planningApi.reducer,
    auth: authReducer,
    book: bookReducer,
    planning: planningReducer
}));
export const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV === "development",
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }).concat([authApi.middleware, bookApi.middleware, planningApi.middleware]),
});
export const persistor = persistStore(store);
export const useAppDispatch = () => useDispatch();
export const useTypedSelector = useSelector;
