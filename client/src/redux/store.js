import { combineReducers, configureStore } from '@reduxjs/toolkit';

/** Import reducers */
import questionReducer from './question_reducer';
import resultReducer from './result_reducer';

/** Combine reducers */
const rootReducer = combineReducers({
    questions: questionReducer,
    result: resultReducer
});

/** Create store with reducer */
const store = configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== 'production', //  Enable DevTools only in dev mode
    middleware: (getDefaultMiddleware) => getDefaultMiddleware() //  Allows adding custom middleware later
});

export default store;
