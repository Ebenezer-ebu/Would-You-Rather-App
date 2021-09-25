import { RECEIVE_USERS } from "../actions/users";
import { SAVE_ANSWER, NEW_QUESTION } from "../actions/questions";

export default function users(state = {}, action) {
  switch (action.type) {
    case RECEIVE_USERS:
      return {
        ...state,
        ...action.users,
      };
    case SAVE_ANSWER:
      return {
        ...state,
        [action.info.authedUser]: {
          ...state[action.info.authedUser],
          answers: {
            ...state[action.info.authedUser].answers,
            [action.info.qid]: action.info.answer,
          },
        },
      };
    case NEW_QUESTION:
      return {
        ...state,
        [action.res.author]: {
          ...state[action.res.author],
          questions: state[action.res.author].questions.concat([action.res.id]),
        },
      };
    default:
      return state;
  }
}
