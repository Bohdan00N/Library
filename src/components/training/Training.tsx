import { Form, Cascader, DatePicker, Space, InputNumber } from "antd";
import css from "./training.module.scss";
import { useAppSelector } from "../../hooks/hooks";
import { selectAuth } from "../../app/redux/features/authSlice";
import { useGetBooksQuery } from "../../app/redux/api/bookApi";
import React, { useEffect, useState } from "react";
import {
  Book,
  addPlanningRequest,
  startPlanningRequest,
} from "../../app/redux/api/types";
import dayjs from "dayjs";
import {
  selectIsTrainingStarted,
  selectPlan,
  setPlan,
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
  const [form2] = Form.useForm()
  const userId = useAppSelector(selectAuth).userData.id;
  const { data: userData } = useGetBooksQuery(userId!);

  let options: { value: string; label: string }[] = [];

  let currentlyReading: Book[] = [];
  useEffect(() => {});
  if (userData && userData.goingToRead) {
    const { goingToRead, currentlyReading: reading } = userData;
    currentlyReading = reading;
    console.log(currentlyReading);
    options = goingToRead.map((book) => ({
      value: book._id,
      label: book.title,
    }));
  }
  const isTrainingStarted = useSelector((state: RootState) => selectIsTrainingStarted(state, userId!));
  console.log(isTrainingStarted);
  const [startPlan, { data: startPlanData, isSuccess: startPlanSuccess }] =
    useStartPlanMutation();

  const [addRead, { data: addReadData, isSuccess: addReadSuccess }] =
    useAddReadMutation();

  const [selectedBooks, setSelectedBooks] = useState<Book[]>([]);
  const prepareBooks = (value: string[]) => {
    const selectedBook = userData?.goingToRead.find(
      (book) => book._id === value[0]
    );
    if (selectedBook) {
      setSelectedBooks((prevBooks) => [...prevBooks, selectedBook]);
    }
  };
  const bookIds = selectedBooks.map((book) => book._id);
  console.log(bookIds);

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
      console.error("Ошибка при добавлении книги:", error);
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

  const getPlan = useSelector((state: RootState) => selectPlan(state, userId!));
  // const booksAmount = getPlan?.plan?.books.length;
  // const duration = getPlan.plan?.duration;
  // const pages = getPlan.plan?.pagesPerDay as number;
  const booksAmount = getPlan?.books.length
const duration = getPlan?.duration
const pages = getPlan?.pagesPerDay as number;
  const today = moment().format("YYYY-MM-DD");
  const todayAsDayjs = dayjs(today);
  console.log(duration,pages);

  const handleAddPages: SubmitHandler<addPlanningRequest> = async (values) => {
    await addRead({
      pages: values.pages,
    });
    form.resetFields();
  };
  const getPast7Days = (): string[] => {
    const past7Days: string[] = [];
    const today = moment();

    for (let i = 6; i >= 0; i--) {
      past7Days.push(today.clone().subtract(i, "days").format("YYYY-MM-DD"));
    }

    return past7Days;
  };

  
  const labels: string[] = getPast7Days();
  const data: ChartData<"line"> = {
    labels: labels,
    datasets: [
      {
        label: "Plan",
        data: [pages, pages, pages, pages, pages, pages, pages],
        borderColor: "green",
        fill: false,
      },
      {
        label: "Fact",
        data: [18, 39, 4, 50, 70, 33, 87],
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

  return (
    <>
      <div className={css.trpl}>
        <div className={css.trainCont}>
          <h2 className={css.textTrain}>My training</h2>
          {!isTrainingStarted || currentlyReading.length === 0 ? (
            <Form
              form={form}
              onFinish={handleAddBtn}
              initialValues={{ remember: true }}
            >
              <Space direction="vertical" size={12} className={css.formDate}>
                <Form.Item
                  label="Дата начала"
                  name="startDate"
                  rules={[
                    {
                      required: true,
                      message: "Пожалуйста, выберите дату начала!",
                    },
                  ]}
                >
                  <DatePicker
                    minDate={todayAsDayjs}
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
                  label="Дата окончания"
                  name="endDate"
                  rules={[
                    {
                      required: true,
                      message: "Пожалуйста, выберите дату окончания!",
                    },
                  ]}
                >
                  <DatePicker
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
                <div className={css.boxBook}>
                  <Form.Item
                    name="books"
                    rules={[
                      {
                        required: true,
                        message: "Пожалуйста, выберите книгу!",
                      },
                    ]}
                  >
                    <Cascader
                      className={css.inputBook}
                      options={options}
                      placeholder="Пожалуйста, выберите"
                      onChange={prepareBooks}
                    />
                  </Form.Item>
                  <div className={css.tableF}>
                    <table className={css.table}>
                      <thead>
                        <tr>
                          <th>title</th>
                          <th>author</th>
                          <th>publishYear</th>
                          <th>pagesTotal</th>
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
                  <Form.Item shouldUpdate>
                    {() => <button className={css.btnAddBook}>Добавить</button>}
                  </Form.Item>
                </div>
              </Space>
            </Form>
          ) : (
            <div className={css.currentlyReading}>
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
                  {currentlyReading.map((book) => (
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
                className={css.inputCont}
                label="Date"
                name="DateResult"
                rules={[
                  {
                    required: true,
                    message: "Please input!",
                  },
                ]}
              >
                <DatePicker minDate={todayAsDayjs} />
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
                <InputNumber min={0} className={css.inputCont} />
              </Form.Item>
            </div>
            <Form.Item shouldUpdate>
              {() => <button className={css.btnAddBook}>Add result</button>}
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
};
