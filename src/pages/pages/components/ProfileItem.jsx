import { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { SettingsOutlined } from "@mui/icons-material";
import {
  Avatar,
  ClickAwayListener,
  Grid,
  Grow,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  Typography,
} from "@mui/material";

const ProfileItem = ({ profile }) => {
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
  return (
    <>
      <ListItem
        sx={{
          borderRadius: "1rem",
          mb: 2,
          boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        }}
      >
        <ListItemAvatar alignItems="flex-start">
          <IconButton>
            <Avatar alt="Remy Sharp">R</Avatar>
          </IconButton>
        </ListItemAvatar>
        <ListItemText
          primary={
            <Grid item alignItems="center" gap={1} container flexWrap="nowrap">
              <Typography color="#9B9A9A" fontSize="1.4rem" fontWeight={400}>
                John Friday
              </Typography>
              <div
                style={{
                  width: ".5rem",
                  background: "#37D42A",
                  height: ".5rem",
                  borderRadius: "50%",
                }}
              />
            </Grid>
          }
          // "Brunch this weekend?"
          secondary={
            <Typography fontSize="1.4rem" fontWeight={400} color="#9B9A9A">
              @johnneskey
            </Typography>
          }
        />
        <ListItemIcon>
          <IconButton
            ref={anchorRef}
            id="composition-avatar"
            aria-controls={open ? "composition-menu" : undefined}
            aria-expanded={open ? "true" : undefined}
            aria-haspopup="true"
            onClick={handleToggle}
          >
            <SettingsOutlined sx={{ fontSize: "3rem", color: "#9B9A9A" }} />
          </IconButton>
        </ListItemIcon>
      </ListItem>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        placement="bottom-start"
        transition
        disablePortal
        sx={{ zIndex: 900 }}
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
                  <MenuItem onClick={handleClose}>Change Avatar</MenuItem>
                  <MenuItem onClick={handleClose}>Remove Avatar</MenuItem>
                  <MenuItem onClick={handleClose}>Save Avatar</MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
};

ProfileItem.propTypes = {};

export default ProfileItem;