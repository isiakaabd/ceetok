import {
  FavoriteBorderOutlined,
  Favorite,
  IosShareOutlined,
  ReportOutlined,
  Delete,
  MoreVertOutlined,
  ChatBubbleOutline,
  Edit,
  CloseOutlined,
} from "@mui/icons-material";
import parse from "html-react-parser";
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
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  useLikeAndUnlikePostMutation,
  useGetLikesQuery,
} from "redux/slices/postSlice";

import { toast } from "react-toastify";
import {
  useDeleteCommentMutation,
  useEditCommentMutation,
  useGetPostCommentsQuery,
} from "redux/slices/commentSlice";
// import { Comment } from "./components/PostComment";
// import SocialMedia from "components/modals/SocialMedia";
// import { useUserProfileQuery } from "redux/slices/authSlice";
import { getAgo } from "helpers";
import NotificationModal from "components/modals/NotificationModal";
import { Formik, Form } from "formik/dist";
import Editor from "components/Quil";
import { CustomButton } from "components";

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

const SingleComment = ({ item, icons, profile }) => {
  const { id } = item;
  // const [deleteComment, { isLoading }] = useDeleteCommentMutation();
  // const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  console.log(item);

  return (
    <ListItem
      disablePadding
      // onClick={(e) => {
      //   e.stopImmediatePropagation();
      //   navigate(`/user/comment/?id=${id}`);
      // }}
      sx={{
        "& .MuiListItemText-root": {
          m: 0,
        },
        textDecoration: "none",
        color: "text.primary",
      }}
    >
      <ListItemButton>
        <div style={{ width: "100%", display: "flex" }}>
          <Image person={item} />
          <Text item={item} profile={profile} icons={icons} />{" "}
        </div>
      </ListItemButton>
    </ListItem>
  );
};
export function Image({ person }) {
  const { full_name, avatar, user_id } = person;
  const navigate = useNavigate();
  const handleClicks = (id) => {
    navigate({
      pathname: "/user/profile",
      search: `?id=${id}`,
    });
  };
  return (
    <ListItemAvatar>
      <Avatar
        alt={full_name}
        src={avatar}
        onClick={() => handleClicks(user_id)}
        sx={{ cursor: "pointer" }}
      >
        {full_name?.slice(0, 1).toUpperCase()}
      </Avatar>
    </ListItemAvatar>
  );
}

export function Text({ item, profile }) {
  const { full_name, comment, createdAt, updatedAt, edited, user_id, id } =
    item;

  const [deleteComment, { isLoading }] = useDeleteCommentMutation();
  const [anchorEl, setAnchorEl] = useState(null);
  const [editCommentModal, setEditCommentModal] = useState(false);
  const handleCloses = (e) => {
    setAnchorEl(null);
  };
  const opens = Boolean(anchorEl);
  const handleClick = (event) => {
    // event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };
  const check = profile?.id !== user_id;

  const handleDeleteComment = async (e) => {
    const { data, error } = await deleteComment({ id });
    if (data) {
      toast.success("comment deleted successfully");
    }
    if (error) {
      toast.error(error);
    }
    handleCloses();
  };
  const handleEditComment = (e) => {
    setEditCommentModal(true);
  };

  const handleClose = () => {
    setEditCommentModal(false);
    handleCloses();
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
                  {edited ? getAgo(updatedAt) : getAgo(createdAt)}
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
                          {isLoading ? "Deleting" : "Delete"}
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
                          {/* {isLoading ? "Editing" : "Delete"} */}
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
                      >
                        <ListItemIcon>
                          <ReportOutlined sx={{ fontSize: "2rem" }} />
                        </ListItemIcon>
                        <ListItemText>Report</ListItemText>
                      </MenuItem>
                    )}
                  </Menu>
                </Grid>
              </Grid>
            </Grid>

            <div className="ql-text">{parse(comment)}</div>
          </Grid>
        }
        secondary={
          <Detail item={item} setEditCommentModal={setEditCommentModal} />
        }
      />
      <EditModal
        handleClose={handleClose}
        item={item}
        open={editCommentModal}
      />
    </>
  );
}
function Detail({ item }) {
  const { id } = item;
  const [likeState, setLikeState] = useState(item?.liked === 1 ? true : false);
  const [likePost] = useLikeAndUnlikePostMutation();
  console.log(item);
  const { data: repliedComment } = useGetPostCommentsQuery({
    type: "comments",
    parentId: id,
  });

  const [open, setOpen] = useState(false);

  const { data } = useGetLikesQuery({
    type: "comments",
    parentId: item?.id,
  });
  console.log(data);
  //   console.log(body, "numberOfLikes");
  const handleLikePost = async (e) => {
    const { data: dt } = await likePost({
      parent_type: "comments",
      parent_id: item?.id,
    });
    console.log(dt);
    if (dt) setLikeState(!likeState);
  };
  const navigate = useNavigate();
  return (
    <>
      <Grid item container justifyContent="space-between" flexWrap="nowrap">
        <Grid item container flexWrap="nowrap" justifyContent={"space-between"}>
          <StyledButton
            text={repliedComment?.length}
            onClick={(e) => {
              // onClick={(e) => {
              //   e.stopImmediatePropagation();
              navigate(`/user/comment/?id=${id}`);
              // }}
            }}
            Icon={<ChatBubbleOutline />}
          />

          <StyledButton
            onClick={handleLikePost}
            color={likeState ? "#f00" : ""}
            Icon={
              likeState ? (
                <Favorite sx={{ fill: "#f00" }} />
              ) : (
                <FavoriteBorderOutlined />
              )
            }
            text={data?.body?.likes?.length}
          />

          <StyledButton
            text="Share"
            Icon={<IosShareOutlined />}
            onClick={(e) => e.stopPropagation()}
          />
        </Grid>
      </Grid>
    </>
  );
}
function EditModal({ item, open, handleClose }) {
  const [editComment, { isLoading: loading }] = useEditCommentMutation();
  const handleSubmit = async (values) => {
    const { edit } = values;
    const { data, error } = await editComment({
      comment: edit,
      id: item?.id,
    });
    handleClose();
    if (data) toast.success(data);
    if (error) toast.error(error);
  };
  return (
    <NotificationModal isOpen={open} handleClose={handleClose}>
      <Grid item container>
        <Typography
          sx={{ mb: 2, textAlign: "center", width: "100%" }}
          variant="h2"
        >
          Edit Comment
        </Typography>
        <Formik
          onSubmit={handleSubmit}
          enableReinitialize
          initialValues={{ edit: item?.comment }}
        >
          {({ values }) => {
            return (
              <Form>
                <Grid item container flexDirection={"column"} gap={2}>
                  {/* <Grid item container> */}
                  <Editor name="edit" value={values.edit} />
                  {/* </Grid> */}
                  <CustomButton
                    title={"Edit Post"}
                    type="submit"
                    isSubmitting={loading}
                  />
                </Grid>
              </Form>
            );
          }}
        </Formik>
      </Grid>
    </NotificationModal>
  );
}
SingleComment.propTypes = {};

export default SingleComment;
