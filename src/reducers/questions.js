import {
  RECEIVE_QUESTIONS,
  SAVE_ANSWER,
  NEW_QUESTION,
} from "../actions/questions";

export default function questions(state = {}, action) {
  switch (action.type) {
    case RECEIVE_QUESTIONS:
      return {
        ...state,
        ...action.questions,
      };
    case SAVE_ANSWER:
      return {
        ...state,
        [action.info.qid]: {
          ...state[action.info.qid],
          [action.info.answer]: {
            ...state[action.info.qid][action.info.answer],
            votes: state[action.info.qid][action.info.answer].votes.concat([
              action.info.authedUser,
            ]),
          },
        },
      };
    case NEW_QUESTION:
      const question = {
        [action.res.id]: {
          ...action.res
        }
      }
      return {
        ...state,
        ...question,
      }
    default:
      return state;
  }
}
