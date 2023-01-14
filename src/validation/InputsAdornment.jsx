import { Field, ErrorMessage } from "formik/dist";
import PropTypes from "prop-types";
import { IconButton, InputBase, Grid } from "@mui/material";
import { TextError } from "./TextError";

const Text = ({
  placeholder,
  borderRadius,
  border,
  Icon,
  color,
  order,
  height,
  buttonStyle: { background },
}) => {
  return (
    <Grid
      item
      container
      alignItems="center"
      sx={{
        borderRadius: borderRadius ? borderRadius : "3rem",
        color: "#828484",
        border: border ? border : "1px solid rgba(0,0,0,0.2)",
        height: height ? height : "auto",
        flexDirection: order ? "row-reverse" : "row",
        padding: ".5rem 1rem",
      }}
    >
      <IconButton sx={{ background: background }}>
        <Icon />
      </IconButton>
      <InputBase
        sx={{
          flex: 1,
          color: color,
          order: order,
        }}
        placeholder={placeholder}
      />
    </Grid>
  );
};

const InputsAdornment = (props) => {
  const {
    label,
    name,
    type,
    styles,
    order,
    buttonStyle,
    borderRadius,
    ...rest
  } = props;

  return (
    <Grid container direction="column">
      <Field
        id={name}
        name={name}
        as={Text}
        order={order}
        borderRadius={borderRadius}
        buttonStyle={buttonStyle}
        type={type ? type : "text"}
        {...rest}
      />
      <ErrorMessage name={name} component={TextError} />
    </Grid>
  );
};
InputsAdornment.propTypes = {
  name: PropTypes.string,
};

export default InputsAdornment;
