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
  useGetPostCommentsQuery,
} from "redux/slices/commentSlice";
import { getImage, getTimeMoment } from "helpers";
import EditModal from "./EditPost";
import {
  useBlockUserMutation,
  useFollowUserMutation,
} from "redux/slices/authSlice";

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
  const navigate = useNavigate();
  return (
    <ListItem
      disablePadding
      onClick={(e) => {
        e.stopPropagation();
        navigate(`/user/comment/?id=${item?.id}`);
      }}
      sx={{
        "& .MuiListItemText-root": {
          m: 0,
        },
        textDecoration: "none",
        color: "text.primary",
      }}
    >
      <ListItemButton component="div">
        <div style={{ width: "100%", display: "flex" }}>
          <Image person={item} />
          <Text item={item} profile={profile} icons={icons} />{" "}
        </div>
      </ListItemButton>
    </ListItem>
  );
};
export function Image({ person: { user } }) {
  const { full_name, avatar, user_id } = user;
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
        src={getImage(avatar)}
        onClick={() => handleClicks(user_id)}
        sx={{ cursor: "pointer" }}
      >
        {full_name?.slice(0, 1).toUpperCase()}
      </Avatar>
    </ListItemAvatar>
  );
}

export function Text({ item, profile }) {
  const { user, comment, createdAt, updatedAt, edited, user_id, id } = item;
  const { full_name } = user;
  const [deleteComment, { isLoading }] = useDeleteCommentMutation();
  const [followUser, { isLoading: following }] = useFollowUserMutation();
  const [anchorEl, setAnchorEl] = useState(null);
  const [blockUser, { isLoading: blocking }] = useBlockUserMutation();
  const handleCloses = (e) => {
    e.stopPropagation();
    setAnchorEl(null);
  };

  const opens = Boolean(anchorEl);
  const handleClick = (e) => {
    e.stopPropagation();
    setAnchorEl(e.currentTarget);
  };
  const check = profile?.id !== user_id;

  const handleDeleteComment = async (e) => {
    e.stopPropagation();
    const { data, error } = await deleteComment({ id });
    if (data) toast.success("comment deleted successfully");
    if (error) toast.error(error);

    handleCloses(e);
  };
  const [open, setOpen] = useState(false);
  const handleEditComment = (e) => {
    e.stopPropagation();
    setOpen(true);
  };
  const handleReportUser = (e) => {
    e.stopPropagation();
  };
  const handleBlockUser = async (e) => {
    e.stopPropagation();
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

            <div className="ql-text">{parse(comment)}</div>
          </Grid>
        }
        secondary={<Detail item={item} />}
      />

      <EditModal
        item={item}
        open={open}
        handleClose={(e) => {
          e.stopPropagation();
          handleCloses(e);
          setOpen(false);
        }}
      />
    </>
  );
}
function Detail({ item }) {
  const { id } = item;
  const [likeState, setLikeState] = useState(Boolean(item?.liked));
  const [likePost] = useLikeAndUnlikePostMutation();
  const { data: repliedComment } = useGetPostCommentsQuery({
    type: "comments",
    parentId: id,
  });
  const { data } = useGetLikesQuery({
    type: "comments",
    parentId: id,
  });

  const handleLikePost = async (e) => {
    e.stopPropagation();
    const { data: dt } = await likePost({
      parent_type: "comments",
      parent_id: item?.id,
    });
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
              navigate(`/user/comment/?id=${id}`);
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
            text={data?.length}
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

SingleComment.propTypes = {};

export default SingleComment;
