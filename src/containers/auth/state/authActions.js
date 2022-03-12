import {
  LOGIN_USER,
  CHANGE_PASSWORD_CHALLENGE,
  LOGOUT_USER,
  USER,
  FORGOT_PASSWORD,
  UPDATE_PROFILE
} from "./authActionTypes";

export const authActions = {
  loginUser: {
    request: (email, password) => ({
      type: LOGIN_USER.REQUEST,
      data: { email, password }
    }),
    success: payload => ({ type: LOGIN_USER.SUCCESS, payload }),
    failure: payload => ({ type: LOGIN_USER.FAILURE, payload }),
    failureChangePassword: payload => ({
      type: LOGIN_USER.FAILURE_CHANGE_PASSWORD,
      payload
    })
  },
  changePasswordChallenge: {
    request: (cognitoUser, newPassword) => ({
      type: CHANGE_PASSWORD_CHALLENGE.REQUEST,
      data: { cognitoUser, newPassword }
    }),
    success: payload => ({ type: CHANGE_PASSWORD_CHALLENGE.SUCCESS, payload }),
    failure: payload => ({ type: CHANGE_PASSWORD_CHALLENGE.FAILURE, payload })
  },
  logoutUser: {
    request: () => ({
      type: LOGOUT_USER.REQUEST
    }),
    success: () => ({ type: LOGOUT_USER.SUCCESS }),
    failure: payload => ({ type: LOGOUT_USER.FAILURE, payload })
  },
  user: {
    request: () => ({
      type: USER.REQUEST
    }),
    success: payload => ({ type: USER.SUCCESS, payload }),
    failure: payload => ({ type: USER.FAILURE, payload })
  },
  forgotPassword: {
    request: (email) => ({
      type: FORGOT_PASSWORD.REQUEST,
      data: { email }
    }),
    success: payload => ({ type: FORGOT_PASSWORD.SUCCESS, payload }),
    failure: payload => ({ type: FORGOT_PASSWORD.FAILURE, payload }),
  },
  updateProfile: {
    success: payload => ({ type: UPDATE_PROFILE.SUCCESS, payload }),
    failure: payload => ({ type: UPDATE_PROFILE.FAILURE, payload }),
  },
};
