/**
 * @fileoverview Redux store configuration.
 * @module redux/store
 */

import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from 'redux-saga';
import filmsReducer from "./feature/filmeSlice/filmeSlice";
import mySaga from "./feature/filmeSaga/filmSaga";

// Create the Saga middleware
const saga = createSagaMiddleware();
// Array of middlewares to apply to the store
const middleware = [saga];

/**
 * The Redux store instance with the configured reducers and middleware.
 * @type {import("@reduxjs/toolkit").EnhancedStore}
 */
export const store = configureStore({
  // Combine reducers with the 'films' reducer from the 'filmeSlice' file
  reducer: {
    films: filmsReducer,
  },
  // Apply the created Saga middleware along with any other default middlewares
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(middleware),
});

// Run the root saga to handle film-related actions
saga.run(mySaga);

/**
 * The default export is the configured Redux store.
 * @type {import("@reduxjs/toolkit").EnhancedStore}
 */
export default store;
