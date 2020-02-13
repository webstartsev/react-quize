import axios from '../../axios/quiz';
import { FETCH_QUIZES_START, FETCH_QUIZES_SUCCESS, FETCH_QUIZES_ERROR } from './actionTypes';

export const fetchQuizes = () => {
  return async dispatch => {
    dispatch(fetchQuizesStart());
    try {
      const response = await axios.get(`/qiuzes.json`);

      const quizes = [];
      Object.keys(response.data).forEach((key, i) => {
        quizes.push({
          id: key,
          name: `Test #${i + 1}`
        });
      });

      dispatch(fetchQuizesSuccess(quizes));
    } catch (err) {
      dispatch(fetchQuizesError(err));
    }
  };
};

export const fetchQuizesStart = () => {
  return {
    type: FETCH_QUIZES_START
  };
};

export const fetchQuizesSuccess = quizes => {
  return {
    type: FETCH_QUIZES_SUCCESS,
    quizes
  };
};

export const fetchQuizesError = err => {
  return {
    type: FETCH_QUIZES_ERROR,
    error: err
  };
};
