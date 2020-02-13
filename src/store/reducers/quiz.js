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
} from '../actions/actionTypes';

const initialState = {
  quizes: [],
  loading: false,
  error: null,
  results: {},
  isFinished: false,
  activeQuestion: 0,
  answerState: null,
  quiz: null
};

export default function quizeReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_QUIZES_START:
      return {
        ...state,
        loading: true
      };
    case FETCH_QUIZES_SUCCESS:
      return {
        ...state,
        quizes: action.quizes,
        loading: false
      };
    case FETCH_QUIZES_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error
      };

    case FETCH_QUIZE_BY_ID_START:
      return {
        ...state,
        loading: true
      };
    case FETCH_QUIZE_BY_ID_SUCCESS:
      return {
        ...state,
        quiz: action.quiz,
        loading: false
      };
    case FETCH_QUIZE_BY_ID_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case QUIZ_SET_STATE:
      return {
        ...state,
        answerState: action.answerState,
        results: action.results
      };
    case FINISH_QUIZ:
      return {
        ...state,
        isFinished: true
      };
    case QUIZ_NEXT_QUESTION:
      return {
        ...state,
        activeQuestion: action.questionNumber,
        answerState: null
      };
    case RETRY_QUIZ:
      return {
        ...state,
        results: {},
        isFinished: false,
        activeQuestion: 0,
        answerState: null
      };
    default:
      return state;
  }
}
