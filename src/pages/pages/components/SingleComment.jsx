import {
  FavoriteBorderOutlined,
  Favorite,
  IosShareOutlined,
  Instagram,
  ReplyOutlined,
  ReportOutlined,
  Delete,
  MoreVertOutlined,
  ChatOutlined,
  EmailOutlined,
  ChatBubbleOutline,
} from "@mui/icons-material";
import parse from "html-react-parser";
import {
  Avatar,
  Button,
  Divider,
  Grid,
  IconButton,
  Typography,
  Skeleton,
  Menu,
  MenuItem,
  Paper,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  ListItemAvatar,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Formik, Form } from "formik/dist";
import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import {
  useGetAPostQuery,
  useLikeAndUnlikePostMutation,
  useGetLikesQuery,
  useGetViewsQuery,
  useAddQuoteMutation,
} from "redux/slices/postSlice";

import { toast } from "react-toastify";
import * as Yup from "yup";
import {
  useDeleteCommentMutation,
  useGetPostCommentsQuery,
  usePostCommentMutation,
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
  const { user_id, id } = item;

  const [deleteComment, { isLoading }] = useDeleteCommentMutation();
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const handleCloses = () => {
    setAnchorEl(null);
  };
  const opens = Boolean(anchorEl);
  const handleClick = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };
  const check = profile?.id === user_id;
  const handleDeleteComment = async (e, id) => {
    console.log(e);
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
    <ListItem
      disablePadding
      onClick={(e) => {
        navigate(`/user/comment/?id=${id}`);
      }}
      sx={{
        "& .MuiListItemSecondaryAction-root": {
          top: "20",
        },
        textDecoration: "none",
        color: "text.primary",
      }}
      secondaryAction={
        <>
          <IconButton
            id="basic-button"
            aria-controls={opens ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={opens ? "true" : undefined}
            onClick={handleClick}
            //  sx={{ visibility: !check && "hidden" }}
            sx={{ flex: 1 }}
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
            <MenuItem
              onClick={(e) => handleDeleteComment(e, id)}
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <ListItemIcon>
                <Delete sx={{ fontSize: "2rem" }} />
              </ListItemIcon>
              <ListItemText sx={{ fontSize: "3rem" }}>
                {isLoading ? "Deleting" : "Delete"}
              </ListItemText>
            </MenuItem>
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
          </Menu>
        </>
      }

      //   component={Link}
    >
      <ListItemButton>
        <Image person={item} />
        <Text item={item} profile={profile} icons={icons} />
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

export function Text({ item }) {
  const { full_name, comment, createdAt } = item;

  return (
    // <Grid container>
    //   <Grid
    //     item
    //     container
    //     alignItems="center"
    //     flexWrap="nowrap"
    //     // justifyContent="space-between"
    //   >
    //     <Typography
    //       fontWeight={700}
    //       color="#9B9A9A"
    //       title={full_name}
    //       sx={{
    // whiteSpace: "nowrap",
    // overflow: "hidden",
    // textOverflow: "ellipsis",
    // maxWidth: "20ch",
    //         mr: 1,
    //       }}
    //       fontSize={{ md: "2rem", xs: "1.2rem" }}
    //     >
    //       {full_name}
    //     </Typography>
    //     <Typography
    //       color="#9B9A9A"
    //       fontWeight={400}
    //       fontSize={{ md: "1.6rem", xs: "1rem" }}
    //     >
    //       {getAgo(createdAt)}
    //     </Typography>
    // {check && (
    //   <IconButton
    //     id="basic-button"
    //     aria-controls={opens ? "basic-menu" : undefined}
    //     aria-haspopup="true"
    //     aria-expanded={opens ? "true" : undefined}
    //     onClick={handleClick}
    //     //  sx={{ visibility: !check && "hidden" }}
    //     sx={{ flex: 1 }}
    //   >
    //     <MoreVertOutlined />
    //   </IconButton>
    // )}

    // <Menu
    //   id="basic-menu"
    //   anchorEl={anchorEl}
    //   open={opens}
    //   onClose={handleCloses}
    //   MenuListProps={{
    //     "aria-labelledby": "basic-button",
    //   }}
    // >
    //   <MenuItem
    //     onClick={() => handleDeleteComment(id)}
    //     sx={{
    //       display: "flex",
    //       alignItems: "center",
    //     }}
    //   >
    //     <ListItemIcon>
    //       <Delete sx={{ fontSize: "2rem" }} />
    //     </ListItemIcon>
    //     <ListItemText sx={{ fontSize: "3rem" }}>
    //       {isLoading ? "Deleting" : "Delete"}
    //     </ListItemText>
    //   </MenuItem>
    // </Menu>
    //   </Grid>
    //   <Typography
    //     color="secondary"
    //     fontWeight={600}
    //     sx={{ wordBreak: "break-all" }}
    //     fontSize={{ md: "1.8rem", sm: "1.4rem" }}
    //   >
    //     {parse(comment)}
    //   </Typography>
    //   <Grid item container>
    // <Details
    //   icons={icons}
    //   data={item}
    //   type="comments"
    //   // de={de}
    //   onClick={handleClick}
    // />
    //   </Grid>
    // </Grid>
    <>
      <ListItemText
        primary={
          <Grid container flexDirection="column">
            <Typography fontWeight={700}>
              {full_name}{" "}
              <Typography variant="span" fontWeight={500}>
                {getAgo(createdAt)}
              </Typography>{" "}
            </Typography>
            <Typography
              sx={{
                // display: "inline",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                maxWidth: "50ch",
              }}
              //   component="span"
              variant="body2"
              color="text.primary"
            >
              {parse(comment)}
            </Typography>
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
  const handleLikePost = async () => {
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

        <StyledButton text="Share" Icon={<IosShareOutlined />} />
      </Grid>
    </Grid>
  );
}
SingleComment.propTypes = {};

export default SingleComment;
