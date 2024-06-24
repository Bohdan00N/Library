import css from "./library.module.scss";
import { EmptyLib } from "../emptyLib/EmptyLib";
import React from "react";
import {
  useDeleteBookMutation,
  useGetBooksQuery,
} from "../../app/redux/api/bookApi";
import { useAppSelector } from "../../hooks/hooks";
import { selectAuth } from "../../app/redux/features/authSlice";
import Notiflix from "notiflix";

export const Library: React.FC = () => {
  const [deleteBook] = useDeleteBookMutation();
  const email = useAppSelector(selectAuth).userData.email;
  const { data: userData, isLoading } = useGetBooksQuery(email!);

  const handleDeleteBook = async (id: string) => {
    try {
      await deleteBook({ bookId: id }).unwrap();
      Notiflix.Notify.success("Book deleted");
    } catch (err) {
      console.error("Failed to delete book:", err);
    }
  };

  if (isLoading) return <div>Loading...</div>;

  if (
    !userData?.currentlyReading ||
    !userData?.finishedReading ||
    !userData?.goingToRead
  ) {
    return (
      <div>
        <EmptyLib />
      </div>
    );
  }

  const { goingToRead, currentlyReading, finishedReading } = userData;
  return (
    <div>
      <div className={css.container}>
        <h2>Done</h2>
        <ul className={css.namesList}>
          <li>
            <p>Book title</p>
          </li>
          <li>
            <p>Author</p>
          </li>
          <li>
            <p>Year of publish</p>
          </li>
          <li>
            <p>Pages</p>
          </li>
        </ul>
        <div className={css.allListCon}>
          {finishedReading.map((book) => (
            <React.Fragment key={book._id}>
              <div>
                <ul className={css.list}>
                  <li>{book.title}</li>
                </ul>
              </div>
              <div>
                <ul className={css.list}>
                  <li>{book.author}</li>
                </ul>
              </div>
              <div>
                <ul className={css.list}>
                  <li>{book.publishYear}</li>
                </ul>
              </div>
              <div>
                <ul className={css.list}>
                  <li>{book.pagesTotal}</li>
                </ul>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
      <div className={css.container}>
        <h2>Reading</h2>
        <ul className={css.namesList}>
          <li>
            <p>Book title</p>
          </li>
          <li>
            <p>Author</p>
          </li>
          <li>
            <p>Year of publish</p>
          </li>
          <li>
            <p>Pages</p>
          </li>
        </ul>
        <div className={css.allListCon}>
          {currentlyReading.map((book) => (
            <React.Fragment key={book._id}>
              <div >
                <ul className={css.list}>
                  <li>{book.title}</li>
                </ul>
              </div>
              <div >
                <ul className={css.list}>
                  <li>{book.author}</li>
                </ul>
              </div>
              <div >
                <ul className={css.list}>
                  <li>{book.publishYear}</li>
                </ul>
              </div>
              <div >
                <ul className={css.list}>
                  <li>{book.pagesTotal}</li>
                </ul>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
      <div className={css.container}>
        <h2>Going to read</h2>
        <ul className={css.namesList2}>
          <li>
            <p>Book title</p>
          </li>
          <li>
            <p>Author</p>
          </li>
          <li>
            <p>Year of publish</p>
          </li>
          <li>
            <p>Pages</p>
          </li>
        </ul>
        <div className={css.allListCon2}>
          {goingToRead.map((book) => (
            <React.Fragment key={book._id}>
              <div >
                <ul className={css.list}>
                  <li>{book.title}</li>
                </ul>
              </div>
              <div >
                <ul className={css.list}>
                  <li>{book.author}</li>
                </ul>
              </div>
              <div >
                <ul className={css.list}>
                  <li>{book.publishYear}</li>
                </ul>
              </div>
              <div >
                <ul className={css.list}>
                  <li>{book.pagesTotal}</li>
                </ul>
              </div>
              <div >
                <ul className={css.list}>
                  <li>
                    <button
                      className={css.btnDelete}
                      onClick={() => {
                        if (book._id) {
                          handleDeleteBook(book._id);
                        } else {
                          console.error("Book ID is null");
                        }
                      }}
                    >
                      Delete
                    </button>
                  </li>
                </ul>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};
