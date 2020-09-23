import actions from "./actions";

const initialState = {
  userToken: null,
  user: null,
  email: null,
  authorized: false,
  profile: {},
  isSubmitting: false,
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case actions.LOGIN_REQUEST:
      return {
        ...state,
        isSubmitting: true,
      };
    case actions.CHANGE_PASSWORD:
      return {
        ...state,
        isSubmitting: true,
      };
    case actions.CHANGE_PASSWORD_COMPLETED:
      return {
        ...state,
        isSubmitting: false,
      };
    case actions.FORGOT_PASSWORD:
      return {
        ...state,
        isSubmitting: true,
      };
    case actions.FORGOT_PASSWORD_COMPLETED:
      return {
        ...state,
        isSubmitting: false,
      };
    case actions.LOGIN_SUCCESS:
      return {
        ...state,
        userToken: action.token,
        authorized: true,
        isSubmitting: false,
      };
    case actions.LOGIN_ERROR:
      return {
        ...state,
        isSubmitting: false,
      };
    case actions.CHECK_AUTHORIZATION:
      return {
        ...state,
        userToken: action.token,
      };
    case actions.GET_PROFILE_SUCCESS:
      return {
        ...state,
        profile: action.payload,
      };
    case actions.LOGOUT:
      return initialState;
    default:
      return state;
  }
}
