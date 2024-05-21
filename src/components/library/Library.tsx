import css from "./library.module.scss";
import { EmptyLib } from "../emptyLib/EmptyLib";
import React from "react";
import {
  useDeleteBookMutation,
  useGetBooksQuery,
} from "../../app/redux/api/bookApi";

export const Library: React.FC = () => {
  const [deleteBook] = useDeleteBookMutation();
  const { data: userData, isLoading } = useGetBooksQuery();

  const handleDeleteBook = async (id: string) => {
    try {
      await deleteBook({ bookId: id }).unwrap();
      console.log(`Deleted book with ID: ${id}`);
    } catch (err) {
      console.error("Failed to delete book:", err);
    }
  };

  if (isLoading) return <div>Loading...</div>;

  if (!userData || !Array.isArray(userData.goingToRead)) {
    return (
      <div>
        <EmptyLib />
      </div>
    );
  }

  const goingToReadData = userData.goingToRead;

  return (
    <div>
      <div className={css.container}>
      <h2>Going to read</h2>
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
          {goingToReadData.map((book) => (
            <React.Fragment key={book._id}>
              <div className="listCon1">
                <ul className={css.list}>
                  <li>{book.title}</li>
                </ul>
              </div>
              <div className="listCon2">
                <ul className={css.list}>
                  <li>{book.author}</li>
                </ul>
              </div>
              <div className="listCon3">
                <ul className={css.list}>
                  <li>{book.publishYear}</li>
                </ul>
              </div>
              <div className="listCon4">
                <ul className={css.list}>
                  <li>{book.pagesTotal}</li>
                </ul>
              </div>
              <div className="listCon5">
                <ul className={css.list}>
                  <li>
                    <button
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
        <div className="">
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
          <li>
            <p>Rating</p>
          </li>
        </ul>
        </div>
        <div className="">
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
          <li>
            <p>Rating</p>
          </li>
        </ul>
        </div>

    </div>
  );
};
