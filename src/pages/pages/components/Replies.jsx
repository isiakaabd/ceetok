import { useSelector } from "react-redux";

import parse from "html-react-parser";
import {
  ListItemButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemIcon,
  Menu,
  Avatar,
  Grid,
  Typography,
  IconButton,
  MenuItem,
} from "@mui/material";
import {
  useBlockUserMutation,
  useFollowUserMutation,
  useLazyUserProfileQuery,
  useUnBlockUserMutation,
} from "redux/slices/authSlice";
import { getImage, getTimeMoment } from "helpers";
import {
  BlockOutlined,
  Delete,
  Edit,
  MoreVertOutlined,
  PersonAddOutlined,
  ReportOutlined,
} from "@mui/icons-material";
import { toast } from "react-toastify";
import { useDeleteCommentMutation } from "redux/slices/commentSlice";
import { useEffect, useState } from "react";
import { CustomButton } from "components";
import Editor from "components/Quill";
import { Form, Formik } from "formik/dist";
import * as Yup from "yup";
import NotificationModal from "components/modals/NotificationModal";
import { useReportPostMutation } from "redux/slices/postSlice";
import EditModal from "./EditPost";
const validationSchema = Yup.object({
  body: Yup.string().required("Required"),
});
const Replies = ({ item }) => {
  let { id, createdAt, edited, comment, updatedAt, parent, user, user_id } =
    item;
  // console.log(item, "pare");
  const [anchorEl, setAnchorEl] = useState(null);
  const [getProfile, { data: profile }] = useLazyUserProfileQuery();
  const [blockUser, { isLoading: blocking }] = useBlockUserMutation();
  const { token, admin } = useSelector((state) => state.auth);
  const [report] = useReportPostMutation();
  const [followUser, { isLoading: following }] = useFollowUserMutation();
  // const  = item;

  useEffect(() => {
    if (token) {
      getProfile();
    }
    //eslint-disable-next-line
  }, [token]);
  const { is_followed, is_blocked_by_me } = user;
  const opens = Boolean(anchorEl);

  const [deleteComment, { isLoading }] = useDeleteCommentMutation();

  const [unBlockUser, { isLoading: unblocking }] = useUnBlockUserMutation();
  const handleClick = (e) => {
    e.stopPropagation();
    setAnchorEl(e.currentTarget);
  };
  const handleCloses = (e) => {
    // e.stopPropagation();
    setAnchorEl(null);
  };
  const check = profile?.id !== user_id;

  const handleDeleteComment = async (e) => {
    const { data, error } = await deleteComment({ id });
    if (data) toast.success(data || "Quotes deleted successfully");
    if (error) toast.error(error);

    e.stopPropagation();

    handleCloses(e);
  };
  const [open, setOpen] = useState(false);
  const handleEditComment = (e) => setOpen(true);

  const [openReport, setOpenReport] = useState(false);
  const handleBlockUser = async (e) => {
    if (!is_blocked_by_me) {
      const { data, error } = await blockUser({
        user_id,
      });
      if (data) {
        toast.success(data);
        setTimeout(() => handleCloses(e), 3000);
      }
      if (error) toast.success(error);
    } else {
      const { data, error } = await unBlockUser({
        user_id,
      });
      if (data) {
        toast.success(data);
        setTimeout(() => handleCloses(e), 3000);
      }
      if (error) toast.success(error);
    }
  };
  const handleFollowUser = async (e) => {
    e.stopPropagation();
    const { data, error } = await followUser({
      user_id,
    });
    if (data) {
      toast.success(data);
      setTimeout(() => handleCloses(e), 3000);
    }
    if (error) toast.success(error);
  };
  const handleReport = async (values) => {
    const { body } = values;
    const { data, error } = await report({
      parent_type: "quotes",
      parent_id: id,
      reason: body,
    });
    if (data) {
      toast.success(data);
      setTimeout(() => setOpenReport(false), 3000);
    }
    if (error) toast(error);
  };
  return (
    <>
      <ListItem
        alignItems="flex-start"
        dense
        disableGutters
        key={id}
        // secondaryAction={

        // }
      >
        {/* <Grid item container> */}
        <ListItemAvatar>
          <Avatar src={getImage(user?.avatar)} alt={user?.full_name}>
            {user?.full_name?.slice(0, 1).toUpperCase()}
          </Avatar>
        </ListItemAvatar>

        {/* </Grid> */}
        <ListItemText
          primary={
            <Grid item container alignItems={"center"} flexWrap={"nowrap"}>
              <Grid item flex={1} sx={{ maxWidth: "90%", mr: "auto" }}>
                <Grid
                  item
                  alignItems={"center"}
                  // sx={{ maxWidth: "90%" }}
                  container
                  flexWrap={"nowrap"}
                >
                  <Typography
                    fontWeight={700}
                    //   flex={1}
                    noWrap
                    sx={{ maxWidth: "90%" }}
                    color="color.text"
                    fontSize={{ md: "1.8rem", xs: "1.4rem" }}
                  >
                    {user?.full_name}
                  </Typography>
                  <Typography
                    variant="span"
                    fontWeight={400}
                    sx={{ ml: 1 }}
                    noWrap
                  >
                    {getTimeMoment(edited ? updatedAt : createdAt)}
                  </Typography>
                </Grid>
              </Grid>
              <Grid item>
                <IconButton
                  edge="start"
                  id="basic-button"
                  aria-controls={opens ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={opens ? "true" : undefined}
                  onClick={handleClick}
                  // sx={{ visibility: !check && "hidden"}}
                  sx={{ ml: { xs: "1rem" } }}
                >
                  <MoreVertOutlined />
                </IconButton>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={opens}
                  onClose={handleCloses}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
                  {!check && (
                    <MenuItem
                      onClick={handleDeleteComment}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                      }}
                      disabled={check}
                    >
                      <ListItemIcon>
                        <Delete sx={{ fontSize: "2rem" }} />
                      </ListItemIcon>

                      <ListItemText sx={{ fontSize: "3rem" }}>
                        {isLoading || isLoading ? "Deleting" : "Delete"}
                      </ListItemText>
                    </MenuItem>
                  )}
                  {!check && (
                    <MenuItem
                      onClick={handleEditComment}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                      }}
                      disabled={check}
                    >
                      <ListItemIcon>
                        <Edit sx={{ fontSize: "2rem" }} />
                      </ListItemIcon>

                      <ListItemText sx={{ fontSize: "3rem" }}>
                        Edit
                      </ListItemText>
                    </MenuItem>
                  )}
                  {check && !admin && (
                    <MenuItem
                      sx={{
                        display: "flex",
                        alignItems: "center",
                      }}
                      onClick={(e) => {
                        setOpenReport(true);
                        handleCloses(e);
                      }}
                    >
                      <ListItemIcon>
                        <ReportOutlined sx={{ fontSize: "2rem" }} />
                      </ListItemIcon>
                      <ListItemText>Report</ListItemText>
                    </MenuItem>
                  )}
                  {check && (
                    <MenuItem
                      sx={{
                        display: "flex",
                        alignItems: "center",
                      }}
                      onClick={handleBlockUser}
                    >
                      <ListItemIcon>
                        <BlockOutlined sx={{ fontSize: "2rem" }} />
                      </ListItemIcon>
                      <ListItemText>
                        {blocking
                          ? "Blocking..."
                          : unblocking
                          ? "Unblocking..."
                          : `${is_blocked_by_me ? "Unblock" : "Block"} User`}
                      </ListItemText>
                    </MenuItem>
                  )}
                  {check && (
                    <MenuItem
                      sx={{
                        display: "flex",
                        alignItems: "center",
                      }}
                      onClick={handleFollowUser}
                    >
                      <ListItemIcon>
                        <PersonAddOutlined sx={{ fontSize: "2rem" }} />
                      </ListItemIcon>
                      <ListItemText>
                        {following
                          ? "Following"
                          : `${is_followed ? "Unfollow" : "Follow"} User`}
                      </ListItemText>
                    </MenuItem>
                  )}
                </Menu>
              </Grid>
            </Grid>
          }
          // secondary={

          // }
          secondary={
            <>
              <Typography
                variant="span"
                noWrap
                fontWeight={500}
                sx={{
                  // width: "max-content",
                  fontSize: { md: "1.8rem", xs: "1.4rem" },
                }}
                className="likes-content"
              >
                {parse(comment || "somethig wrog")}
              </Typography>

              <ListItemButton
                disableRipple
                disableTouchRipple
                href={`/post/${parent?.slug}`}
              >
                <Grid
                  item
                  container
                  sx={{
                    mt: 1,
                    p: 2,
                    outline: "1px  solid #9B9A9A",
                    borderRadius: "1rem",
                  }}
                  flexWrap="nowrap"
                >
                  {/* Image */}
                  <Grid item sx={{ mr: 2 }}>
                    <Avatar
                      src={getImage(parent?.user?.avatar)}
                      alt={parent?.user?.full_name}
                    >
                      {parent?.user?.full_name?.slice(0, 1).toUpperCase()}
                    </Avatar>
                  </Grid>
                  <Grid item container flexDirection="column">
                    <Grid container gap={1} flexWrap="nowrap">
                      <Typography
                        color="secondary"
                        fontWeight="600"
                        fontSize={"1.4rem"}
                      >
                        {parent?.user?.full_name}
                      </Typography>
                      <Typography
                        color="#9B9A9A"
                        fontWeight={"400"}
                        fontSize="1.4rem"
                      >
                        {getTimeMoment(parent?.createdAt)}
                      </Typography>
                    </Grid>
                    <Typography
                      variant="p"
                      fontWeight={500}
                      noWrap
                      sx={{
                        maxWidth: { md: "90%", xs: "80%" },
                        fontSize: { md: "1.8rem", xs: "1.4rem" },
                      }}
                      // className="likes-content"
                    >
                      {/* {parent?.body
                                    ? parse(parent?.body)
                                    : parent?.comments &&
                                      parse(parent?.comments)} */}
                      {parent?.title || parse(parent?.comment || "...")}
                    </Typography>
                  </Grid>
                </Grid>
              </ListItemButton>
            </>
          }
        />
      </ListItem>
      <NotificationModal
        isOpen={openReport}
        handleClose={() => setOpenReport(false)}
      >
        <Formik
          initialValues={{ body: "" }}
          onSubmit={handleReport}
          validationSchema={validationSchema}
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
                  Report Abuse
                </Typography>
                <Grid item>
                  <Editor name="body" placeholder={"Report Abuse"} />
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
      <EditModal
        item={item}
        open={open}
        type={"quotes"}
        handleClose={() => {
          handleCloses();
          setOpen(false);
        }}
      />
    </>
  );
};

export default Replies;
