import {
  Avatar,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Skeleton,
  Typography,
} from "@mui/material";
import {
  Delete,
  DesktopAccessDisabledOutlined,
  MoreVertOutlined,
  WarningOutlined,
} from "@mui/icons-material";
import { useGetNotificationsQuery } from "redux/slices/authSlice";
import Paginations from "./modals/Paginations";
import { useState } from "react";
import Error from "pages/pages/components/Error";
import { getImage, getParent } from "helpers";
import { useDeleteAPostMutation } from "redux/slices/postSlice";
import { useDeleteCommentMutation } from "redux/slices/commentSlice";
import { useEffect } from "react";
import { toast } from "react-toastify";
import CustomButton from "./CustomButton";
import Editor from "./Quill";
import { Form, Formik } from "formik/dist";
import NotificationModal from "./modals/NotificationModal";
import {
  useBanUsersMutation,
  useYellowCardMutation,
} from "redux/slices/adminSlice";

const Notification = () => {
  const [page, setPage] = useState(1);
  const [yellowCard, { data: dts, error: errs }] = useYellowCardMutation();
  const [ban, { isLoading: banning }] = useBanUsersMutation();
  const [
    deletePost,
    { data: postData, error: postErr, isLoading: postLoading },
  ] = useDeleteAPostMutation();
  const [
    deleteComment,
    { data: commentData, isLoading: commentLoading, error: commentErr },
  ] = useDeleteCommentMutation();
  const { data, isLoading, error } = useGetNotificationsQuery({
    offset: page - 1,
  });
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  // useEffect(() => {
  //   if (postData || commentData || dts) {
  //     setTimeout(() => handleClose(), 3000);
  //     return toast.success(postData || dts || commentData);
  //   }
  //   if (postErr || errs || commentErr)
  //     return toast.error(
  //       postErr || commentErr || errs || "Something went wrong..."
  //     );
  // }, [commentData, postData, dts, postErr, commentErr, errs]);
  const [openReport, setOpenReport] = useState(false);
  const [user, setUser] = useState(null);
  if (isLoading) return <Skeletons />;
  if (error) return <Error />;
  const { total_pages, notifications } = data;
  console.log(data);
  const handleDeleteComment = (owner_type, owner_id) => {
    if (owner_type === "comments") {
      const { data, error } = deleteComment({
        id: owner_id,
      });
      if (data) {
        setTimeout(() => handleClose(), 3000);
        return toast.success(data);
      } else {
        if (error) toast.error(error);
      }
    } else {
      const { data, error } = deletePost({
        id: owner_id,
      });
      if (data) {
        setTimeout(() => handleClose(), 3000);
        return toast.success(data);
      } else {
        if (error) toast.error(error);
      }
    }
  };
  console.log(user, "user");
  const handleReport = async (values) => {
    const { data, error } = await yellowCard({
      user_id: user?.owner?.user_id,
      reason: values.body,
      parent_type: user?.owner_type,
      parent_id: user?.owner_id,
    });
    if (data) {
      setTimeout(() => handleClose(), 3000);
      return toast.success(postData || dts || commentData);
    } else {
      if (error) toast.error(error);
    }
  };
  const handleBan = async (user) => {
    const data = await ban({
      users: [user],
    });
    if (data) {
      setTimeout(() => handleClose(), 3000);
      return toast.success(postData || dts || commentData);
    } else {
      if (error) toast.error(error);
    }
  };

  return (
    <>
      <Grid item container sx={{ p: { md: 4, xs: 1 }, background: "#E5E5E5" }}>
        <Grid
          item
          container
          flexDirection="column"
          gap={3}
          sx={{
            background: "#fff",
            px: { md: "3rem", xs: ".5rem" },
            py: "2rem",
          }}
        >
          <Grid
            item
            container
            flexDirection={{ md: "row", xs: "column" }}
            alignItems="center"
            gap={2}
            justifyContent="space-between"
          >
            <Typography flex={1} variant="h2">
              Notifications
            </Typography>
          </Grid>
          <Grid item container>
            <Grid md={8} xs={12} sx={{ margin: "auto" }}>
              {notifications.length > 0 ? (
                <List sx={{ width: "100%" }} dense component="ol">
                  {notifications?.map((item) => {
                    const {
                      message,
                      owner,
                      seen,
                      id,
                      owner_type,
                      creator,
                      owner_id,
                    } = item;
                    console.log(item);
                    return (
                      <ListItem
                        dense
                        key={id}
                        disablePadding
                        secondaryAction={
                          message === "Content reported." && (
                            <>
                              <IconButton
                                edge="start"
                                id="basic-button"
                                aria-controls={open ? "basic-menu" : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? "true" : undefined}
                                onClick={handleClick}
                                sx={{ ml: { xs: "1rem" } }}
                              >
                                <MoreVertOutlined />
                              </IconButton>

                              <Menu
                                variant="menu"
                                id="basic-menu"
                                anchorEl={anchorEl}
                                open={open}
                                className="menu-item-notification"
                                onClose={handleClose}
                                sx={{
                                  "& .MuiPaper-root": {
                                    // boxShadow: "0px 0px 2px 2px rgba(0,0,0,0.01)",
                                  },
                                }}
                                MenuListProps={{
                                  "aria-labelledby": "basic-button",
                                }}
                              >
                                <MenuItem
                                  disableRipple
                                  onClick={() =>
                                    handleDeleteComment(owner_type, owner_id)
                                  }
                                  sx={{
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                  // disabled={check}
                                >
                                  <Delete sx={{ fontSize: "2rem", mr: 1 }} />
                                  {postLoading || commentLoading
                                    ? "Deleting"
                                    : `Delete ${getParent(owner_type)}`}
                                </MenuItem>
                                <MenuItem
                                  disableRipple
                                  onClick={() => {
                                    setOpenReport(true);
                                    handleClose();
                                    setUser(item);
                                  }}
                                  sx={{
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                  // disabled={check}
                                >
                                  <WarningOutlined
                                    sx={{ fontSize: "2rem", mr: 1 }}
                                  />
                                  Yellow Card{" "}
                                </MenuItem>
                                <MenuItem
                                  disableRipple
                                  onClick={() => handleBan(id)}
                                  sx={{
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                  // disabled={check}
                                >
                                  <DesktopAccessDisabledOutlined
                                    sx={{ fontSize: "2rem", mr: 1 }}
                                  />
                                  Ban User
                                </MenuItem>
                              </Menu>
                            </>
                          )
                        }
                        sx={{
                          textDecoration: "none",
                          color: "text.primary",
                        }}
                        disableGutters
                      >
                        <ListItemButton
                          sx={{
                            background: !seen && "rgba(0, 0, 0, 0.04)",
                          }}
                          dense
                          to={
                            owner_type === "user"
                              ? `profile/?id=${owner_id}`
                              : owner_type === "comments"
                              ? `comment/?id=${owner_id}`
                              : owner_type === "posts"
                              ? `/post/${owner?.slug}`
                              : owner_type === "live"
                              ? `/post/${owner?.slug}`
                              : owner_type === "chat"
                              ? `/user/message/${owner?.sender_id}`
                              : null
                          }
                        >
                          <ListItemAvatar>
                            <Avatar
                              alt={owner?.full_name || creator?.full_name}
                              src={getImage(owner?.avatar || creator?.avatar)}
                            >
                              {owner?.full_name?.slice(0, 1).toUpperCase() ||
                                creator?.full_name?.slice(0, 1).toUpperCase()}
                            </Avatar>
                          </ListItemAvatar>
                          {/* <ListItemIcon>
                          <StarOutline />
                        </ListItemIcon> */}

                          <ListItemText primary={message} />
                        </ListItemButton>
                      </ListItem>
                    );
                  })}
                </List>
              ) : (
                <Typography
                  variant="h2"
                  sx={{ width: "100%", textAlign: "center" }}
                >
                  No Notification Yet
                </Typography>
              )}
            </Grid>
          </Grid>

          {total_pages > 1 && (
            <Paginations page={page} setPage={setPage} count={total_pages} />
          )}
        </Grid>
      </Grid>
      <NotificationModal
        isOpen={openReport}
        handleClose={() => setOpenReport(false)}
      >
        <Formik
          initialValues={{ body: "" }}
          onSubmit={handleReport}
          // validationSchema={validationSchema}
        >
          {({ isSubmitting }) => (
            <Form>
              <Grid item container flexDirection="column" gap={4}>
                <Typography
                  color="#464646"
                  sx={{
                    textAlign: "center",
                    fontSize: { md: "2rem", xs: "1.7rem" },
                  }}
                  fontWeight={700}
                >
                  Warn User
                </Typography>
                <Grid item>
                  <Editor name="body" />
                </Grid>
                <Grid item>
                  <CustomButton
                    title={"Report"}
                    type="submit"
                    isSubmitting={isSubmitting}
                  />
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </NotificationModal>
    </>
  );
};

function Skeletons() {
  return (
    <Grid
      item
      sx={{ p: 3, width: { md: "70%", xs: "100%" }, margin: "auto" }}
      gap={3}
      overflow={"hidden"}
    >
      <Grid
        item
        container
        gap={2}
        flexDirection={{ xs: "column", md: "row" }}
        alignItems={"center"}
        justifyContent={"space-between"}
        flexWrap="nowrap"
      >
        <Grid item sx={{ width: "20%" }}>
          <Skeleton
            sx={{ height: "1rem", width: "100%", mr: 2 }}
            animation="wave"
            variant="text"
          />
        </Grid>
        <Grid item sx={{ width: "80%" }}>
          <Skeleton
            sx={{ height: "3rem", borderRadius: "2rem", width: "100%" }}
            animation="wave"
            variant="rectangular"
          />
        </Grid>
      </Grid>

      <Grid container flexDirection="column" sx={{ mt: 4 }} gap={2}>
        {Array(7)
          .fill(undefined)
          .map((item, index) => (
            <Grid
              item
              container
              flexWrap="nowrap"
              alignItems="center"
              justifyContent="space-around"
            >
              <Grid item>
                <Skeleton
                  key={index}
                  sx={{ height: "5rem", width: "5rem", mr: 2 }}
                  animation="wave"
                  variant="circular"
                />
              </Grid>
              <Grid item xs={7}>
                <Grid container gap={1} flexDirection={"column"}>
                  <Skeleton
                    key={index}
                    sx={{ height: "1rem", width: "40%" }}
                    animation="wave"
                    variant="text"
                  />
                  <Skeleton
                    key={index}
                    sx={{ height: ".8rem", width: "70%" }}
                    animation="wave"
                    variant="text"
                  />
                </Grid>
              </Grid>
              <Grid item marginLeft="auto">
                <Skeleton
                  key={index}
                  sx={{ height: "2rem", width: ".3rem" }}
                  animation="wave"
                  variant="rectangular"
                />
              </Grid>
            </Grid>
          ))}
      </Grid>
    </Grid>
  );
}
export default Notification;
