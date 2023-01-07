import { CloseOutlined } from "@mui/icons-material";
import { Grid, Button, Typography, ButtonBase, Divider } from "@mui/material";
import { useState } from "react";
// import FormikControl from "validation/FormikControl";
import { CustomButton } from "components";
// import LoginModal from "./LoginModal";
import Modals from "components/Modal";
import VerifyPage from "./VerifyPage";
const Verification = ({ isOpen, handleClose }) => {
  const [showLogin, setShowLogin] = useState(false);
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
          <Grid item xs={9} sx={{ marginInline: "auto", flex: 1 }}>
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
                Email Verification
              </Typography>
              <Typography
                sx={{ fontSize: "1.7rem", color: "#9B9A9A", fontWeight: 500 }}
              >
                We have just sent you an e-mail.
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
                it in your inbox.
              </Typography>
              <Typography
                sx={{
                  fontSize: "1.7rem",
                  color: "#9B9A9A",
                  fontWeight: 500,
                  textAlign: "center",
                }}
              >
                Didn’t get any mail?{" "}
                <Typography
                  variant="span"
                  sx={{
                    color: "#37D42A",
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  RESEND CONFIRMATION
                </Typography>
              </Typography>
              <Grid
                item
                container
                justifyContent="center"
                alignItems="center"
                sx={{ mt: 2, cursor: "pointer" }}
                gap={3}
              >
                <Typography
                  sx={{ color: "#9B9A9A", fontWeight: 700, fontSize: "1.6rem" }}
                  onClick={() => setShowLogin(true)}
                >
                  {" "}
                  {/* onClick={() => setShowLogin(true)} */}
                  Verified Already?
                </Typography>

                <CustomButton>Login</CustomButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Modals>

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
