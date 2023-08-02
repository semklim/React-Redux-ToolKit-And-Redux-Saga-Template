/**
 * @fileoverview Redux saga for fetching films.
 * @module redux/sagas/filmSaga
 */

import { call, put, takeEvery } from 'redux-saga/effects';
import { omdb } from '../../API/API';
import { getFilmsFailure, getFilmsSuccess } from '../filmeSlice/filmeSlice';

/**
 * Worker saga responsible for fetching films from the API.
 * Will be fired on "films/getFilms" actions.
 * @function
 * @generator
 * @param {import("@reduxjs/toolkit").PayloadAction<any>} action - The action containing the payload with the search query.
 */
function* workFetchFilms(action) {
  try {
    // Call the API to fetch films using the search query from the action payload
    const films = yield call(omdb, action.payload);
    // Format the API response to JSON
    const formattedFilms = yield films.json();
    // Dispatch the success action with the formatted films data
    yield put(getFilmsSuccess(formattedFilms));
  } catch (e) {
    // Dispatch the failure action with the error payload
    yield put(getFilmsFailure(e));
  }
}

/**
 * The root saga function for handling film-related actions.
 * Starts the workFetchFilms saga on each dispatched "films/getFilms" action.
 * Allows concurrent fetches of films.
 * @function
 * @generator
 */
export default function* mySaga() {
  // Listen for "films/getFilms" actions and call the workFetchFilms saga for each action
  yield takeEvery("films/getFilms", workFetchFilms);
}
