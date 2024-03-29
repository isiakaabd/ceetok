import { Field, ErrorMessage } from "formik/dist";
import PropTypes from "prop-types";
import { Grid, Typography } from "@mui/material";
import { TextError } from "./TextError";

const Input = (props) => {
  const {
    label,
    name,
    borderRadius,
    helperText,
    helperTextColor,
    styles,
    ...rest
  } = props;

  return (
    <Grid container direction="column">
      <Field
        name={name}
        autoCapitalize={false}
        autoSuggest={false}
        style={{
          minHeight: "4rem",
          borderRadius: borderRadius ? borderRadius : "1rem",
          outline: 0,
          padding: "0.5rem 1.5rem",
          width: "100%",
          ...styles,
          color: "#111b21",
          border: "1px solid rgba(0,0,0,0.2)",
        }}
        {...rest}
      />
      {helperText && (
        <Typography
          variant="span"
          color={helperTextColor ? helperTextColor : "#9B9A9A"}
          fontSize={{ md: "1.2rem", xs: "1rem" }}
        >
          {helperText}
        </Typography>
      )}
      <ErrorMessage name={name} component={TextError} />
    </Grid>
  );
};
Input.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
};

export default Input;
