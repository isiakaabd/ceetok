import React, { Fragment, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import {
  Avatar,
  Button,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  Popper,
  Grow,
  Paper,
  ClickAwayListener,
  MenuList,
  MenuItem,
  Typography,
  Skeleton,
} from "@mui/material";
import ProfileImage from "./ProfileImage";
import Pen from "assets/svgs/Pen";
import { styled } from "@mui/material/styles";
import { CustomButton } from "components";
import SettingsIcon from "assets/svgs/Settings";
import { SettingsOutlined } from "@mui/icons-material";
import { Link, Navigate, useNavigate } from "react-router-dom";
import ProfileItem from "./ProfileItem";
import { useUserProfileQuery } from "redux/slices/authSlice";
import { getDate } from "helpers";
import VerifyPage from "components/modals/VerifyPage";

const ProfileDetails = (props) => {
  const CustomTypography = styled(Typography)(({ theme }) => ({
    fontSize: "1.7rem",
    fontWeight: 700,
    color: "#5F5C5C",
  }));
  const CustomSubTypography = styled(({ ...rest }) => <Typography {...rest} />)(
    ({ theme }) => ({
      fontSize: "1.3rem",
      fontWeight: 500,
      color: "#9B9A9A",
      textAlign: "center",
    })
  );
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { data: userProfile, isLoading, isError } = useUserProfileQuery();
  if (isLoading) return <Skeleton />;
  if (isError) return <p>Something went wrong...</p>;
  const { full_name, email, avatar, username, createdAt } = userProfile;
  return (
    <>
      <Grid
        item
        container
        flexDirection="column"
        justifyContent="flex-start"
        sx={{
          height: "100%",
          pt: 3,
          px: 1,
          borderRadius: "2rem",
          background: "#fff",
        }}
      >
        <Grid item container flexDirection="column">
          <Grid item container flexDirection="column" alignItems="center">
            <ProfileImage avatar={avatar} name={full_name} />
            <Grid item container justifyContent="center" alignItems="center">
              <Typography fontWeight={700} fontSize="2.2rem" sx={{ mr: 1 }}>
                {full_name}
              </Typography>
              <div
                style={{
                  width: "1rem",
                  height: "1rem",
                  borderRadius: "50%",
                  backgroundColor: "#37D42A",
                }}
              />
            </Grid>
            <Typography color="#9B9A9A" fontWeight={500} fontSize="1.7rem">
              {email}
            </Typography>
            <Grid item>
              <Grid item container gap={2} alignItems="center">
                <Typography color="#9B9A9A" fontWeight={500} fontSize="1rem">
                  {username || "Not Available"}
                </Typography>
                <Grid item>
                  <Grid container alignItems="center">
                    <Typography
                      color="#9B9A9A"
                      // variant="span"
                      fontWeight={500}
                      fontSize="1rem"
                    >
                      Edit
                    </Typography>{" "}
                    <IconButton onClick={() => setOpen(true)}>
                      <Pen sx={{ color: "#9B9A9A", fontSize: "1rem" }} />
                    </IconButton>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            item
            container
            alignItems="center"
            justifyContent="space-between"
            sx={{ p: 3 }}
          >
            <Grid item>
              <CustomTypography>86</CustomTypography>
              <CustomSubTypography>post</CustomSubTypography>
            </Grid>
            <Grid item>
              <CustomTypography>1.5k</CustomTypography>
              <CustomSubTypography>Likes</CustomSubTypography>
            </Grid>
            <Grid item>
              <CustomTypography>1.2k</CustomTypography>
              <CustomSubTypography>Followers</CustomSubTypography>
            </Grid>
            <Grid item>
              <CustomTypography>200</CustomTypography>
              <CustomSubTypography>Following</CustomSubTypography>
            </Grid>
          </Grid>
          <Divider flexItem inset sx={{ border: "1px solid #9B9A9A" }} />
          <Grid item sx={{ pt: 2, pb: 1 }}>
            <CustomSubTypography fontSize="1.4rem !important">
              Last Activity: Today, 03:04pm
            </CustomSubTypography>
            <CustomSubTypography fontSize="1.4rem !important">
              Joined: {getDate(createdAt)}
            </CustomSubTypography>
            <CustomSubTypography fontSize="1.4rem !important">
              Location: Lagos Mainland
            </CustomSubTypography>
          </Grid>

          <Grid
            item
            container
            alignItems="center"
            justifyContent="center"
            sx={{ p: 2 }}
          >
            <CustomButton
              component={Link}
              width="12rem"
              fontSize={{ md: "1.6rem", xs: "1.6rem" }}
              title={" Update Settings"}
              to={"/user/settings"}
            />
          </Grid>
        </Grid>
        <Divider inset sx={{ border: "1px solid #9B9A9A" }} />

        <Grid item container alignItems="center" sx={{ mt: 4, p: 2 }}>
          <Typography flex={1} sx={{ fontWeight: 600, fontSize: "1.5rem" }}>
            Friend List
          </Typography>
          <CustomButton
            title={"See All"}
            component={Link}
            to="/user/all-friends"
            fontSize={{ md: "1.6rem", xs: "1.6rem" }}
          />
        </Grid>
        <List sx={{ wdith: "100%", p: 2 }}>
          {Array(10)
            .fill(undefined)
            .map((item) => (
              <ProfileItem profile={item} />
            ))}
        </List>
      </Grid>

      <VerifyPage isOpen={open} handleClose={() => setOpen(false)} />
    </>
  );
};

ProfileDetails.propTypes = {};

export default ProfileDetails;