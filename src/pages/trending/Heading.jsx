import { Grid, Typography } from "@mui/material";
import React from "react";
import images from "assets";

const Heading = () => {
  return (
    <Grid
      item
      container
      flexWrap="nowrap"
      sx={{
        maxHeight: "30rem",
        borderRadius: "1.5rem",
        px: "4rem",
        alignItems: "center",
        background: "#044402",
      }}
    >
      <Grid item flex={{ md: 1, xs: 2 }}>
        <Typography
          fontWeight={700}
          fontSize={{ md: "5.5rem", color: "#fff", xs: "2rem" }}
        >
          BITCOIN FALLS BACK TO $10,000
        </Typography>
      </Grid>
      <Grid item flex={{ md: 1, xs: 1, height: "100%" }}>
        <Grid container sx={{ height: "100%" }}>
          <img
            src={images.bitcoin}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              // height: { md: "20rem", xs: "10rem" },
            }}
            alt="bitcoin"
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Heading;
