import React from "react";
import { Field, ErrorMessage } from "formik/dist";
import PropTypes from "prop-types";
// import { makeStyles } from "@mui/styles";
import { FormLabel, Grid } from "@mui/material";
import { TextError } from "./TextError";

// const useStyles = makeStyles((theme) => ({
//   input: {
//     ...theme.typography.input,
//   },
//   FormLabel: {
//     "&.MuiFormLabel-root": {
//       ...theme.typography.FormLabel,
//     },
//   },
// }));

const Input = (props) => {
  const { label, name, type, styles, ...rest } = props;
  // const classes = useStyles();
  return (
    <Grid container direction="column">
      <Field
        id={name}
        name={name}
        type={type ? type : "text"}
        // className={classes.input}
        {...rest}
        style={{
          minHeight: 40,
          borderRadius: "2rem",
          outline: 0,
          padding: "0.5rem 1.5rem",
          width: "100%",
          ...styles,
          color: "#828484",
          border: "1px solid rgba(0,0,0,0.2)",
        }}
      />
      <ErrorMessage name={name} component={TextError} />
    </Grid>
  );
};
Input.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
};

export default Input;
