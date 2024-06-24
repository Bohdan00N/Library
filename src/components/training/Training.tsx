import { Form, Cascader, DatePicker, Space, InputNumber, Modal } from "antd";
import css from "./training.module.scss";
import { useAppSelector } from "../../hooks/hooks";
import { selectAuth } from "../../app/redux/features/authSlice";
import { useGetBooksQuery } from "../../app/redux/api/bookApi";
import React, { useEffect, useRef, useState } from "react";
import {
  Book,
  addPlanningRequest,
  startPlanningRequest,
} from "../../app/redux/api/types";
import dayjs from "dayjs";
import {
  resetPlan,
  selectIsTrainingStarted,
  selectPages,
  selectPlan,
  setPlan,
  setReadPages,
} from "../../app/redux/features/planningSlice";
import { RootState, useAppDispatch } from "../../app/store";
import {
  useAddReadMutation,
  useStartPlanMutation,
} from "../../app/redux/api/planningApi";
import { SubmitHandler } from "react-hook-form";
import moment from "moment";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  ChartData,
} from "chart.js";
import { useSelector } from "react-redux";
import Countdown from "antd/es/statistic/Countdown";
import {
  removeBook,
  selectBooksByUser,
} from "../../app/redux/features/bookSlice";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const Training = () => {
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();
  const [form2] = Form.useForm();
  const userId = useAppSelector(selectAuth).userData.id;
  const { data: userData, isLoading } = useGetBooksQuery(userId!);
  const [modalVisible, setModalVisible] = useState(false);
  const [pagesLeft, setPagesLeft] = useState<number>(0);

  const options = useRef<{ value: string; label: string }[]>([]);
  const bb = useSelector((state: RootState) =>
    selectBooksByUser(state, userId!)
  );
  useEffect(() => {
    if (bb) {
      options.current = bb.map((book) => ({
        value: book._id,
        label: book.title,
      }));
    } else {
      console.log("no data");
    }
  }, [bb]);

  const isTrainingStarted = useSelector((state: RootState) =>
    selectIsTrainingStarted(state, userId!)
  );

  const [startPlan, { data: startPlanData, isSuccess: startPlanSuccess }] =
    useStartPlanMutation();

  const [addRead, { data: addReadData, isSuccess: addReadSuccess }] =
    useAddReadMutation();
  const [selectedBooks, setSelectedBooks] = useState<Book[]>([]);

  useEffect(() => {
    const storedBooks = localStorage.getItem("selectedBooks");
    if (storedBooks) {
      setSelectedBooks(JSON.parse(storedBooks));
    }
  }, []);

  const prepareBooks = (value: string[]) => {
    const selectedBook = userData?.goingToRead.find(
      (book) => book._id === value[0]
    );

    if (selectedBook) {
      const newSelectedBooks = [selectedBook];
      setSelectedBooks(newSelectedBooks);
      localStorage.setItem("selectedBooks", JSON.stringify(newSelectedBooks));
    }
  };

  const bookIds = selectedBooks.map((book) => book._id);

  const handleAddBtn: SubmitHandler<startPlanningRequest> = async (values) => {
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
    } catch (error) {
      console.error("Book isn't added:", error);
    }
  };

  useEffect(() => {
    if (startPlanData && startPlanSuccess) {
      const { startDate, endDate, books, duration, pagesPerDay, stats, _id } =
        startPlanData;
      if (startDate && endDate && books) {
        dispatch(
          setPlan({
            userId: userId!,
            plan: {
              startDate,
              endDate,
              books,
              duration,
              pagesPerDay,
              stats,
              _id,
            },
          })
        );
      }
    }
  }, [startPlanData, dispatch, form, startPlanSuccess, userId]);

  useEffect(() => {
    if (addReadData && addReadSuccess) {
      const { book, planning } = addReadData;

      if (book && planning) {
        dispatch(setReadPages({ userId: userId!, plan: { book, planning } }));
      }
    }
  }, [addReadData, addReadSuccess, dispatch, userId]);

  const handleAddPages: SubmitHandler<addPlanningRequest> = async (values) => {
    try {
      await addRead({
        pages: values.pages,
      });
      form2.resetFields();
    } catch (error) {
      console.log("Wrong amount of pages:", error);
    }
  };

  const getPlan = useSelector((state: RootState) => selectPlan(state, userId!));
  const getPages = useSelector((state: RootState) =>
    selectPages(state, userId!)
  );
  const [pF, setPF] = useState(getPlan?.books);

  useEffect(() => {
    setPF(getPlan?.books);
  }, [getPlan?.books]);

  const getPast7Days = (): string[] => {
    const days: string[] = [];
    const today = moment();

    for (let i = -5; i <= 1; i++) {
      days.push(today.clone().add(i, "days").format("YYYY-MM-DD"));
    }

    return days;
  };
  const dateFinish: number | string = getPlan?.endDate?.toString() || "0";
  if (typeof dateFinish === "number") {
    dayjs(dateFinish).toDate();
  }

  const pg = getPages?.planning.pagesPerDay ?? 0;
  const booksAmount = getPlan?.books.length || 0;
  const duration = getPlan?.duration || 0;
  const total = getPlan?.books[0].pagesTotal || 0;
  const finished = getPages?.book.pagesFinished || 0;
  useEffect(() => {
    if (total && finished > 0) {
      setPagesLeft(total - finished);
    } else {
      setPagesLeft(total);
    }
  }, [finished, total]);

  const [value, setValue] = React.useState<number | null>(null);

  const handleChange = (value: number | null) => {
    setValue(value);
  };
  useEffect(() => {
    if (finished >= total && total !== 0) {
      localStorage.setItem("ThisBookFinished", "true");
      setModalVisible(true);
    }
  }, [finished, total]);

  const handleModalClose = () => {
    localStorage.setItem("ThisBookFinished", "false");
    localStorage.removeItem("selectedBooks");
    if (pF) {
      dispatch(removeBook({ userId: userId!, bookId: pF[0]._id }));
    }
    dispatch(resetPlan({ userId: userId! }));
    setSelectedBooks([]);
    setModalVisible(false);
    localStorage.removeItem("selectedBooks");
  };

  const today = dayjs();
  const tomorrow = today.add(1, "day");
  const finishPagesPerDay = getPages?.planning.stats ?? [];
  interface RealPagesRead {
    time: string;
    pagesCount: number;
  }

  const groupDataByDate = (
    data: RealPagesRead[]
  ): { [date: string]: number } => {
    return data.reduce<{ [date: string]: number }>((acc, item) => {
      const date = moment(item.time).format("YYYY-MM-DD");
      if (!acc[date]) {
        acc[date] = 0;
      }
      acc[date] += item.pagesCount;
      return acc;
    }, {});
  };
  const labels: string[] = getPast7Days();
  const groupedData = groupDataByDate(finishPagesPerDay);
  const factData = labels.map((date) => groupedData[date] || 0);

  const data: ChartData<"line"> = {
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
  const option: ChartOptions<"line"> = {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: "Date",
        },
      },
      y: {
        title: {
          display: true,
          text: "Pages",
        },
      },
    },
  };

  if (isLoading) {
    return <div className={css.loading}>Loading...</div>;
  }
  return (
    <>
      <div className={css.trpl}>
        <div className={css.trainCont}>
          <h2 className={css.textTrain}>My training</h2>
          {!isTrainingStarted || !pF ? (
            <Form
              form={form}
              onFinish={handleAddBtn}
              initialValues={{ remember: true }}
            >
              <Space direction="vertical" size={12} className={css.formDate}>
                <div className={css.boxPick}>
                  <div className={css.dates}>
                    <Form.Item
                      label="Start"
                      name="startDate"
                      rules={[
                        {
                          required: true,
                          message: "Пожалуйста, выберите дату начала!",
                        },
                      ]}
                    >
                      <DatePicker
                        minDate={today}
                        maxDate={today}
                        format="YYYY-MM-DD"
                        onChange={(date) => {
                          if (moment.isMoment(date) && date.isValid()) {
                            form.setFieldsValue({
                              startDate: date.format("YYYY-MM-DD"),
                            });
                          }
                        }}
                      />
                    </Form.Item>
                    <Form.Item
                      label="End"
                      name="endDate"
                      rules={[
                        {
                          required: true,
                          message: "Пожалуйста, выберите дату окончания!",
                        },
                      ]}
                    >
                      <DatePicker
                        minDate={tomorrow}
                        format="YYYY-MM-DD"
                        onChange={(date) => {
                          if (moment.isMoment(date) && date.isValid()) {
                            form.setFieldsValue({
                              endDate: date.format("YYYY-MM-DD"),
                            });
                          }
                        }}
                      />
                    </Form.Item>
                  </div>
                  <Form.Item
                    label="Books"
                    name="books"
                    rules={[
                      {
                        required: true,
                        message: "Select book!",
                      },
                    ]}
                  >
                    <Cascader
                      className={css.inputBook}
                      options={options.current}
                      placeholder="Select book"
                      onChange={prepareBooks}
                    />
                  </Form.Item>
                </div>
                <div className={css.boxBook}>
                  <div className={css.tableF}>
                    <table className={css.table}>
                      <thead>
                        <tr>
                          <th>Title</th>
                          <th>Author</th>
                          <th>Year of publish</th>
                          <th>Total pages</th>
                        </tr>
                      </thead>
                      {selectedBooks.map((book) => (
                        <React.Fragment key={book._id}>
                          <tbody>
                            <tr>
                              <td>{book.title}</td>
                              <td>{book.author}</td>
                              <td>{book.publishYear}</td>
                              <td>{book.pagesTotal}</td>
                            </tr>
                          </tbody>
                        </React.Fragment>
                      ))}
                    </table>
                  </div>
                  <Form.Item shouldUpdate className={css.btnAddBookCont}>
                    {() => (
                      <button className={css.btnAddBook}>Start Training</button>
                    )}
                  </Form.Item>
                </div>
              </Space>
            </Form>
          ) : (
            <div className={css.currentlyReading}>
              <Countdown
                className={css.count}
                valueStyle={{ fontSize: "50px" }}
                title="Time left"
                value={dateFinish}
              />
              <h3>Currently Reading</h3>
              <table className={css.table}>
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Publish Year</th>
                    <th>Pages Total</th>
                  </tr>
                </thead>
                <tbody>
                  {pF.map((book) => (
                    <tr key={book._id}>
                      <td>{book.title}</td>
                      <td>{book.author}</td>
                      <td>{book.publishYear}</td>
                      <td>{book.pagesTotal}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        {modalVisible && (
          <Modal
            open={modalVisible}
            closable={false}
            centered={true}
            footer={[
              <button
                className={css.btnClose}
                key="submit"
                onClick={handleModalClose}
              >
                Close
              </button>,
            ]}
          >
            <div className={css.containerModal}>
              <div className={css.text}>
                <h2>Congratulations!</h2>
                <p>Another book has been read</p>
              </div>
            </div>
          </Modal>
        )}
        <div className={css.goalBox}>
          <h2 className={css.goalText}>My goal</h2>
          <div className={css.stats}>
            <div className={css.stat}>
              <div className={css.statValue}>{booksAmount}</div>
              <div className={css.statLabel}>Books</div>
            </div>
            <div className={css.stat}>
              <div className={css.statValue}>{duration}</div>
              <div className={css.statLabel}>Days</div>
            </div>
            <div className={css.stat}>
              <div className={css.statValue}>{pagesLeft}</div>
              <div className={css.statLabel}>Pages Left</div>
            </div>
          </div>
        </div>
      </div>
      <div className={css.chartResCont}>
        <div className={css.chartContainer}>
          <Line data={data} options={option} />
        </div>
        <div className={css.resultCont}>
          <Form
            form={form2}
            onFinish={handleAddPages}
            initialValues={{ remember: true }}
          >
            <h2>Results</h2>
            <div className={css.inputsCont}>
              <Form.Item
                label="Date"
                name="DateResult"
                rules={[
                  {
                    required: true,
                    message: "Please input!",
                  },
                ]}
              >
                <DatePicker
                  minDate={today}
                  maxDate={today}
                  placeholder={today.format("YYYY-MM-DD")}
                />
              </Form.Item>

              <Form.Item
                label="Pages"
                name="pages"
                rules={[
                  {
                    required: true,
                    message: "Please input!",
                  },
                ]}
              >
                <InputNumber
                  min={0}
                  max={pagesLeft}
                  value={value}
                  onChange={handleChange}
                  className={css.inputCont}
                />
              </Form.Item>
            </div>
            <Form.Item shouldUpdate>
              {() => {
                return <button className={css.btnAddRead}>Add result</button>;
              }}
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
};
