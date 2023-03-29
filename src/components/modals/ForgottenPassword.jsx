import { Grid, Typography } from "@mui/material";
import { useState } from "react";
import { Formik, Form } from "formik/dist";
import FormikControl from "validation/FormikControl";
import { CustomButton } from "components";
import ConfirmMail from "./ConfirmMail";
import NotificationModal from "./NotificationModal";
import * as Yup from "yup";
import { useForgotPasswordMutation } from "redux/slices/authSlice";
import { toast } from "react-toastify";
const ForgottenPassword = ({ isOpen, handleClose }) => {
  const [showConfirmMail, setShowConfirmMail] = useState(false);
  const [resetPassword, { isLoading }] = useForgotPasswordMutation();

  const handleSubmit = async (values) => {
    const { data, error } = await resetPassword({ email: values.email });

    if (data) {
      toast.success(data);
      setTimeout(() => {
        handleClose();
      }, 3000);
    }
    if (error) toast.error(error);
  };
  const validationSchema = Yup.object({
    email: Yup.string("Enter Email")
      .email("Email is Required")
      .required("Required"),
  });
  return (
    <>
      <NotificationModal
        isOpen={isOpen}
        handleClose={handleClose}
        width={{ md: "50vw", xs: "95vw" }}
      >
        <Grid item sx={{ width: "100%", flex: 1 }}>
          <Grid
            container
            alignItems="center"
            justifyContent="center"
            flexDirection="column"
          >
            <Typography
              sx={{
                fontSize: { md: "3rem", sm: "2.4rem" },
                my: 3,
                fontWeight: 700,
                color: "#464646",
              }}
            >
              Reset Password
            </Typography>
            <Typography
              sx={{
                fontSize: { md: "1.7rem", sm: "1.4rem" },
                color: "#9B9A9A",
                fontWeight: 500,
                textAlign: "center",
              }}
            >
              Enter the mail you used in creating this account.
            </Typography>
            <Typography
              sx={{
                fontSize: { md: "1.7rem", sm: "1.5rem" },
                color: "#9B9A9A",
                fontWeight: 500,
                textAlign: "center",
              }}
            >
              Please check your inbox to find the e-mail to complete the
              process. Please check your spam folder if you cannot find it in
              your inbox.{" "}
            </Typography>
            <Formik
              enableReinitialize
              initialValues={{ email: "" }}
              onSubmit={handleSubmit}
              validationSchema={validationSchema}
            >
              <Form style={{ width: "100%" }}>
                <Grid>
                  <Grid container flexDirection="column" alignItems="center">
                    <Grid item container sx={{ mt: 2 }}>
                      <FormikControl
                        control="input"
                        name={"email"}
                        type={"email"}
                        placeholder={"Email Address"}
                      />
                    </Grid>

                    <Grid
                      item
                      container
                      justifyContent="center"
                      alignItems="center"
                      sx={{ mt: 5 }}
                    >
                      <CustomButton
                        isSubmitting={isLoading}
                        type="submit"
                        title="Proceed"
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Form>
            </Formik>
          </Grid>
        </Grid>
      </NotificationModal>
      {showConfirmMail && (
        <ConfirmMail
          handleClose={() => {
            handleClose();
            setShowConfirmMail(false);
          }}
          isOpen={showConfirmMail}
        />
      )}
    </>
  );
};

export default ForgottenPassword;
