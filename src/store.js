import {configureStore} from '@reduxjs/toolkit';
import rootReducer from './slices/index';

let debuggingMiddlewares = [];
if (__DEV__) {
  const createDebugger = require('redux-flipper').default;
  debuggingMiddlewares = [createDebugger()];
}
const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(debuggingMiddlewares),
});

export default store;
