import {
  FavoriteBorderOutlined,
  NotificationAddOutlined,
  PersonAddOutlined,
} from "@mui/icons-material";
import { Avatar, Grid, IconButton, Typography } from "@mui/material";
import NotificationIcon from "assets/svgs/NotificationIcon";
import PopOvers from "components/modals/PopOver";
import React, { useRef, useState } from "react";
import { CloseOutlined } from "@mui/icons-material";
import { Form, Formik } from "formik/dist";
import FormikControl from "validation/FormikControl";
import { getDate, getTime } from "helpers";

const UserProfile = ({ data }) => {
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const handleToggle = () => setOpen(!open);
  const handleClose = () => setOpen(false);
  const {
    createdAt,
    likes_count,
    get_notifications,
    user: { full_name, email, avatar, username },
  } = data;
  return (
    <>
      <Grid
        item
        container
        flexWrap="nowrap"
        justifyContent="space-between"
        height="100%"
        sx={{
          padding: { xs: "1rem", md: "1rem 4rem" },
          gap: { md: 2, sm: 1.5, xs: 1.2 },
          background: "#fafafa",
        }}
      >
        <Grid item>
          <Avatar sx={{ alignItems: "center" }} alt={avatar}>
            {full_name.slice(0, 1).toUpperCase()}
          </Avatar>
          {/* </Grid> */}
        </Grid>
        <Grid item flex={1}>
          <Grid
            container
            flexWrap="nowrap"
            flexDirection={{ md: "column", xs: "row", sm: "column" }}
          >
            <Grid item>
              <Typography
                sx={{
                  fontSize: { md: "2rem", xs: "1.2rem" },
                  // whiteSpace: "nowrap",
                  color: "#5F5C5C",
                  fontWeight: 600,
                }}
              >
                Posted by {username || email.split("@")[0]}{" "}
              </Typography>
              <Typography
                color="secondary"
                variant="span"
                sx={{ fontWeight: 400, fontSize: { md: "1.4rem", xs: "1rem" } }}
              >
                {getDate(createdAt)} {getTime(createdAt)}
              </Typography>
            </Grid>
            <Grid item flex={1}>
              <Grid container gap={{ md: 2, sm: 1, xs: 1.2 }}>
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
                      {likes_count}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item>
                  <Grid container alignItems="center">
                    <IconButton
                      ref={anchorRef}
                      id="composition-button"
                      aria-controls={open ? "composition-menu" : undefined}
                      aria-expanded={open ? "true" : undefined}
                      aria-haspopup="true"
                      onClick={handleToggle}
                    >
                      <NotificationIcon sx={{ color: "secondary" }} />
                    </IconButton>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <PopOvers anchorRef={anchorRef} open={open} setOpen={setOpen}>
        <Grid item container flexDirection="column" sx={{ px: 1 }}>
          <Grid item sx={{ marginLeft: "auto" }}>
            <IconButton onClick={handleClose}>
              <CloseOutlined />
            </IconButton>
          </Grid>
          <Grid item container>
            <Formik
              enableReinitialize
              initialValues={{ notification: get_notifications }}
            >
              {({ values }) => (
                <Form style={{ width: "100%" }}>
                  <Grid
                    item
                    container
                    alignItems="center"
                    sx={{ mb: 1 }}
                    flexWrap={"nowrap"}
                  >
                    <Typography
                      fontSize="1.2rem"
                      fontWeight={700}
                      color="secondary"
                      flex={1}
                    >
                      {`Turn ${
                        values.notification ? "Off" : "On"
                      } Notification`}
                    </Typography>
                    <Grid item sx={{ mr: -1 }}>
                      <FormikControl control="switch" name="notification" />
                    </Grid>
                  </Grid>
                </Form>
              )}
            </Formik>
          </Grid>
          <Typography color="#9B9A9A" fontWeight={500} fontSize={"1rem"}>
            Get notified when this user post new topics
          </Typography>
        </Grid>
      </PopOvers>
    </>
  );
};
export default UserProfile;
