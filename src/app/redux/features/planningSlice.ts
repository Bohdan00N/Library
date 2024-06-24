import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { addPlanningResponse, startPlanningResponse } from "../api/types";
import { RootState } from "../../store";

interface PlanningState {
  plans: { [userId: string]: startPlanningResponse } | null;
  isTrainingStarted: { [userId: string]: boolean };
  isPagesAdded: { [userId: string]: addPlanningResponse } | null;
}

const initialState: PlanningState = {
  plans: null,
  isTrainingStarted: {},
  isPagesAdded: null,
};

const planningSlice = createSlice({
  name: "planning",
  initialState,
  reducers: {
    setPlan(
      state,
      action: PayloadAction<{ userId: string; plan: startPlanningResponse }>
    ) {
      if (!state.plans) {
        state.plans = {};
      }
      state.plans[action.payload.userId] = action.payload.plan;
      state.isTrainingStarted[action.payload.userId] = true;
      state.isPagesAdded = null;
    },
    setReadPages(
      state,
      action: PayloadAction<{ userId: string; plan: addPlanningResponse }>
    ) {
      if (!state.isPagesAdded) {
        state.isPagesAdded = {};
      }
      state.isPagesAdded[action.payload.userId] = action.payload.plan;
    },
    resetPlan(state, action: PayloadAction<{ userId: string }>) {
      if (state.plans) {
        state.isTrainingStarted[action.payload.userId] = false;
        state.isPagesAdded = null;
        state.plans = null;
        // state.plans
      }
      state.isTrainingStarted[action.payload.userId] = false;
    },
  },
});

export const { setPlan, resetPlan, setReadPages } = planningSlice.actions;

export const selectPlan = (state: RootState, userId: string) => {
  const plans = state.planning.plans;
  return plans ? plans[userId] || null : null;
};
export const selectPages = (state: RootState, userId: string) => {
  const pages = state.planning.isPagesAdded;
  return pages ? pages[userId] || null : null;
};
export const selectIsTrainingStarted = (state: RootState, userId: string) => {
  const isTrainingStarted = state.planning.isTrainingStarted;
  return isTrainingStarted[userId] || false;
};

export default planningSlice.reducer;
