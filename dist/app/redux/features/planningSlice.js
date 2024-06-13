"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectIsTrainingStarted = exports.selectPages = exports.selectPlan = exports.setReadPages = exports.resetPlan = exports.setPlan = void 0;
var toolkit_1 = require("@reduxjs/toolkit");
var initialState = {
    plans: null,
    isTrainingStarted: {},
    isPagesAdded: null,
};
var planningSlice = (0, toolkit_1.createSlice)({
    name: 'planning',
    initialState: initialState,
    reducers: {
        setPlan: function (state, action) {
            console.log('setPlan called with:', action.payload); // Отладочный вывод
            if (!state.plans) {
                state.plans = {};
            }
            state.plans[action.payload.userId] = action.payload.plan;
            state.isTrainingStarted[action.payload.userId] = true;
            console.log('State after setPlan:', state); // Отладочный вывод
        },
        setReadPages: function (state, action) {
            console.log('setPages called with:', action.payload); // Отладочный вывод
            if (!state.isPagesAdded) {
                state.isPagesAdded = {};
            }
            state.isPagesAdded[action.payload.userId] = action.payload.plan;
            console.log('State after setPages:', state); // Отладочный вывод
        },
        resetPlan: function (state, action) {
            console.log('resetPlan called with:', action.payload); // Отладочный вывод
            if (state.plans) {
                delete state.plans[action.payload.userId];
            }
            delete state.isTrainingStarted[action.payload.userId];
            console.log('State after resetPlan:', state); // Отладочный вывод
        },
    },
});
exports.setPlan = (_a = planningSlice.actions, _a.setPlan), exports.resetPlan = _a.resetPlan, exports.setReadPages = _a.setReadPages;
var selectPlan = function (state, userId) {
    var plans = state.planning.plans;
    console.log('selectPlan:', plans, userId); // Отладочный вывод
    return plans ? plans[userId] || null : null;
};
exports.selectPlan = selectPlan;
var selectPages = function (state, userId) {
    var pages = state.planning.isPagesAdded;
    console.log('selectPages:', pages, userId); // Отладочный вывод
    return pages ? pages[userId] || null : null;
};
exports.selectPages = selectPages;
var selectIsTrainingStarted = function (state, userId) {
    var isTrainingStarted = state.planning.isTrainingStarted;
    console.log('selectIsTrainingStarted:', isTrainingStarted, userId); // Отладочный вывод
    return isTrainingStarted[userId] || false;
};
exports.selectIsTrainingStarted = selectIsTrainingStarted;
exports.default = planningSlice.reducer;
// startPlanningResponse = {
//   startDate: null,
//   endDate: null,
//   books: [
//     {
//       title: null,
//       author: null,
//       publishYear: null,
//       pagesTotal: null,
//       pagesFinished: null,
//       rating: null,
//       feedback: null,
//       _id: null,
//       __v: null,
//     },
//   ],
//   duration: null,
//   pagesPerDay: null,
//   stats: {
//     date: null,
//     pagesCount: null,
//   },
//   _id: null,
// };
