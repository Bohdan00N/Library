import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { Form, Input, InputNumber } from "antd";
import css from "./addBook.module.scss";
import { Library } from "../library/Library";
import { useAppDispatch } from "../../app/store";
import { useAddBookMutation } from "../../app/redux/api/bookApi";
import { setBook } from "../../app/redux/features/bookSlice";
import { selectAuth } from "../../app/redux/features/authSlice";
import { useAppSelector } from "../../hooks/hooks";
export const AddBook = () => {
    const [form] = Form.useForm();
    const [clientReady, setClientReady] = useState(false);
    const email = useAppSelector(selectAuth).userData.email;
    useEffect(() => {
        setClientReady(true);
    }, []);
    const dispatch = useAppDispatch();
    const [addBook, { data: addBookData, isSuccess: addBookSuccess },] = useAddBookMutation();
    const onFinish = async (values) => {
        const { title, author, publishYear, pagesTotal } = values;
        if (!title || !author || !publishYear || !pagesTotal || !clientReady) {
            console.error("Ошибка: Не все данные книги заполнены.");
            return;
        }
        try {
            await addBook({ title, author, publishYear, pagesTotal });
            form.resetFields();
        }
        catch (error) {
            console.error("Ошибка при добавлении книги:", error);
        }
    };
    useEffect(() => {
        if (addBookSuccess && addBookData) {
            const { title, author, publishYear, pagesTotal, pagesFinished, _id } = addBookData;
            if (title && author && publishYear && pagesTotal) {
                dispatch(setBook({
                    userId: email,
                    book: {
                        title,
                        author,
                        publishYear,
                        pagesTotal,
                        pagesFinished,
                        _id,
                    },
                }));
                form.resetFields();
            }
        }
    }, [dispatch, addBookSuccess, addBookData, form, email]);
    return (_jsxs("div", { className: css.addContainer, children: [_jsx("div", { className: css.add, children: _jsxs(Form, { form: form, labelCol: { span: 300 }, wrapperCol: { span: 150 }, layout: "inline", style: { minWidth: 700, gap: 15 }, initialValues: { remember: true }, onFinish: onFinish, children: [_jsx(Form.Item, { className: css.input, name: "title", label: "Book title", rules: [
                                {
                                    required: true,
                                    message: "Book title is required",
                                },
                            ], children: _jsx(Input, {}) }), _jsx(Form.Item, { className: css.input, name: "author", label: "Author", rules: [
                                {
                                    required: true,
                                    message: "Author is required",
                                },
                            ], children: _jsx(Input, {}) }), _jsx(Form.Item, { className: css.input, name: "publishYear", label: "Publication year", rules: [
                                {
                                    required: true,
                                    message: "Publication year is required",
                                },
                            ], children: _jsx(InputNumber, {}) }), _jsx(Form.Item, { className: css.input, name: "pagesTotal", label: "Amount of pages", rules: [
                                {
                                    required: true,
                                    message: "Amount of pages is required",
                                },
                            ], children: _jsx(InputNumber, {}) }), _jsx(Form.Item, { shouldUpdate: true, children: () => _jsx("button", { className: css.btnAdd, children: "Add" }) })] }) }), _jsx("div", { className: css.lib, children: _jsx(Library, {}) })] }));
};
