import PropTypes from "prop-types";
import { Pagination } from "@mui/material";

const Paginations = ({ page, setPage, count }) => {
  const handleChange = (_, value) => {
    setPage(value);
  };
  return (
    <Pagination
      page={page}
      count={count}
      hidePrevButton={true}
      hideNextButton={true}
      sx={{ margin: "auto", py: 2 }}
      onChange={handleChange}
    />
  );
};

Paginations.propTypes = {
  count: PropTypes.number,
  page: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
};

Paginations.defaultProps = {
  count: 10,
};

export default Paginations;
