import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field } from "formik";
import Input from "@iso/components/uielements/input";
import Button from "@iso/components/uielements/button";
import changePasswordSchema from "@iso/lib/helpers/validators/changePasswordSchema";
import IntlMessages from "@iso/components/utility/intlMessages";
import authAction from "@iso/redux/auth/actions";
import ResetPasswordStyleWrapper from "./ResetPassword.styles";

export default function () {
  const { changePassword } = authAction;
    const isSubmitting = useSelector((state) => state.Auth.isSubmitting);

  const dispatch = useDispatch();
  const handleChangePass = (values) => dispatch(changePassword(values));
  return (
    <ResetPasswordStyleWrapper className="isoResetPassPage">
      <div className="isoFormContentWrapper">
        <div className="isoFormContent">
          <div className="isoLogoWrapper">
            <Link to="/dashboard">
              <IntlMessages id="page.resetPassTitle" />
            </Link>
          </div>

          <div className="isoFormHeadText">
            <h3>
              <IntlMessages id="page.resetPassSubTitle" />
            </h3>
            <p>
              <IntlMessages id="page.resetPassDescription" />
            </p>
          </div>

          <div className="isoResetPassForm">
            <Formik
              initialValues={{
                password: "",
                confirmPassword: "",
              }}
              validationSchema={changePasswordSchema}
              onSubmit={(values) => {
                // same shape as initial values
                delete values.confirmPassword;
                values.token = localStorage.getItem("user_token");
                console.log(values);
                handleChangePass(values);
              }}
            >
              {({ errors, touched }) => (
                <Form>
                  <div className="isoInputWrapper">
                    <Field type="password" name="password" as={Input} />
                    {errors.password && touched.password ? (
                      <div>{errors.password}</div>
                    ) : null}
                  </div>

                  <div className="isoInputWrapper">
                    <Field type="password" name="confirmPassword" as={Input} />
                    {errors.confirmPassword && touched.confirmPassword ? (
                      <div>{errors.confirmPassword}</div>
                    ) : null}
                  </div>

                  <div className="isoInputWrapper">
                    <Button htmlType="submit" type="primary" loading={isSubmitting}>
                      <IntlMessages id="page.resetPassSave" />
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </ResetPasswordStyleWrapper>
  );
}
