import { Grid, Button, Typography } from "@mui/material";
import React from "react";
import images from "assets";
import { Link } from "react-router-dom";
const Annoucement = () => {
  return (
    <Grid container sx={{ padding: { xs: "1rem", md: "4rem 3rem" } }}>
      <Grid item container alignItems="center" gap={3}>
        <Grid
          item
          container
          alignItems="center"
          justifyContent="center"
          sx={{
            cursor: "pointer",
            border: "1px solid #FF9B04",
            height: "6rem",
            padding: "1.2rem 2rem",
            width: "30rem",
          }}
          flexWrap="nowrap"
          gap={3}
        >
          <img
            src={images.annoucement}
            alt="annoucement icon"
            style={{ width: "4rem", height: "4rem", display: "inline-block" }}
          />
          <Typography
            sx={{ color: "#464646", fontSize: "2.5rem", fontWeight: 700 }}
          >
            Annoucement
          </Typography>
        </Grid>
        <Button
          sx={{
            height: "3.5rem",
            borderRadius: ".5rem",
            backgroundColor: "#5F5C5C",
            color: "#fff",
            fontWeight: 700,
            fontSize: "1.2rem",
            padding: "1rem 2rem",
          }}
          variant="contained"
          disableElevation
        >
          Make Annoucement
        </Button>
      </Grid>

      <Grid
        item
        container
        display="grid"
        gridTemplateColumns={"repeat(3,1fr)"}
        gap={3}
        sx={{ mt: 6 }}
      >
        {Array(10)
          .fill({
            title: "Obasanjo dies @86 after brief illness at his home town",
            time: "Joshua@4real   15 oct, 2022  7:39pm",
          })
          .map((item, i) => {
            return (
              <Grid item>
                <Typography
                  sx={{
                    color: "#5F5C5C",
                    fontSize: "2rem",
                    fontWeight: 700,
                  }}
                >
                  {item.title}
                </Typography>
                <Typography sx={{ fontWeight: 400, fontSize: "1.5rem" }}>
                  {item.time}
                </Typography>
              </Grid>
            );
          })}
      </Grid>
      <Link to="annoucement" style={{ textDecoration: "none" }}>
        <Button
          sx={{
            backgroundColor: "#FF9B04",
            color: "#fff",
            fontSize: "1.2rem",
            fontWeight: 700,
            textTransform: "capitalize",
            mt: 4,
          }}
          variant="outlined"
        >
          See More
        </Button>
      </Link>
    </Grid>
  );
};

export default Annoucement;
