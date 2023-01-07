import { Grid, Typography } from "@mui/material";
import { useState } from "react";
import { Formik, Form } from "formik/dist";
import FormikControl from "validation/FormikControl";
import { CloseOutlined } from "@mui/icons-material";
import Modals from "components/Modal";
import CreatePassword from "./CreatePassword";
import { CustomButton } from "components";

const ConfirmMail = ({ isOpen, handleClose }) => {
  const [showCreatePassword, setShowCreatePassword] = useState(false);
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
                  my: 5,
                  mb: 2,
                  fontWeight: 700,
                  color: "#464646",
                }}
              >
                Check Your Mail
              </Typography>
              <Typography
                sx={{ fontSize: "1.7rem", color: "#9B9A9A", fontWeight: 500 }}
              >
                We have sent you a password recovery instruction to your mail.
              </Typography>
              <Typography
                sx={{
                  fontSize: "1.7rem",
                  color: "#9B9A9A",
                  fontWeight: 500,
                  textAlign: "center",
                }}
              >
                Please check your inbox to find the e-mail and complete your
                registration. Please check your spam folder if you cannot find
                it in your inbox.{" "}
              </Typography>
              <Grid
                item
                container
                justifyContent="center"
                alignItems="center"
                sx={{ mt: 2 }}
              >
                <CustomButton onClick={() => setShowCreatePassword(true)}>
                  Email confirmed
                </CustomButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Modals>
      {showCreatePassword && (
        <CreatePassword
          handleClose={() => {
            handleClose();
            setShowCreatePassword(false);
          }}
          isOpen={showCreatePassword}
          // handleLoginOpen={handleLoginOpen}
        />
      )}
    </>
  );
};

export default ConfirmMail;
