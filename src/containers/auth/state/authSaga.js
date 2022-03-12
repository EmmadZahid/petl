import { takeLatest, put, call } from "redux-saga/effects";
import {
  LOGIN_USER,
  CHANGE_PASSWORD_CHALLENGE,
  LOGOUT_USER,
  USER,
  FORGOT_PASSWORD,
  UPDATE_PROFILE,
} from "./authActionTypes";
import { authActions } from "./authActions";
import AuthService from "../../../services/auth-service";
import MemberService from "services/member-service";

function* login({ data }) {
  try {
    let response = yield call(AuthService.login, data.email, data.password);
    if (response.challengeName === "NEW_PASSWORD_REQUIRED") {
      yield put(authActions.loginUser.failureChangePassword(response));
    } else {
      yield put(authActions.loginUser.success(response));
    }
  } catch (error) {
    yield put(authActions.loginUser.failure({ message: error.message }));
  }
}

function* logout() {
  try {
    yield call(AuthService.logout);
    yield put(authActions.logoutUser.success());
  } catch (error) {
    yield put(authActions.logoutUser.failure({ message: error.message }));
  }
}

function* changePasswordChallenge({ data }) {
  try {
    yield call(
      AuthService.changePasswordOnLogin,
      data.cognitoUser,
      data.newPassword
    );

    yield put(authActions.changePasswordChallenge.success());
  } catch (error) {
    yield put(
      authActions.changePasswordChallenge.failure({ message: error.message })
    );
  }
}

function* getMyProfile() {
  try {
    const response = yield call(MemberService.getMyProfile);

    yield put(authActions.user.success(response));
  } catch (error) {
    yield put(authActions.user.failure({ message: error.message }));
  }
}

function* forgotPassword({ data }) {
  try {
    let response = yield call(AuthService.forgotPassword, data.email);
    yield put(authActions.forgotPassword.success(response));
  } catch (error) {
    yield put(authActions.forgotPassword.failure({ message: error.message }));
  }
}

export function* watchChangePasswordChallenge() {
  yield takeLatest(CHANGE_PASSWORD_CHALLENGE.REQUEST, changePasswordChallenge);
}

export function* watchLogin() {
  yield takeLatest(LOGIN_USER.REQUEST, login);
}

export function* watchLogout() {
  yield takeLatest(LOGOUT_USER.REQUEST, logout);
}

export function* watchUser() {
  yield takeLatest(USER.REQUEST, getMyProfile);
}

export function* watchForgotPassword() {
  yield takeLatest(FORGOT_PASSWORD.REQUEST, forgotPassword);
}
