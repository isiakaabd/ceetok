import { Grid, Typography } from "@mui/material";
import { useState } from "react";
import { Formik, Form } from "formik/dist";
import FormikControl from "validation/FormikControl";
import { CloseOutlined } from "@mui/icons-material";
import Modals from "components/Modal";
import CreatePassword from "./CreatePassword";
import { CustomButton } from "components";
import NotificationModal from "./NotificationModal";

const ConfirmMail = ({ isOpen, handleClose }) => {
  const [showCreatePassword, setShowCreatePassword] = useState(false);
  return (
    <>
      <NotificationModal isOpen={isOpen} handleClose={handleClose}>
        <Grid item md={9} xs={12} sx={{ margin: "auto", flex: 1 }}>
          <Grid
            container
            alignItems="center"
            justifyContent="space-between"
            flexDirection="column"
            gap={4}
          >
            <Typography
              sx={{
                fontSize: { md: "3rem", xs: "2.4rem" },
                fontWeight: 700,
                color: "#464646",
              }}
            >
              Check Your Mail
            </Typography>
            <Typography
              sx={{
                fontSize: { md: "1.7rem", sm: "1.5rem" },
                color: "#9B9A9A",
                fontWeight: 500,
                textAlign: "center",
              }}
            >
              We have sent you a password recovery instruction to your mail.
            </Typography>
            <Typography
              sx={{
                fontSize: { md: "1.7rem", sm: "1.5rem" },
                color: "#9B9A9A",
                fontWeight: 500,
                textAlign: "center",
              }}
            >
              Please check your inbox to find the e-mail and complete your
              registration. Please check your spam folder if you cannot find it
              in your inbox.{" "}
            </Typography>
            <Grid
              item
              container
              justifyContent="center"
              alignItems="center"
              sx={{ mt: 2 }}
            >
              <CustomButton
                title=" Email confirmed"
                onClick={() => setShowCreatePassword(true)}
              />
            </Grid>
          </Grid>
        </Grid>
      </NotificationModal>
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
