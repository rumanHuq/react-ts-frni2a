import * as React from 'react';
import { counterActions } from './store/counterSlice';
import { useAppDispatch, useAppState } from './store/store';
import './style.css';

export default function App() {
  const dispatch = useAppDispatch();
  const counter = useAppState((state) => state.counter);
  return (
    <div>
      <button onClick={() => dispatch(counterActions.increment(1))}>
        incr
      </button>
      <button onClick={() => dispatch(counterActions.decrement(1))}>
        decr
      </button>
      <p>{counter.value}</p>
    </div>
  );
}
