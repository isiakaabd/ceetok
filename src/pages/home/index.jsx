import { Grid } from "@mui/material";
import { useState } from "react";
import OnlineActivity from "./OnlineActivity";
import Annoucement from "./Annoucement";
import Advert from "./Advert";
import Headings from "./Headings";
import LeftTab from "./LeftTab";
import RightTab from "./RightTab";
import CreatePost from "pages/user/modals/CreatePost";

const Home = () => {
  const [openCreatePost, setCreatePost] = useState(false);

  return (
    <>
      <Grid item container>
        <Grid
          item
          container
          direction="column"
          gap={4}
          sx={{
            paddingInline: { xs: "1rem", md: "4rem" },
          }}
        >
          <Headings />
          {/* <Movie /> */}
        </Grid>
        <Grid
          container
          sx={{
            mt: 3,
            pb: "3rem",
            marginInline: "auto",
            overflowX: "hidden",
            marginRight: { md: "4rem" },
            marginLeft: { md: "0" },
          }}
          flexWrap="nowrap"
          gap={3}
        >
          <LeftTab />
          <RightTab
            setCreatePost={setCreatePost}
            more={{ category: "front_page" }}
          />
        </Grid>
        {/* Adevert */}
        <Advert />
        {/* Announcement */}
        <Annoucement />
        {/* Online Activity */}
        <OnlineActivity />
      </Grid>
      <CreatePost
        open={openCreatePost}
        handleClose={() => setCreatePost(false)}
      />
    </>
  );
};

export default Home;
