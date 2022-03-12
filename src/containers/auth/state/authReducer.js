import {
  LOGIN_USER,
  CHANGE_PASSWORD_CHALLENGE,
  LOGOUT_USER,
  USER,
  UPDATE_PROFILE,
} from "./authActionTypes";
import produce from "immer";
import AuthService from "services/auth-service";

// let token = LocalStorageService.getItem(localStorageKeys.ID_TOKEN);
// let roles = LocalStorageService.getItem(localStorageKeys.USER_ROLES);

const initState = {
  user: null,
  cognitoUser: null,
  isAuthenticated: AuthService.isMemberLoggedIn() ? true : false,
  newPasswordRequired: false,
  loading: false,
  error: null,
  chanllengeError: null,
  initialDataLoading: false,
};

export const authReducer = (state = initState, action) => {
  switch (action.type) {
    case LOGIN_USER.REQUEST:
      return produce(state, (draftState) => {
        draftState.loading = true;
        draftState.error = null;
        draftState.user = null;
      });
    case LOGIN_USER.SUCCESS:
      return produce(state, (draftState) => {
        draftState.isAuthenticated = true;
        draftState.loading = false;
        draftState.error = null;
        // draftState.user = action.payload;
      });
    case LOGIN_USER.FAILURE:
      return produce(state, (draftState) => {
        draftState.loading = false;
        draftState.error = action.payload;
      });
    case LOGIN_USER.FAILURE_CHANGE_PASSWORD:
      return produce(state, (draftState) => {
        draftState.loading = false;
        draftState.newPasswordRequired = true;
        draftState.chanllengeError = null;
        draftState.cognitoUser = action.payload;
      });
    case CHANGE_PASSWORD_CHALLENGE.REQUEST:
      return produce(state, (draftState) => {
        draftState.loading = true;
      });
    case CHANGE_PASSWORD_CHALLENGE.SUCCESS:
      return produce(state, (draftState) => {
        draftState.loading = false;
        draftState.newPasswordRequired = false;
        draftState.cognitoUser = null;
      });
    case CHANGE_PASSWORD_CHALLENGE.FAILURE:
      return produce(state, (draftState) => {
        draftState.loading = false;
        draftState.chanllengeError = action.payload;
      });
    case LOGOUT_USER.SUCCESS:
      return produce(state, (draftState) => {
        draftState.isAuthenticated = false;
        draftState.user = null
      });

    case USER.REQUEST:
      return produce(state, (draftState) => {
        draftState.initialDataLoading = true;
      });
    case USER.SUCCESS:
      return produce(state, (draftState) => {
        draftState.initialDataLoading = false;
        draftState.user = action.payload;
      });
    case USER.FAILURE:
      return produce(state, (draftState) => {});
   
    case UPDATE_PROFILE.SUCCESS:
      return produce(state, (draftState) => {
        draftState.user = action.payload;
      });
    
    default:
      return state;
  }
};
