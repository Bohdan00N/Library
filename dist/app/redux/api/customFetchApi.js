"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var query_1 = require("@reduxjs/toolkit/query");
var baseUrl = "https://bookread-backend.goit.global";
var customFetchApi = (0, query_1.fetchBaseQuery)({
    baseUrl: baseUrl,
    prepareHeaders: function (headers, _a) {
        var getState = _a.getState;
        var token = getState().auth.accessToken;
        if (token) {
            headers.set("authorization", "Bearer ".concat(token));
        }
        return headers;
    },
});
exports.default = customFetchApi;
