import { Grid, Typography } from "@mui/material";
import { useState } from "react";
import { Formik, Form } from "formik/dist";
import FormikControl from "validation/FormikControl";
import { CustomButton } from "components";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  useRecoverTokenMutation,
  useResetPasswordMutation,
} from "redux/slices/authSlice";
import { toast } from "react-toastify";
import * as Yup from "yup";
const NewPassword = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const validationSchema = Yup.object({
    password: Yup.string()
      .required("Enter your password")
      .min(8, "password too short")
      .matches(/^(?=.*[a-z])/, "Must contain at least one lowercase character")
      .matches(/^(?=.*[A-Z])/, "Must contain at least one uppercase character")
      .matches(/^(?=.*[0-9])/, "Must contain at least one number")
      .matches(/^(?=.*[!@#%&])/, "Must contain at least one special character"),
    cpassword: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "Passwords must match"
    ),
  });

  const [recoverPassword, { isLoading }] = useResetPasswordMutation();
  const handleSubmit = async (values) => {
    const { cpassword, password, token } = values;

    const { data: dt, error: err } = await recoverPassword({
      password,
      token,
      confirm_password: cpassword,
    });
    if (dt) {
      toast.success(dt);
      navigate("/");
    }
    if (err) toast.error(err);
  };
  return (
    <Grid container>
      <Grid item md={4} xs={10} sx={{ width: "100%", mx: "auto", flex: 1 }}>
        <Grid
          container
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
        >
          <Typography
            sx={{
              fontSize: { md: "3rem", xs: "2.4rem" },
              my: 5,
              mb: 2,
              fontWeight: 700,
              color: "#464646",
              textAlign: "center",
            }}
          >
            Confirm Token and Reset Password
          </Typography>

          <Formik
            enableReinitialize
            initialValues={{ token, password: "", cpassword: "" }}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            <Form style={{ width: "100%" }}>
              <Grid item container sx={{ mb: 2 }}>
                <Grid
                  item
                  gap={2}
                  container
                  flexDirection="column"
                  alignItems="center"
                >
                  <Grid item container sx={{ mt: 2 }}>
                    <FormikControl
                      control="input"
                      name={"password"}
                      type={"password"}
                      placeholder={"new Password"}
                    />
                  </Grid>
                  <Grid item container sx={{ mt: 2 }}>
                    <FormikControl
                      control="input"
                      name={"cpassword"}
                      type={"password"}
                      placeholder={"Confirm  Password"}
                    />
                  </Grid>
                  <CustomButton
                    isSubmitting={isLoading}
                    title="Reset Password"
                    type="submit"
                  />
                </Grid>
              </Grid>
            </Form>
          </Formik>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default NewPassword;
