import { Grid } from "@mui/material";
import Advert from "pages/home/Advert";
import Annoucement from "pages/home/Annoucement";
import Headings from "pages/home/Headings";
import LeftTab from "pages/home/LeftTab";
import OnlineActivity from "pages/home/OnlineActivity";
import RightTab from "pages/home/RightTab";
import CreatePost from "pages/user/modals/CreatePost";
import { useState } from "react";

const New = () => {
  const [openCreatePost, setCreatePost] = useState(false);

  return (
    <>
      <Grid item container>
        <Grid
          item
          container
          direction="column"
          gap={4}
          sx={{ paddingInline: { xs: "1rem", md: "4rem" } }}
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
          <RightTab setCreatePost={setCreatePost} more={{ latest: true }} />
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

export default New;
