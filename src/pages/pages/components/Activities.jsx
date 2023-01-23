import { useState, useEffect, useRef } from "react";
import { FilterList } from "@mui/icons-material";
import {
  Button,
  ClickAwayListener,
  Grid,
  Grow,
  Checkbox,
  List,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  Typography,
} from "@mui/material";
import DeleteIcon from "assets/svgs/DeleteIcon";
import SinglePosts from "pages/home/SinglePosts";
import PrivateMessage from "./PrivateMessage";
import { useGetPostQuery } from "redux/slices/postSlice";
import { useGetAnnoucementsQuery } from "redux/slices/annoucementSlice";
import SingleAnnoucements from "./SingleAnnoucements";

const Activities = (props) => {
  const [open, setOpen] = useState(false);
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
  const { data: posts, error } = useGetPostQuery("");
  const { data: annoucement } = useGetAnnoucementsQuery();

  const [state, setState] = useState({
    data: posts,
    type: "post",
  });
  console.log(posts);
  useEffect(() => {
    if (posts) setState({ data: posts, type: "post" });
  }, [posts]);
  const handleAnnoucement = (e) => {
    setState({
      type: "annoucement",
      data: annoucement,
    });
    handleClose(e);
  };
  const handlePost = (e) => {
    setState({
      type: "post",
      data: posts,
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
        <Grid item sx={{ my: 2 }}>
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
        </Grid>
        <Grid item container alignItems="center">
          <Typography sx={{ flex: 1, fontWeight: 600, fontSize: "1.7rem" }}>
            {state.type === "post"
              ? "All Posts"
              : state.type === "annoucement"
              ? "All Announcements"
              : null}
          </Typography>
          <Grid item sx={{ mt: 2 }}>
            <Grid container alignItems="center" gap={0.5}>
              {/* <IconButton> */}
              <DeleteIcon
                sx={{ fontSize: "2.5rem", mt: 1, cursor: "pointer" }}
              />
              {/* </IconButton> */}
              <Typography fontSize="1.4rem" fontWeight={400} color="secondary">
                Delete All
              </Typography>
              <Checkbox
                defaultChecked
                sx={{
                  "& .MuiSvgIcon-root": {
                    fontSize: "2.5rem",
                    color: "#9B9A9A",
                  },
                }}
              />
            </Grid>
          </Grid>
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
        {state.type === "post" ? (
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
                return <SinglePosts key={index} post={post} />;
              })}
            </List>
          ) : (
            <Typography variant="h2">No Post yet</Typography>
          )
        ) : null}
        {state.type === "annoucement" ? (
          <List
            item
            container
            sx={{
              mt: 6,
              gap: { md: 3, xs: 2 },
              display: "grid",
              gridTemplateColumns: {
                md: "repeat(2,1fr)",
                xs: "1fr",
                // sm: "1fr 1fr",
              },
            }}
          >
            {state?.data?.length > 0 ? (
              state?.data?.map((item, index) => (
                <SingleAnnoucements annoucements={item} key={index} />
              ))
            ) : (
              <Typography variant="h2">No Annoucement yet</Typography>
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
          <Grid item>
            <Grid container alignItems="center" gap={0.5}>
              {/* <IconButton> */}
              <DeleteIcon
                sx={{ fontSize: "2.5rem", mt: 1, cursor: "pointer" }}
              />
              {/* </IconButton> */}
              <Typography fontSize="1.4rem" fontWeight={400} color="secondary">
                Delete All
              </Typography>
              <Checkbox />
            </Grid>
          </Grid>
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

export default Activities;
