import React from "react";
import { Modal, Stack, Box, Typography, Grid } from "@mui/material";
import PropTypes from "prop-types";
import CloseIcon from "@mui/icons-material/Close";

const Modals = ({
  isOpen,
  isClose,
  handleClose,
  width,
  title,
  color,
  children,
  rowSpacing,
  height,
  styles,
}) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    height,
    bgcolor: "background.paper",
    borderRadius: "2rem",
  };

  //   const classes = useStyles();
  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="modal-title"
      closeAfterTransition
      aria-describedby="modal-description"
    >
      <Box
        sx={[style, { ...styles, ...width, marginInline: "auto" }]}
        width={width ? width : "95%"}
        padding={{ sm: 4, xs: 3, md: 4 }}
      >
        {children}
      </Box>
    </Modal>
  );
};
Modals.propTypes = {
  isOpen: PropTypes.bool,
  isClose: PropTypes.bool,
  handleClose: PropTypes.func,
  children: PropTypes.node,
  title: PropTypes.string,
  color: PropTypes.string,
  height: PropTypes.string,
  width: PropTypes.string,
  rowSpacing: PropTypes.number,
};

Modals.defaultProps = {
  height: "auto",
};

export default Modals;
