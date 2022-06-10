import { AnyAction, configureStore, Dispatch } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { createEpicMiddleware, Epic, ofType } from 'redux-observable';
import { map, delay, takeWhile } from 'rxjs/operators';
import { counterActions, counterReducers } from './counterSlice';

const reducer = {
  counter: counterReducers,
};

type RootState = {
  [key in keyof typeof reducer]: ReturnType<typeof reducer[key]>;
};

type RootActions = AnyAction & {
  [key in keyof typeof counterActions]: typeof counterActions[key];
};

type IncrReturnType = ReturnType<RootActions['increment']>;
type MyEpic = Epic<AnyAction, AnyAction, RootState>;

const countEpic: MyEpic = (action$, state$) =>
  action$.pipe(
    ofType(counterActions.increment.toString()),
    delay(500),
    map((action: IncrReturnType) => counterActions.increment(action.payload)),
    takeWhile(() => state$.value.counter.value < 10)
  );

const epicMiddleware = createEpicMiddleware<AnyAction, AnyAction, RootState>();

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(epicMiddleware),
});

epicMiddleware.run(countEpic);

export const useAppDispatch = () => useDispatch<Dispatch>();
export const useAppState: TypedUseSelectorHook<RootState> = useSelector;
