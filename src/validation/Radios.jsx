import { FormControlLabel, Grid, Radio } from "@mui/material";
import { Field, ErrorMessage } from "formik/dist";
import PropTypes from "prop-types";
import { TextError } from "./TextError";

const Switchs = ({ label, name, size, ...rest }) => {
  return (
    <FormControlLabel
      control={
        <Radio
          size={size ? size : "large"}
          sx={{ m: label ? 1 : 0 }}
          {...rest}
          name={name}
        />
      }
      name={name}
      label={label}
    />
  );
};

const Radios = (props) => {
  const { name, label, ...rest } = props;

  return (
    <Grid container direction="column">
      <Field
        id={name}
        type="radio"
        label={label}
        name={name}
        as={Switchs}
        value={label}
        {...rest}
      />
      <ErrorMessage name={name} component={TextError} />
    </Grid>
  );
};
Radios.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
};
export default Radios;
