import { Grid, Typography } from "@mui/material";
import React from "react";

const OnlineActivity = () => {
  return (
    <Grid item container sx={{ pb: 4 }}>
      <Grid
        xs={10}
        sx={{
          backgroundColor: "#5F5C5C",
          paddingBlock: "1.2rem",
          textAlign: "center",
          margin: "auto",
          fontSize: "2.4rem",
          color: "#fff",
          mt: 6,
          fontWeight: 400,
        }}
      >
        <Typography> Members Online:</Typography>
        <Typography>
          <Typography variant="span" sx={{ fontWeight: 700 }}>
            2180 Members{" "}
          </Typography>
          and{" "}
          <Typography variant="span" sx={{ fontWeight: 700 }}>
            6123 Guests online{" "}
          </Typography>
          in last{" "}
          <Typography variant="span" sx={{ fontWeight: 700 }}>
            10 minutes!
          </Typography>
        </Typography>
      </Grid>
    </Grid>
  );
};

export default OnlineActivity;
