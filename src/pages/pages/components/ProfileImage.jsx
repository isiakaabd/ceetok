import {
  Badge,
  Avatar,
  Popper,
  Grow,
  Paper,
  ClickAwayListener,
  MenuList,
  MenuItem,
  IconButton,
  Grid,
  Skeleton,
} from "@mui/material";
import Pen from "assets/svgs/Pen";
import { getImage } from "helpers";
import { useState, useRef, useEffect } from "react";
import { toast } from "react-toastify";
import {
  useDeleteUserProfilePicsMutation,
  useUserProfileUpdateMutation,
} from "redux/slices/authSlice";

export default function ProfileImage({ avatar, name, condition }) {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  // /user/edit
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
  const [updateProfile, { isLoading: load }] = useUserProfileUpdateMutation();
  const [deletePics, { isLoading }] = useDeleteUserProfilePicsMutation();

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);
  const handleChangeImage = (e) => {
    const input = document.createElement("input");

    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = (e) => {
      const file = e.currentTarget.files[0];
      saveToServer(file);
    };
    handleClose(e);
  };
  async function saveToServer(file) {
    const form = new FormData();
    form.append("profile_pic", file);
    const dat = await updateProfile(form);

    toast.success(dat);

    setTimeout(() => handleClose(), 500);
  }
  const handleRemoveImage = async (e) => {
    const { data, error } = await deletePics();
    if (data) toast.success(data);
    if (error) toast.error(error || "Something went wrong...");
  };

  return (
    <Grid>
      <Badge
        overlap="circular"
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        badgeContent={
          !condition && (
            <IconButton edge="start">
              <Pen sx={{ fill: "#37D42A" }} />
            </IconButton>
          )
        }
        ref={anchorRef}
        id="composition-avatar"
        aria-controls={open ? "composition-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        sx={{ background: "white" }}
      >
        {isLoading || load ? (
          <Skeleton
            variant="circular"
            sx={{ width: "10rem", height: "10rem" }}
            animation="wave"
          />
        ) : (
          <Avatar
            alt={name}
            src={getImage(avatar)}
            sx={{
              width: "10rem",
              height: "10rem",
              fontSize: { md: "3rem", xs: "2.5rem" },
              objectFit: "contain",
            }}
          >
            {name?.slice(0, 1)?.toUpperCase()}
          </Avatar>
        )}
      </Badge>

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
                  <MenuItem onClick={handleChangeImage}>Change Avatar</MenuItem>
                  <MenuItem onClick={handleRemoveImage}>Remove Avatar</MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </Grid>
  );
}
