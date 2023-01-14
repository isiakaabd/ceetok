import { Modal, Box } from "@mui/material";
import PropTypes from "prop-types";

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
  background,
}) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    height: height ? height : "auto",

    bgcolor: background ? background : "transparent",
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
      // sx={{ height: "100%" }}
    >
      <Box
        sx={[style, { ...styles, ...width, margin: "auto" }]}
        width={width ? width : "95%"}
        padding={{ xs: 2, md: 4 }}
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
