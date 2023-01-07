import { Grid, Typography } from "@mui/material";
import { useState } from "react";
import { Formik, Form } from "formik/dist";
import FormikControl from "validation/FormikControl";
import { CustomButton } from "components";
import { CloseOutlined } from "@mui/icons-material";
import ConfirmMail from "./ConfirmMail";
import Modals from "components/Modal";
const ForgottenPassword = ({ isOpen, handleClose }) => {
  const [showConfirmMail, setShowConfirmMail] = useState(false);
  return (
    <>
      <Modals
        styles={{ height: { xs: "auto", md: "auto" } }}
        width={{ md: "60vw", xs: "90%", sm: "80%" }}
        isOpen={isOpen}
        background="#fff"
      >
        <Grid
          item
          flexDirection="column"
          container
          sx={{ height: "100%", background: "#fff" }}
        >
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
            >
              <Typography
                sx={{
                  fontSize: { md: "3rem", sm: "2.4rem" },
                  my: 5,
                  mb: 2,
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
                Enter the mail you used in creating this account
              </Typography>
              <Formik enableReinitialize initialValues={{ email: "" }}>
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
                          onClick={() => {
                            //   handleClose();
                            setShowConfirmMail(true);
                          }}
                        >
                          Proceed
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
