import { useState, useEffect, useRef } from "react";
import { FilterList } from "@mui/icons-material";
import {
  Avatar,
  Button,
  ClickAwayListener,
  Grid,
  Grow,
  Checkbox,
  IconButton,
  List,
  Menu,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  Typography,
} from "@mui/material";
import DeleteIcon from "assets/svgs/DeleteIcon";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import SinglePosts from "pages/home/SinglePosts";
import { useSelector } from "react-redux";
import PrivateMessage from "./PrivateMessage";

const Activities = (props) => {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const posts = useSelector((state) => state.posts.posts);
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
  const array =
    posts.length > 0
      ? posts
      : Array(20).fill({
          title:
            "Obi campaign shutsdown Kaduna and path ways for North Eastern Collaboration",
          category: "Politics",
        });
  return (
    <Grid
      item
      container
      sx={{
        mt: "2rem",
        py: 4,
        px: 2,
        borderRadius: "2rem",
        backgroundColor: "#fff",
      }}
      flexDirection="column"
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
          All Posts
        </Typography>
        <Grid item sx={{ mt: 2 }}>
          <Grid container alignItems="center" gap={0.5}>
            {/* <IconButton> */}
            <DeleteIcon sx={{ fontSize: "2.5rem", mt: 1, cursor: "pointer" }} />
            {/* </IconButton> */}
            <Typography fontSize="1.4rem" fontWeight={400} color="secondary">
              Delete All
            </Typography>
            <Checkbox
              defaultChecked
              sx={{
                "& .MuiSvgIcon-root": { fontSize: "2.5rem", color: "#9B9A9A" },
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
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  id="composition-menu"
                  aria-labelledby="composition-button"
                  onKeyDown={handleListKeyDown}
                >
                  <MenuItem onClick={handleClose}>Message</MenuItem>
                  <MenuItem onClick={handleClose}>Post</MenuItem>
                  <MenuItem onClick={handleClose}>Tag</MenuItem>
                  <MenuItem onClick={handleClose}>Recent</MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
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
        {/* {posts.length > 0 ? ( */}
        {array.map((post, index) => {
          return <SinglePosts key={index} post={post} />;
        })}
      </List>
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
            <DeleteIcon sx={{ fontSize: "2.5rem", mt: 1, cursor: "pointer" }} />
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
  );
};
Activities.propTypes = {};

export default Activities;
