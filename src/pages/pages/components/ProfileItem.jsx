import { useState, useRef, useEffect } from "react";
import { PersonAddAlt1Outlined, SettingsOutlined } from "@mui/icons-material";
import {
  Avatar,
  ClickAwayListener,
  Grid,
  Grow,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  Typography,
} from "@mui/material";
import {
  useBlockUserMutation,
  useFollowUserMutation,
  useUnBlockUserMutation,
} from "redux/slices/authSlice";
import { getImage } from "helpers";
import { toast } from "react-toastify";
import { useBanUsersMutation } from "redux/slices/adminSlice";
import { useSelector } from "react-redux";
import CustomizedTooltips from "components/ToolTips";
import { useNavigate } from "react-router-dom";

const ProfileItem = ({ profile }) => {
  console.log(profile);
  const {
    full_name,
    is_blocked_by_me,
    is_follower,
    is_followed,
    id,
    username,
    banned,
  } = profile;
  console.log(profile);
  const admin = useSelector((state) => state.auth.admin);
  const navigate = useNavigate();
  const [followUser, { isLoading: following }] = useFollowUserMutation();
  const [banorUnban, { isLoading }] = useBanUsersMutation();
  const [blockUser, { isLoading: blocking }] = useBlockUserMutation();
  const [unBlock, { isLoading: unblocking }] = useUnBlockUserMutation();
  const overflow = {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  };

  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef?.current && anchorRef?.current.contains(event.target)) {
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

  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  const handleBanUser = async (e) => {
    const { data, error } = await banorUnban({
      users: [id],
    });
    if (data) toast.success(data);
    if (error) toast.error(error);
    setTimeout(() => handleClose(e), 300);
  };
  const handleFollowUser = async (e) => {
    const { data, error } = await followUser({
      user_id: id,
    });
    if (data) {
      toast.success(data);
      setTimeout(() => handleClose(e), 3000);
    }
    if (error) toast.success(error);
  };
  const handleBlockUser = async (e) => {
    if (!is_blocked_by_me) {
      const { data, error } = await blockUser({
        user_id: id,
      });
      if (data) {
        toast.success(data);
        setTimeout(() => handleClose(e), 3000);
      }
      if (error) toast.success(error);
    } else {
      const { data, error } = await unBlock({
        user_id: id,
      });
      if (data) {
        toast.success(data);
        setTimeout(() => handleClose(e), 3000);
      }
      if (error) toast.success(error);
    }
  };
  return (
    <ListItemButton>
      <ListItem
        sx={{
          borderRadius: "1rem",
          mb: 2,
          boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        }}
      >
        <ListItemAvatar alignItems="flex-start">
          <IconButton>
            <Avatar alt={profile?.full_name} src={getImage(profile?.avatar)}>
              {profile?.full_name?.slice(0, 1).toUpperCase()}
            </Avatar>
          </IconButton>
        </ListItemAvatar>
        <ListItemText
          primary={
            <Grid item alignItems="center" gap={1} container flexWrap="nowrap">
              <Typography
                color="#9B9A9A"
                fontSize="1.4rem"
                lineHeight={2}
                fontWeight={400}
                variant="span"
                sx={{ ...overflow, verticalAlign: "middle" }}
              >
                {full_name}
              </Typography>
              {is_follower && (
                <CustomizedTooltips title="following You">
                  <PersonAddAlt1Outlined
                    sx={{
                      top: ".3rem",
                      color: "#9B9A9A",
                      position: "relative",
                      width: "2rem",
                      height: "2rem",
                    }}
                  />
                </CustomizedTooltips>
              )}
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
            <Typography
              fontSize="1.4rem"
              fontWeight={400}
              color="#9B9A9A"
              sx={overflow}
            >
              {username ? `@${username}` : "No username"}
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
        anchorEl={anchorRef?.current}
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
                  {admin && (
                    <MenuItem onClick={handleBanUser}>
                      {isLoading
                        ? "Loading..."
                        : banned
                        ? "Unban User"
                        : "Ban User"}
                    </MenuItem>
                  )}
                  {admin && (
                    <MenuItem onClick={handleClose}>Send Mail</MenuItem>
                  )}

                  <MenuItem
                    onClick={(e) => {
                      navigate(`/user/message/${id}`);
                      handleClose(e);
                    }}
                  >
                    Send Message
                  </MenuItem>

                  <MenuItem onClick={handleFollowUser}>
                    {following
                      ? "Following"
                      : is_followed
                      ? "Unfollow User"
                      : "Follow User"}
                  </MenuItem>
                  <MenuItem onClick={handleBlockUser}>
                    {blocking || unblocking
                      ? "Loading"
                      : !is_blocked_by_me
                      ? "Block User"
                      : "UnBlock User"}
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </ListItemButton>
  );
};

ProfileItem.propTypes = {};

export default ProfileItem;
