import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    plans: null,
    isTrainingStarted: {},
    isPagesAdded: null,
};
const planningSlice = createSlice({
    name: 'planning',
    initialState,
    reducers: {
        setPlan(state, action) {
            console.log('setPlan called with:', action.payload); // Отладочный вывод
            if (!state.plans) {
                state.plans = {};
            }
            state.plans[action.payload.userId] = action.payload.plan;
            state.isTrainingStarted[action.payload.userId] = true;
            console.log('State after setPlan:', state); // Отладочный вывод
        },
        setReadPages(state, action) {
            console.log('setPages called with:', action.payload); // Отладочный вывод
            if (!state.isPagesAdded) {
                state.isPagesAdded = {};
            }
            state.isPagesAdded[action.payload.userId] = action.payload.plan;
            console.log('State after setPages:', state); // Отладочный вывод
        },
        resetPlan(state, action) {
            console.log('resetPlan called with:', action.payload); // Отладочный вывод
            if (state.plans) {
                delete state.plans[action.payload.userId];
            }
            delete state.isTrainingStarted[action.payload.userId];
            console.log('State after resetPlan:', state); // Отладочный вывод
        },
    },
});
export const { setPlan, resetPlan, setReadPages } = planningSlice.actions;
export const selectPlan = (state, userId) => {
    const plans = state.planning.plans;
    console.log('selectPlan:', plans, userId); // Отладочный вывод
    return plans ? plans[userId] || null : null;
};
export const selectPages = (state, userId) => {
    const pages = state.planning.isPagesAdded;
    console.log('selectPages:', pages, userId); // Отладочный вывод
    return pages ? pages[userId] || null : null;
};
export const selectIsTrainingStarted = (state, userId) => {
    const isTrainingStarted = state.planning.isTrainingStarted;
    console.log('selectIsTrainingStarted:', isTrainingStarted, userId); // Отладочный вывод
    return isTrainingStarted[userId] || false;
};
export default planningSlice.reducer;
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
