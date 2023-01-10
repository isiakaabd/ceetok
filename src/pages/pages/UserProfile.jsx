import {
  FavoriteBorderOutlined,
  FavoriteOutlined,
  NotificationAdd,
  NotificationAddOutlined,
  PersonAddOutlined,
} from "@mui/icons-material";
import { Avatar, Grid, IconButton, Typography } from "@mui/material";
import React from "react";

const UserProfile = () => {
  return (
    <Grid
      item
      container
      flexWrap="nowrap"
      justifyContent="space-between"
      height="100%"
      sx={{
        paddingInline: { xs: "1rem", md: "4rem" },
        gap: { md: 2, sm: 1.5, xs: 1.2 },
        background: "#fafafa",
      }}
    >
      <Grid item>
        {/* <Grid container alignItems="center" justifyContent="center"> */}
        <Avatar sx={{ alignItems: "center" }}>N</Avatar>
        {/* </Grid> */}
      </Grid>
      <Grid item flex={1}>
        <Grid
          container
          flexWrap="nowrap"
          flexDirection={{ md: "column", xs: "row" }}
        >
          <Grid item>
            <Typography
              sx={{
                fontSize: { md: "2rem", xs: "1.2rem" },
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
              sx={{ fontWeight: 400, fontSize: { md: "1.4rem", xs: "1rem" } }}
            >
              15 oct, 2022 7:39pm
            </Typography>
          </Grid>
          <Grid item flex={1}>
            <Grid container gap={{ md: 2, sm: 1.5, xs: 1.2 }}>
              <Grid item>
                <Grid container alignItems="center">
                  <IconButton>
                    <PersonAddOutlined sx={{ color: "secondary" }} />
                  </IconButton>
                  <Typography variant="span" fontSize="1rem" color="#5F5C5C">
                    1.2k
                  </Typography>
                </Grid>
              </Grid>
              <Grid item>
                <Grid container alignItems="center">
                  <IconButton>
                    <FavoriteBorderOutlined sx={{ color: "secondary" }} />
                  </IconButton>
                  <Typography variant="span" fontSize="1rem" color="#5F5C5C">
                    53334
                  </Typography>
                </Grid>
              </Grid>
              <Grid item>
                <Grid container alignItems="center">
                  <IconButton>
                    <NotificationAddOutlined sx={{ color: "secondary" }} />
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
export default UserProfile;
