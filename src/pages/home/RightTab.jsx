import { Grid, Button, List, Typography, Skeleton } from "@mui/material";
import { AddCircleOutline } from "@mui/icons-material";
import { useState } from "react";

import { useSelector } from "react-redux";

import SinglePosts from "./SinglePosts";
import Filters from "components/modals/Filters";
import LoginModal from "components/modals/LoginModal";
import { useGetPostQuery } from "redux/slices/postSlice";
import Paginations from "components/modals/Paginations";
import Error from "pages/pages/components/Error";

const RightTab = ({ setCreatePost, more }) => {
  // const posts = useSelector((state) => state.posts.posts);
  const [register, setRegister] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [value, setValue] = useState("");
  const loginStatus = useSelector((state) => state.auth.token);
  const [page, setPage] = useState(1);
  const {
    data: array,
    error,
    isLoading,
  } = useGetPostQuery({ offset: page - 1, from: value, ...more });

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

  if (isLoading) return <Skeletons />;
  if (error) return <Error />;
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
              value={value}
              setValue={setValue}
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
          {array?.posts?.length > 0 ? (
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
                {array?.posts?.map((post, index) => {
                  return <SinglePosts key={index} index={index} post={post} />;
                })}
              </List>

              {array?.total_pages > 1 && (
                <Paginations
                  page={page}
                  setPage={setPage}
                  count={array?.total_pages}
                />
              )}
              {/* </Grid> */}
            </>
          ) : (
            <Typography variant="h2" sx={{ width: "100%" }} textAlign="center">
              No Data yet
            </Typography>
          )}
        </Grid>
      </Grid>
      {register && (
        <LoginModal handleClose={() => setRegister(false)} isLogin={register} />
      )}
    </>
  );
};
function Skeletons() {
  return (
    <Grid
      item
      container
      flexDirection={"column"}
      gap={2}
      sx={{ padding: { md: "0", xs: "1rem" }, marginInline: "auto" }}
      flexWrap={{ md: "nowrap", xs: "wrap" }}
    >
      <Grid
        item
        alignItems="center"
        container
        justifyContent={"space-between"}
        flexWrap={"nowrap"}
      >
        <Skeleton
          sx={{ height: "4rem", borderRadius: "2rem", width: "15rem" }}
          animation="wave"
          variant="rectangular"
        />
        <Skeleton
          sx={{ height: "4rem", width: "12rem" }}
          animation="wave"
          variant="rounded"
        />
      </Grid>
      {Array(5)
        .fill(undefined)
        .map((item, index) => (
          <Grid item container flexWrap={"nowrap"} gap={2} key={index}>
            <Grid item>
              <Grid item container gap={1}>
                <Grid item>
                  <Skeleton
                    sx={{ height: "1rem", width: "1rem" }}
                    animation="wave"
                    variant="rounded"
                  />
                </Grid>
                <Skeleton
                  sx={{ height: "8rem", width: "8rem" }}
                  animation="wave"
                  variant="rounded"
                />
              </Grid>
            </Grid>
            <Grid item flex={1}>
              <Grid item container flexDirection="column">
                <Skeleton
                  sx={{ height: "3rem", borderRadius: "1rem", width: "8rem" }}
                  animation="wave"
                  variant="text"
                />
                <Grid item container gap={0.5} flexDirection="column">
                  <Grid item>
                    <Skeleton
                      sx={{ height: "1rem", width: "100%" }}
                      animation="wave"
                      variant="text"
                    />
                  </Grid>
                  <Grid item>
                    <Skeleton
                      sx={{ height: "1rem", width: "60%" }}
                      animation="wave"
                      variant="text"
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        ))}
    </Grid>
  );
}

export default RightTab;
