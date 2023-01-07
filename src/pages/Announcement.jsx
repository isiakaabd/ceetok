import images from "assets";
import { Typography, Menu, MenuItem, Grid, Button } from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import { useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  ChatBubbleOutline,
  FavoriteBorderOutlined,
  FilterList,
  IosShareOutlined,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Modals from "components/Modal";
import RegisterModal from "components/modals/RegisterModal";

const Announcement = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const StyledMenu = styled((props) => (
    <Menu
      elevation={0}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      {...props}
    />
  ))(({ theme }) => ({
    "& .MuiPaper-root": {
      borderRadius: 6,
      marginTop: theme.spacing(1),
      minWidth: 180,
      color:
        theme.palette.mode === "light"
          ? "rgb(55, 65, 81)"
          : theme.palette.grey[300],
      boxShadow:
        "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
      "& .MuiMenu-list": {
        padding: "4px 0",
      },
      "& .MuiMenuItem-root": {
        "& .MuiSvgIcon-root": {
          fontSize: 18,
          color: theme.palette.text.secondary,
          marginRight: theme.spacing(1.5),
        },
        "&:active": {
          backgroundColor: alpha(
            theme.palette.primary.main,
            theme.palette.action.selectedOpacity
          ),
        },
      },
    },
  }));
  const loginStatus = useSelector((state) => state.auth.auth);
  const [modal, setModal] = useState(false);
  const navigate = useNavigate();
  return (
    <>
      <Grid item container sx={{ paddingInline: { xs: "1rem", md: "4rem" } }}>
        <Grid
          item
          container
          alignItems="center"
          justifyContent="space-between"
          gap={3}
          flexWrap="nowrap"
        >
          <Grid item container alignItems="center">
            <Grid
              item
              container
              alignItems="center"
              justifyContent="center"
              sx={{
                cursor: "pointer",

                padding: "1.2rem 2rem",
              }}
              flexWrap="nowrap"
              gap={3}
            >
              <img
                src={images.annoucement}
                alt="annoucement icon"
                style={{
                  width: "4rem",
                  height: "4rem",
                  display: "inline-block",
                }}
              />
              <Typography
                sx={{ color: "#464646", fontSize: "2.5rem", fontWeight: 700 }}
              >
                Annoucement
              </Typography>
            </Grid>
            <Button
              sx={{
                height: "3.5rem",
                borderRadius: ".5rem",
                backgroundColor: "#5F5C5C",
                color: "#fff",
                fontWeight: 700,
                fontSize: "1.2rem",
                padding: "1rem 2rem",
                "&:hover": {
                  backgroundColor: "#5F5C5C",
                  color: "#fff",
                },
              }}
              variant="outlined"
              onClick={() =>
                loginStatus ? navigate("/make-announcement") : setModal(true)
              }
            >
              Make Annoucement
            </Button>
          </Grid>

          <div>
            <Button
              id="demo-customized-button"
              aria-controls={open ? "demo-customized-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              variant="contained"
              disableElevation
              sx={{ width: "10rem" }}
              onClick={handleClick}
              startIcon={<FilterList />}
            >
              Sort by
            </Button>
            <StyledMenu
              id="demo-customized-menu"
              MenuListProps={{
                "aria-labelledby": "demo-customized-button",
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose} disableRipple>
                Date
              </MenuItem>
              <MenuItem onClick={handleClose} disableRipple>
                Trending
              </MenuItem>
              <MenuItem onClick={handleClose} disableRipple>
                Recent
              </MenuItem>
            </StyledMenu>
          </div>
        </Grid>

        {/* list */}
        <Grid
          item
          container
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(4,1fr)" },
            py: 8,
            gap: 4,
            borderRadius: "1.6rem",
            background: "White",
          }}
        >
          {Array(20)
            .fill(undefined)
            .map((item, index) => (
              <Grid item container key={index} flexWrap="nowrap">
                <Grid
                  item
                  sx={{
                    padding: "2rem",
                    border: "1px solid #9B9A9A",
                    borderRadius: "1.2rem",
                  }}
                >
                  <img src={images.davido} alt="davido" />

                  <Typography
                    sx={{
                      color: "#464646",
                      fontSize: "1.3rem",
                      fontWeight: 700,
                    }}
                  >
                    David Ifeanyi Adeleke is confirmed dead after drowing in a
                    swimming pool
                  </Typography>
                  <Grid
                    item
                    container
                    justifyContent="space-between"
                    alignItems="center"
                    flexWrap="nowrap"
                    sx={{ color: "#5F5C5C", mt: 3 }}
                  >
                    <Grid item>
                      <Grid container alignItems="center">
                        <ChatBubbleOutline />
                        <Typography variant="span" sx={{ ml: 1 }}>
                          223
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid item>
                      <Grid container alignItems="center">
                        <FavoriteBorderOutlined />
                        <Typography variant="span" sx={{ ml: 1 }}>
                          223
                        </Typography>
                      </Grid>
                    </Grid>
                    <IosShareOutlined />

                    <MoreVertIcon />
                  </Grid>
                </Grid>
              </Grid>
            ))}
        </Grid>
      </Grid>

      <Modals isOpen={modal} handleClose={() => setModal(false)}>
        <RegisterModal />
      </Modals>
    </>
  );
};

export default Announcement;
