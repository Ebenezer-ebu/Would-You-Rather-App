import { saveQuestion, saveQuestionAnswer } from "../utils/api";

export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS";
export const SAVE_ANSWER = "SAVE_ANSWER";
export const NEW_QUESTION = "NEW_QUESTION";

function saveAnswer(info) {
  return {
    type: SAVE_ANSWER,
    info,
  };
}

export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  };
}

export function answeredQues(info) {
  return (dispatch) => {
    dispatch(saveAnswer(info));
    
    return saveQuestionAnswer(info)
      .catch((e) => {
        alert("There was an error. Try again", e);
      });
  };
}

function save_Ques(res) {
  return {
    type: NEW_QUESTION,
    res
  };
}

export function newQuestion(info) {
  return (dispatch) => {

    return saveQuestion(info).then(result => {
      return dispatch(save_Ques(result));
    }).catch((e) => {
      console.log(e)
      alert("Something went wrong. Try again!!", e)
    })
  }
}