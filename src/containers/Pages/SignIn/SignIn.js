import React from "react";
import { Link, Redirect, useHistory, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Formik, Form, Field } from "formik";
import loginSchema from "@iso/lib/helpers/validators/loginSchema";
import Input from "@iso/components/uielements/input";
import Checkbox from "@iso/components/uielements/checkbox";
import Button from "@iso/components/uielements/button";
import IntlMessages from "@iso/components/utility/intlMessages";
import FirebaseLoginForm from "../../FirebaseForm/FirebaseForm";
import authAction from "@iso/redux/auth/actions";
import appAction from "@iso/redux/app/actions";
import Auth0 from "../../Authentication/Auth0/Auth0";
import {
  signInWithGoogle,
  signInWithFacebook,
} from "@iso/lib/firebase/firebase.authentication.util";
import SignInStyleWrapper from "./SignIn.styles";

const { login } = authAction;
const { clearMenu } = appAction;

export default function SignIn() {
  let history = useHistory();
  let location = useLocation();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.Auth.userToken);
  const isSubmitting = useSelector((state) => state.Auth.isSubmitting);

  const handleSubmit = (payload) => {
    dispatch(login(payload, history));
  };

  let { from } = location.state || { from: { pathname: "/dashboard" } };

  if (isLoggedIn) {
    return <Redirect to={from} />;
  }
  return (
    <SignInStyleWrapper className="isoSignInPage">
      <div className="isoLoginContentWrapper">
        <div className="isoLoginContent">
          <div className="isoLogoWrapper">
            <Link to="/dashboard">
              <IntlMessages id="page.signInTitle" />
            </Link>
          </div>
          <div className="isoSignInForm">
            <Formik
              initialValues={{
                email: "",
                password: "",
                remember_me: true,
              }}
              validationSchema={loginSchema}
              onSubmit={(values) => {
                console.log(values);
                if (values.remember_me) {
                  localStorage.setItem("remember_me", values.remember_me);
                }
                delete values.remember_me;
                // deleting remember me to make data exactly like we want payload in api call
                handleSubmit(values);
              }}
            >
              {({ errors, touched }) => (
                <Form>
                  <div className="isoInputWrapper">
                    <Field
                      autoComplete="true"
                      size="large"
                      placeholder="Email"
                      name="email"
                      type="email"
                      as={Input}
                    />
                    {errors.email && touched.email ? (
                      <div>{errors.email}</div>
                    ) : null}
                  </div>

                  <div className="isoInputWrapper">
                    <Field
                      type="password"
                      autoComplete="false"
                      size="large"
                      placeholder="Password"
                      name="password"
                      as={Input}
                    />
                    {errors.password && touched.password ? (
                      <div>{errors.password}</div>
                    ) : null}
                    <Link to="forgotPassword"> Forgot Password ? </Link>
                  </div>

                  <div className="isoInputWrapper isoLeftRightComponent">
                    <Checkbox>
                      <IntlMessages id="page.signInRememberMe" />
                    </Checkbox>
                    <Button
                      type="primary"
                      htmlType="submit"
                      loading={isSubmitting}
                    >
                      <IntlMessages id="page.signInButton" />
                    </Button>
                  </div>

                  <p className="isoHelperText">
                    <IntlMessages id="page.signInPreview" />
                  </p>
                </Form>
              )}
            </Formik>
            <div className="isoInputWrapper isoOtherLogin">
              <Button
                onClick={signInWithFacebook}
                type="primary"
                className="btnFacebook"
              >
                <IntlMessages id="page.signInFacebook" />
              </Button>
              <Button
                onClick={signInWithGoogle}
                type="primary"
                className="btnGooglePlus"
              >
                <IntlMessages id="page.signInGooglePlus" />
              </Button>

              <Button
                onClick={() => {
                  Auth0.login();
                }}
                type="primary"
                className="btnAuthZero"
              >
                <IntlMessages id="page.signInAuth0" />
              </Button>

              <FirebaseLoginForm
                history={history}
                login={(token) => dispatch(login(token))}
              />
            </div>
            <div className="isoCenterComponent isoHelperWrapper">
              <Link to="/forgotpassword" className="isoForgotPass">
                <IntlMessages id="page.signInForgotPass" />
              </Link>
              <Link to="/signup">
                <IntlMessages id="page.signInCreateAccount" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </SignInStyleWrapper>
  );
}
