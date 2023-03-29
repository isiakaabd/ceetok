import {
  Button,
  Grid,
  IconButton,
  ListItemText,
  Menu,
  MenuItem,
  Skeleton,
  Typography,
} from "@mui/material";
import ArrowBack from "assets/svgs/ArrowBack";
import { getImage, getTime } from "helpers";
import parse from "html-react-parser";
import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  useDeleteLivePostMutation,
  useEditLivePostMutation,
  useGetLivePostQuery,
} from "redux/slices/adminSlice";
import images from "assets";
import { CustomButton } from "components";
import Editor from "components/Quill";
import { Form, Formik } from "formik/dist";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { usePostCommentMutation } from "redux/slices/commentSlice";
import { useCreateQuoteMutation } from "redux/slices/quoteSlice";
import { useSelector } from "react-redux";
import { MoreVertOutlined } from "@mui/icons-material";
import { LiveComment } from "./LiveComment";
import { Details } from "pages/pages/Post";
import { useLikeAndUnlikePostMutation } from "redux/slices/postSlice";
import CreatePost from "pages/user/modals/CreatePost";
import Error from "pages/pages/components/Error";

const validationSchema = Yup.object({
  comment: Yup.string().trim().required("Enter your Comment"),
});

const SingleLivePage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const admin = useSelector((state) => state.auth.admin);
  const [postAComment] = usePostCommentMutation();
  const [createQuote] = useCreateQuoteMutation();
  const { data: post, isLoading: loading, error } = useGetLivePostQuery(slug);
  const [deletePost, { isLoading: deleting }] = useDeleteLivePostMutation();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [editModal, setEditModal] = useState(false);
  const handleClose = () => setAnchorEl(null);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const [editLive, { isLoading }] = useEditLivePostMutation();
  const [likePost] = useLikeAndUnlikePostMutation();
  const [state, setState] = useState(true);
  const token = useSelector((state) => state.auth.token);
  if (loading) return <Skeleton />;
  if (error) return <Error />;
  const handleSubmit = async (values, onSubmitProps) => {
    if (state) {
      const { data: dt, error } = await postAComment({
        parent_id: id,
        parent_type: "live",
        comment: values.comment,
      });
      if (dt) {
        toast.success(dt);
        // quill.setContents([{ insert: "\n" }]);
        onSubmitProps.resetForm();
      }
      if (error) {
        toast.error(error || "something went wrong, try again...");
      }
    } else {
      const { data, error } = await createQuote({
        body: values.comment,
        parent_id: id,
        parent_type: "live",
      });
      if (data) {
        toast.success(data);
        onSubmitProps.resetForm();
      }
      if (error) toast.error(error);
    }
  };

  const {
    title,
    media,
    createdAt,
    body,
    recent_views: views,
    pin_to_top,
    allow_interaction,
    summary,
    id,
  } = post;

  const handleInteraction = async () => {
    const { data, error } = await editLive({
      id,
      allow_interaction: !allow_interaction,
    });
    if (data) {
      toast.success(data);
      setTimeout(() => handleClose(), 3000);
    }
    if (error) {
      toast.error(error);
    }
  };
  const handlePinToTop = async () => {
    const { data, error } = await editLive({
      id,
      pin_to_top: !pin_to_top,
    });
    if (data) {
      toast.success(data);
      setTimeout(() => handleClose(), 3000);
    }
    if (error) {
      toast.error(error);
    }
  };
  const addToSummary = async () => {
    const { data, error } = await editLive({
      id,
      summary: !summary,
    });
    if (data) {
      toast.success(data);
      setTimeout(() => handleClose(), 3000);
    }
    if (error) {
      toast.error(error);
    }
  };

  const handleLikePost = async () => {
    await likePost({
      parent_type: "live",
      parent_id: post?.id,
    });
  };
  const handleDeleteLivePost = async () => {
    const { data, error } = await deletePost({
      id: post?.id,
    });

    if (data) {
      toast.success(data);
      setTimeout(() => navigate("/live"), 3000);
    }
    if (error) toast.error(error);
  };
  const viewers = views?.filter((value) => value.viewer !== "guest");

  return (
    <>
      <Grid
        container
        item
        flexDirection="column"
        gap={3}
        sx={{
          p: { md: "4rem", xs: "1rem" },
          background: "#fff",
          //  "#E5E5E5",
        }}
      >
        <Grid item container>
          <IconButton onClick={() => navigate(-1)}>
            <ArrowBack sx={{ fontSize: "3rem" }} />
          </IconButton>
        </Grid>

        <Grid item container flexDirection="column" gap={3}>
          <Grid item container flexWrap={"nowrap"}>
            <Typography
              flex={1}
              sx={{
                color: "#464646",
                fontSize: { md: "2.5rem", xs: "2rem" },
              }}
            >
              {title || ""}
            </Typography>
            {admin ? (
              <>
                <IconButton
                  size="large"
                  edge="start"
                  id="basic-button"
                  aria-controls={open ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                >
                  <MoreVertOutlined />
                </IconButton>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
                  {isLoading && (
                    <MenuItem
                      onClick={handleInteraction}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <ListItemText
                        sx={{ fontSize: "3rem" }}
                        primary={"Loading..."}
                      />
                    </MenuItem>
                  )}
                  <MenuItem
                    onClick={handleInteraction}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <ListItemText
                      sx={{ fontSize: "3rem" }}
                      primary={`${
                        !allow_interaction ? "Allow" : "Disable"
                      } Interaction`}
                    />
                  </MenuItem>

                  <MenuItem
                    onClick={handlePinToTop}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <ListItemText
                      sx={{ fontSize: "3rem" }}
                      primary={`${
                        !pin_to_top ? "Pin to Top" : "Unpin from Top"
                      }`}
                    />
                  </MenuItem>
                  <MenuItem
                    onClick={addToSummary}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <ListItemText
                      sx={{ fontSize: "3rem" }}
                      primary={`${
                        !summary ? "Add to Summary" : "Remove from Summary"
                      }`}
                    />
                  </MenuItem>
                  <MenuItem
                    onClick={handleDeleteLivePost}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <ListItemText
                      sx={{ fontSize: "3rem" }}
                      primary={deleting ? "Deleting..." : "Delete Post"}
                    />
                  </MenuItem>
                  <MenuItem
                    onClick={(e) => {
                      setEditModal(true);
                      handleClose(e);
                    }}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <ListItemText
                      sx={{ fontSize: "3rem" }}
                      primary={"Edit Post"}
                    />
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Typography
                sx={{
                  color: "#464646",
                  fontSize: { md: "2.5rem", xs: "2rem" },
                }}
              >
                Posted : {getTime(createdAt)}
              </Typography>
            )}
          </Grid>
          <img
            src={
              media?.length > 0
                ? getImage(media[0]?.storage_path)
                : images.defaults
            }
            style={{
              objectFit: "contain",
              width: "100%",
              maxWidth: "100%",
              height: "auto",
            }}
            alt={title}
          />
          <Grid
            color="#5F5C5C"
            fontWeight={400}
            fontSize={{ md: "2.4rem", xs: "1.5rem" }}
          >
            {parse(body)}
          </Grid>{" "}
        </Grid>
        <Grid item xs={12} md={7}>
          <Details
            handleLikePost={handleLikePost}
            type={"live"}
            state={state}
            data={post}
            setState={setState}
          />
        </Grid>
        <LiveComment
          // handleShare={handleShare}
          data={post}
          state={state}
          setState={setState}
        />
        {allow_interaction && token ? (
          <Grid
            sx={{
              mt: { md: 3, xs: 1.5 },
            }}
          >
            <Formik
              initialValues={{ comment: "" }}
              onSubmit={handleSubmit}
              validationSchema={validationSchema}
            >
              {({ isSubmitting }) => (
                <Form>
                  {/* <Grid item container sx={{ background: "red" }}> */}
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
                      isSubmitting={isSubmitting}
                    />
                  </Grid>
                </Form>
              )}
            </Formik>
          </Grid>
        ) : (
          <Grid item container>
            <Typography variant="h2">
              Admin has not Allowed interaction on this Post
            </Typography>
          </Grid>
        )}
        {token && viewers?.length > 0 && (
          <Grid item container alignItems="center">
            <Typography
              variant="span"
              color="#FF9B04"
              fontSize={{ md: "1.8rem", xs: "1.5rem", fontWeight: 500 }}
            >
              Viewing this Topic: &nbsp;&nbsp;
            </Typography>
            <Grid item>
              <Grid container>
                {viewers?.slice(0, 50)?.map((item, index) => (
                  <Typography
                    component={Link}
                    to={
                      token ? `/user/profile/?id=${item.viewer?.user_id}` : null
                    }
                    key={index}
                    sx={{ width: "max-content", mr: 0.5 }}
                    color="secondary"
                    fontSize={{ md: "1.8rem", xs: "1.5rem", fontWeight: 500 }}
                  >
                    {item.viewer.full_name},
                  </Typography>
                ))}
                {viewers.length > 50 ? (
                  <Typography
                    variant="span"
                    color="#FF9B04"
                    fontSize={{ md: "1.8rem", xs: "1.5rem", fontWeight: 500 }}
                  >
                    {`and ${viewers.length - 50}  guests`}
                  </Typography>
                ) : null}
              </Grid>
            </Grid>
          </Grid>
        )}
      </Grid>
      <CreatePost
        open={editModal}
        handleClose={() => setEditModal(false)}
        type={"live"}
        editLive={true}
        initialValues={{
          id,
          text: body,
          title,
          pin_to_top,
          summary,
          allow_interaction,
        }}
      />
    </>
  );
};

export default SingleLivePage;
