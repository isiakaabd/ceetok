import { Checkbox, FormControlLabel, Grid, Typography } from "@mui/material";
import { ErrorMessage, useFormikContext, Field } from "formik/dist";
import PropTypes from "prop-types";
import { TextError } from "./TextError";

const Switchs = ({ label, name, size, value, ...rest }) => {
  return (
    <FormControlLabel
      control={
        <Checkbox
          size={size ? size : "large"}
          sx={{ m: label ? 1 : 0 }}
          name={name}
          {...rest}
        />
      }
      label={label}
    />
  );
};

const CheckBox = (props) => {
  const { errors } = useFormikContext();
  const { name, ...rest } = props;

  return (
    <Grid container direction="column">
      <Field id={name} type="checkbox" name={name} as={Switchs} {...rest} />
      {errors[name] && (
        <Typography variant="span" color="error">
          {errors[name]}
        </Typography>
      )}
    </Grid>
  );
};
CheckBox.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
};
export default CheckBox;
