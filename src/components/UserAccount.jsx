import { Avatar, Badge, Grid, IconButton, Typography } from "@mui/material";
import { useState, useRef, useEffect } from "react";
import Notifications from "./Notifications";
import {
  useGetNotificationsQuery,
  useLazyUserProfileQuery,
} from "redux/slices/authSlice";
import Tooltips from "./ToolTips";
import { getImage } from "helpers";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { NotificationsNoneOutlined } from "@mui/icons-material";

const UserAccount = () => {
  const { data } = useGetNotificationsQuery({
    offset: 0,
  });

  const anchorRefs = useRef(null);
  const state = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const [getProfile, { data: userProfile }] = useLazyUserProfileQuery({
    offset: 0,
  });

  useEffect(() => {
    if (state.auth) {
      getProfile();
    }
    //eslint-disable-next-line
  }, [state.auth]);

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
  const { avatar, full_name } = state?.user;
  return (
    <Grid item>
      <Grid
        item
        container
        gap={{ md: 3, sm: 2, xs: 0.5 }}
        flexWrap="nowrap"
        alignItems="center"
      >
        {state.auth && (
          <>
            <Tooltips title={"Notifications"}>
              <IconButton onClick={() => navigate("/user/notifications")}>
                <Badge
                  badgeContent={data?.unseen_count}
                  color="primary"
                  max={20}
                  sx={{
                    color: "#9B9A9A",
                    "& .MuiBadge-badge": {
                      fontSize: "1.4rem",
                      backgroundColor: "#FF9B04",
                      width: "3rem",
                      height: "3rem",
                      borderRadius: "1.5rem",
                      fontWeight: 600,
                    },
                  }}
                >
                  <NotificationsNoneOutlined
                    color="action"
                    sx={{
                      fontSize: { md: "3rem", xs: "2.5rem" },
                      fill: "#9B9A9A",
                    }}
                  />
                </Badge>
              </IconButton>
            </Tooltips>
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
                src={getImage(avatar || userProfile?.avatar)}
                alt={full_name || userProfile?.full_name}
              >
                {full_name?.slice(0, 1).toUpperCase() ||
                  userProfile?.full_name?.slice(0, 1).toUpperCase()}
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
          <Tooltips title={full_name || userProfile?.full_name}>
            <Typography
              variant="h5"
              fontWeight={700}
              noWrap
              color="#9B9A9A"
              fontSize={{ md: "2rem", xs: "1.4rem", sm: "1.8rem" }}
              sx={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                maxWidth: { xs: "12ch" },
              }}
            >
              {full_name || userProfile?.full_name}
            </Typography>
          </Tooltips>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default UserAccount;
