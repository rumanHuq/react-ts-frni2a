import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  value: 0,
};

export const counter = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment(state, action: PayloadAction<number>) {
      state.value += action.payload;
    },
    decrement(state, action: PayloadAction<number>) {
      state.value -= action.payload;
    },
  },
});
export const { actions: counterActions } = counter;
export const { reducer: counterReducers } = counter;
