import React from "react";
import { Field, ErrorMessage } from "formik/dist";
import PropTypes from "prop-types";
// import { makeStyles } from "@mui/styles";
import {
  OutlinedInput,
  Paper,
  IconButton,
  InputBase,
  InputAdornment,
  Input,
  Grid,
} from "@mui/material";
import { TextError } from "./TextError";

const Text = ({ placeholder, Icon }) => {
  return (
    <Grid
      item
      container
      sx={{
        borderRadius: "3rem",
        color: "#828484",
        border: "1px solid rgba(0,0,0,0.2)",
      }}
    >
      <IconButton>
        <Icon sx={{ fontSize: "3rem" }} />
      </IconButton>
      <InputBase sx={{ flex: 1, pr: 2 }} placeholder={placeholder} />
    </Grid>
  );
};

const InputsAdornment = (props) => {
  const { label, name, type, styles, ...rest } = props;
  // const classes = useStyles();
  return (
    <Grid container direction="column">
      <Field
        id={name}
        name={name}
        as={Text}
        type={type ? type : "text"}
        // className={classes.input}
        {...rest}
      />
      <ErrorMessage name={name} component={TextError} />
    </Grid>
  );
};
InputsAdornment.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
};

export default InputsAdornment;
