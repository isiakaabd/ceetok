import { CloseOutlined } from "@mui/icons-material";
import { Grid } from "@mui/material";
import Modals from "components/Modal";
import React from "react";

const NotificationModal = ({ isOpen, handleClose, children }) => {
  return (
    <Modals
      styles={{ height: { xs: "auto", md: "auto" } }}
      width={{ md: "60vw", xs: "95%", sm: "90%" }}
      isOpen={isOpen}
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
        <Grid item>
          <CloseOutlined
            onClick={handleClose}
            style={{ color: "#000", fontSize: 30, cursor: "pointer" }}
          />
        </Grid>
        {children}
      </Grid>
    </Modals>
  );
};

export default NotificationModal;
