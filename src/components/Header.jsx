import { useState, useEffect, useRef } from "react";

import {
  AppBar,
  Container,
  Typography,
  IconButton,
  Toolbar,
  Box,
  ListItemText,
  MenuItem,
  ListItemAvatar,
  ListItemButton,
  Button,
} from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import images from "assets";
import { Grid } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import Modals from "./Modal";
import RegisterModal from "./modals/RegisterModal";
import LoginModal from "./modals/LoginModal";
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

function Header() {
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
  const [modal, setModal] = useState(false);
  const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);
  const [isLogin, setIsLogin] = useState(false);
  const handleRegisterClose = () => setModal(false);
  const handleRegisterOpen = () => {
    setIsLogin(false);
    setModal(true);
  };
  const handleLoginOpen = () => {
    setModal(false);
    setIsLogin(true);
  };
  const handleLoginClose = () => setIsLogin(false);
  return (
    <>
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
                {/* <Link to={"/login"} style={{ textDecoration: "none" }}> */}
                <MenuItem
                  sx={{ padding: 0, margin: 0, color: "#37D42A" }}
                  onClick={handleLoginOpen}
                >
                  <ListItemText>Login</ListItemText>
                </MenuItem>
                {/* </Link> */}
                {/* <Link to={"/login"} style={{ textDecoration: "none" }}> */}
                {/* <MenuItem
                  sx={{
                    padding: ".8rem 2.5rem",
                    background: "blue",
                    borderRadius: 50,
                    margin: 0,
                    color: "#fff",
                    backgroundColor: "#37D42A",
                  }}
                > */}
                <Button
                  sx={{
                    padding: "1.5rem 3rem",
                    background: "blue",
                    borderRadius: 50,
                    margin: 0,
                    color: "#fff",
                    backgroundColor: "#37D42A",
                    "&:hover": {
                      backgroundColor: "#37D42A",
                    },
                  }}
                  variant="contained"
                  disableElevation
                  onClick={handleRegisterOpen}
                >
                  Register
                </Button>
                {/* </MenuItem> */}
                {/* </Link> */}
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

      {modal && (
        <RegisterModal handleClose={handleRegisterClose} isOpen={modal} />
      )}

      {isLogin && (
        <LoginModal
          handleClose={handleLoginClose}
          // handleRegisterOpen={handleRegisterOpen}
          isLogin={isLogin}
        />
      )}
    </>
  );
}
export default Header;
