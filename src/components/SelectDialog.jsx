import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { FilterList } from "@mui/icons-material";
import {
  Divider,
  RadioGroup,
  FormLabel,
  FormControlLabel,
  Radio,
  Typography,
  Grid,
} from "@mui/material";

export default function SelectDialog() {
  const [open, setOpen] = React.useState(false);
  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(Number(event.target.value) || "");
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason !== "backdropClick") {
      setOpen(false);
    }
  };

  return (
    <div>
      <Button
        onClick={handleClickOpen}
        startIcon={<FilterList />}
        variant="outlined"
      >
        Filter
      </Button>
      <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
        {/* <DialogTitle>Fill the form</DialogTitle> */}

        <DialogContent>
          <Grid container>
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
              <Divider orientation="vertical" />
              <Grid item>
                <Typography>Show</Typography>
              </Grid>
            </Grid>
            <Divider orientation="vertical" />
          </Grid>
        </DialogContent>
      </Dialog>
    </div>
  );
}
