import { useEffect, useState } from "react";
import { Button, Form, Input, InputNumber } from "antd";
import css from "./addBook.module.scss";
import { Library } from "../library/Library";
import { RootState, useAppDispatch } from "../../app/store";
import { useAddBookMutation } from "../../app/redux/api/bookApi";
import { addBookRequest  } from "../../app/redux/api/types";
import { SubmitHandler } from "react-hook-form";
import { setBook } from "../../app/redux/features/bookSlice";

import { useSelector } from "react-redux";
import { useAppSelector } from "../../hooks/hooks";
// import { useAppSelector } from "../../hooks/hooks";

export const AddBook = () => {
  const [form] = Form.useForm();
  const [clientReady, setClientReady] = useState<boolean>(false);
const token = useSelector((state: RootState) => state.auth.token);
console.log('Token:', token);
  useEffect(() => {
    setClientReady(true);
  }, [form]);

  const dispatch = useAppDispatch();

  const [
    addBook,
    {
      data: addBookData,
      isLoading: addBookLoading,
      isSuccess: addBookSuccess,
      // error: addBookError,
    },
  ] = useAddBookMutation();

  const onFinish: SubmitHandler<addBookRequest> = async ({
    title,
    author,
    publishYear,
    pagesTotal,
  }) => {
    if (title && author && publishYear && pagesTotal && clientReady) {
      try {
        await addBook({ title, author, publishYear, pagesTotal });
        form.resetFields();
      } catch (error) {
        console.error("Ошибка при добавлении книги:", error);
      }
    } else {
      console.error("Ошибка: Не все данные книги заполнены.");
    }
  };
  const userId = useAppSelector((state: RootState) => state.auth.id);
  // const userId = useAppSelector(selectUserId) as string
  // console.log(userId);

  useEffect(() => {
    if (addBookSuccess) {
      const title = addBookData.title;
      const author = addBookData.author;
      const publishYear = addBookData.publishYear;
      const pagesTotal = addBookData.pagesTotal;
      const bookId = addBookData._id;
      if (title && author && publishYear && pagesTotal) {
        dispatch(
          setBook({
           userId: userId!,
            book: {
              title: title,
              author: author,
              publishYear: publishYear,
              pagesTotal: pagesTotal,
              _id: bookId,
            },
          })
        );
        form.resetFields();
      }
    }
  
  }, [dispatch, addBookSuccess, addBookData, form, userId]);

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
