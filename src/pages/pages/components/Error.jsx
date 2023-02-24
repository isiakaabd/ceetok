import { Typography } from "@mui/material";
import React from "react";

const Error = () => {
  return (
    <Typography
      variant="h2"
      sx={{ px: 1, py: 3, width: "100%", textAlign: "center" }}
    >
      Something went wrong...
    </Typography>
  );
};

export default Error;
