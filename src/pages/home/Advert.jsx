import React from "react";
import images from "assets";
import { Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
const Advert = () => {
  const { image01, image02, image03 } = images;
  const imgArr = [image01, image02, image03];
  return (
    <Grid item container sx={{ paddingInline: { xs: "1rem", md: "4rem" } }}>
      <Grid
        item
        container
        gap={3}
        alignItems="center"
        sx={{ p: 4, justifyContent: { md: "left", xs: "center" } }}
      >
        <Typography
          sx={{
            color: "#464646",
            textAlign: { md: "left", xs: "center" },
            fontSize: "3rem",
            fontWeight: 700,
          }}
        >
          Ads
        </Typography>
        <Link to="create-advert" style={{ color: "#0099FF" }}>
          <Typography sx={{ fontSize: "2rem" }}>Create Advert</Typography>
        </Link>
      </Grid>
      <Grid
        item
        container
        // gap={2}
        justifyContent="space-between"
        flexWrap={"nowrap"}
      >
        {imgArr.map((item) => (
          <Grid item xs={3.8}>
            <img
              src={item}
              style={{ objectFit: "contain", height: "100%", width: "100%" }}
            />
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

export default Advert;
