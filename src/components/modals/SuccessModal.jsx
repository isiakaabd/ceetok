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
        styles={{ height: { xs: "auto", md: "95vh" } }}
        width={{ md: "60vw", xs: "90%", sm: "80%" }}
        isOpen={isOpen}
      >
        <Grid
          item
          container
          flexDirection="column"
          sx={{
            position: { md: "absolute" },
            zIndex: 3,
            borderRadius: "2.5rem",
            top: 0,
            left: 0,
            height: "100%",
            mt: 3,
          }}
        >
          <Grid item padding={{ md: 3 }}>
            <CloseOutlined
              onClick={handleClose}
              style={{ color: "#000", fontSize: 20, cursor: "pointer" }}
            />
          </Grid>
          <Grid
            item
            container
            alignItems="center"
            justifyContent="flex-start"
            flexDirection="column"
          >
            <Grid item>
              <CheckCircleOutlineSharp
                sx={{
                  fontSize: { md: "15rem", xs: "7rem" },
                  color: "#37D42A",
                }}
              />
            </Grid>
            <Grid
              container
              alignItems="center"
              justifyContent="center"
              flexDirection="column"
              gap={2}
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
                {heading}
              </Typography>
              <Typography
                sx={{
                  fontSize: { md: "1.7rem", sm: "1.3rem" },
                  color: "#9B9A9A",
                  fontWeight: 500,
                }}
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
