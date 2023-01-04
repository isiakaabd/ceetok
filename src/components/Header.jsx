import { useState, useEffect, useRef } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import {
  Avatar,
  ListItemText,
  MenuList,
  Popper,
  Paper,
  ClickAwayListener,
  Grow,
  ListItemAvatar,
} from "@mui/material";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
// import AdbIcon from "@mui/icons-material/Adb";
import images from "assets";
import { Grid } from "@mui/material";
import { Link } from "react-router-dom";
import { alpha, styled } from "@mui/material/styles";

const pages = [
  {
    id: 0,
    path: "/",
    title: "Trending",
    icon: "home",
  },
  {
    id: 1,
    path: "/live",
    title: "Live",
  },
  {
    id: 2,
    path: "/new",
    title: "New",
  },
  {
    id: 3,
    path: "/recent",
    title: "Recent",
  },
  {
    id: 4,
    path: "/contact-us",
    title: "Contact Us",
  },
];
// const pages = ["Trending", "Live", "New", "Recent", "Contact Us"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

function Header() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const ListItem = styled(MenuItem)(({ theme }) => ({
    margin: 0,
    color: "#5F5C5C",
    padding: 0,

    display: "flex",
    alignItems: "center",

    "&:hover": {
      background: "transparent",
    },
    "&.Mui-selected": {
      borderBottom: `3px solid ${theme.palette.success.main}`,
      background: "transparent",
    },
    "& .MuiListItemText-root": {
      textDecoration: "none",
      color: "currentColor",

      //   padding: "1rem 1.5rem",
      "&:active,&:hover": {},
    },
  }));

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
  const [active, setActive] = useState(0);
  const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);
  return (
    <Grid item container>
      <AppBar
        position="static"
        elevation={0}
        sx={{
          height: "10rem",
          justifyContent: "center",
          display: "flex",
          background: "inherit",
          zIndex: 300,
          paddingInline: { xs: "1rem", md: "4rem" },
          backdropFilter: "blur(5px)",
        }}
      >
        <Container maxWidth="xl" sx={{ p: "0 !important" }}>
          <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
            <img
              src={images.logo}
              variant="square"
              alt="logo"
              style={{ width: "10em", objectFit: "contain" }}
            />

            {/* 2 */}
            <Box
              sx={{
                display: { xs: "none", md: "flex", margin: "auto" },
                gap: "3rem",
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {pages.map((page, index) => (
                <Link
                  to={page.path}
                  style={{ textDecoration: "none", marginInline: "1rem" }}
                >
                  <ListItem key={page.path} selected={index === active}>
                    <ListItemText>{page.title}</ListItemText>
                    {page.title === "Live" && (
                      <ListItemAvatar
                        sx={{
                          minWidth: 0,
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <div
                          style={{
                            // height: "1.5rem",
                            // width: "1.5rem",
                            borderRadius: "50%",
                            display: "inline-flex",
                            justifyContent: "center",
                            alignItems: "center",
                            marginLeft: "4px",
                            backgroundColor: "#37D42A",
                          }}
                        >
                          <Typography
                            variant="span"
                            sx={{
                              fontSize: ".8rem",
                              color: "#fff",
                              padding: ".3rem",
                            }}
                          >
                            New
                          </Typography>
                        </div>
                      </ListItemAvatar>
                    )}
                  </ListItem>
                </Link>
              ))}
            </Box>
            {/* 3 */}
            <Box
              sx={{
                display: "flex",
                flex: { md: 0, sm: 1 },
                justifyContent: "flex-end",
                gap: "3rem",
                alignItems: "center",
              }}
            >
              <Link to={"/login"} style={{ textDecoration: "none" }}>
                <MenuItem sx={{ padding: 0, margin: 0, color: "#37D42A" }}>
                  <ListItemText>Login</ListItemText>
                </MenuItem>
              </Link>
              <Link to={"/login"} style={{ textDecoration: "none" }}>
                <MenuItem
                  sx={{
                    padding: ".8rem 2.5rem",
                    background: "blue",
                    borderRadius: 50,
                    margin: 0,
                    color: "#fff",
                    backgroundColor: "#37D42A",
                  }}
                >
                  <ListItemText>Register</ListItemText>
                </MenuItem>
              </Link>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Offset />
      <Offset />
      <Offset />
      <Offset />
      <Grid sx={{ paddingInline: "2rem" }}>
        <Box
          sx={{
            display: { xs: "flex", md: "none" },
            position: "relative",
          }}
        >
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            color="red"
          >
            <MenuIcon />
          </IconButton>
        </Box>
      </Grid>
    </Grid>
  );
}
export default Header;
