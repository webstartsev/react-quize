import { RESET_QUIZ_CREATION, CREATE_QUIZ_QUESTION } from '../actions/actionTypes';

const intialState = {
  quiz: []
};

export default function createReducer(state = intialState, action) {
  switch (action.type) {
    case CREATE_QUIZ_QUESTION:
      return {
        ...state,
        quiz: [...state.quiz, action.item]
      };
    case RESET_QUIZ_CREATION:
      return {
        ...state,
        quiz: []
      };
    default:
      return state;
  }
}
