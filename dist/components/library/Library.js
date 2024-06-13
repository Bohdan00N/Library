import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import css from "./library.module.scss";
import { EmptyLib } from "../emptyLib/EmptyLib";
import React from "react";
import { useDeleteBookMutation, useGetBooksQuery, } from "../../app/redux/api/bookApi";
import { useAppSelector } from "../../hooks/hooks";
import { selectAuth } from "../../app/redux/features/authSlice";
import { Rate } from "antd";
export const Library = () => {
    const [deleteBook] = useDeleteBookMutation();
    const email = useAppSelector(selectAuth).userData.email;
    const { data: userData, isLoading } = useGetBooksQuery(email);
    const handleDeleteBook = async (id) => {
        try {
            await deleteBook({ bookId: id }).unwrap();
            console.log(`Deleted book with ID: ${id}`);
        }
        catch (err) {
            console.error("Failed to delete book:", err);
        }
    };
    if (isLoading)
        return _jsx("div", { children: "Loading..." });
    if (!userData?.currentlyReading || !userData?.finishedReading || !userData?.goingToRead) {
        return (_jsx("div", { children: _jsx(EmptyLib, {}) }));
    }
    const { goingToRead, currentlyReading, finishedReading } = userData;
    return (_jsxs("div", { children: [_jsxs("div", { className: css.container, children: [_jsx("h2", { children: "Done" }), _jsxs("ul", { className: css.namesList, children: [_jsx("li", { children: _jsx("p", { children: "Book title" }) }), _jsx("li", { children: _jsx("p", { children: "Author" }) }), _jsx("li", { children: _jsx("p", { children: "Year of publish" }) }), _jsx("li", { children: _jsx("p", { children: "Pages" }) }), _jsx("li", { children: _jsx("p", { children: "Rating" }) })] }), _jsx("div", { className: css.allListCon, children: finishedReading.map((book) => (_jsxs(React.Fragment, { children: [_jsx("div", { children: _jsx("ul", { className: css.list, children: _jsx("li", { children: book.title }) }) }), _jsx("div", { children: _jsx("ul", { className: css.list, children: _jsx("li", { children: book.author }) }) }), _jsx("div", { children: _jsx("ul", { className: css.list, children: _jsx("li", { children: book.publishYear }) }) }), _jsx("div", { children: _jsx("ul", { className: css.list, children: _jsx("li", { children: book.pagesTotal }) }) }), _jsx("div", { className: css.listCon3, children: _jsx("ul", { className: css.list, children: _jsx("li", { className: css.rate, children: _jsx(Rate, { defaultValue: 1 }) }) }) })] }, book._id))) })] }), _jsxs("div", { className: css.container, children: [_jsx("h2", { children: "Reading" }), _jsxs("ul", { className: css.namesList, children: [_jsx("li", { children: _jsx("p", { children: "Book title" }) }), _jsx("li", { children: _jsx("p", { children: "Author" }) }), _jsx("li", { children: _jsx("p", { children: "Year of publish" }) }), _jsx("li", { children: _jsx("p", { children: "Pages" }) })] }), _jsx("div", { className: css.allListCon, children: currentlyReading.map((book) => (_jsxs(React.Fragment, { children: [_jsx("div", { className: "listCon1", children: _jsx("ul", { className: css.list, children: _jsx("li", { children: book.title }) }) }), _jsx("div", { className: "listCon2", children: _jsx("ul", { className: css.list, children: _jsx("li", { children: book.author }) }) }), _jsx("div", { className: "listCon3", children: _jsx("ul", { className: css.list, children: _jsx("li", { children: book.publishYear }) }) }), _jsx("div", { className: "listCon4", children: _jsx("ul", { className: css.list, children: _jsx("li", { children: book.pagesTotal }) }) })] }, book._id))) })] }), _jsxs("div", { className: css.container, children: [_jsx("h2", { children: "Going to read" }), _jsxs("ul", { className: css.namesList, children: [_jsx("li", { children: _jsx("p", { children: "Book title" }) }), _jsx("li", { children: _jsx("p", { children: "Author" }) }), _jsx("li", { children: _jsx("p", { children: "Year of publish" }) }), _jsx("li", { children: _jsx("p", { children: "Pages" }) })] }), _jsx("div", { className: css.allListCon, children: goingToRead.map((book) => (_jsxs(React.Fragment, { children: [_jsx("div", { className: "listCon1", children: _jsx("ul", { className: css.list, children: _jsx("li", { children: book.title }) }) }), _jsx("div", { className: "listCon2", children: _jsx("ul", { className: css.list, children: _jsx("li", { children: book.author }) }) }), _jsx("div", { className: "listCon3", children: _jsx("ul", { className: css.list, children: _jsx("li", { children: book.publishYear }) }) }), _jsx("div", { className: "listCon4", children: _jsx("ul", { className: css.list, children: _jsx("li", { children: book.pagesTotal }) }) }), _jsx("div", { className: "listCon5", children: _jsx("ul", { className: css.list, children: _jsx("li", { children: _jsx("button", { className: css.btnDelete, onClick: () => {
                                                    if (book._id) {
                                                        handleDeleteBook(book._id);
                                                    }
                                                    else {
                                                        console.error("Book ID is null");
                                                    }
                                                }, children: "Delete" }) }) }) })] }, book._id))) })] })] }));
};
