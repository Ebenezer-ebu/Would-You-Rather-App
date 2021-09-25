import { SET_AUTHED_USER } from "../actions/authedUser";
import { SAVE_ANSWER, NEW_QUESTION } from "../actions/questions";

export default function authedUser(state = null, action) {
  switch (action.type) {
    case SET_AUTHED_USER:
      return action.info;
    case SAVE_ANSWER:
      return {
        ...state,
        selectedOption: {
          ...state.selectedOption,
          answers: {
            ...state.selectedOption.answers,
            [action.info.qid]: [action.info.answer],
          },
        },
      };
    case NEW_QUESTION:
      return {
        ...state,
        selectedOption: {
          ...state.selectedOption,
          questions: state.selectedOption.questions.concat([action.res.id])
        }
      };
    default:
      return state;
  }
}
