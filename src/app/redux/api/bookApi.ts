import { createApi } from "@reduxjs/toolkit/query/react";
import customFetchApi from "./customFetchApi";
import {
  addBookResponse,
  addBookRequest,
  bookReviewResponse,
  bookReviewRequest,
  userData,
} from "./types";

export const bookApi = createApi({
  reducerPath: "bookApi",
  baseQuery: customFetchApi,
  tagTypes: ["Book"],
  endpoints: (builder) => ({
    addBook: builder.mutation<addBookResponse, addBookRequest>({
      query(data) {
        return {
          url: "/book",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["Book"],
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const bookId = data._id;
          console.log("Added book ID:", bookId);
        } catch (error) {
          console.error("Error adding book:", error);
        }
      },
    }),
    deleteBook: builder.mutation<void, { bookId: string }>({
      query({ bookId }) {
        return {
          url: `/book/${bookId}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["Book"],
    }),
    reviewBook: builder.mutation<bookReviewResponse, bookReviewRequest>({
      query(data) {
        return {
          url: "/book/review/:bookId",
          method: "PATCH",
          body: data,
        };
      },
    }),
    getBooks: builder.query<userData, string>({
      query() {
        return {
          url: "user/books",
          method: "GET",
        };
      },
      providesTags: ["Book"],
    }),
  }),
});

export const {
  useAddBookMutation,
  useDeleteBookMutation,
  useReviewBookMutation,
  useGetBooksQuery,
} = bookApi;
