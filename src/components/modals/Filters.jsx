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

const Filters = ({
  anchorEl,
  setAnchorEl,
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
  const handleChange = (event) => {
    setValue(event.target.value);
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
