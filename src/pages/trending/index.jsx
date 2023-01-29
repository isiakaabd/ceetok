import {
  Grid,
  IconButton,
  List,
  Pagination,
  Skeleton,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import images from "assets";
import SinglePosts from "../home/SinglePosts";
import Heading from "./Heading";
import SearchComponent from "components/modals/SearchComponent";
import {
  AddCircleOutline,
  MenuOutlined,
  SettingsOutlined,
  TuneOutlined,
} from "@mui/icons-material";
import { CustomButton } from "components";
import Filters from "components/modals/Filters";
import { useGetPostQuery } from "redux/slices/postSlice";
const Trending = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [count] = useState(10);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [page, setPage] = useState(1);
  const { data: array, isLoading } = useGetPostQuery({
    offset: page - 1,
    category: "trending",
  });
  const handleChange = (e, value) => {
    setPage(value);
  };

  return (
    <Grid
      item
      gap={2}
      container
      sx={{
        p: { md: "4rem", xs: "1rem" },
        background: "#E5E5E5",
      }}
    >
      <Heading />
      <Grid
        item
        container
        sx={{
          p: { md: "4rem", xs: "1rem" },
          borderRadius: "1.5rem",
          background: "#fff",
          mt: "2.5rem",
        }}
      >
        <Grid item container sx={{ pb: 2 }}>
          <Grid
            item
            container
            alignItems="center"
            flexWrap="nowrap"
            justifyContent="space-between"
          >
            <Grid item>
              <CustomButton
                background={"#37D42A"}
                variant="contained"
                disableElevation
                title={"Create Post"}
                sx={{
                  width: { md: "18rem", xs: "10rem" },
                  fontSize: { xs: "1.2rem", md: "1.8rem" },
                }}
                startIcon={
                  <IconButton>
                    <AddCircleOutline />
                  </IconButton>
                }
                // onClick={}
              />
            </Grid>
            <Grid
              item
              sx={{ minWidth: "40rem" }}
              display={{ md: "block", xs: "none" }}
            >
              <SearchComponent handleSubmit={{}} />
            </Grid>
            <Grid item>
              <Grid item container gap={{ md: 3, xs: 1 }} flexWrap="nowrap">
                <Filters
                  anchorEl={anchorEl}
                  setAnchorEl={setAnchorEl}
                  open={open}
                  handleClick={handleClick}
                  handleClose={handleClose}
                />
                <IconButton edge="start" size="small">
                  <TuneOutlined sx={{ fontSize: { md: "4rem", xs: "2rem" } }} />
                </IconButton>
                <IconButton edge="start" size="small">
                  <SettingsOutlined
                    sx={{ fontSize: { md: "4rem", xs: "2rem" } }}
                  />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item container>
          {isLoading ? (
            <Skeleton />
          ) : array?.length > 0 ? (
            <>
              <List
                dense
                sx={{
                  maxHeight: "120rem",
                  overflowY: "scroll",
                  width: "100%",
                  "&::-webkit-scrollbar": {
                    width: ".85rem",
                    display: "none",
                  },
                }}
                xs={12}
              >
                {/* {posts.length > 0 ? ( */}
                {array.map((post, index) => {
                  return <SinglePosts key={index} index={index} post={post} />;
                })}
              </List>
              {/* <Grid item container justifyContent={"center"}> */}
              <Pagination
                page={page}
                count={count}
                hidePrevButton={true}
                hideNextButton={true}
                sx={{ margin: "auto", py: 2 }}
                // boundaryCount={0}
                onChange={handleChange}
              />
              {/* </Grid> */}
            </>
          ) : (
            <Typography variant="h2" width="100%" textAlign="center">
              No Data yet
            </Typography>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Trending;
