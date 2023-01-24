import { MoreVertOutlined, Delete, ReportOutlined } from "@mui/icons-material";
import {
  Button,
  Grid,
  IconButton,
  Typography,
  Skeleton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  List,
  ListItemAvatar,
  Avatar,
} from "@mui/material";
import { Formik, Form } from "formik/dist";
import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Editor from "components/Quil";
import { CustomButton } from "components";

import parse from "html-react-parser";

import { toast } from "react-toastify";
import * as Yup from "yup";
// import { Comment } from "./components/PostComment";
import SocialMedia from "components/modals/SocialMedia";
import {
  useDeleteCommentMutation,
  useGetPostCommentsQuery,
  usePostCommentMutation,
} from "redux/slices/commentSlice";
import { getAgo } from "helpers";

const validationSchema = Yup.object({
  comment: Yup.string().required("Enter your Comment"),
});
const ReplyComment = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  // mutation and queries
  const [postAComment, { isLoading: loading }] = usePostCommentMutation();

  const {
    data: repliedComment,
    isLoading: loadingComment,
    error: err,
  } = useGetPostCommentsQuery({
    type: "comments",
    parentId: id,
  });
  const [openShareModal, setOpenShareModal] = useState(false);
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
            padding: { md: "3rem", xs: "1rem" },
            borderRadius: "2rem",
          }}
          item
          md={8}
          sm={8}
          xs={11}
        >
          <Grid item container flexDirection={"column"}>
            <Typography fontWeight={700}>Replying to</Typography>
            <Grid item container>
              {repliedComment?.length > 0 ? (
                <List dense sx={{ width: "100%" }}>
                  {repliedComment?.map((comments) => (
                    <Single comments={comments} />
                  ))}
                </List>
              ) : (
                <Typography variant="h2" width="100%" textAlign="center">
                  No Comment Yet
                </Typography>
              )}
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

function Single({ comments }) {
  const { full_name, avatar, createdAt, user_id, comment, id } = comments;
  const navigate = useNavigate();
  const handleClicks = (id) => {
    navigate({
      pathname: "/user/profile",
      search: `?id=${id}`,
    });
  };
  const [deleteComment, { isLoading }] = useDeleteCommentMutation();
  const handleCloses = () => setAnchorEl(null);
  const [anchorEl, setAnchorEl] = useState(null);
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
  let check;
  return (
    <ListItemButton>
      <div style={{ width: "100%", display: "flex" }}>
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
                <Grid item container flexWrap="nowrap">
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

              <Typography variant="h5" sx={{ textAlign: "left", width: "98%" }}>
                {parse(comment)}
              </Typography>
            </Grid>
          }
        />
      </div>
    </ListItemButton>
  );
}
export default ReplyComment;
