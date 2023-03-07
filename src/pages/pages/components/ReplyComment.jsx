import {
  MoreVertOutlined,
  Delete,
  ReportOutlined,
  Edit,
} from "@mui/icons-material";
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
import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Editor from "components/Quil";
import { CustomButton } from "components";
import parse from "html-react-parser";
import { toast } from "react-toastify";
import * as Yup from "yup";
import SocialMedia from "components/modals/SocialMedia";
import {
  useDeleteCommentMutation,
  useGetPostCommentsQuery,
  useGetSingleCommentQuery,
  usePostCommentMutation,
  useUpdateCommentMutation,
} from "redux/slices/commentSlice";
import { getImage, getTimeMoment } from "helpers";
import NotificationModal from "components/modals/NotificationModal";
import { useUserProfileQuery } from "redux/slices/authSlice";
import ArrowBack from "assets/svgs/ArrowBack";
import { useSelector } from "react-redux";
import { useReportPostMutation } from "redux/slices/postSlice";
import Error from "./Error";
const validationSchema = Yup.object({
  comment: Yup.string().required("Enter your Comment"),
});
const ReplyComment = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const { data: mainComment, isLoading, error } = useGetSingleCommentQuery(id);

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
  const navigate = useNavigate();
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
  if (loadingComment || isLoading)
    return <Skeleton animation="wave" height="12rem" width="100%" />;
  if (err || error) return <Error />;

  return (
    <>
      <Grid
        item
        container
        flexDirection="column"
        sx={{ mt: 6, background: "#E5E5E5" }}
      >
        <Grid
          sx={{
            mx: "auto",
            background: "#fff",
            padding: { md: "3rem", xs: "1rem" },
            my: "4rem",
            borderRadius: "2rem",
          }}
          item
          md={8}
          sm={8}
          xs={11}
        >
          <IconButton onClick={() => navigate(-1)}>
            <ArrowBack sx={{ fontSize: "3rem" }} />
          </IconButton>
          <Grid item container flexDirection={"column"}>
            <Grid item container flexDirection={"column"} gap={2}>
              <Typography
                fontWeight={700}
                fontSize={{ md: "2rem", xs: "1.6rem", sm: "1.8rem" }}
              >
                Comment
              </Typography>
              <Typography className="likes-content">
                {parse(mainComment?.comment)}
              </Typography>
            </Grid>
            <Typography fontWeight={700} sx={{ my: 2 }}>
              Replying to
              <Typography
                variant="span"
                component={Link}
                sx={{ ml: 1, color: "#FF9B04" }}
                to={`/user/profile/?id=${mainComment?.user_id}`}
              >
                {`@${mainComment?.user?.username || mainComment?.user?.email}`}
              </Typography>
            </Typography>
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
  const { edited, updatedAt, createdAt, user, user_id, comment, id } = comments;
  const { full_name, avatar } = user;
  // const token = useSelector((state) => state.auth.token);
  const admin = useSelector((state) => state.auth.admin);
  const [report] = useReportPostMutation();
  const navigate = useNavigate();
  const handleClicks = (id) => {
    navigate({
      pathname: "/user/profile",
      search: `?id=${id}`,
    });
  };
  const { data: profile } = useUserProfileQuery();
  const [deleteComment, { isLoading }] = useDeleteCommentMutation();
  const [openReport, setOpenReport] = useState(false);
  const handleCloses = () => setAnchorEl(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const opens = Boolean(anchorEl);
  const handleClick = (event) => setAnchorEl(event.currentTarget);

  //   const check = profile?.id === user_id;
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
  const [editComment, setEditComment] = useState(false);
  const [updateComment, { isLoading: submitting }] = useUpdateCommentMutation();
  let check = profile?.id !== user_id;

  const handleSubmit = async (values) => {
    const { comment } = values;
    await updateComment({
      id,
      comment,
    });
    setTimeout(() => {
      handleCloses();
    }, 500);
    setEditComment(false);
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
  return (
    <>
      <ListItemButton>
        <div style={{ width: "100%", display: "flex" }}>
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
                  <Grid item container flexWrap="nowrap" alignItems="center">
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
                      {edited
                        ? getTimeMoment(updatedAt)
                        : getTimeMoment(createdAt)}
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
                            onClick={() => setEditComment(true)}
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

                        {check && !admin && (
                          <MenuItem
                            sx={{
                              display: "flex",
                              alignItems: "center",
                            }}
                            onClick={(e) => {
                              handleCloses(e);
                              setOpenReport(true);
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

                <Typography
                  variant="h5"
                  sx={{ textAlign: "left", width: "98%" }}
                  className="likes-content"
                >
                  {parse(comment)}
                </Typography>
              </Grid>
            }
          />
        </div>
      </ListItemButton>
      <NotificationModal
        isOpen={editComment}
        handleClose={() => setEditComment(false)}
      >
        <Formik initialValues={{ comment }} onSubmit={handleSubmit}>
          <Form>
            <Editor value={comment} name="comment" />
            <Grid item container sx={{ mt: 2 }}>
              <CustomButton
                title="submit"
                type="submit"
                isSubmitting={submitting}
              />
            </Grid>
          </Form>
        </Formik>
      </NotificationModal>
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
}
export default ReplyComment;
