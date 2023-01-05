import PropTypes from "prop-types";

export const TextError = ({ children }) => {
  return <div style={{ color: "red" }}>{children}</div>;
};

TextError.propTypes = {
  children: PropTypes.node,
};
