import {
  FavoriteBorderOutlined,
  FavoriteOutlined,
  NotificationAdd,
  NotificationAddOutlined,
  PersonAddOutlined,
} from "@mui/icons-material";
import { Avatar, Grid, Typography } from "@mui/material";
import React from "react";

const UserProfile = () => {
  return (
    <Grid
      item
      container
      flexWrap="nowrap"
      justifyContent="space-between"
      height="100%"
    >
      <Grid item xs={2}>
        <Grid container alignItems="center" justifyContent="center">
          <Avatar sx={{ alignItems: "center" }}>N</Avatar>
        </Grid>
      </Grid>
      <Grid item xs={9.5}>
        <Grid item container flexDirection="column">
          <Typography
            sx={{
              fontSize: "2rem",
              whiteSpace: "nowrap",
              color: "#5F5C5C",
              fontWeight: 600,
            }}
          >
            Posted by Josh@4real{" "}
          </Typography>
          <Typography
            color="secondary"
            variant="span"
            sx={{ fontWeight: 400, fontSize: "1.4rem" }}
          >
            15 oct, 2022 7:39pm
          </Typography>
        </Grid>
        <Grid item container gap={2}>
          <Grid item>
            <Grid container alignItems="center">
              <PersonAddOutlined sx={{ color: "secondary" }} />
              <Typography variant="span" fontSize="1rem" color="#5F5C5C">
                1.2k
              </Typography>
            </Grid>
          </Grid>
          <Grid item>
            <Grid container alignItems="center">
              <FavoriteBorderOutlined sx={{ color: "secondary" }} />
              <Typography variant="span" fontSize="1rem" color="#5F5C5C">
                53334
              </Typography>
            </Grid>
          </Grid>
          <Grid item>
            {" "}
            <Grid container alignItems="center">
              <NotificationAddOutlined sx={{ color: "secondary" }} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
export default UserProfile;
