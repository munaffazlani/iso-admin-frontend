const actions = {
  CHECK_AUTHORIZATION: "CHECK_AUTHORIZATION",
  LOGIN_REQUEST: "LOGIN_REQUEST",
  LOGOUT: "LOGOUT",
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
  LOGIN_ERROR: "LOGIN_ERROR",
  CHANGE_PASSWORD: "CHANGE_PASSWORD",
  FORGOT_PASSWORD: "FORGOT_PASSWORD",
  UPDATE_PROFILE: "UPDATE_PROFILE",
  GET_PROFILE: "GET_PROFILE",
  FORGOT_PASSWORD_COMPLETED: "FORGOT_PASSWORD_COMPLETED",
  GET_PROFILE_SUCCESS: "GET_PROFILE_SUCCESS",
  checkAuthorization: () => {
    return { type: actions.CHECK_AUTHORIZATION };
  },
  login: (payload) => ({
    type: actions.LOGIN_REQUEST,
    payload: payload,
  }),
  logout: () => ({
    type: actions.LOGOUT,
  }),
  changePassword: (payload) => ({
    type: actions.CHANGE_PASSWORD,
    payload: payload,
  }),
  forgotPassword: (email) => ({
    type: actions.FORGOT_PASSWORD,
    payload: email,
  }),
  forgotPasswordCompleted: () => ({
    type: actions.FORGOT_PASSWORD_COMPLETED,
  }),
  getProfile: () => ({
    type: actions.GET_PROFILE,
  }),
};
export default actions;
