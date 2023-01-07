import { Grid, Typography } from "@mui/material";
import { useState } from "react";
import { CustomButton } from "components";
import { CloseOutlined } from "@mui/icons-material";
import Modals from "components/Modal";
import VerifyPage from "./VerifyPage";
import { Formik, Form } from "formik/dist";
import OTPInput, { ResendOTP } from "otp-input-react";
import SuccessModal from "./SuccessModal";
export const Phoneverification = ({ isOpen, handleClose }) => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [otp, setOtp] = useState("");

  return (
    <>
      <Modals
        styles={{ height: "90vh" }}
        width={{ md: "60vw", xs: "80%", sm: "80%" }}
        isOpen={isOpen}
      >
        <Grid item container sx={{ mt: 1, height: "100%" }}>
          <Grid item>
            <CloseOutlined
              onClick={handleClose}
              style={{ color: "#000", fontSize: 20, cursor: "pointer" }}
            />
          </Grid>
          <Grid item xs={9} sx={{ margin: "auto", flex: 1 }}>
            <Grid
              container
              alignItems="center"
              justifyContent="space-between"
              flexDirection="column"
              gap={4}
            >
              <Typography
                sx={{
                  fontSize: "3rem",
                  my: 2,
                  fontWeight: 700,
                  color: "#464646",
                }}
              >
                Phone Verification
              </Typography>
              <Typography
                sx={{ fontSize: "1.7rem", color: "#9B9A9A", fontWeight: 500 }}
              >
                We have just sent you an OTP Code Kindly input the code to
                complete your registration.
              </Typography>
              {/* <Formik initialValues={{ otp: "" }}>
              {({ values, handleChange }) => (
                <Form> */}
              <OTPInput
                name="otp"
                fullWidth
                // variant="outlined"
                value={otp}
                autoFocus
                onChange={setOtp}
                OTPLength={4}
                otpType="number"
                disabled={false}
                inputStyles={{
                  background: "#E5E5E5",
                  color: "#000",
                  height: "5.7rem",
                  width: "5.7rem",
                  border: "2px solid #37D42A",
                  borderRadius: "4px",
                  fontSize: "2.5rem",
                  fontWeight: 700,
                  outline: "none",
                }}
                //   secure
                // onChange={setOTP}
              />
              {/* </Form>
              )}
            </Formik> */}
              <Typography
                sx={{
                  fontSize: "1.7rem",
                  color: "#9B9A9A",
                  fontWeight: 500,
                  textAlign: "center",
                }}
              >
                Didn’t get Code?{" "}
                <Typography
                  variant="span"
                  sx={{
                    color: "#37D42A",
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  RESEND
                </Typography>
              </Typography>
              <Grid item>
                <CustomButton
                  onClick={() => {
                    setShowSuccess(true);
                  }}
                >
                  Verify
                </CustomButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Modals>
      {showSuccess && (
        <SuccessModal
          handleClose={() => {
            handleClose();
            setShowSuccess(false);
          }}
          isOpen={showSuccess}
          heading="Sign-up Successful"
          Subheadings="You have successfully signed up on Ceetok kindly proceed to login"
          // handleLoginOpen={handleLoginOpen}
        />
      )}
    </>
  );
};
