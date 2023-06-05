import { createAction, createReducer } from "@reduxjs/toolkit";

//action creator
export const increment = createAction("increment/counter");

//reducer
const initialState = {
  value: 0,
};

export const counterSlice = createReducer(initialState, (builder) => {
  builder.addCase(increment, (state, action) => {
    state.value++;
  });
});
