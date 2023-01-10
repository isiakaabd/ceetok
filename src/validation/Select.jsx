import React from "react";
import PropTypes from "prop-types";
import { Field, ErrorMessage } from "formik/dist";
import {
  FormControl,
  Typography,
  FormLabel,
  Select,
  MenuItem,
  Grid,
  Box,
} from "@mui/material";

import { TextError } from "./TextError";

export const Formiks = ({ borderRadius, options }) => {
  return (
    <Select
      displayEmpty
      sx={{
        borderRadius: borderRadius ? borderRadius : "1rem",
        color: "#828484",
        height: "4rem",

        "&:active,&:focus": {
          borderColor: "currentColor",
          outline: "none",
        },
        "& .MuiSelect-icon": {
          fontSize: "3rem",
          color: "#828484",
        },
      }}
    >
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </Select>
  );
};

Formiks.propTypes = {
  value: PropTypes.string,
  label: PropTypes.string,
  onChange: PropTypes.func,
  children: PropTypes.node,
  name: PropTypes.string,
};

const Selects = (props) => {
  const { label, name, type, styles, helperText, ...rest } = props;
  // const classes = useStyles();
  return (
    <Grid container direction="column">
      <Field id={name} name={name} as={Formiks} {...rest} />
      {helperText && <Typography variant="span">{helperText}</Typography>}
      <ErrorMessage name={name} component={TextError} />
    </Grid>
  );
};
Selects.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
};

export default Selects;
