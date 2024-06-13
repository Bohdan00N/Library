import { createApi } from "@reduxjs/toolkit/query/react";
import customFetchApi from "./customFetchApi";
export const bookApi = createApi({
    reducerPath: "bookApi",
    baseQuery: customFetchApi,
    tagTypes: ["book"],
    endpoints: (builder) => ({
        addBook: builder.mutation({
            query(data) {
                return {
                    url: "/book",
                    method: "POST",
                    body: data,
                };
            },
            invalidatesTags: ["book"],
            async onQueryStarted(_, { queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    const bookId = data._id;
                    console.log("Added book ID:", bookId);
                }
                catch (error) {
                    console.error("Error adding book:", error);
                }
            },
        }),
        deleteBook: builder.mutation({
            query({ bookId }) {
                return {
                    url: `/book/${bookId}`,
                    method: "DELETE",
                };
            },
            invalidatesTags: ["book"],
        }),
        reviewBook: builder.mutation({
            query(data) {
                return {
                    url: "/book/review/:bookId",
                    method: "PATCH",
                    body: data,
                };
            },
        }),
        getBooks: builder.query({
            query() {
                return {
                    url: "user/books",
                    method: "GET",
                };
            },
            providesTags: ["book"],
        }),
    }),
});
export const { useAddBookMutation, useDeleteBookMutation, useReviewBookMutation, useGetBooksQuery, } = bookApi;
