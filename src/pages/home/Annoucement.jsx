import { Grid, Button, Typography } from "@mui/material";
import React from "react";
import images from "assets";
import { Link } from "react-router-dom";
const Annoucement = () => {
  return (
    <Grid
      container
      sx={{
        padding: { xs: "2rem", md: "4rem 3rem" },
        mt: 3,
        mx: "1rem",
        background: "#fff",
        borderRadius: "1.2rem",
      }}
    >
      <Grid item container alignItems="center" gap={2}>
        <Grid
          item
          flexWrap="nowrap"
          sx={{ border: "1px solid #FF9B04", padding: "1rem 1.2rem" }}
        >
          <Grid
            container
            alignItems="center"
            justifyContent="center"
            sx={{
              cursor: "pointer",
            }}
            flexWrap="nowrap"
            columnGap={1}
          >
            <img
              src={images.annoucement}
              alt="annoucement icon"
              style={{ width: "3rem", display: "block" }}
            />
            <Typography
              sx={{ color: "#464646", fontSize: "2rem", fontWeight: 700 }}
            >
              Annoucement
            </Typography>
          </Grid>
        </Grid>
        <Grid item>
          <Button
            sx={{
              height: "3.5rem",
              borderRadius: ".5rem",
              backgroundColor: "#5F5C5C",
              color: "#fff",
              fontWeight: 600,
              fontSize: "1.2rem",
              padding: "1rem 1.5rem",
              whiteSpace: "nowrap",
            }}
            variant="contained"
            disableElevation
          >
            Make Annoucement
          </Button>
        </Grid>
      </Grid>
      <Grid
        item
        container
        display="grid"
        gap={3}
        sx={{
          mt: 6,
          gridTemplateColumns: {
            md: "repeat(3,1fr)",
            xs: "1fr",
            sm: "1fr 1fr",
          },
        }}
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
                    fontSize: { md: "2rem", xs: "1.5rem" },
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
