import { Avatar, Grid, IconButton, Typography } from "@mui/material";
import { useState, useRef, useEffect } from "react";
import Notifications from "./Notifications";
import NotificationIcon from "assets/svgs/NotificationIcon";
import {
  useLazyUserProfileQuery,
  useUserProfileQuery,
} from "redux/slices/authSlice";
import Tooltips from "./ToolTips";
import { getImage } from "helpers";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const UserAccount = ({ status: userStatus }) => {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const anchorRefs = useRef(null);
  const admin = useSelector((state) => state.auth.admin);
  const loginStatus = useSelector((state) => state.auth.token);
  const navigate = useNavigate();
  const [getProfile, { data: userProfile }] = useLazyUserProfileQuery();
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };
  useEffect(() => {
    if (userStatus) {
      getProfile();
    }
    //eslint-disable-next-line
  }, [userStatus]);

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };
  const [opens, setOpens] = useState(false);

  const handleToggles = () => {
    setOpens((prevOpen) => !prevOpen);
  };

  const handleCloses = (event) => {
    if (anchorRefs.current && anchorRefs.current.contains(event.target)) {
      return;
    }

    setOpens(false);
  };
  return (
    <Grid item>
      <Grid
        item
        container
        gap={{ md: 3, sm: 2, xs: 0.5 }}
        flexWrap="nowrap"
        alignItems="center"
      >
        {loginStatus && (
          <>
            <Tooltips title={"Notifications"}>
              <IconButton
                onClick={() => navigate("/user/notifications")}
                ref={anchorRef}
                id="composition-button"
                aria-controls={open ? "composition-menu" : undefined}
                aria-expanded={open ? "true" : undefined}
                aria-haspopup="true"
              >
                <NotificationIcon
                  sx={{
                    fontSize: { md: "3rem", xs: "2.5rem" },
                    fill: "#9B9A9A",
                  }}
                />
              </IconButton>
            </Tooltips>
            <Notifications
              open={open}
              setOpen={setOpen}
              anchorRef={anchorRef}
              handleClose={handleClose}
              handleToggle={handleToggle}

              //   handleToggles={handleToggles}
            />
          </>
        )}
        <Grid
          item
          container
          gap={{ md: 1, xs: 0, sm: 1 }}
          alignItems="center"
          flexWrap="nowrap"
        >
          <Tooltips title="Account settings">
            <IconButton
              ref={anchorRefs}
              id="account"
              aria-controls={opens ? "composition-menu" : undefined}
              aria-expanded={opens ? "true" : undefined}
              aria-haspopup="true"
              onClick={handleToggles}
              sx={{ fontSize: { md: "3rem", xs: "1.8rem" }, color: "#9B9A9A" }}
            >
              <Avatar
                sx={{
                  width: { md: 32 },
                  height: { md: 32 },
                }}
                src={getImage(userProfile?.avatar)}
                // alt={
                //   userProfile?.full_name ||
                //   (isLoading && admin ? "Admin" : "User")
                // }
                alt={
                  userProfile?.full_name
                    ? userProfile?.full_name
                    : admin
                    ? "Admin"
                    : "User"
                }
              >
                {userProfile?.full_name
                  ? userProfile?.full_name?.slice(0, 1).toUpperCase()
                  : admin
                  ? "A"
                  : "U"}
              </Avatar>
            </IconButton>
          </Tooltips>
          <Notifications
            opens={opens}
            setOpens={setOpens}
            anchorRefs={anchorRefs}
            handleCloses={handleCloses}
            handleToggles={handleToggles}
          />
          <Tooltips
            title={
              userProfile?.full_name
                ? userProfile?.full_name
                : admin
                ? "Admin"
                : "User"
            }
          >
            <Typography
              variant="h5"
              fontWeight={700}
              color="#9B9A9A"
              fontSize={{ md: "2rem", xs: "1.4rem", sm: "1.8rem" }}
              sx={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                maxWidth: { xs: "12ch", sm: "100%" },
              }}
            >
              {userProfile?.full_name
                ? userProfile?.full_name
                : admin
                ? "Admin"
                : "User"}
            </Typography>
          </Tooltips>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default UserAccount;
