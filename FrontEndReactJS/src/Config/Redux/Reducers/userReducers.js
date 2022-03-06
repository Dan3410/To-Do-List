import {
    LOGOUT_USER,
    LOGIN_USER,
  } from "../ActionsType/userActionsType";
  
  const initialState = {
    isLoggedIn: false,
    username: null,
  };
  
  function loadUserData(username) {
    return { isLoggedIn: true, username: username};
  }
  
  function userReducer(state = initialState, action) {
    switch (action.type) {
      case LOGOUT_USER:
        return initialState;
      case LOGIN_USER:
        return loadUserData(action.username);
      default:
        return state;
    }
  }
  
  export default userReducer;