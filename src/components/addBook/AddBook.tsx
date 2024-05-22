import { useEffect, useState } from "react";
import { Button, Form, Input, InputNumber } from "antd";
import css from "./addBook.module.scss";
import { Library } from "../library/Library";
import { useAppDispatch } from "../../app/store";
import { useAddBookMutation } from "../../app/redux/api/bookApi";
import { addBookRequest } from "../../app/redux/api/types";
import { SubmitHandler } from "react-hook-form";
import { setBook } from "../../app/redux/features/bookSlice";
import { selectAuth } from "../../app/redux/features/authSlice";
import { useAppSelector } from "../../hooks/hooks";

export const AddBook = () => {
  const [form] = Form.useForm();
  const [clientReady, setClientReady] = useState<boolean>(false);
  const email = useAppSelector(selectAuth).userData.email;

  useEffect(() => {
    setClientReady(true);
  }, [form]);

  const dispatch = useAppDispatch();

  const [
    addBook,
    { data: addBookData, isLoading: addBookLoading, isSuccess: addBookSuccess },
  ] = useAddBookMutation();

  const onFinish: SubmitHandler<addBookRequest> = async (values) => {
    const { title, author, publishYear, pagesTotal } = values;
    if (!title || !author || !publishYear || !pagesTotal || !clientReady) {
      console.error("Ошибка: Не все данные книги заполнены.");
      return;
    }

    try {
      await addBook({ title, author, publishYear, pagesTotal });
      form.resetFields();
    } catch (error) {
      console.error("Ошибка при добавлении книги:", error);
    }
  };

  useEffect(() => {
    if (addBookSuccess && addBookData) {
      const { title, author, publishYear, pagesTotal, _id } = addBookData;
      if (title && author && publishYear && pagesTotal) {
        dispatch(
          setBook({
            userId: email,
            book: {
              title,
              author,
              publishYear,
              pagesTotal,
              _id,
            },
          })
        );
        form.resetFields();
      }
    }
  }, [dispatch, addBookSuccess, addBookData, form, email]);

  return (
    <div className={css.addContainer}>
      <div className={css.add}>
        <Form
          form={form}
          labelCol={{ span: 300 }}
          wrapperCol={{ span: 150 }}
          layout="inline"
          style={{ minWidth: 700, gap: 15 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            className={css.input}
            name="title"
            label={"Book title"}
            rules={[
              {
                required: true,
                message: "Book title is required",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            className={css.input}
            name="author"
            label="Author"
            rules={[
              {
                required: true,
                message: "Author is required",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            className={css.input}
            name="publishYear"
            label="Publication year"
            rules={[
              {
                required: true,
                message: "Publication year is required",
              },
            ]}
          >
            <InputNumber />
          </Form.Item>

          <Form.Item
            className={css.input}
            name="pagesTotal"
            label="Amount of pages"
            rules={[
              {
                required: true,
                message: "Amount of pages is required",
              },
            ]}
          >
            <InputNumber />
          </Form.Item>

          <Form.Item shouldUpdate>
            {() => (
              <Button
                type="primary"
                htmlType="submit"
                ghost
                loading={addBookLoading}
              >
                Add
              </Button>
            )}
          </Form.Item>
        </Form>
      </div>
      <div className={css.lib}>
        <Library />
      </div>
    </div>
  );
};
