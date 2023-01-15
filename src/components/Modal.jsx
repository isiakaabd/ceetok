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

// import * as React from "react";
// import Button from "@mui/material/Button";
// import Dialog from "@mui/material/Dialog";
// import DialogActions from "@mui/material/DialogActions";
// import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from "@mui/material/DialogContentText";
// import DialogTitle from "@mui/material/DialogTitle";
// import { Grid } from "@mui/material";
// import { CloseOutlined } from "@mui/icons-material";

// export default function Modals({ children, isOpen, title }) {
//   const [open, setOpen] = React.useState(false);
//   const [scroll, setScroll] = React.useState("paper");

//   const handleClickOpen = (scrollType) => () => {
//     setOpen(true);
//     setScroll(scrollType);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   const descriptionElementRef = React.useRef(null);
//   React.useEffect(() => {
//     if (open) {
//       const { current: descriptionElement } = descriptionElementRef;
//       if (descriptionElement !== null) {
//         descriptionElement.focus();
//       }
//     }
//   }, [open]);

//   return (
//     <Dialog
//       open={isOpen}
//       onClose={handleClose}
//       scroll={"body"}
//       aria-labelledby="scroll-dialog-title"
//       aria-describedby="scroll-dialog-description"
//       title={title}
//     >
//       <DialogActions>
//         <Grid item>
//           <CloseOutlined
//             onClick={handleClose}
//             style={{
//               color: "#000",
//               fontSize: { md: 30, sm: 25, xs: 20 },
//               cursor: "pointer",
//             }}
//           />
//         </Grid>
//       </DialogActions>
//       <DialogContent>{children}</DialogContent>
//     </Dialog>
//   );
// }
