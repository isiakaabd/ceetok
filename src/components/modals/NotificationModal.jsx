import { CloseOutlined } from "@mui/icons-material";
import { Grid, Typography } from "@mui/material";
import Dialogs from "components/Dialog";
import Modals from "components/Modal";
import React from "react";

const NotificationModal = ({
  isOpen,
  width,
  heading,
  handleClose,
  children,
}) => {
  return (
    <Dialogs
      styles={{ height: { xs: "auto", md: "auto" } }}
      width={{ md: "60vw", xs: "95%", sm: "90%", ...width }}
      isOpen={isOpen}
      handleClose={handleClose}
      background="#fff"
    >
      <Grid
        item
        container
        sx={{
          zIndex: 3,
          borderRadius: "2.5rem",
          height: "100%",
          pb: { xs: "2rem" },
        }}
        flexDirection="column"
      >
        <Grid item container justifyContent="space-between" alignItems="center">
          {heading && (
            <Grid item>
              <Typography
                sx={{
                  color: "#5F5C5C",
                  fontSize: { md: "2.5rem", xs: "1.8rem" },
                }}
                fontWeight={700}
              >
                {heading}
              </Typography>
            </Grid>
          )}
          {/* <Grid item>
            <CloseOutlined
              onClick={handleClose}
              style={{
                color: "#000",
                fontSize: { md: 30, sm: 25, xs: 20 },
                cursor: "pointer",
              }}
            />
          </Grid> */}
        </Grid>
        {children}
      </Grid>
    </Dialogs>
  );
};

export default NotificationModal;
