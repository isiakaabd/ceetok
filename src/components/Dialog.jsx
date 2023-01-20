import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Grid } from "@mui/material";
import { CloseOutlined } from "@mui/icons-material";

export default function Dialogs({
  children,
  isOpen,
  handleClose,
  width,
  title,
}) {
  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (isOpen) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [isOpen]);

  return (
    <Dialog
      //   maxWidth={width}
      open={isOpen}
      onClose={handleClose}
      scroll={"body"}
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
      title={title}
    >
      <DialogActions>
        <Grid item sx={{ p: 2 }}>
          <CloseOutlined
            onClick={handleClose}
            style={{
              color: "#000",
              fontSize: { md: 30, sm: 25, xs: 20 },
              cursor: "pointer",
            }}
          />
        </Grid>
      </DialogActions>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
}