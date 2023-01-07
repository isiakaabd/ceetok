// import React from "react";
import Input from "./Input";
// import Selects from "./Select";
// import Checkboxes from "./Checkboxs";
// import DateComponent from "./Date";
// import Textarea from "./Textarea";
import PropTypes from "prop-types";
import InputsAdornment from "./InputsAdornment";
import SelectAdornment from "./SelectAdornment";
// import Files from "./File";
// import Files2 from "./File2";
// import DateTimePicker from "./DateTimePicker";

const FormikControl = ({ control, ...rest }) => {
  switch (control) {
    case "input":
      return <Input {...rest} />;
    case "inputs":
      return <InputsAdornment {...rest} />;
    case "selects":
      return <SelectAdornment {...rest} />;
    // case "check":
    //   return <Checkboxes {...rest} />;
    // case "date":
    //   return <DateComponent {...rest} />;
    // case "file":
    //   return <Files {...rest} />;
    // case "files":
    //   return <Files2 {...rest} />;
    // case "time":
    //   return <DateTimePicker {...rest} />;
    default:
      return null;
  }
};
FormikControl.propTypes = {
  control: PropTypes.string,
};
export default FormikControl;
