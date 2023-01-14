import { useState } from "react";
import PropTypes from "prop-types";
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
import { useSelector } from "react-redux";
import { StyledMenu } from "pages/Announcement";

const Filters = ({ anchorEl, setAnchorEl, open, handleClick, handleClose }) => {
  //   const [anchorEl, setAnchorEl] = useState(null);
  //   const posts = useSelector((state) => state.posts.posts);
  //   const open = Boolean(anchorEl);
  //   const handleClick = (event) => {
  //     setAnchorEl(event.currentTarget);
  //   };
  //   const handleClose = () => {
  //     setAnchorEl(null);
  //   };

  return (
    <>
      <Button
        id="demo-customized-button"
        aria-controls={open ? "demo-customized-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        variant="outlined"
        disableElevation
        sx={{ borderRadius: 25, paddingInline: "3rem", fontSize: "1.2rem" }}
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
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="female"
                name="radio-buttons-group"
              >
                <FormControlLabel
                  value="All Time"
                  control={<Radio />}
                  label="All Time"
                />
                <FormControlLabel
                  value="Today"
                  control={<Radio />}
                  label="Today"
                />
                <FormControlLabel
                  value="Last Week"
                  control={<Radio />}
                  label="Last Week"
                />
                <FormControlLabel
                  value="Last Month"
                  control={<Radio />}
                  label="Last Month"
                />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Divider orientation="vertical" flexItem xsx={{ p: 2 }} />
          <Grid item container>
            <FormControl sx={{ px: 2 }}>
              <FormLabel id="demo-radio-buttons-group-label">Show</FormLabel>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="All"
                name="radio-buttons-group"
              >
                <FormControlLabel value="All" control={<Radio />} label="All" />
                <FormControlLabel
                  value="Discussion only"
                  control={<Radio />}
                  label="Discussion only"
                />
                <FormControlLabel
                  value="Photo only"
                  control={<Radio />}
                  label="Photo only"
                />
                <FormControlLabel
                  value="Photo only"
                  control={<Radio />}
                  label="Photo only"
                />
                <FormControlLabel
                  value="Videos only"
                  control={<Radio />}
                  label="Videos only"
                />
                <FormControlLabel
                  value="Links only"
                  control={<Radio />}
                  label="Links only"
                />
                <FormControlLabel
                  value="Polls only"
                  control={<Radio />}
                  label="Polls only"
                />
                <FormControlLabel
                  value="Events only"
                  control={<Radio />}
                  label="Events only"
                />
              </RadioGroup>
            </FormControl>
          </Grid>
        </Grid>
      </StyledMenu>
    </>
  );
};

Filters.propTypes = {};

export default Filters;
