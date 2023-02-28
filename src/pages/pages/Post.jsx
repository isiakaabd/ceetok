import {
  ArrowBackOutlined,
  FavoriteBorderOutlined,
  Favorite,
  IosShareOutlined,
  ChatBubbleOutline,
} from "@mui/icons-material";
import { Button, Grid, IconButton, Typography, Skeleton } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Formik, Form } from "formik/dist";
import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Editor from "components/Quil";
import { CustomButton } from "components";
import OtherConversation from "./components/OtherConversation";
import NotificationModal from "components/modals/NotificationModal";
import { useGetAPostQuery, useGetViewsQuery } from "redux/slices/postSlice";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { usePostCommentMutation } from "redux/slices/commentSlice";
import { Comment } from "./components/PostComment";
import SocialMedia from "components/modals/SocialMedia";
import Quotes from "assets/svgs/Quote";
import { useCreateQuoteMutation } from "redux/slices/quoteSlice";
import Error from "./components/Error";

const StyledButton = styled(({ text, state, Icon, color, ...rest }) => (
  <Grid
    item
    container
    alignItems="center"
    flexWrap="nowrap"
    justifyContent="center"
    {...rest}
    sx={{
      color: state ? "#0f0" : color,
      cursor: "pointer",
    }}
  >
    <IconButton edge="start" size="small">
      {Icon}
    </IconButton>
    <Typography
      sx={{
        fontSize: { xs: "2rem" },
        fontWeight: 600,
        color: state ? "#0f0" : "#000",
      }}
    >
      {text}
    </Typography>
  </Grid>
))(({ theme }) => ({
  textTransform: "none",
  fontSize: { md: "2rem", xs: "1.rem" },
  fontWeight: 400,
}));
export const Details = ({
  type,
  state,
  data,
  setOpenComment,
  handleShare,
  setState,
  handleLikePost,
}) => {
  const [open, setOpen] = useState(false);

  const [quote] = usePostCommentMutation();

  const handleSubmit = async (values) => {
    await quote({
      parent_type: type === "live" ? "live" : "comments",
      parent_id: data?.id,
      comment: values.comment,
    });
  };

  const validationSchema = Yup.object({
    comment: Yup.string("Enter Comment").trim().required("Required"),
  });

  return (
    <>
      <Grid item container justifyContent="space-between" flexWrap="nowrap">
        <Grid
          item
          container
          flexWrap="nowrap"
          alignItems="center"
          justifyContent={"space-around"}
        >
          <StyledButton
            text={data?.comments_count}
            // {...de}
            state={state}
            onClick={() =>
              type === "comments"
                ? setOpen(true)
                : type === "posts" || type === "live"
                ? setState(true)
                : null
            }
            Icon={<ChatBubbleOutline sx={{ fill: state && "#0f0" }} />}
          />
          <StyledButton
            onClick={handleLikePost}
            color={Boolean(data?.liked) ? "#f00" : ""}
            Icon={
              Boolean(data?.liked) ? (
                <Favorite sx={{ fill: "#f00" }} />
              ) : (
                <FavoriteBorderOutlined />
              )
            }
            text={data?.likes_count}
          />
          <StyledButton
            onClick={() =>
              type === "posts" || type === "live" ? setState(false) : null
            }
            Icon={<Quotes style={{ color: !state ? "#0f0" : "#5F5C5C" }} />}
            text={data?.quotes_count}
            state={!state}
          />
          <StyledButton
            Icon={<IosShareOutlined />}
            onClick={() => handleShare(true)}
          />
        </Grid>
      </Grid>

      <NotificationModal isOpen={open} handleClose={() => setOpen(false)}>
        <Formik
          initialValues={{ comment: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <Editor name="comment" placeholder={"Enter Comment.."} />

              <Grid item sx={{ mt: 2 }}>
                <CustomButton
                  isSubmitting={isSubmitting}
                  title="Reply"
                  type="submit"
                />
              </Grid>
            </Form>
          )}
        </Formik>
      </NotificationModal>
      <SocialMedia open={open} handleClose={() => setOpen(false)} />
    </>
  );
};
const Post = () => {
  const { postId } = useParams();
  const [state, setState] = useState(true);

  const { data, isLoading, error } = useGetAPostQuery(postId);
  const [postAComment, { isLoading: loading }] = usePostCommentMutation();
  const [createQuote] = useCreateQuoteMutation();

  const validationSchema = Yup.object({
    comment: Yup.string().trim().required("Enter your Comment"),
  });

  const navigate = useNavigate();

  const [openShareModal, setOpenShareModal] = useState(false);
  const [changeCommentState, setChangeCommentState] = useState(true);

  if (isLoading) return <Skeletons />;
  if (error) return <Error />;
  const { views_count, recent_views } = data;
  console.log(recent_views);
  const handleShare = () => setOpenShareModal(true);

  const handleSubmit = async (values, onSubmitProps) => {
    const { id } = data;
    if (changeCommentState) {
      const { data: dt, error } = await postAComment({
        parent_id: id,
        parent_type: "posts",
        comment: values.comment,
      });
      if (dt) {
        toast.success(dt);
        // quill.setContents([{ insert: "\n" }]);
        onSubmitProps.resetForm();
      }
      if (error) {
        toast.error("something went wrong, try again...");
      }
    } else {
      const { data, error } = await createQuote({
        body: values.comment,
        parent_id: id,
        parent_type: "posts",
      });
      if (data) {
        toast.success(data);
        onSubmitProps.resetForm();
      }
      if (error) toast.error(error);
    }
  };
  return (
    <>
      <Grid item container gap={2} flexWrap="nowrap">
        <Grid item xs={1} display={{ md: "block", xs: "none" }}>
          <Grid container justifyContent="center">
            <IconButton onClick={() => navigate(-1)}>
              <ArrowBackOutlined
                sx={{
                  fontSize: "3rem",
                  background: "#fff",
                  borderRadius: ".5rem",
                  color: "#9B9A9A",
                }}
              />
            </IconButton>
          </Grid>
        </Grid>
        <Grid
          item
          md={10}
          xs={12}
          sx={{
            mb: 8,
            mt: 2,
            pb: 3,
            background: "#fff",
            borderRadius: { md: "2rem", xs: 0 },

            mx: "auto",
          }}
        >
          <Grid item container>
            <Grid
              item
              container
              alignItems="center"
              sx={{ my: 3, paddingInline: { xs: "1rem", md: "4rem" } }}
            >
              <Button
                sx={{
                  mr: 4,
                  border: state ? "1px solid #37D42A" : "none",
                  borderRadius: state ? ".8rem" : "none",
                  color: state ? "#37D42A" : "rgba(55, 212, 42, 0.5)",
                  fontWeight: state ? 700 : 400,
                  ":hover,:focus": {
                    border: state ? "1px solid #37D42A" : "none",
                    background: "transparent",
                  },
                }}
                onClick={() => setState(true)}
                variant="outlined"

                // sx={{color:{state ? "success" : "rgba(55, 212, 42, 0.5)"}}
              >
                COMMENTS
              </Button>
              <Button
                onClick={() => setState(false)}
                sx={{
                  mr: 2,
                  border: !state ? "1px solid #37D42A" : "none",
                  borderRadius: !state ? ".8rem" : "none",
                  fontWeight: !state ? 700 : 400,
                  color: !state ? "#37D42A" : "rgba(55, 212, 42, 0.5)",
                  ":hover,:focus": {
                    border: !state ? "1px solid #37D42A" : "none",
                    background: "transparent",
                  },
                }}
                variant="outlined"
              >
                Other Conversation
              </Button>
            </Grid>
            {state ? (
              <Comment
                handleShare={handleShare}
                data={data}
                state={changeCommentState}
                setState={setChangeCommentState}
              />
            ) : (
              <OtherConversation />
            )}
          </Grid>
          {state && (
            <Grid
              sx={{
                mt: { md: 3, xs: 1.5 },
                paddingInline: { xs: "1rem" },
              }}
            >
              <Formik
                initialValues={{ comment: "" }}
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
              >
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
                      isSubmitting={loading}
                    />
                  </Grid>
                </Form>
              </Formik>
            </Grid>
          )}
          {state && (
            <Grid
              item
              container
              alignItems="center"
              sx={{ paddingInline: { xs: "1rem" } }}
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
                  {recent_views?.slice(0, 50)?.map((item, index) => (
                    <Typography
                      component={Link}
                      to={`/user/profile/?id=${item.viewer?.id}`}
                      key={index}
                      sx={{ width: "max-content", mr: 0.5 }}
                      color="secondary"
                      fontSize={{ md: "1.8rem", xs: "1.5rem", fontWeight: 500 }}
                    >
                      {item.viewer.full_name},
                    </Typography>
                  ))}

                  {views_count?.length > 50 ? (
                    <Typography
                      variant="span"
                      color="#FF9B04"
                      fontSize={{ md: "1.8rem", xs: "1.5rem", fontWeight: 500 }}
                    >
                      {`and ${views_count - 50}  guests`}
                    </Typography>
                  ) : null}
                </Grid>
              </Grid>
            </Grid>
          )}
        </Grid>
      </Grid>
      <SocialMedia
        open={openShareModal}
        handleClose={() => setOpenShareModal(false)}
      />
    </>
  );
};
function Skeletons() {
  return (
    <Grid
      sx={{ px: 2, py: 4 }}
      item
      flexDirection={"column"}
      container
      gap={2}
      overflow={"hidden"}
    >
      <Grid item container alignItems="center" flexWrap="nowrap" gap={4}>
        <Grid item>
          <Skeleton
            sx={{ height: "2.5rem", width: "7rem" }}
            animation="wave"
            variant="rounded"
          />
        </Grid>
        <Grid item>
          <Skeleton
            sx={{ height: "1rem", width: "8rem" }}
            animation="wave"
            variant="text"
          />
        </Grid>
      </Grid>
      <Grid item container>
        <Skeleton
          sx={{ height: "5rem", width: "100%" }}
          animation="wave"
          variant="rounded"
        />
      </Grid>
      <Grid item sx={{ width: "40%" }}>
        <Grid item container flexWrap={"nowrap"} gap={1}>
          <Grid item>
            <Skeleton
              sx={{ height: "5rem", width: "5rem" }}
              animation="wave"
              variant="circular"
            />
          </Grid>
          <Grid item container gap={1} flexDirection={"column"}>
            <Grid item>
              <Skeleton
                sx={{ height: ".9rem", width: "100%" }}
                animation="wave"
                variant="text"
              />
            </Grid>
            <Grid item>
              <Skeleton
                sx={{ height: ".9rem", width: "100%" }}
                animation="wave"
                variant="text"
              />
            </Grid>

            <Grid
              item
              justifyContent="space-between"
              container
              flexWrap="nowrap"
            >
              {Array(3)
                .fill(undefined)
                .map((i, index) => (
                  <Grid item container key={index} flexWrap={"nowrap"}>
                    <Grid item>
                      <Skeleton
                        sx={{ height: ".8rem", width: ".9rem" }}
                        animation="wave"
                        variant="text"
                      />
                    </Grid>
                    <Grid item>
                      <Skeleton
                        sx={{ height: ".8rem", width: ".9rem" }}
                        animation="wave"
                        variant="text"
                      />
                    </Grid>
                  </Grid>
                ))}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item container flexDirection="column">
        <Grid item container justifyContent={"space-between"} flexWrap="nowrap">
          <Grid item>
            <Skeleton
              sx={{ height: "1rem", width: "6rem" }}
              animation="wave"
              variant="text"
            />
          </Grid>
          <Grid item>
            <Skeleton
              sx={{ height: "1rem", width: "6rem" }}
              animation="wave"
              variant="text"
            />
          </Grid>
        </Grid>
        <Grid item container>
          <Skeleton
            sx={{ height: "15rem", width: "100%" }}
            animation="wave"
            variant="rounded"
          />
        </Grid>
      </Grid>

      {/* <Grid item container>
        <Skeleton
          sx={{ height: "4rem", width: "7rem" }}
          animation="wave"
          variant="text"
        />
      </Grid> */}
      <Grid item container flexDirection={"column"}>
        {Array(20)
          .fill(undefined)
          .map((i, index) => (
            <Grid item key={index}>
              <Skeleton
                sx={{ height: ".6rem", width: "100%" }}
                animation="wave"
                variant="text"
              />
            </Grid>
          ))}
      </Grid>
      <Grid item container>
        <Skeleton
          sx={{ height: ".08rem", width: "100%" }}
          animation="wave"
          variant="text"
        />
      </Grid>

      <Grid item container sx={{ width: "90%" }}>
        <Grid item container flexWrap="nowrap" justifyContent="space-around">
          {Array(3)
            .fill(undefined)
            .map((i, index) => (
              <Grid item container gap={0.5} key={index} flexWrap={"nowrap"}>
                <Grid item>
                  <Skeleton
                    sx={{ height: "1.5rem", width: "2rem" }}
                    animation="wave"
                    variant="rectangular"
                  />
                </Grid>
                <Grid item>
                  <Skeleton
                    sx={{ height: "1.5rem", width: "1rem" }}
                    animation="wave"
                    variant="text"
                  />
                </Grid>
              </Grid>
            ))}
        </Grid>
      </Grid>
      <Grid item container gap={2}>
        {Array(5)
          .fill(undefined)
          .map((i, index) => (
            <Grid item container gap={1} key={index} flexWrap={"nowrap"}>
              <Grid item>
                <Skeleton
                  sx={{ height: "5rem", width: "5rem" }}
                  animation="wave"
                  variant="circular"
                />
              </Grid>
              <Grid item container gap={1} flexDirection={"column"}>
                <Grid item>
                  <Skeleton
                    sx={{ height: ".8rem", width: "8rem" }}
                    animation="wave"
                    variant="text"
                  />
                </Grid>
                <Grid item>
                  <Skeleton
                    sx={{ height: ".8rem", width: "25rem" }}
                    animation="wave"
                    variant="text"
                  />
                </Grid>
                <Grid item container gap={1} flexWrap="nowrap">
                  {Array(3)
                    .fill(undefined)
                    .map((i, index) => (
                      <Grid
                        item
                        container
                        alignItems="center"
                        key={index}
                        gap={0.5}
                        flexWrap={"nowrap"}
                      >
                        <Grid item>
                          <Skeleton
                            sx={{ height: "1.5rem", width: "2rem" }}
                            animation="wave"
                            variant="rectangular"
                          />
                        </Grid>
                        <Grid item>
                          <Skeleton
                            sx={{ height: "1.5rem", width: "1rem" }}
                            animation="wave"
                            variant="text"
                          />
                        </Grid>
                      </Grid>
                    ))}
                </Grid>
              </Grid>
            </Grid>
          ))}
      </Grid>

      <Grid container>
        <Skeleton
          sx={{ height: "12rem", width: "100%" }}
          animation="wave"
          variant="rounded"
        />
      </Grid>
    </Grid>
  );
}
export default Post;
