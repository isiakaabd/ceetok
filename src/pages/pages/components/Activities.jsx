import { useState, useEffect, useRef } from "react";
import { DeleteOutline, FilterList } from "@mui/icons-material";
import {
  Button,
  ClickAwayListener,
  Grid,
  Grow,
  List,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  Typography,
  IconButton,
  Skeleton,
} from "@mui/material";
import SinglePosts from "pages/home/SinglePosts";
import PrivateMessage from "./PrivateMessage";
import { useLazyGetPostQuery } from "redux/slices/postSlice";
import { useLazyGetAnnoucementsQuery } from "redux/slices/annoucementSlice";
import SingleAnnoucements from "./SingleAnnoucements";
import { useUserProfileQuery } from "redux/slices/authSlice";
import { useParams } from "react-router-dom";

const Activities = (props) => {
  const [open, setOpen] = useState(false);
  const { id } = useParams();
  const anchorRef = useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);
  // const {data:allPost}
  const { data: profile } = useUserProfileQuery();
  // const {data:allPosts}= useGetPostQuery()
  const [state, setState] = useState({
    data: [],
    type: "post",
  });
  const [getPost, { data: posts, isLoading }] = useLazyGetPostQuery();
  const [getAnnoucement, { data: annoucement, isLoading: loading }] =
    useLazyGetAnnoucementsQuery();

  useEffect(() => {
    if (state.type === "post") {
      const fetchdata = async () => {
        if (id) {
          await getPost({ userId: id });
          if (posts) setState({ data: posts?.posts, type: "post" });
          // };
        } else {
          await getPost({ userId: profile?.id });

          if (posts) setState({ data: posts?.posts, type: "post" });
        }
      };

      fetchdata();
    }
    //eslint-disable-next-line
  }, [profile?.id, posts, state.type]);
  useEffect(() => {
    if (state.type === "annoucement") {
      const fetchdata = async () => {
        if (id) {
          await getAnnoucement({ userId: id });
          if (posts)
            setState({ data: annoucement?.announcements, type: "annoucement" });
          // };
        } else {
          await getAnnoucement({ userId: profile?.id });

          if (posts)
            setState({ data: annoucement?.announcements, type: "annoucement" });
        }
      };

      fetchdata();
    }
    //eslint-disable-next-line
  }, [profile?.id, posts, state.type]);

  // useEffect(() => {
  //   if (posts) setState({ data: posts, type: "post" });
  // }, [posts]);
  const handleAnnoucement = (e) => {
    setState({
      type: "annoucement",
    });
    handleClose(e);
  };
  const handlePost = (e) => {
    setState({
      type: "post",
    });
    handleClose(e);
  };
  return (
    <>
      <Grid
        item
        container
        sx={{
          mt: "2rem",
          py: 4,
          px: 2,
          borderRadius: "2rem",
        }}
        flexDirection="column"
        height="100%"
      >
        <Grid item container flexWrap="nowrap" sx={{ my: 2 }}>
          <Grid container alignItems="center" gap={0.5}>
            <Button
              startIcon={<FilterList sx={{ fontSize: "2rem" }} />}
              ref={anchorRef}
              id="composition-button"
              aria-controls={open ? "composition-menu" : undefined}
              aria-expanded={open ? "true" : undefined}
              aria-haspopup="true"
              onClick={handleToggle}
              sx={{ fontSize: "1.2rem" }}
              variant="outlined"
            >
              Filter
            </Button>
          </Grid>
          <IconButton sx={{ ml: "auto" }}>
            <DeleteOutline sx={{ fontSize: "2rem" }} />
          </IconButton>
        </Grid>
        <Grid item container alignItems="center">
          <Typography sx={{ flex: 1, fontWeight: 600, fontSize: "1.7rem" }}>
            {state.type === "post"
              ? "All Posts"
              : state.type === "annoucement"
              ? "All Announcements"
              : null}
          </Typography>
        </Grid>
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          placement="bottom-start"
          transition
          sx={{ zIndex: 900 }}
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === "bottom-start" ? "left top" : "left bottom",
              }}
            >
              <Paper elevation={3}>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    autoFocusItem={open}
                    id="composition-menu"
                    aria-labelledby="composition-button"
                    onKeyDown={handleListKeyDown}
                  >
                    <MenuItem onClick={handleClose}>Ads</MenuItem>
                    <MenuItem onClick={handleAnnoucement}>Annoucement</MenuItem>
                    <MenuItem onClick={handlePost}>Post</MenuItem>
                    <MenuItem onClick={handleClose}>Tag</MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
        {isLoading ? (
          <Skeletons />
        ) : state.type === "post" ? (
          state?.data?.length > 0 ? (
            <List
              sx={{
                maxHeight: "80rem",
                overflowY: "scroll",
                "&::-webkit-scrollbar": {
                  width: ".85rem",
                  display: "none",
                },
              }}
              xs={12}
            >
              {state?.data?.map((post, index) => {
                return <SinglePosts key={index} post={post} showUser={false} />;
              })}
            </List>
          ) : (
            <Typography
              variant="h2"
              sx={{ width: "100%", py: 2, textAlign: "center" }}
            >
              No Post yet
            </Typography>
          )
        ) : null}
        {state.type === "annoucement" ? (
          <List
            sx={{
              gap: 2,
              width: "100%",
            }}
            dense
          >
            {loading ? (
              <Skeletons />
            ) : state?.data?.length > 0 ? (
              state?.data?.map((item, index) => (
                <SingleAnnoucements annoucements={item} key={index} />
              ))
            ) : (
              <Typography
                variant="h2"
                sx={{ width: "100%", textAlign: "center" }}
              >
                No Annoucement yet
              </Typography>
            )}
          </List>
        ) : null}

        <Grid item container alignItems="center" sx={{ py: 2 }}>
          <Typography
            sx={{
              flex: 1,
              fontWeight: 600,
              fontSize: "1.7rem",
            }}
          >
            Private Message
          </Typography>
          <IconButton sx={{ ml: "auto" }}>
            <DeleteOutline sx={{ fontSize: "2rem" }} />
          </IconButton>
        </Grid>
        <Grid
          item
          container
          alignItems="center"
          sx={{
            maxHeight: "80rem",
            overflowY: "scroll",
            "&::-webkit-scrollbar": {
              width: ".85rem",
              display: "none",
            },
          }}
        >
          <PrivateMessage />
        </Grid>
      </Grid>
    </>
  );
};
Activities.propTypes = {};
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

export default Activities;
