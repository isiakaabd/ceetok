import React from "react";
import PropTypes from "prop-types";
import { Grid, IconButton, Typography } from "@mui/material";
import ArrowBack from "assets/svgs/ArrowBack";
import SettingsTab from "pages/pages/components/SettingsTab";

const Settings = (props) => {
  return (
    <Grid item container sx={{ paddingInline: { xs: "1rem", md: "4rem" } }}>
      <Grid
        flex={1}
        flexWrap="nowrap"
        alignItems="center"
        sx={{ py: 1, display: { xs: "none", md: "flex" } }}
      >
        <IconButton>
          <ArrowBack sx={{ fontSize: "3rem" }} />
        </IconButton>
        <Typography color="secondary" fontSize="1.7rem" fontWeight={600}>
          Back to Profile
        </Typography>
      </Grid>

      <Grid item container sx={{ mt: 3 }}>
        <SettingsTab />
      </Grid>
    </Grid>
  );
};

Settings.propTypes = {};

export default Settings;
