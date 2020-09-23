import { all, takeEvery, put, fork, call } from "redux-saga/effects";
import { createBrowserHistory } from "history";
import { message } from "antd";
import {
  login,
  changePassword,
  forgotpassword,
} from "@iso/lib/apiHelpers/authRequests";
import { getToken, clearToken } from "@iso/lib/helpers/utility";
import actions from "./actions";

const history = createBrowserHistory();
export function* loginRequest() {
  yield takeEvery(actions.LOGIN_REQUEST, function* ({ payload }) {
    try {
      const response = yield call(login, payload);
      if (response.status) {
        yield put({
          type: actions.LOGIN_SUCCESS,
          token: response.data[0].Usertoken,
        });
        message.success(response.message);
        history.push("/dashboard");
      } else {
        yield put({ type: actions.LOGIN_ERROR });
        message.error(response.message);
      }
    } catch (error) {
      console.log(error);
      yield put({ type: actions.LOGIN_ERROR });
    }
  });
}

export function* loginSuccess() {
  yield takeEvery(actions.LOGIN_SUCCESS, function* (payload) {
    console.log(payload);
    if (localStorage.getItem("remember_me")) {
      yield sessionStorage.clear();
      yield localStorage.setItem("user_token", payload.token);
    } else {
      yield localStorage.clear();
      yield sessionStorage.setItem("user_token", payload.token);
    }
  });
}

export function* loginError() {
  yield takeEvery(actions.LOGIN_ERROR, function* () {});
}

export function* logout() {
  yield takeEvery(actions.LOGOUT, function* () {
    yield clearToken();
    history.push("/");
  });
}
export function* checkAuthorization() {
  yield takeEvery(actions.CHECK_AUTHORIZATION, function* () {
    const token = getToken().get("idToken");
    if (token) {
      yield put({
        type: actions.LOGIN_SUCCESS,
        token,
        profile: "Profile",
      });
    }
  });
}

export function* forgotPasswordSaga() {
  yield takeEvery(actions.FORGOT_PASSWORD, function* ({ payload }) {
    try {
      const response = yield call(forgotpassword, payload);
      if (response.status === 1) {
        yield put({ type: actions.FORGOT_PASSWORD_COMPLETED });
        message.success(response.message, 10);
      } else {
        yield put({ type: actions.FORGOT_PASSWORD_COMPLETED });
        message.error(response.message, 10);
      }
    } catch (error) {
      console.log(error);
      message.error(error, 10);
      yield put({ type: actions.FORGOT_PASSWORD_COMPLETED });
    }
  });
}

export function* changePasswordSaga() {
  yield takeEvery(actions.CHANGE_PASSWORD, function* ({ payload }) {
    try {
      const response = yield call(changePassword, payload);
      if (response.status === 1) {
        history.push("/dashboard");
        message.success(response.message);
        yield put({ type: actions.CHANGE_PASSWORD_COMPLETED });
      } else {
        message.error(response.message);
        yield put({ type: actions.CHANGE_PASSWORD_COMPLETED });
      }
    } catch (error) {
      yield put({ type: actions.CHANGE_PASSWORD_COMPLETED });
      console.log(error);
    }
  });
}
export default function* rootSaga() {
  yield all([
    fork(checkAuthorization),
    fork(loginRequest),
    fork(forgotPasswordSaga),
    fork(changePasswordSaga),
    fork(loginSuccess),
    fork(loginError),
    fork(logout),
  ]);
}
