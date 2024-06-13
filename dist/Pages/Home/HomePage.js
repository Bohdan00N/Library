import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// import React from "react";
import { Header } from "../../components/header/Header";
import { AddBook } from "../../components/addBook/AddBook";
import css from "./homePage.module.scss";
// import { Library } from "../../components/library/Library";
// import { addBookRequest } from "../../app/redux/api/types";
const HomePage = () => {
    return (_jsxs("div", { className: css.container, children: [_jsx(Header, {}), _jsx(AddBook, {})] }));
};
export default HomePage;
