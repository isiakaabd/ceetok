import PropTypes from "prop-types";
import { Pagination } from "@mui/material";

const Paginations = ({ page, setPage, count }) => {
  const handleChange = (_, value) => {
    setPage(value);
  };

  return (
    <Pagination
      page={page}
      defaultPage={1}
      count={count + 1}
      color="success"
      size="medium"
      sx={{
        margin: "auto",
        py: 2,
        color: "#37D42A",
        "& .MuiPaginationItem-root": {
          alignItems: "center",
          fontSize: "2rem",
          "&.Mui-selected": {
            color: "#fff",
          },
        },
        "& .MuiPaginationItem-icon": {
          fontSize: "3rem",
        },
      }}
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
