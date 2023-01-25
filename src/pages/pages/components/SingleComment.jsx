import {
  FavoriteBorderOutlined,
  Favorite,
  IosShareOutlined,
  ReportOutlined,
  Delete,
  MoreVertOutlined,
  ChatBubbleOutline,
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
// import { Comment } from "./components/PostComment";
// import SocialMedia from "components/modals/SocialMedia";
// import { useUserProfileQuery } from "redux/slices/authSlice";
import { getAgo } from "helpers";

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

  return (
    <ListItem
      disablePadding
      onClick={(e) => {
        e.stopPropagation();
        navigate(`/user/comment/?id=${id}`);
      }}
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
  const { full_name, comment, createdAt } = item;
  const { user_id, id } = item;
  const [deleteComment, { isLoading }] = useDeleteCommentMutation();
  const [anchorEl, setAnchorEl] = useState(null);
  const handleCloses = (e) => {
    e.stopPropagation();
    setAnchorEl(null);
  };
  const opens = Boolean(anchorEl);
  const handleClick = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };
  const check = profile?.id !== user_id;

  const handleDeleteComment = async (e, id) => {
    e.stopPropagation();
    const { data, error } = await deleteComment({ id });
    if (data) {
      toast.success("comment deleted successfully");
    }
    if (error) {
      toast.error(error);
    }
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
                  {getAgo(createdAt)}
                </Typography>
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
                        onClick={(e) => handleDeleteComment(e, id)}
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
        secondary={<Detail item={item} />}
      />
    </>
  );
}
function Detail({ item }) {
  const { id } = item;
  const [likeState, setLikeState] = useState(item?.liked === 1 ? true : false);
  const [likePost] = useLikeAndUnlikePostMutation();

  const { data: repliedComment } = useGetPostCommentsQuery({
    type: "comments",
    parentId: id,
  });

  const [open, setOpen] = useState(false);

  const { data } = useGetLikesQuery({
    type: "comments",
    parentId: item?.id,
  });
  //   console.log(body, "numberOfLikes");
  const handleLikePost = async (e) => {
    e.stopPropagation();
    const { data: dt } = await likePost({
      parent_type: "comments",
      parent_id: item?.id,
    });

    if (dt) setLikeState(!likeState);
  };

  return (
    <Grid item container justifyContent="space-between" flexWrap="nowrap">
      <Grid item container flexWrap="nowrap" justifyContent={"space-between"}>
        <StyledButton
          text={repliedComment?.length}
          onClick={() => setOpen(true)}
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
  );
}
SingleComment.propTypes = {};

export default SingleComment;
