import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { startPlanningResponse } from "../api/types";
import { RootState } from "../../store";

interface PlanningState {
  plans: { [userId: string]: startPlanningResponse } | null;
  isTrainingStarted: { [userId: string]: boolean };
}

const initialState: PlanningState = {
  plans: null,
  isTrainingStarted: {},
};

const planningSlice = createSlice({
  name: 'planning',
  initialState,
  reducers: {
    setPlan(state, action: PayloadAction<{ userId: string; plan: startPlanningResponse }>) {
      console.log('setPlan called with:', action.payload); // Отладочный вывод
      if (!state.plans) {
        state.plans = {};
      }
      state.plans[action.payload.userId] = action.payload.plan;
      state.isTrainingStarted[action.payload.userId] = true;
      console.log('State after setPlan:', state); // Отладочный вывод
    },
    resetPlan(state, action: PayloadAction<{ userId: string }>) {
      console.log('resetPlan called with:', action.payload); // Отладочный вывод
      if (state.plans) {
        delete state.plans[action.payload.userId];
      }
      delete state.isTrainingStarted[action.payload.userId];
      console.log('State after resetPlan:', state); // Отладочный вывод
    },
  },
});

export const { setPlan, resetPlan } = planningSlice.actions;

export const selectPlan = (state: RootState, userId: string) => {
  const plans = state.planning.plans;
  console.log('selectPlan:', plans, userId); // Отладочный вывод
  return plans ? plans[userId] || null : null;
};

export const selectIsTrainingStarted = (state: RootState, userId: string) => {
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