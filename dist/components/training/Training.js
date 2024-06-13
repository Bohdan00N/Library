import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Form, Cascader, DatePicker, Space, InputNumber } from "antd";
import css from "./training.module.scss";
import { useAppSelector } from "../../hooks/hooks";
import { selectAuth } from "../../app/redux/features/authSlice";
import { useGetBooksQuery } from "../../app/redux/api/bookApi";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { selectIsTrainingStarted, selectPages, selectPlan, setPlan, setReadPages, } from "../../app/redux/features/planningSlice";
import { useAppDispatch } from "../../app/store";
import { useAddReadMutation, useStartPlanMutation, } from "../../app/redux/api/planningApi";
import moment from "moment";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, } from "chart.js";
import { useSelector } from "react-redux";
import Countdown from "antd/es/statistic/Countdown";
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);
export const Training = () => {
    const dispatch = useAppDispatch();
    const [form] = Form.useForm();
    const [form2] = Form.useForm();
    const userId = useAppSelector(selectAuth).userData.id;
    const { data: userData } = useGetBooksQuery(userId);
    let options = [];
    let currentlyReading = [];
    useEffect(() => { });
    if (userData && userData.goingToRead) {
        const { goingToRead, currentlyReading: reading } = userData;
        currentlyReading = reading;
        console.log(currentlyReading);
        options = goingToRead.map((book) => ({
            value: book._id,
            label: book.title,
        }));
    }
    const isTrainingStarted = useSelector((state) => selectIsTrainingStarted(state, userId));
    console.log(isTrainingStarted);
    const [startPlan, { data: startPlanData, isSuccess: startPlanSuccess }] = useStartPlanMutation();
    const [addRead, { data: addReadData, isSuccess: addReadSuccess }] = useAddReadMutation();
    const [selectedBooks, setSelectedBooks] = useState([]);
    const prepareBooks = (value) => {
        const selectedBook = userData?.goingToRead.find((book) => book._id === value[0]);
        if (selectedBook) {
            setSelectedBooks((prevBooks) => [...prevBooks, selectedBook]);
        }
    };
    const bookIds = selectedBooks.map((book) => book._id);
    console.log(bookIds);
    const handleAddBtn = async (values) => {
        try {
            const formattedStartDate = new Date(values.startDate)
                .toISOString()
                .split("T")[0];
            const formattedEndDate = new Date(values.endDate)
                .toISOString()
                .split("T")[0];
            await startPlan({
                startDate: formattedStartDate,
                endDate: formattedEndDate,
                books: bookIds,
            });
            form.resetFields();
            setSelectedBooks([]);
        }
        catch (error) {
            console.error("Ошибка при добавлении книги:", error);
        }
    };
    useEffect(() => {
        if (startPlanData && startPlanSuccess) {
            const { startDate, endDate, books, duration, pagesPerDay, stats, _id } = startPlanData;
            if (startDate && endDate && books) {
                dispatch(setPlan({
                    userId: userId,
                    plan: {
                        startDate,
                        endDate,
                        books,
                        duration,
                        pagesPerDay,
                        stats,
                        _id,
                    },
                }));
            }
        }
    }, [startPlanData, dispatch, form, startPlanSuccess, userId]);
    useEffect(() => {
        if (addReadData && addReadSuccess) {
            const { book, planning } = addReadData;
            if (book && planning) {
                dispatch(setReadPages({ userId: userId, plan: { book, planning } }));
            }
        }
    }, [addReadData, addReadSuccess, dispatch, userId]);
    const handleAddPages = async (values) => {
        await addRead({
            pages: values.pages,
        });
        form.resetFields();
    };
    const getPlan = useSelector((state) => selectPlan(state, userId));
    const getPages = useSelector((state) => selectPages(state, userId));
    const getPast7Days = () => {
        const days = [];
        const today = moment();
        for (let i = -5; i <= 1; i++) {
            days.push(today.clone().add(i, "days").format("YYYY-MM-DD"));
        }
        return days;
    };
    const dateFinish = getPlan?.endDate?.toString() || "0";
    console.log(dateFinish);
    if (typeof dateFinish === "number") {
        dayjs(dateFinish).toDate(); // Convert number to Date using dayjs
    }
    else {
        dateFinish; // dateFinish is already a Date or undefined
    }
    const pg = getPages?.planning.pagesPerDay ?? 0;
    const booksAmount = getPlan?.books.length || 0;
    const duration = getPlan?.duration || 0;
    const today = dayjs();
    const tomorrow = today.add(1, "day");
    const finishPagesPerDay = getPages?.planning.stats ?? [];
    const groupDataByDate = (data) => {
        return data.reduce((acc, item) => {
            const date = moment(item.time).format("YYYY-MM-DD");
            if (!acc[date]) {
                acc[date] = 0;
            }
            acc[date] += item.pagesCount;
            return acc;
        }, {});
    };
    const labels = getPast7Days();
    const groupedData = groupDataByDate(finishPagesPerDay);
    const factData = labels.map((date) => groupedData[date] || 0);
    const data = {
        labels: labels,
        datasets: [
            {
                label: "Plan",
                data: Array(labels.length).fill(pg),
                borderColor: "green",
                fill: false,
            },
            {
                label: "Fact",
                data: factData,
                borderColor: "red",
                fill: false,
            },
        ],
    };
    const option = {
        responsive: true,
        scales: {
            x: {
                title: {
                    display: true,
                    text: "Дата",
                },
            },
            y: {
                title: {
                    display: true,
                    text: "Значение",
                },
            },
        },
    };
    return (_jsxs(_Fragment, { children: [_jsxs("div", { className: css.trpl, children: [_jsxs("div", { className: css.trainCont, children: [_jsx("h2", { className: css.textTrain, children: "My training" }), !isTrainingStarted || currentlyReading.length === 0 ? (_jsx(Form, { form: form, onFinish: handleAddBtn, initialValues: { remember: true }, children: _jsxs(Space, { direction: "vertical", size: 12, className: css.formDate, children: [_jsxs("div", { className: css.boxPick, children: [_jsxs("div", { className: css.dates, children: [_jsx(Form.Item, { label: "Start", name: "startDate", rules: [
                                                                {
                                                                    required: true,
                                                                    message: "Пожалуйста, выберите дату начала!",
                                                                },
                                                            ], children: _jsx(DatePicker, { minDate: today, maxDate: today, format: "YYYY-MM-DD", onChange: (date) => {
                                                                    if (moment.isMoment(date) && date.isValid()) {
                                                                        form.setFieldsValue({
                                                                            startDate: date.format("YYYY-MM-DD"),
                                                                        });
                                                                    }
                                                                } }) }), _jsx(Form.Item, { label: "End", name: "endDate", rules: [
                                                                {
                                                                    required: true,
                                                                    message: "Пожалуйста, выберите дату окончания!",
                                                                },
                                                            ], children: _jsx(DatePicker, { minDate: tomorrow, format: "YYYY-MM-DD", onChange: (date) => {
                                                                    if (moment.isMoment(date) && date.isValid()) {
                                                                        form.setFieldsValue({
                                                                            endDate: date.format("YYYY-MM-DD"),
                                                                        });
                                                                    }
                                                                } }) })] }), _jsx(Form.Item, { label: 'Books', name: "books", rules: [
                                                        {
                                                            required: true,
                                                            message: "Пожалуйста, выберите книгу!",
                                                        },
                                                    ], children: _jsx(Cascader, { className: css.inputBook, options: options, placeholder: "\u041F\u043E\u0436\u0430\u043B\u0443\u0439\u0441\u0442\u0430, \u0432\u044B\u0431\u0435\u0440\u0438\u0442\u0435", onChange: prepareBooks }) })] }), _jsxs("div", { className: css.boxBook, children: [_jsx("div", { className: css.tableF, children: _jsxs("table", { className: css.table, children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { children: "title" }), _jsx("th", { children: "author" }), _jsx("th", { children: "publishYear" }), _jsx("th", { children: "pagesTotal" })] }) }), selectedBooks.map((book) => (_jsx(React.Fragment, { children: _jsx("tbody", { children: _jsxs("tr", { children: [_jsx("td", { children: book.title }), _jsx("td", { children: book.author }), _jsx("td", { children: book.publishYear }), _jsx("td", { children: book.pagesTotal })] }) }) }, book._id)))] }) }), _jsx(Form.Item, { shouldUpdate: true, className: css.btnAddBookCont, children: () => _jsx("button", { className: css.btnAddBook, children: "Start Training" }) })] })] }) })) : (_jsxs("div", { className: css.currentlyReading, children: [_jsx(Countdown, { title: "Countdown", value: dateFinish }), _jsx("h3", { children: "Currently Reading" }), _jsxs("table", { className: css.table, children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { children: "Title" }), _jsx("th", { children: "Author" }), _jsx("th", { children: "Publish Year" }), _jsx("th", { children: "Pages Total" })] }) }), _jsx("tbody", { children: currentlyReading.map((book) => (_jsxs("tr", { children: [_jsx("td", { children: book.title }), _jsx("td", { children: book.author }), _jsx("td", { children: book.publishYear }), _jsx("td", { children: book.pagesTotal })] }, book._id))) })] })] }))] }), _jsxs("div", { className: css.goalBox, children: [_jsx("h2", { className: css.goalText, children: "My goal" }), _jsxs("div", { className: css.stats, children: [_jsxs("div", { className: css.stat, children: [_jsx("div", { className: css.statValue, children: booksAmount }), _jsx("div", { className: css.statLabel, children: "Books" })] }), _jsxs("div", { className: css.stat, children: [_jsx("div", { className: css.statValue, children: duration }), _jsx("div", { className: css.statLabel, children: "Days" })] })] })] })] }), _jsxs("div", { className: css.chartResCont, children: [_jsx("div", { className: css.chartContainer, children: _jsx(Line, { data: data, options: option }) }), _jsx("div", { className: css.resultCont, children: _jsxs(Form, { form: form2, onFinish: handleAddPages, initialValues: { remember: true }, children: [_jsx("h2", { children: "Results" }), _jsxs("div", { className: css.inputsCont, children: [_jsx(Form.Item, { label: "Date", name: "DateResult", rules: [
                                                {
                                                    required: true,
                                                    message: "Please input!",
                                                },
                                            ], children: _jsx(DatePicker, { minDate: today, maxDate: today, placeholder: today.format("YYYY-MM-DD") }) }), _jsx(Form.Item, { label: "Pages", name: "pages", rules: [
                                                {
                                                    required: true,
                                                    message: "Please input!",
                                                },
                                            ], children: _jsx(InputNumber, { min: 0, className: css.inputCont }) })] }), _jsx(Form.Item, { shouldUpdate: true, children: () => _jsx("button", { className: css.btnAddRead, children: "Add result" }) })] }) })] })] }));
};
