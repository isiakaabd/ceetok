import { Typography } from "@mui/material";
import PropTypes from "prop-types";

export const TextError = ({ children }) => {
  return (
    <Typography color="error" variant="span">
      {children}
    </Typography>
  );
};

TextError.propTypes = {
  children: PropTypes.node,
};
