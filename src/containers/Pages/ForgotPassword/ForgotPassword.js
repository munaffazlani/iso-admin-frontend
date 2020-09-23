import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field } from "formik";
import emailSchema from "@iso/lib/helpers/validators/emailSchema";
import Input from "@iso/components/uielements/input";
import Button from "@iso/components/uielements/button";
import IntlMessages from "@iso/components/utility/intlMessages";
import authAction from "@iso/redux/auth/actions";
import ForgotPasswordStyleWrapper from "./ForgotPassword.styles";

export default function () {
  const { forgotPassword } = authAction;
  const isSubmitting = useSelector((state) => state.Auth.isSubmitting);
  const dispatch = useDispatch();
  const handleForgotPass = (values) => dispatch(forgotPassword(values));
  return (
    <ForgotPasswordStyleWrapper className="isoForgotPassPage">
      <div className="isoFormContentWrapper"> 
        <div className="isoFormContent">
          <div className="isoLogoWrapper">
            <Link to="/dashboard">
              <IntlMessages id="page.forgetPassTitle" />
            </Link>
          </div>

          <div className="isoFormHeadText">
            <h3>
              <IntlMessages id="page.forgetPassSubTitle" />
            </h3>
            <p>
              <IntlMessages id="page.forgetPassDescription" />
            </p>
          </div>

          <div className="isoForgotPassForm">
            <Formik
              initialValues={{
                email: "",
              }}
              validationSchema={emailSchema}
              onSubmit={(values) => {
                // same shape as initial values
                handleForgotPass(values);
              }}
            >
              {({ errors, touched }) => (
                <Form>
                  <div className="isoInputWrapper">
                    <Field name="email" as={Input} />
                    {errors.email && touched.email ? (
                      <div>{errors.email}</div>
                    ) : null}
                  </div>

                  <div className="isoInputWrapper">
                    <Button
                      type="primary"
                      htmlType="submit"
                      loading={isSubmitting}
                    >
                      <IntlMessages id="page.sendRequest" />
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </ForgotPasswordStyleWrapper>
  );
}
