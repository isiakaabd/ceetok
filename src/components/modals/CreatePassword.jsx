import { Grid, Typography } from "@mui/material";
import { useState } from "react";
import { Formik, Form } from "formik/dist";
import FormikControl from "validation/FormikControl";
import { CustomButton } from "components";
import { CloseOutlined } from "@mui/icons-material";
import Modals from "components/Modal";
import SuccessModal from "./SuccessModal";

const CreatePassword = ({ isOpen, handleClose }) => {
  const [showSuccess, setShowSuccess] = useState(false);
  return (
    <>
      <Modals
        styles={{ height: "90vh" }}
        width={{ md: "60vw", xs: "80%", sm: "80%" }}
        isOpen={isOpen}
      >
        <Grid item container sx={{ mt: 3, height: "100%" }}>
          <Grid item>
            <CloseOutlined
              onClick={handleClose}
              style={{ color: "#000", fontSize: 20, cursor: "pointer" }}
            />
          </Grid>
          <Grid item sx={{ width: "100%", flex: 1 }}>
            <Grid
              container
              alignItems="center"
              justifyContent="center"
              flexDirection="column"
              sx={{ mt: 3 }}
            >
              <Typography
                sx={{
                  fontSize: "3rem",
                  my: 5,
                  mb: 2,
                  fontWeight: 700,
                  color: "#464646",
                }}
              >
                Create New Password
              </Typography>
              <Typography
                sx={{ fontSize: "1.7rem", color: "#9B9A9A", fontWeight: 500 }}
              >
                The password must be different from the previous one
              </Typography>
              <Formik
                enableReinitialize
                initialValues={{ password: "", confrimPassword: "" }}
              >
                <Form style={{ width: "100%" }}>
                  <Grid xs={6} sx={{ mx: "auto" }}>
                    <Grid container flexDirection="column" alignItems="center">
                      <Grid item container sx={{ mt: 2 }}>
                        <FormikControl
                          control="input"
                          name={"password"}
                          type={"password"}
                          placeholder={"Password"}
                        />
                      </Grid>
                      <Grid item container sx={{ mt: 2 }}>
                        <FormikControl
                          control="input"
                          name={"confirmPassword"}
                          type={"password"}
                          placeholder={"Confirm Password"}
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
                          onClick={() => {
                            //   handleClose();
                            setShowSuccess(true);
                          }}
                        >
                          Reset Password
                        </CustomButton>
                      </Grid>
                    </Grid>
                  </Grid>
                </Form>
              </Formik>
            </Grid>
          </Grid>
        </Grid>
      </Modals>

      {showSuccess && (
        <SuccessModal
          handleClose={() => {
            //   handleClose();
            setShowSuccess(false);
          }}
          isOpen={showSuccess}
          heading="Password Reset Successful"
          Subheadings=" You have successfully reset your password"
          // handleLoginOpen={handleLoginOpen}
        />
      )}
    </>
  );
};

export default CreatePassword;
