import axios from '../../axios/quiz';
import { RESET_QUIZ_CREATION, CREATE_QUIZ_ERROR, CREATE_QUIZ_QUESTION } from './actionTypes';

export const finishCreateQuiz = () => {
  return async (dispatch, getState) => {
    try {
      const state = getState().create;
      await axios.post(`/qiuzes.json`, state.quiz);

      dispatch(createQuizSuccess());
    } catch (err) {
      dispatch(createQuizError(err));
    }
  };
};

const createQuizSuccess = () => {
  return {
    type: RESET_QUIZ_CREATION
  };
};
const createQuizError = err => {
  return {
    type: CREATE_QUIZ_ERROR,
    error: err
  };
};

export const createQuizQuestion = item => {
  return {
    type: CREATE_QUIZ_QUESTION,
    item
  };
};
