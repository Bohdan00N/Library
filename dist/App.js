import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect } from "react";
import AppRoutes from "./utils/routes/route";
import "./App.css";
import { useAppDispatch } from "./app/store";
import { loadUser } from "./app/redux/features/authSlice";
const App = () => {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(loadUser());
    }, [dispatch]);
    return (_jsx("div", { children: _jsx(AppRoutes, {}) }));
};
export default App;
