import { Grid, Typography } from "@mui/material";
import { useState } from "react";
// import FormikControl from "validation/FormikControl";
import { CustomButton } from "components";
import VerifyPage from "./VerifyPage";
import NotificationModal from "./NotificationModal";
const Verification = ({ isOpen, handleClose }) => {
  const [showLogin, setShowLogin] = useState(false);
  return (
    <>
      <NotificationModal isOpen={isOpen} handleClose={handleClose}>
        <Grid item md={9} xs={12} sx={{ marginInline: "auto", flex: 1 }}>
          <Grid
            container
            alignItems="center"
            justifyContent="space-between"
            flexDirection="column"
            gap={3}
          >
            <Typography
              sx={{
                fontSize: { md: "3rem", xs: "2.4rem" },
                my: 2,
                fontWeight: 700,
                color: "#464646",
              }}
            >
              Email Verification
            </Typography>
            <Typography
              sx={{
                fontSize: { md: "1.7rem", sm: "1.4rem" },
                color: "#9B9A9A",
                fontWeight: 500,
              }}
            >
              We have just sent you an e-mail.
            </Typography>
            <Typography
              sx={{
                fontSize: { md: "1.7rem", sm: "1.4rem" },
                color: "#9B9A9A",
                fontWeight: 500,
                textAlign: "center",
              }}
            >
              Please check your inbox to find the e-mail and complete your
              registration. Please check your spam folder if you cannot find it
              in your inbox.
            </Typography>
            <Typography
              sx={{
                fontSize: { md: "1.7rem", sm: "1.4rem" },
                color: "#9B9A9A",
                fontWeight: 500,
                textAlign: "center",
              }}
            >
              Didn’t get any mail?{" "}
            </Typography>
            <Typography
              sx={{
                color: "#37D42A",
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              RESEND CONFIRMATION
            </Typography>
            <Grid
              item
              container
              justifyContent="center"
              alignItems="center"
              sx={{ cursor: "pointer" }}
              gap={3}
            >
              <Typography
                sx={{ color: "#9B9A9A", fontWeight: 700, fontSize: "1.6rem" }}
                onClick={() => setShowLogin(true)}
              >
                Verified Already?
              </Typography>

              <CustomButton>Login</CustomButton>
            </Grid>
          </Grid>
        </Grid>
      </NotificationModal>

      {showLogin && (
        <VerifyPage
          handleClose={() => {
            handleClose();
            setShowLogin(false);
          }}
          isOpen={showLogin}
        />
      )}
    </>
  );
};

export default Verification;
