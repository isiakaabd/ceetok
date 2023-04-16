import {
  FavoriteBorderOutlined,
  Favorite,
  IosShareOutlined,
  ReportOutlined,
  Delete,
  MoreVertOutlined,
  ChatBubbleOutline,
  Edit,
  BlockOutlined,
  PersonAddAlt1Outlined,
  PersonAddOutlined,
} from "@mui/icons-material";
import parse from "html-react-parser";
import * as Yup from "yup";
import {
  Avatar,
  Grid,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  ListItemAvatar,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  useLikeAndUnlikePostMutation,
  useReportPostMutation,
} from "redux/slices/postSlice";

import { toast } from "react-toastify";
import { useDeleteCommentMutation } from "redux/slices/commentSlice";
import { getImage, getTimeMoment } from "helpers";
import EditModal from "./EditPost";
import {
  useBlockUserMutation,
  useFollowUserMutation,
  useLazyUserProfileQuery,
  useUnBlockUserMutation,
} from "redux/slices/authSlice";
import Quotes from "assets/svgs/Quote";
import NotificationModal from "components/modals/NotificationModal";
import { Formik, Form } from "formik/dist";
import Editor from "components/Quill";
import { CustomButton } from "components";
import {
  useCreateQuoteMutation,
  useDeleteQuoteMutation,
  useEditQuoteMutation,
} from "redux/slices/quoteSlice";
import { useSelector } from "react-redux";
import LoginModal from "components/modals/LoginModal";
import { useEffect } from "react";
import { PhotoProvider, PhotoView } from "react-photo-view";
import ReactPlayer from "react-player";
// import images from "assets";
const StyledButton = styled(({ text, Icon, color, ...rest }) => (
  <Grid
    item
    container
    alignItems="center"
    flexWrap="nowrap"
    {...rest}
    // gap={2}
    sx={{
      color,
      cursor: "pointer",
    }}
  >
    <IconButton edge="start" size="small">
      {Icon}
    </IconButton>
    <Typography sx={{ display: { sm: "block", xs: "block" } }}>
      {text}
    </Typography>
  </Grid>
))(({ theme }) => ({
  textTransform: "none",
  fontSize: { md: "2rem", xs: ".9rem" },
  fontWeight: 600,
}));

const SingleComment = ({ item }) => {
  const {
    // body,
    id,
    createdAt,
    edited,
    updatedAt,
    comment,
    // parent,
    user,
    media,
    // recent_comments,
    user_id,
  } = item;
  // console.log(item);
  // const x = (message) => {
  //   const messageWithMentions = message.replace(
  //     /@\w+/g,
  //     '<span class="mention">$&</span>'
  //   );
  //   return messageWithMentions;
  // };
  const [anchorEl, setAnchorEl] = useState(null);
  const [getProfile, { data: profile }] = useLazyUserProfileQuery();
  const [blockUser, { isLoading: blocking }] = useBlockUserMutation();
  const { token, admin } = useSelector((state) => state.auth);

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
  const [report] = useReportPostMutation();
  const check = profile?.id !== user_id;
  const handleDeleteComment = async (e) => {
    const { data, error } = await deleteComment({ id });
    if (data) toast.success("comment deleted successfully");
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
  const { full_name, avatar } = user;
  const navigate = useNavigate();
  const handleClicks = () => {
    navigate({
      pathname: "/user/profile",
      search: `?id=${id}`,
    });
  };
  const handleReport = async (values) => {
    const { body } = values;
    const { data, error } = await report({
      parent_type: "comments",
      parent_id: id,
      reason: body,
    });
    if (data) {
      toast.success(data);
      setTimeout(() => setOpenReport(false), 3000);
    }
    if (error) toast(error);
  };
  const validationSchema = Yup.object({
    body: Yup.string().required("Required"),
  });
  return (
    <>
      <ListItem
        disableRipple
        disableTouchRipple
        disablePadding
        sx={{
          "& .MuiListItemText-root": {
            m: 0,
            pr: { md: 2, xs: 1 },
          },
          textDecoration: "none",
          color: "text.primary",
        }}
        alignItems="start"
      >
        <ListItemButton
          disableRipple
          disableTouchRipple
          alignItems="flex-start"
          // component="div"
          disableGutters
          dense
        >
          <ListItemAvatar>
            <Avatar
              alt={full_name}
              src={getImage(avatar)}
              onClick={handleClicks}
              sx={{ cursor: "pointer" }}
            >
              {full_name?.slice(0, 1).toUpperCase()}
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            sx={{ p: "0 !important" }}
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
            secondary={
              <div>
                {parse(comment)}
                {media.length > 0 && (
                  <Grid
                    item
                    container
                    sx={{
                      p: { xs: "1rem" },
                      height: "100%",
                    }}
                  >
                    {media[0]?.type === "image" ? (
                      <PhotoProvider>
                        <div className="foo" style={{ width: "100%" }}>
                          {media.map((item, index) => (
                            <PhotoView
                              key={index}
                              width="100%"
                              src={getImage(media[index]?.storage_path)}
                            >
                              <img
                                src={getImage(media[index]?.storage_path)}
                                alt=""
                                style={{
                                  maxHeight: "100%",
                                  objectFit: "cover",
                                  height: "15rem",
                                  marginRight: "1rem",
                                  width: "15rem",
                                }}
                              />
                            </PhotoView>
                          ))}
                        </div>
                      </PhotoProvider>
                    ) : // <MasonryImageList
                    //   itemData={media?.slice(0, media.length > 4 ? 3 : media.length)}
                    // />
                    // media?.length === 1 && media[0]?.type === "image" ? (
                    //   <Avatar
                    //     src={getImage(media[0]?.storage_path)}
                    //     sx={{
                    //       width: "100%",
                    //       height: "100%",
                    //       objectFit: "cover",
                    //       // maxHeight: "0rem",
                    //     }}
                    //     variant="square"
                    //   />
                    // )
                    media[0]?.type === "video" ? (
                      // <div className="player-wrapper">
                      <ReactPlayer
                        url={getImage(media[0]?.storage_path)}
                        controls={true}
                        volume={0.6}
                        width="30rem"
                        height="30rem"
                        // className="react-player"
                        style={{ aspectRatio: 1 }}
                      />
                    ) : null}
                  </Grid>
                )}
                <Detail item={item} type="comments" />
              </div>
            }
          />
        </ListItemButton>
      </ListItem>
      <EditModal
        item={item}
        open={open}
        type={"comments"}
        handleClose={(e) => {
          handleCloses(e);
          setOpen(false);
        }}
      />
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
    </>
  );
};
export function Image({ person: { user } }) {
  const { full_name, avatar, id } = user;
  const navigate = useNavigate();
  const handleClicks = () => {
    navigate({
      pathname: "/user/profile",
      search: `?id=${id}`,
    });
  };
  return (
    <ListItemAvatar>
      <Avatar
        alt={full_name}
        src={getImage(avatar)}
        onClick={handleClicks}
        sx={{ cursor: "pointer" }}
      >
        {full_name?.slice(0, 1).toUpperCase()}
      </Avatar>
    </ListItemAvatar>
  );
}

export function Text({ item, profile, displayDetail, type }) {
  const {
    user,

    createdAt,
    updatedAt,
    edited,
    user_id,
    id,
  } = item;

  const [isLogin, setIsLogin] = useState(false);
  const admin = useSelector((state) => state.auth.admin);
  const { is_followed, is_blocked_by_me } = user;
  const [deleteComment, { isLoading }] = useDeleteCommentMutation();
  const [deleteQuote, { isLoading: deleting }] = useDeleteQuoteMutation();
  const [followUser, { isLoading: following }] = useFollowUserMutation();
  const [anchorEl, setAnchorEl] = useState(null);
  const [report] = useReportPostMutation();
  const [blockUser, { isLoading: blocking }] = useBlockUserMutation();
  const [unBlockUser, { isLoading: unblocking }] = useUnBlockUserMutation();
  const handleCloses = (e) => {
    // e.stopPropagation();
    setAnchorEl(null);
  };

  const opens = Boolean(anchorEl);
  const handleClick = (e) => {
    e.stopPropagation();
    setAnchorEl(e.currentTarget);
  };
  const check = profile?.id !== user_id;

  const handleDeleteComment = async (e) => {
    if (type === "quote") {
      const { data, error } = await deleteQuote({ id });
      if (data) toast.success("comment deleted successfully");
      if (error) toast.error(error);
    } else {
      const { data, error } = await deleteComment({ id });
      if (data) toast.success("comment deleted successfully");
      if (error) toast.error(error);
    }
    e.stopPropagation();

    handleCloses(e);
  };
  const [open, setOpen] = useState(false);
  const handleEditComment = (e) => {
    setOpen(true);
  };
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
  const validationSchema = Yup.object({
    body: Yup.string().required("Required"),
  });
  const handleReport = async (values) => {
    const { body } = values;
    const { data, error } = await report({
      parent_type: "comments",
      parent_id: id,
      reason: body,
    });
    if (data) {
      toast.success(data);
      setTimeout(() => setOpenReport(false), 3000);
    }
    if (error) toast(error);
  };
  // const x = (message) => {
  //   const messageWithMentions = message.replace(
  //     /@\w+/g,
  //     '<a class="mention" href="#">$&</a>'
  //   );
  //   return messageWithMentions;
  // };

  return (
    <>
      <ListItemText
        primary={
          <Grid item container alignItems={"center"} flexWrap={"nowrap"}>
            <Grid item>
              <Grid item alignItems={"center"} container flexWrap={"nowrap"}>
                <Typography
                  fontWeight={700}
                  flex={1}
                  noWrap
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
            <Grid item gap={2} sx={{ ml: "auto" }}>
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
                      {isLoading || deleting ? "Deleting" : "Delete"}
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

                    <ListItemText sx={{ fontSize: "3rem" }}>Edit</ListItemText>
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
                      <PersonAddAlt1Outlined sx={{ fontSize: "2rem" }} />
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
      />
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
                  <Editor name="body" placeholder={"Report Abuse..."} />
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
        type={type}
        handleClose={() => {
          handleCloses();
          setOpen(false);
        }}
      />
      {isLogin && (
        <LoginModal
          handleClose={() => setIsLogin(false)}
          setIsLogin={setIsLogin}
          // handleRegisterOpen={handleRegisterOpen}
          isLogin={isLogin}
        />
      )}
    </>
  );
}
Text.defaultProps = {
  displayDetail: true,
};
function Detail({ item, type }) {
  const { id, quotes_count, quote, likes_count, recent_comments } = item;
  const token = useSelector((state) => state.auth.token);
  const [isLogin, setIsLogin] = useState(false);
  const [likeState, setLikeState] = useState(Boolean(item?.liked));
  const [likePost] = useLikeAndUnlikePostMutation();

  // const { data: repliedComment } = useGetPostCommentsQuery({
  //   type,
  //   parentId: id,
  //   offset: page,
  // });
  // const { data: repliedQuotes } = useGetPostQuotesQuery({
  //   type,
  //   parentId: id,
  //   offset: page,
  // });

  const handleLikePost = async (e) => {
    e.stopPropagation();
    const { data: dt } = await likePost({
      parent_type: type,
      parent_id: item?.id,
    });
    if (dt) setLikeState(!likeState);
  };
  const navigate = useNavigate();
  const [openQuoteModal, setOpenQuoteModal] = useState(false);

  return (
    <>
      <Grid item container>
        <Grid item container justifyContent="space-between" flexWrap="nowrap">
          <Grid
            item
            container
            flexWrap="nowrap"
            justifyContent={"space-between"}
          >
            <StyledButton
              // text={repliedComment?.comments?.length}
              // text={quotes_count}
              onClick={(e) => {
                token ? navigate(`/user/comment/?id=${id}`) : setIsLogin(true);
              }}
              Icon={<ChatBubbleOutline />}
            />

            <StyledButton
              onClick={(e) => {
                token ? handleLikePost(e) : setIsLogin(true);
              }}
              color={likeState ? "#f00" : ""}
              Icon={
                likeState ? (
                  <Favorite sx={{ fill: "#f00" }} />
                ) : (
                  <FavoriteBorderOutlined />
                )
              }
              text={likes_count}
            />
            <StyledButton
              onClick={(e) => {
                e.stopPropagation();
                token ? setOpenQuoteModal(true) : setIsLogin(true);
              }}
              Icon={<Quotes />}
              text={quotes_count}
            />

            <StyledButton
              text="Share"
              Icon={<IosShareOutlined />}
              onClick={(e) => e.stopPropagation()}
            />
          </Grid>
        </Grid>

        {recent_comments?.length > 0 &&
          recent_comments.map(
            ({ user, edited, createdAt, updatedAt, body, comment, parent }) => {
              return (
                <ListItem
                  alignItems="flex-start"
                  dense
                  disableGutters
                  key={id}
                  // secondaryAction={

                  // }
                >
                  <ListItemAvatar>
                    <Avatar src={getImage(user?.avatar)} alt={user?.full_name}>
                      {user?.full_name?.slice(0, 1).toUpperCase()}
                    </Avatar>
                  </ListItemAvatar>

                  <ListItemText
                    primary={
                      <Grid
                        item
                        container
                        alignItems={"center"}
                        flexWrap={"nowrap"}
                      >
                        <Grid
                          item
                          flex={1}
                          sx={{ maxWidth: "90%", mr: "auto" }}
                        >
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
                          {parse(body || comment || "gdfgdfgd")}
                        </Typography>

                        {quote && (
                          <ListItemButton
                            disableRipple
                            disableTouchRipple
                            // href={`/post/${parent?.slug}`}
                          >
                            <Grid
                              item
                              container
                              sx={{
                                mt: 1,
                                p: 1,
                                outline: "1px  solid #9B9A9A",
                                borderRadius: "1rem",
                              }}
                              flexWrap="nowrap"
                            >
                              <Grid item sx={{ mr: 2 }}>
                                <Avatar
                                  src={getImage(parent?.user?.avatar)}
                                  alt={parent?.user?.full_name}
                                >
                                  {parent?.user?.full_name
                                    ?.slice(0, 1)
                                    .toUpperCase()}
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
                                    // maxWidth: { md: "90%", xs: "80%" },
                                    fontSize: { md: "1.8rem", xs: "1.4rem" },
                                  }}
                                  className="likes-content"
                                >
                                  {parse(parent?.comment || "error")}
                                </Typography>
                              </Grid>
                            </Grid>
                          </ListItemButton>
                        )}
                      </>
                    }
                  />
                </ListItem>
              );
            }
          )}
        {/* {repliedComment?.comments?.length > 0 &&
          repliedComment?.comments.map(
            ({ user, edited, createdAt, comment, updatedAt, body, parent }) => {
              return (
                <ListItemText
                  sx={{ p: "0 !important" }}
                  primary={
                    <Grid
                      item
                      container
                      alignItems={"center"}
                      flexWrap={"nowrap"}
                    >
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
                    </Grid>
                  }
                  secondary={
                    <div>
                      {parse(comment)}

                      <Detail item={item} type="comments" />
                    </div>
                  }
                />
              );
            }
          )} */}
      </Grid>
      {/* <Grid item container flexDirection={"column"} sx={{ mt: 3 }}>
        <Grid item container flexDirection={"column"}>
          <Grid item container alignItems="center">
            <Typography flex={1} component="h5" variant="h5" fontWeight={700} b>
              {quotes_count > 1 ? "Quotes" : "Quote"} - {`${quotes_count || 0}`}
              {/*{`Quote (${quotes_count})`}
            </Typography>
            {/* <IconButton onClick={handleToggle}>
                {open ? (
                  <ExpandLess sx={{ fontSize: "2rem" }} />
                ) : (
                  <ExpandMore sx={{ fontSize: "2rem" }} />
                )}
              </IconButton> 
          </Grid>*/}
      {/* <Collapse in={open} timeout="auto" unmountOnExit>
            {recent_quotes?.map((item) => (
              <ListItem
                disableRipple
                disablePadding
                disableGutters
                disableTouchRipple
                dense
                // onClick={(e) => {
                //   e.stopPropagation();
                //   navigate(`/user/comment/?id=${item?.id}`);
                // }}
                sx={{
                  "& .MuiListItemText-root": {
                    m: 0,
                  },
                  textDecoration: "none",
                  color: "text.primary",
                }}
              >
                <ListItemButton
                  disableRipple
                  disableTouchRipple
                  disableGutters
                  component="div"
                  dense
                >
                  <div style={{ width: "100%", display: "flex" }}>
                    <Image person={item} />
                    <TextQuote item={item} profile={item?.user} />
                  </div>
                </ListItemButton>
              </ListItem>
            ))}
          </Collapse> 
        </Grid>
      </Grid> */}

      <CreateQuoteModal
        open={openQuoteModal}
        handleClose={(e) => setOpenQuoteModal(false)}
        item={item}
        type="comments"
      />
      {isLogin && (
        <LoginModal
          handleClose={() => setIsLogin(false)}
          setIsLogin={setIsLogin}
          // handleRegisterOpen={handleRegisterOpen}
          isLogin={isLogin}
        />
      )}
    </>
  );
}
export function CreateQuoteModal({
  open,
  handleClose,
  item,
  user,
  type,
  initialValues,
}) {
  const { id } = item;
  const validationSchema = Yup.object({
    text: Yup.string("Enter Quote").required("Required"),
  });
  const [createQuote] = useCreateQuoteMutation();
  const [editQuote] = useEditQuoteMutation();
  const handleSubmit = async (values, { resetForm }) => {
    if (values.post_id) {
      const { data, error } = await createQuote({
        body: values.text,
        parent_id: id,
        parent_type: type,
        post_id: values.post_id,
      });
      if (data) toast.success(data);
      if (error) toast.error(error);
    } else {
      const { data, error } = await createQuote({
        body: values.text,
        parent_id: id,
        parent_type: type,
      });
      if (data) toast.success(data);
      if (error) toast.error(error);
    }

    setTimeout(() => resetForm(), 2000);
    setTimeout(() => handleClose(), 3000);
  };
  const handleEdit = async (values, { resetForm }) => {
    const { data, error } = await editQuote({
      body: values.text,
      id,
    });
    if (data) toast.success(data);
    if (error) toast.error(error);
    setTimeout(() => handleClose(), 3000);
  };
  const initial = { text: "", post_id: "" };
  // const navigate = useNavigate();
  return (
    <NotificationModal isOpen={open} handleClose={handleClose}>
      <Grid item container flexDirection="column" gap={2}>
        <Typography
          component="h3"
          variant="h3"
          sx={{ width: "100%", textAlign: "center" }}
        >
          {`${type === "edit" ? "Edit" : "Create"} Quote`}
        </Typography>
        <ListItem
          disableRipple
          disableTouchRipple
          disablePadding
          // onClick={(e) => {
          //   e.stopPropagation();
          //   navigate(`/user/comment/?id=${item?.id}`);
          // }}
          sx={{
            "& .MuiListItemText-root": {
              m: 0,
            },
            textDecoration: "none",
            color: "text.primary",
          }}
        >
          <ListItemButton
            disableRipple
            disableTouchRipple
            component="div"
            disableGutters
            dense
          >
            <div style={{ width: "100%", display: "flex" }}>
              {/* <Image person={item} /> */}
              {/* <Text item={item} profile={user} displayDetail={false} /> */}
            </div>
          </ListItemButton>
        </ListItem>
        <Formik
          initialValues={type === "edit" ? initialValues : initial}
          onSubmit={type === "edit" ? handleEdit : handleSubmit}
          enableReinitialize
          validationSchema={validationSchema}
        >
          {({ isSubmitting, initialValues, values }) => {
            return (
              <Form>
                <Grid item container gap={2}>
                  <Grid item>
                    <Editor
                      name="text"
                      value={initialValues.text}
                      placeholder="Enter Quote here"
                      type={"comments"}
                      upload_id={"post_id"}
                    />
                  </Grid>
                  <Grid item>
                    <CustomButton
                      isSubmitting={isSubmitting}
                      title="Add Quote"
                      type="submit"
                    />
                  </Grid>
                </Grid>
              </Form>
            );
          }}
        </Formik>
      </Grid>
    </NotificationModal>
  );
}
function TextQuote({ item, profile }) {
  const { user, comment, createdAt, updatedAt, body, edited, user_id, id } =
    item;
  const { full_name } = user;

  const [deleteQuote, { isLoading }] = useDeleteQuoteMutation();
  const [followUser, { isLoading: following }] = useFollowUserMutation();
  const [anchorEl, setAnchorEl] = useState(null);
  const [blockUser, { isLoading: blocking }] = useBlockUserMutation();
  const handleCloses = (e) => {
    setAnchorEl(null);
  };

  const opens = Boolean(anchorEl);
  const handleClick = (e) => {
    e.stopPropagation();
    setAnchorEl(e.currentTarget);
  };
  const check = profile?.id === user_id;

  const handleDeleteQuote = async (e) => {
    e.stopPropagation();
    const { data, error } = await deleteQuote({ id });
    if (data) toast.success("comment deleted successfully");
    if (error) toast.error(error);

    handleCloses(e);
  };
  const [open, setOpen] = useState(false);
  const handleEditQuote = (e) => {
    e.stopPropagation();

    setOpen(true);
  };
  const handleReportUser = (e) => {
    e.stopPropagation();
  };
  const handleBlockUser = async (e) => {
    // e.stopPropagation();
    const { data, error } = await blockUser({
      user_id,
    });
    if (data) {
      toast.success(data);
      setTimeout(() => handleCloses(e), 3000);
    }
    if (error) toast.success(error);
  };
  const handleFollowUser = async (e) => {
    // e.stopPropagation();
    const { data, error } = await followUser({
      user_id,
    });
    if (data) {
      toast.success(data);
      setTimeout(() => handleCloses(e), 3000);
    }
    if (error) toast.success(error);
  };

  return (
    <>
      <ListItemText
        primary={
          <Grid item container flexDirection="column" alignItems="center">
            <Grid
              item
              container
              justifyContent={"space-between"}
              flexWrap="nowrap"
              sx={{ overflow: "hidden" }}
            >
              <Grid item container alignItems="center" flexWrap="nowrap">
                <Typography
                  fontWeight={700}
                  sx={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    // flex: 0.5,
                  }}
                >
                  {full_name}
                </Typography>
                <Typography
                  fontWeight={500}
                  sx={{
                    whiteSpace: "nowrap",
                    overflow: "visible",
                    ml: ".4rem",
                  }}
                >
                  {edited ? getTimeMoment(updatedAt) : getTimeMoment(createdAt)}
                </Typography>
                {edited && (
                  <Typography
                    fontWeight={700}
                    color="success"
                    fontSize={{ md: "1.2rem", xs: "1rem" }}
                    sx={{
                      ml: ".4rem",
                      alignSelf: "center",
                      color: "#37D42A",
                      whiteSpace: "nowrap",
                      overflow: "visible",
                    }}
                  >
                    Edited
                  </Typography>
                )}
                <Grid item sx={{ ml: "auto" }}>
                  <IconButton
                    edge="start"
                    id="basic-button"
                    aria-controls={opens ? "basic-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={opens ? "true" : undefined}
                    onClick={handleClick}
                    sx={{ ml: { xs: "1rem" } }}
                    //  sx={{ visibility: !check && "hidden" }}
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
                        onClick={handleDeleteQuote}
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
                          {isLoading ? "Deleting" : "Delete"}
                        </ListItemText>
                      </MenuItem>
                    )}
                    {!check && (
                      <MenuItem
                        onClick={handleEditQuote}
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
                    {check && (
                      <MenuItem
                        sx={{
                          display: "flex",
                          alignItems: "center",
                        }}
                        onClick={handleReportUser}
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
                          {blocking ? "Blocking" : "Block User"}
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
                          <PersonAddAlt1Outlined sx={{ fontSize: "2rem" }} />
                        </ListItemIcon>
                        <ListItemText>
                          {following ? "Following" : "Follow User"}
                        </ListItemText>
                      </MenuItem>
                    )}
                  </Menu>
                </Grid>
              </Grid>
            </Grid>

            <div className="ql-text">{parse(comment || body)}</div>
          </Grid>
        }
      />

      <CreateQuoteModal
        open={open}
        item={item}
        type="edit"
        initialValues={{ text: body }}
        handleClose={(e) => {
          handleCloses(e);
          setOpen(false);
        }}
      />
    </>
  );
}

export default SingleComment;
