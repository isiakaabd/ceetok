import React from "react";
import { Field, ErrorMessage } from "formik/dist";
import PropTypes from "prop-types";
// import { makeStyles } from "@mui/styles";
import {
  OutlinedInput,
  Paper,
  IconButton,
  Box,
  Select,
  TextField,
  MenuItem,
  InputBase,
  InputAdornment,
  Input,
  Grid,
  Typography,
} from "@mui/material";
import { TextError } from "./TextError";

const Text = ({ placeholder, options, Icon }) => {
  return (
    // <Grid
    //   item
    //   container
    //   sx={{
    //     borderRadius: "3rem",
    //     color: "#828484",
    //     border: "1px solid rgba(0,0,0,0.2)",
    //   }}
    // >
    //   <IconButton>
    //     <Icon sx={{ fontSize: "3rem" }} />
    //   </IconButton>
    <Select
      displayEmpty
      sx={{
        borderRadius: "3rem",
        color: "#828484",
        height: "5rem",
        "&:active,&:focus": {
          borderColor: "currentColor",
          outline: "none",
        },
        "& .MuiSelect-icon": {
          fontSize: "3rem",
        },
      }}
      renderValue={(value) => {
        return (
          <Box
            sx={{
              display: "flex",
              ml: 0,
              alignItems: "center",
              border: "none",
            }}
          >
            <IconButton>
              <Icon sx={{ fontSize: "3rem", ml: -1.5 }} />
            </IconButton>

            <Typography>{value || placeholder}</Typography>
          </Box>
        );
      }}
    >
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </Select>
    // </Grid>
  );
};

const SelectAdornment = (props) => {
  const { label, name, type, styles, ...rest } = props;
  // const classes = useStyles();
  return (
    <Grid container direction="column">
      <Field id={name} name={name} as={Text} {...rest} />
      <ErrorMessage name={name} component={TextError} />
    </Grid>
  );
};
SelectAdornment.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
};

export default SelectAdornment;
