import { LOGOUT_USER, LOGIN_USER } from "../ActionsType/userActionsType";

export function logoutUser() {
    return { type: LOGOUT_USER };
  }
  
  export function loginUser(username) {
    return { type: LOGIN_USER, username: username};
  }
