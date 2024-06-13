"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useLoginUserMutation = exports.useRegisterUserMutation = exports.authApi = void 0;
var react_1 = require("@reduxjs/toolkit/query/react");
var customFetchApi_1 = require("./customFetchApi");
exports.authApi = (0, react_1.createApi)({
    reducerPath: "authApi",
    baseQuery: customFetchApi_1.default,
    endpoints: function (builder) { return ({
        registerUser: builder.mutation({
            query: function (data) {
                return {
                    url: "/auth/register",
                    method: "POST",
                    body: data,
                };
            },
        }),
        loginUser: builder.mutation({
            query: function (data) {
                return {
                    url: "/auth/login",
                    method: "POST",
                    body: data,
                };
            },
            extraOptions: {
                backoff: function () {
                    react_1.retry.fail({ fake: "error" });
                },
            },
        }),
    }); },
});
exports.useRegisterUserMutation = exports.authApi.useRegisterUserMutation, exports.useLoginUserMutation = exports.authApi.useLoginUserMutation;
