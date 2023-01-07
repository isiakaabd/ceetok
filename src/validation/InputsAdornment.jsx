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

const Text = ({ placeholder, Icon, order, buttonStyle }) => {
  console.log(order);
  return (
    <Grid
      item
      container
      sx={{
        borderRadius: "3rem",
        color: "#828484",
        border: "1px solid rgba(0,0,0,0.2)",
        flexDirection: order ? "row-reverse" : "row",
      }}
    >
      <IconButton>
        <Icon sx={{ fontSize: "2rem", ...buttonStyle }} />
      </IconButton>
      <InputBase
        sx={{ flex: 1, px: 2, order: order }}
        placeholder={placeholder}
      />
    </Grid>
  );
};

const InputsAdornment = (props) => {
  const { label, name, type, styles, order, buttonStyle, ...rest } = props;
  // const classes = useStyles();
  return (
    <Grid container direction="column">
      <Field
        id={name}
        name={name}
        as={Text}
        order={order}
        buttonStyle={buttonStyle}
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
