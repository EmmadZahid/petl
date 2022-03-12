import { all } from "@redux-saga/core/effects";
import {
  watchLogin,
  watchChangePasswordChallenge,
  watchLogout,
  watchUser,
  watchForgotPassword,
} from "./containers/auth/state/authSaga";

export const rootSaga = function* rootSaga() {
  yield all([
    watchLogin(),
    watchChangePasswordChallenge(),
    watchLogout(),
    watchUser(),
    watchForgotPassword(),
  ]);
};
