"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useCurrentPlanMutation = exports.useAddReadMutation = exports.useStartPlanMutation = exports.planningApi = void 0;
var react_1 = require("@reduxjs/toolkit/query/react");
var customFetchApi_1 = require("./customFetchApi");
exports.planningApi = (0, react_1.createApi)({
    reducerPath: "planningApi",
    baseQuery: customFetchApi_1.default,
    endpoints: function (builder) { return ({
        startPlan: builder.mutation({
            query: function (data) {
                return {
                    url: "/planning",
                    method: "POST",
                    body: data,
                };
            },
        }),
        addRead: builder.mutation({
            query: function (data) {
                return {
                    url: "/planning",
                    method: "PATCH",
                    body: data,
                };
            },
        }),
        currentPlan: builder.mutation({
            query: function () {
                return {
                    url: "/planning",
                    method: "GET",
                };
            },
        }),
    }); },
});
exports.useStartPlanMutation = exports.planningApi.useStartPlanMutation, exports.useAddReadMutation = exports.planningApi.useAddReadMutation, exports.useCurrentPlanMutation = exports.planningApi.useCurrentPlanMutation;
