import { Typography, Grid, Button, Select, MenuItem } from "@mui/material";
import { useState } from "react";
import images from "assets";

import { Link } from "react-router-dom";
import OnlineActivity from "./OnlineActivity";
import Annoucement from "./Annoucement";
import Advert from "./Advert";
import Headings from "./Headings";
import LeftTab from "./LeftTab";
import RightTab from "./RightTab";
import Movie from "./Movie";

const Home = () => {
  const [count, setCount] = useState(5);
  return (
    <Grid item container>
      <Grid
        item
        container
        direction="column"
        gap={4}
        sx={{ paddingInline: { xs: "1rem", md: "4rem" } }}
      >
        <Headings />
        <Movie />
      </Grid>
      <Grid
        container
        sx={{
          mt: 3,
          pb: "3rem",
          marginRight: { xs: "1rem", md: "4rem" },
          marginLeft: { xs: "1rem", md: "0" },
        }}
        flexWrap="nowrap"
        gap={3}
      >
        <LeftTab />
        <RightTab />
      </Grid>
      {/* Adevert */}
      <Advert />
      {/* Announcement */}
      <Annoucement />
      {/* Online Activity */}
      <OnlineActivity />
    </Grid>
  );
};

export default Home;
