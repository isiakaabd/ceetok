import { Grid, Typography } from "@mui/material";
import { CustomButton } from "components";
import LoginModal from "./LoginModal";
import { CheckCircleOutlineSharp, CloseOutlined } from "@mui/icons-material";
import Modals from "components/Modal";
import { useState } from "react";
const SuccessModal = ({ heading, isOpen, Subheadings, handleClose }) => {
  const [showLogin, setShowLogin] = useState(false);
  return (
    <>
      <Modals
        styles={{ height: "90vh" }}
        width={{ md: "60vw", xs: "80%", sm: "80%" }}
        isOpen={isOpen}
      >
        <Grid item container sx={{ mt: 1, pb: 2, px: 3, height: "100%" }}>
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
                {heading}
              </Typography>
              <Typography
                sx={{ fontSize: "1.7rem", color: "#9B9A9A", fontWeight: 500 }}
              >
                {Subheadings}
              </Typography>
              <Grid item sx={{ mt: 2 }}>
                <CustomButton onClick={() => setShowLogin(true)}>
                  Login
                </CustomButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Modals>
      {showLogin && (
        <LoginModal
          handleClose={() => {
            setShowLogin(false);
          }}
          isLogin={showLogin}
        />
      )}
    </>
  );
};

export default SuccessModal;
