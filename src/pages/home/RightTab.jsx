import {
  Grid,
  Button,
  List,
  Skeleton,
  Typography,
  Pagination,
} from "@mui/material";
import { AddCircleOutline } from "@mui/icons-material";
import { useState } from "react";

import { useSelector } from "react-redux";

import SinglePosts from "./SinglePosts";
import Filters from "components/modals/Filters";
import LoginModal from "components/modals/LoginModal";
import { useGetPostQuery } from "redux/slices/postSlice";

const RightTab = ({ setCreatePost }) => {
  // const posts = useSelector((state) => state.posts.posts);
  const [register, setRegister] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const loginStatus = useSelector((state) => state.auth.token);
  const [page, setPage] = useState(1);
  const {
    data: array,
    error,
    isLoading,
  } = useGetPostQuery({ offset: page - 1 });
  const [count] = useState(10);
  const handleChange = (e, value) => {
    setPage(value);
  };
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleCreatePost = () => {
    if (!loginStatus) {
      setRegister(true);
    } else {
      setCreatePost(true);
    }
  };

  // if (isLoading) return <Skeleton />;
  if (error) return <p>Something went wrong...</p>;
  return (
    <>
      <Grid
        item
        container
        md={9}
        xs={12}
        sx={{
          borderRadius: "2rem ",
          padding: { md: "0", xs: "1rem" },
          marginInline: "auto",
        }}
        gap={2}
        flexDirection="column"
        alignItems="flex-start"
      >
        <Grid item container flexDirection="column">
          <Grid
            item
            container
            justifyContent="space-between"
            alignItems="center"
            flexWrap="nowrap"
            sx={{ mb: 1 }}
          >
            <Button
              background={"#37D42A"}
              sx={{
                backgroundColor: "#37D42A",
                fontSize: { md: "1.9rem", xs: "1.4rem" },
                paddingInline: { md: "3rem", xs: "1.2rem" },
                borderRadius: 25,
                color: "#fff",
                fontWeight: 600,
                height: "100%",
                ":hover": {
                  background: "#37D42A",
                },
              }}
              variant="contained"
              disableElevation
              startIcon={<AddCircleOutline />}
              onClick={handleCreatePost}
            >
              Create Post
            </Button>

            <Filters
              anchorEl={anchorEl}
              setAnchorEl={setAnchorEl}
              open={open}
              handleClick={handleClick}
              handleClose={handleClose}
            />
          </Grid>
          {isLoading && page > 1 && (
            <Typography
              variant="h4"
              width={"100%"}
              fontWeight={600}
              sx={{ color: "#37D42A" }}
              textAlign="center"
            >
              Loading...
            </Typography>
          )}
        </Grid>
        <Grid item container>
          {array?.length > 0 ? (
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
            <Typography variant="h2">No Data yet</Typography>
          )}
        </Grid>
      </Grid>
      {register && (
        <LoginModal handleClose={() => setRegister(false)} isLogin={register} />
      )}
    </>
  );
};

export default RightTab;
