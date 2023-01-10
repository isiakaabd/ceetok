import React from "react";
import PropTypes from "prop-types";
import { Divider, Grid, Typography } from "@mui/material";

const About = (props) => {
  return (
    <Grid item container sx={{ background: "#fff", p: 2 }}>
      <Grid item xs={8}>
        <Grid item container gap={4} flexDirection={"column"} sx={{ py: 2 }}>
          {/* Bio */}
          <Grid>
            <Typography
              variant="secondary"
              fontSize={{ md: "2rem", xs: "1.7rem" }}
              fontWeight={700}
            >
              Bio
            </Typography>
            <Grid item container gap={3}>
              <Typography
                fontSize={{ md: "1.7rem", xs: "1.4rem" }}
                fontWeight={600}
              >
                DOB:
                <Typography sx={{ ml: 1 }} variant="span">
                  15th June, 1997
                </Typography>
              </Typography>
              <Typography
                fontSize={{ md: "1.7rem", xs: "1.4rem" }}
                fontWeight={600}
              >
                Gender:
                <Typography sx={{ ml: 1 }} variant="span">
                  Male
                </Typography>
              </Typography>
              <Typography
                fontSize={{ md: "1.7rem", xs: "1.4rem" }}
                fontWeight={600}
              >
                Occupation:
                <Typography variant="span" sx={{ ml: 1 }}>
                  Student
                </Typography>
              </Typography>
            </Grid>
          </Grid>
          {/* Basic Information */}
          <Grid>
            <Typography
              variant="secondary"
              sx={{ paddingBlock: "1rem" }}
              fontSize={{ md: "2rem", xs: "1.7rem" }}
              fontWeight={700}
            >
              Basic information
            </Typography>

            <Typography
              color="#37D42A"
              fontWeight={700}
              fontSize={{ md: "1.7rem", xs: "1.4rem" }}
            >
              Total Posts
            </Typography>
            <Divider />
            <Grid item container alignItems="center">
              <Typography
                color="secondary"
                fontSize={{ md: "1.7rem", xs: "1.4rem" }}
                fontWeight={600}
              >
                Total Posts{" "}
              </Typography>
              <Typography
                sx={{ ml: "auto", fontSize: { md: "1.7rem", xs: "1.4rem" } }}
              >
                120
              </Typography>
            </Grid>
            <Grid item container alignItems="center">
              <Typography
                color="secondary"
                fontSize={{ md: "1.7rem", xs: "1.4rem" }}
                fontWeight={600}
              >
                Post per Day{" "}
              </Typography>
              <Typography
                sx={{ ml: "auto", fontSize: { md: "1.7rem", xs: "1.4rem" } }}
              >
                0.19
              </Typography>
            </Grid>
            <Divider />
          </Grid>
          {/* Visitor Messages */}
          <Grid>
            <Typography
              color="#37D42A"
              fontWeight={700}
              fontSize={{ md: "1.7rem", xs: "1.4rem" }}
            >
              Visitor Messages
            </Typography>

            <Divider />
            <Grid item container alignItems="center">
              <Typography
                color="secondary"
                fontSize={{ md: "1.7rem", xs: "1.4rem" }}
                fontWeight={600}
              >
                Visitor Messages
              </Typography>
              <Typography
                sx={{ ml: "auto", fontSize: { md: "1.7rem", xs: "1.4rem" } }}
              >
                10
              </Typography>
            </Grid>
            <Grid item container alignItems="center">
              <Typography
                color="secondary"
                fontSize={{ md: "1.7rem", xs: "1.4rem" }}
                fontWeight={600}
              >
                Most Recent Message
              </Typography>
              <Typography sx={{ ml: "auto", fontSize: "1.7rem" }}>2</Typography>
            </Grid>
            <Divider />
          </Grid>
          {/* General information */}
          <Grid>
            <Typography
              color="secondary"
              fontSize={{ md: "1.7rem", xs: "1.4rem" }}
              fontWeight={600}
            >
              General Information
            </Typography>

            <Divider />
            <Grid item container alignItems="center">
              <Typography
                color="secondary"
                fontSize={{ md: "1.7rem", xs: "1.4rem" }}
                fontWeight={600}
              >
                Last Activity
              </Typography>
              <Typography
                sx={{ ml: "auto", fontSize: { md: "1.7rem", xs: "1.4rem" } }}
                fontWeight={600}
                color="secondary"
              >
                10-10-2022
              </Typography>
            </Grid>
            <Grid item container alignItems="center">
              <Typography
                color="secondary"
                fontSize={{ md: "1.7rem", xs: "1.4rem" }}
                fontWeight={600}
              >
                Joined Date
              </Typography>
              <Typography
                color="secondary"
                sx={{ ml: "auto", fontSize: { md: "1.7rem", xs: "1.4rem" } }}
                fontWeight={600}
              >
                05-07-2022
              </Typography>
            </Grid>
            <Divider />
          </Grid>
          <Grid>
            <Typography
              color="#37D42A"
              fontWeight={700}
              fontSize={{ md: "1.7rem", xs: "1.4rem" }}
            >
              Most ACTIVE IN
            </Typography>

            <Divider />

            <Typography
              color={"secondary"}
              fontWeight={600}
              fontSize={{ md: "1.7rem", xs: "1.4rem" }}
            >
              Entertainment
            </Typography>
            <Typography
              color={"secondary"}
              fontWeight={600}
              fontSize={{ md: "1.7rem", xs: "1.4rem" }}
            >
              Politics
            </Typography>
            <Divider />
          </Grid>

          <Grid>
            <Typography
              color="#37D42A"
              fontWeight={700}
              fontSize={{ md: "1.7rem", xs: "1.4rem" }}
            >
              TAGGING STATISTICS
            </Typography>

            <Divider />
            <Grid item container alignItems="center">
              <Typography
                color="secondary"
                fontSize={{ md: "1.7rem", xs: "1.4rem" }}
                fontWeight={600}
              >
                Mentioned
              </Typography>
              <Typography
                sx={{ ml: "auto", fontSize: { md: "1.7rem", xs: "1.4rem" } }}
                fontWeight={600}
                color="secondary"
              >
                20 Post(s)
              </Typography>
            </Grid>
            <Grid item container alignItems="center">
              <Typography
                color="secondary"
                fontSize={{ md: "1.7rem", xs: "1.4rem" }}
                fontWeight={600}
              >
                Tagged
              </Typography>
              <Typography
                sx={{ ml: "auto", fontSize: { md: "1.7rem", xs: "1.4rem" } }}
                fontWeight={600}
                color="secondary"
              >
                102 Thread (s)
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

About.propTypes = {};

export default About;
