import { UploadFileOutlined } from "@mui/icons-material";
import { Grid, IconButton } from "@mui/material";
import { useFormikContext } from "formik/dist";
import React, { useRef } from "react";
export const UploadComponent = ({ name }) => {
  const { setFieldValue } = useFormikContext();

  const ref = useRef();

  return (
    <Grid
      id="drop-area"
      item
      container
      justifyContent={"center"}
      alignItems={"center"}
      sx={{ border: "1px solid #C4C4C4", minHeight: "15rem" }}
    >
      <input
        type="file"
        id="fileElem"
        ref={ref}
        onChange={(e) => setFieldValue(name, e.target.files[0])}
        style={{ display: "none" }}
        accept="image/*"
      />
      <IconButton
        size="large"
        onClick={(e) => {
          ref?.current.click();
        }}
      >
        <UploadFileOutlined sx={{ fontSize: "5rem" }} />
      </IconButton>
    </Grid>
  );
};
