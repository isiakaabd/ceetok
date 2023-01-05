import { Grid, Typography } from "@mui/material";
import LoginModal, { CustomButton } from "./LoginModal";
import { CheckCircleOutlineSharp, CloseOutlined } from "@mui/icons-material";
import Modals from "components/Modal";
import { useState } from "react";
const SuccessModal = ({ handleClose }) => {
  const [showLogin, setShowLogin] = useState(false);
  return (
    <>
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
            sx={{ mt: 4 }}
          >
            <Grid item>
              <CheckCircleOutlineSharp
                sx={{ fontSize: "15rem", color: "#37D42A" }}
              />
            </Grid>
            <Typography
              sx={{
                fontSize: "3rem",
                my: 5,
                mb: 2,
                fontWeight: 700,
                color: "#464646",
              }}
            >
              Password Reset Successful
            </Typography>
            <Typography
              sx={{ fontSize: "1.7rem", color: "#9B9A9A", fontWeight: 500 }}
            >
              You have successfully reset your password
            </Typography>
            <Grid item sx={{ mt: 6 }}>
              <CustomButton onClick={() => setShowLogin(true)}>
                Login
              </CustomButton>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Modals styles={{ width: "60vw", height: "95vh" }} isOpen={showLogin}>
        <LoginModal
          handleClose={() => {
            setShowLogin(false);
          }}
        />
      </Modals>
    </>
  );
};

export default SuccessModal;
