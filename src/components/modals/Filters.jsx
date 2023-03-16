import {
  Button,
  Radio,
  Grid,
  FormControl,
  FormControlLabel,
  Divider,
  FormLabel,
  RadioGroup,
} from "@mui/material";
import { FilterList } from "@mui/icons-material";
import { StyledMenu } from "pages/Announcement";
import { getDates } from "helpers";
import { useSelector } from "react-redux";

const Filters = ({
  anchorEl,
  setAnchorEl,
  post,
  setPost,
  value,
  setValue,
  open,
  handleClick,
  handleClose,
}) => {
  const today = new Date();
  const lastWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
  const lastMonth = new Date(
    today.getFullYear(),
    today.getMonth() - 1,
    today.getDate()
  );
  const admin = useSelector((state) => state.auth.admin);
  const handleChange = (event) => {
    setValue(event.target.value);
    handleClose();
  };
  const handleChanges = (event) => {
    setPost(event.target.value);
    handleClose();
  };

  return (
    <>
      <Button
        id="demo-customized-button"
        aria-controls={open ? "demo-customized-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        variant="outlined"
        disableElevation
        sx={{
          borderRadius: 25,
          paddingInline: "3rem",
          fontSize: { md: "1.9rem", xs: "1.4rem" },
        }}
        onClick={handleClick}
        startIcon={<FilterList />}
      >
        Filter
      </Button>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          "aria-labelledby": "demo-customized-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <Grid container flexWrap="nowrap" sx={{ p: 2 }}>
          <Grid item container>
            <FormControl>
              <FormLabel id="demo-radio-buttons-group-label">Time</FormLabel>
              <RadioGroup
                aria-labelledby="filters by days,weeks and month"
                value={value}
                name="radio-buttons-group"
                onChange={handleChange}
              >
                <FormControlLabel
                  value=""
                  control={<Radio />}
                  label="All Time"
                />
                <FormControlLabel
                  label="Today"
                  control={<Radio />}
                  value={getDates(today)}
                />
                <FormControlLabel
                  value={getDates(lastWeek)}
                  control={<Radio />}
                  label="Last Week"
                />
                <FormControlLabel
                  value={getDates(lastMonth)}
                  control={<Radio />}
                  label="Last Month"
                />
              </RadioGroup>
            </FormControl>
          </Grid>
          {admin && (
            <>
              <Divider orientation="vertical" flexItem sx={{ p: 2 }} />
              <Grid item container>
                <FormControl sx={{ px: 2 }}>
                  <FormLabel id="demo-radio-buttons-group-label">
                    Post
                  </FormLabel>
                  <RadioGroup
                    aria-labelledby="filters by approved, unapproved post"
                    value={post}
                    name="radio-buttons-group"
                    onChange={handleChanges}
                  >
                    <FormControlLabel
                      value=""
                      control={<Radio />}
                      label="All"
                    />
                    <FormControlLabel
                      label="Approved"
                      control={<Radio />}
                      value={true}
                    />
                    <FormControlLabel
                      value={false}
                      control={<Radio />}
                      label="Unapproved"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
            </>
          )}
        </Grid>
      </StyledMenu>
    </>
  );
};

Filters.propTypes = {};

export default Filters;
