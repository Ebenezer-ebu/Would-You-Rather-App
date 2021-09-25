export const SET_AUTHED_USER = "SET_AUTHED_USER";

export function setAuthedUser(info) {
  return {
    type: SET_AUTHED_USER,
    info,
  };
}
