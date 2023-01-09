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
  InputBase,
  Menu,
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
import { ArrowDropDown, SearchOutlined } from "@mui/icons-material";
import { useSelector } from "react-redux";
import UserAccount from "./UserAccount";
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

    "&.Mui-selected,&:hover": {
      borderBottom: `3px solid ${theme.palette.success.main}`,
      background: "transparent",
    },
    "& .MuiListItemText-root": {
      textDecoration: "none",
      color: "currentColor",
      fontSize: "2.2rem",
      //   padding: "1rem 1.5rem",
      "&:active,&:hover": {},
    },
  }));
  const loginStatus = useSelector((state) => state.auth.auth);
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  const [anchorEl, setAnchorEl] = useState(null);
  // const opens = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const [anchorEls, setAnchorEls] = useState(null);
  const opens = Boolean(anchorEl);
  const handleClicks = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloses = () => {
    setAnchorEl(null);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

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
  const Search = () => {
    return (
      <Grid
        item
        container
        alignItems="center"
        border="1px solid #D3D3D3"
        sx={{ borderRadius: "3rem", height: "4rem", background: "#fff" }}
      >
        <IconButton>
          <SearchOutlined sx={{ fontSize: "2rem", color: "#9B9A9A" }} />
        </IconButton>
        <InputBase
          sx={{ flex: 1, px: 2 }}
          placeholder="Search Categories"
          color="#9B9A9A"
          fontSize="1.1rem"
        />
        <Typography color="#9B9A9A" fontSize="1.1rem">
          All
        </Typography>
        <IconButton>
          <ArrowDropDown />
        </IconButton>
      </Grid>
    );
  };
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
                }}
              >
                {pages.map((page, index) => (
                  <Link
                    to={page.path}
                    style={{
                      textDecoration: "none",
                      paddingInline: "2.5rem",
                    }}
                    onClick={() => setActive(index)}
                  >
                    <ListItem key={page.path} selected={index === active}>
                      <ListItemText disableTypography>
                        {page.title}
                      </ListItemText>
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

              {loginStatus ? (
                <UserAccount />
              ) : (
                <Box
                  sx={{
                    display: "flex",
                    flex: { md: 0, sm: 1 },
                    justifyContent: "flex-end",
                    gap: "3rem",
                    alignItems: "center",
                  }}
                >
                  <MenuItem
                    sx={{
                      padding: 0,
                      margin: 0,
                      color: "#37D42A",
                      fontSize: { md: "1.8rem", sm: "1.3rem" },
                      fontWeight: 700,
                    }}
                    onClick={handleLoginOpen}
                  >
                    Login
                  </MenuItem>

                  <Button
                    sx={{
                      padding: "1rem 2.5rem",
                      borderRadius: "3rem",
                      margin: 0,
                      fontWeight: 700,
                      fontSize: { md: "1.5rem", sm: "1.3rem" },
                      color: "#fff",
                      display: "block",
                      // maxWidth: "15rem",
                      textTransform: "capitalize",
                      // width: { md: "15rem", xs: "10rem" },
                      backgroundColor: "#37D42A",
                      whiteSpace: "nowrap",
                    }}
                    variant="contained"
                    disableElevation
                    disableTouchRipple
                    onClick={handleRegisterOpen}
                  >
                    Sign-up
                  </Button>
                </Box>
              )}
            </Toolbar>
          </Container>
        </AppBar>
        <Offset />

        <Grid
          item
          container
          alignItems="center"
          gap={2}
          sx={{
            flexWrap: "nowrap",
            display: { md: "none", xs: "flex" },
            paddingInline: "1rem",
          }}
        >
          <IconButton
            id="basic-button"
            aria-controls={opens ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={opens ? "true" : undefined}
            onClick={handleClicks}
            size="large"
            sx={{ p: 0 }}
          >
            <MenuIcon sx={{ p: 0, fontSize: "3rem" }} />
          </IconButton>
          <Search />
        </Grid>

        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={opens}
          onClose={handleCloses}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          {pages.map((page) => (
            <Link
              to={page.path}
              style={{ textDecoration: "none" }}
              key={page.path}
            >
              <MenuItem
                sx={{ color: "#5F5C5C", fontSize: "1.8rem" }}
                onClick={handleCloses}
              >
                {page.title}
              </MenuItem>
            </Link>
          ))}
        </Menu>
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
