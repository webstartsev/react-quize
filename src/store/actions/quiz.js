import axios from '../../axios/quiz';
import {
  FETCH_QUIZES_START,
  FETCH_QUIZES_SUCCESS,
  FETCH_QUIZES_ERROR,
  FETCH_QUIZE_BY_ID_START,
  FETCH_QUIZE_BY_ID_SUCCESS,
  FETCH_QUIZE_BY_ID_ERROR,
  QUIZ_SET_STATE,
  FINISH_QUIZ,
  QUIZ_NEXT_QUESTION,
  RETRY_QUIZ
} from './actionTypes';

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

export const fetchQuizById = quizId => {
  console.log('quizId: ', quizId);
  return async dispatch => {
    dispatch(fetchQuizeByIdStart());
    try {
      const response = await axios.get(`/qiuzes/${quizId}.json`);

      const quiz = response.data;

      dispatch(fetchQuizeByIdSuccess(quiz));
    } catch (err) {
      dispatch(fetchQuizeByIdError(err));
    }
  };
};
export const fetchQuizeByIdStart = () => {
  return {
    type: FETCH_QUIZE_BY_ID_START
  };
};
export const fetchQuizeByIdSuccess = quiz => {
  return {
    type: FETCH_QUIZE_BY_ID_SUCCESS,
    quiz
  };
};
export const fetchQuizeByIdError = err => {
  return {
    type: FETCH_QUIZE_BY_ID_ERROR,
    error: err
  };
};

export const quizAnswerClick = answerId => {
  return (dispatch, getState) => {
    const state = getState().quiz;
    if (state.answerState) {
      const key = Object.keys(state.answerState)[0];
      if (state.answerState[key] === 'success') {
        return;
      }
    }

    const question = state.quiz[state.activeQuestion];
    const results = state.results;

    if (question.rightAnswerId === answerId) {
      if (!results[question.id]) {
        results[question.id] = `success`;
      }

      dispatch(quizSetState({ [answerId]: `success` }, results));

      setTimeout(() => {
        if (isQuizeFinished(state)) {
          dispatch(finishQuiz());
        } else {
          dispatch(quizNextQuestion(state.activeQuestion + 1));
        }
      }, 1000);
    } else {
      results[question.id] = `error`;
      dispatch(quizSetState({ [answerId]: `error` }, results));
    }
  };
};
const quizSetState = (answerState, results) => {
  return {
    type: QUIZ_SET_STATE,
    answerState,
    results
  };
};
const finishQuiz = () => {
  return {
    type: FINISH_QUIZ
  };
};
const quizNextQuestion = questionNumber => {
  return {
    type: QUIZ_NEXT_QUESTION,
    questionNumber
  };
};

export const retryQuiz = () => {
  return {
    type: RETRY_QUIZ
  };
};

function isQuizeFinished(state) {
  return state.activeQuestion + 1 === state.quiz.length;
}
