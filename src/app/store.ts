import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { authApi } from "./redux/api/authApi";
import { bookApi } from "./redux/api/bookApi";
import authReducer from "./redux/features/authSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import bookReducer from "./redux/features/bookSlice";
import { planningApi } from "./redux/api/planningApi";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "book"],
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    [authApi.reducerPath]: authApi.reducer,
    [bookApi.reducerPath]: bookApi.reducer,
    [planningApi.reducerPath]: planningApi.reducer,
    auth: authReducer,
    book: bookReducer,
  })
);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV === "development",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat([authApi.middleware, bookApi.middleware, planningApi.middleware]),
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export type RootState = ReturnType<typeof store.getState>;
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
