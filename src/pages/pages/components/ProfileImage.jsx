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
} from "@mui/material";
import Pen from "assets/svgs/Pen";
import { getImage, link } from "helpers";
import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function ProfileImage({ avatar, name }) {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const token = useSelector((state) => state.auth.token);
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
    fetch("https://api.ceetok.live/user/edit", {
      method: "PATCH",
      body: form,
      headers: {
        // 👇 Set headers manually for single file upload
        AUTHORIZATION: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      // .then((data) => console.log(data))
      .then((data) => {
        toast.success(data.message);
      })
      .catch((err) => toast.error(err));
    setTimeout(() => handleClose(), 500);
  }
  const handleRemoveImage = (e) => {
    const body = {
      profile_pic: null,
    };
    fetch("https://api.ceetok.live/user/edit", {
      method: "PATCH",
      body: JSON.stringify(body),
      headers: {
        // 👇 Set headers manually for single file upload
        AUTHORIZATION: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      // .then((data) => console.log(data))
      .then((data) => {
        toast.success("Image Removed Successfully");
        setTimeout(() => handleClose(e), 500);
      })
      .catch((err) => toast.error(err));
  };
  // console.log(form);
  // const { data, error } = await uploadImage(form);
  // console.log(data, error);

  return (
    <>
      <Badge
        overlap="circular"
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        badgeContent={
          <IconButton edge="start">
            <Pen sx={{ fill: "#37D42A" }} />
          </IconButton>
        }
        ref={anchorRef}
        id="composition-avatar"
        aria-controls={open ? "composition-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
      >
        <Avatar
          alt={name}
          src={getImage(avatar)}
          sx={{
            width: "10rem",
            fontSize: { md: "3rem", xs: "2.5rem" },
            height: "10rem",
            objectFit: "contain",
          }}
        >
          {name?.slice(0, 1)?.toUpperCase()}
        </Avatar>
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
    </>
  );
}
