import {
  ArrowBackOutlined,
  FavoriteBorderOutlined,
  Favorite,
  IosShareOutlined,
  ReplyOutlined,
  MoreVertOutlined,
  Delete,
  ReportOutlined,
} from "@mui/icons-material";
import {
  Button,
  Grid,
  IconButton,
  Typography,
  Skeleton,
  ListItem,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  List,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Formik, Form } from "formik/dist";
import React, { useState } from "react";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import Editor from "components/Quil";
import { CustomButton } from "components";
import NotificationModal from "components/modals/NotificationModal";

import {
  useLikeAndUnlikePostMutation,
  useGetLikesQuery,
  useGetViewsQuery,
} from "redux/slices/postSlice";

import { toast } from "react-toastify";
import * as Yup from "yup";
// import { Comment } from "./components/PostComment";
import SocialMedia from "components/modals/SocialMedia";
import {
  useDeleteCommentMutation,
  useGetPostCommentsQuery,
  usePostCommentMutation,
} from "redux/slices/commentSlice";
import { Image, Text } from "./SingleComment";

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
  fontSize: { md: "1.2rem", xs: ".9rem" },
  fontWeight: 400,
}));
// export const Details = ({ handleShare, type, data, setOpenComment }) => {
//   const [likeState, setLikeState] = useState(data?.liked === 1 ? true : false);
//   const [likePost] = useLikeAndUnlikePostMutation();
//   const [open, setOpen] = useState(false);

//   const { data: numberOfLikes } = useGetLikesQuery({
//     type: "posts",
//     parentId: data?.id,
//   });

//   const handleLikePost = async () => {
//     const { data: dt } = await likePost({
//       parent_type: type ? type : "posts",
//       parent_id: data?.id,
//     });

//     if (dt) setLikeState(!likeState);
//   };
//   const [quote, { isLoading }] = usePostCommentMutation();

//   const handleSubmit = async (values) => {
//     const { data: dt, error } = await quote({
//       parent_type: "comments",
//       parent_id: data?.id,
//       comment: values.comment,
//     });
//     console.log(dt, error);
//   };

//   const validationSchema = Yup.object({
//     comment: Yup.string("Enter Comment").required("Required"),
//   });
//   return (
//     <>
//       <Grid item container justifyContent="space-between" flexWrap="nowrap">
//         <Grid item container flexWrap="nowrap" justifyContent={"space-between"}>
//           <StyledButton
//             text="Reply"
//             // {...de}
//             onClick={type === "comments" ? () => setOpen(true) : null}
//             Icon={<ReplyOutlined />}
//           />

//           <StyledButton
//             onClick={handleLikePost}
//             color={likeState ? "#f00" : ""}
//             Icon={
//               likeState ? (
//                 <Favorite sx={{ fill: "#f00" }} />
//               ) : (
//                 <FavoriteBorderOutlined />
//               )
//             }
//             text="Like"
//           />

//           <StyledButton text="Share" Icon={<IosShareOutlined />} />
//         </Grid>
//       </Grid>

//       <NotificationModal isOpen={open} handleClose={() => setOpen(false)}>
//         <Formik
//           initialValues={{ comment: "" }}
//           validationSchema={validationSchema}
//           onSubmit={handleSubmit}
//         >
//           <Form>
//             <Editor name="comment" placeholder={"Enter Comment.."} />
//             <Grid item sx={{ mt: 2 }}>
//               <CustomButton
//                 isSubmitting={isLoading}
//                 title="Reply"
//                 type="submit"
//               />
//             </Grid>
//           </Form>
//         </Formik>
//       </NotificationModal>
//     </>
//   );
// };
const validationSchema = Yup.object({
  comment: Yup.string().required("Enter your Comment"),
});
const ReplyComment = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  const [deleteComment, { isLoading }] = useDeleteCommentMutation();
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const handleCloses = () => setAnchorEl(null);

  const opens = Boolean(anchorEl);
  const handleClick = (event) => setAnchorEl(event.currentTarget);

  //   const check = profile?.id === user_id;
  const handleDeleteComment = async (e, id) => {
    const { data, error } = await deleteComment({ id });
    if (data) {
      toast.success("comment deleted successfully");
    }
    if (error) {
      toast.error(error);
    }
    handleCloses();
  };
  const {
    data: repliedComment,
    isLoading: loadingComment,
    error: err,
  } = useGetPostCommentsQuery({
    type: "comments",
    parentId: id,
  });

  const [postAComment, { isLoading: loading }] = usePostCommentMutation();
  const { data: views } = useGetViewsQuery({
    type: "posts",
    parentId: id,
  });

  const [openShareModal, setOpenShareModal] = useState(false);
  const handleShare = () => setOpenShareModal(true);

  const handleSubmit = async (values, { setFieldValue }) => {
    const { data: dt, error } = await postAComment({
      parent_id: id,
      parent_type: "comments",
      comment: values.comment,
    });
    if (dt) {
      toast.success(dt);
      setFieldValue("comment", "");
    }
    if (error) {
      toast.error("something went wrong, try again...");
    }
  };
  if (loadingComment)
    return <Skeleton animation="wave" height="12rem" width="100%" />;
  if (err) return <p>Soemthing went wrong...</p>;
  return (
    <>
      <Grid item container sx={{ my: 6 }}>
        <Grid
          sx={{
            mx: "auto",
            background: "#f2f2f2",
            padding: "3rem",
            borderRadius: "2rem",
          }}
          item
          md={8}
          sm={8}
          xs={6}
        >
          <Grid item container flexDirection={"column"}>
            <Grid item container>
              <List dense sx={{ width: "100%" }}>
                {repliedComment?.map((comment) => {
                  return (
                    <ListItem
                      disablePadding
                      key={comment?.id}
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
                        <Image person={comment} />
                        <Text item={comment} />
                      </ListItemButton>
                    </ListItem>
                  );
                })}
              </List>

              {/* <Comment handleShare={handleShare} /> */}
            </Grid>
            <Grid
              sx={{
                mt: { md: 3, xs: 1.5 },
                paddingInline: { xs: "1rem", md: "4rem" },
              }}
            >
              <Formik
                initialValues={{ comment: "" }}
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
              >
                <Form>
                  <Editor
                    theme="snow"
                    name="comment"
                    value={""}
                    placeholder="write something..."
                  />

                  <Grid
                    item
                    container
                    sx={{ mt: 2 }}
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Button
                      variant="outlined"
                      sx={{
                        color: "#9B9A9A",
                        borderColor: "inherit",
                        // border: "2px solid #9B9A9A",
                        fontSize: "1.2rem",
                        fontWeight: 700,
                        padding: ".8rem 2rem",
                        borderRadius: "3rem",
                      }}
                    >
                      Cancel
                    </Button>
                    <CustomButton
                      title="Post"
                      variant="contained"
                      width="10rem"
                      type="submit"
                      isSubmitting={loading}
                    />
                  </Grid>
                </Form>
              </Formik>
            </Grid>
            {/* <Grid
            item
            container
            alignItems="center"
            sx={{ mt: 2, paddingInline: { xs: "3rem", md: "4rem" } }}
          >
            <Typography
              variant="span"
              color="#FF9B04"
              fontSize={{ md: "1.8rem", xs: "1.5rem", fontWeight: 500 }}
            >
              Viewing this Topic: &nbsp;&nbsp;
            </Typography>
            <Grid item>
              <Grid container>
                {views?.slice(0, 50)?.map((item, index) => (
                  <Typography
                    component={Link}
                    to={`/user/profile/?id=${item.viewer?.user_id}`}
                    key={index}
                    sx={{ width: "max-content", mr: 0.5 }}
                    color="secondary"
                    fontSize={{ md: "1.8rem", xs: "1.5rem", fontWeight: 500 }}
                  >
                    {item.viewer.full_name},
                  </Typography>
                ))}
                {views?.length > 50 ? (
                  <Typography
                    variant="span"
                    color="#FF9B04"
                    fontSize={{ md: "1.8rem", xs: "1.5rem", fontWeight: 500 }}
                  >
                    {`and ${views.length - 50}  guests`}
                  </Typography>
                ) : null}
              </Grid>
            </Grid>
          </Grid> */}
          </Grid>
        </Grid>
      </Grid>
      <SocialMedia
        open={openShareModal}
        handleClose={() => setOpenShareModal(false)}
      />
    </>
  );
};

export default ReplyComment;
