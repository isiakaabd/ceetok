import {
  ArrowBackOutlined,
  FavoriteBorderOutlined,
  Favorite,
  IosShareOutlined,
  Instagram,
  ReplyOutlined,
  ReportOutlined,
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
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Formik, Form } from "formik/dist";
import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Editor from "components/Quil";
import { CustomButton } from "components";
import OtherConversation from "./components/OtherConversation";
import NotificationModal from "components/modals/NotificationModal";
import Facebook from "assets/svgs/FacebookIcon";
import Messenger from "assets/svgs/Messenger";
import Twitter from "assets/svgs/Twitter";
import WhatsApp from "assets/svgs/WhatsApp";

import {
  useGetAPostQuery,
  useLikeAndUnlikePostMutation,
  useGetLikesQuery,
  useGetViewsQuery,
  useAddQuoteMutation,
} from "redux/slices/postSlice";

import { toast } from "react-toastify";
import * as Yup from "yup";
import { usePostCommentMutation } from "redux/slices/commentSlice";
import { Comment } from "./components/PostComment";
import SocialMedia from "components/modals/SocialMedia";
import { useUserProfileQuery } from "redux/slices/authSlice";

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
export const Details = ({ handleShare, type, data, setOpenComment }) => {
  const [likeState, setLikeState] = useState(data?.liked === 1 ? true : false);
  const [likePost] = useLikeAndUnlikePostMutation();
  const [open, setOpen] = useState(false);

  const { data: numberOfLikes } = useGetLikesQuery({
    type: "posts",
    parentId: data?.id,
  });
  // const [anchorEl, setAnchorEl] = React.useState(null);
  // const open = Boolean(anchorEl);
  // const handleClick = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };
  // const handleClose = () => {
  //   setAnchorEl(null);
  // };
  const handleLikePost = async () => {
    const { data: dt } = await likePost({
      parent_type: type ? type : "posts",
      parent_id: data?.id,
    });
    console.log(dt);
    if (dt) setLikeState(!likeState);
  };
  const [quote, { isLoading }] = usePostCommentMutation();
  const { data: dttt } = useGetAPostQuery(
    "304505c29-6170-4ea6-9c01-96b46402835d"
  );

  const handleSubmit = async (values) => {
    const { data: dt, error } = await quote({
      parent_type: "comments",
      parent_id: data?.id,
      comment: values.comment,
    });
    console.log(dt, error);
  };
  // const de = {
  //   id: "basic-button",
  //   ariaControls: open ? "basic-menu" : undefined,
  //   ariaHpopup: "true",
  //   ariaExpanded: open ? "true" : undefined,
  // };
  const validationSchema = Yup.object({
    comment: Yup.string("Enter Comment").required("Required"),
  });
  return (
    <>
      <Grid item container justifyContent="space-between" flexWrap="nowrap">
        <Grid item container flexWrap="nowrap" justifyContent={"space-between"}>
          <StyledButton
            text="Reply"
            // {...de}
            onClick={type === "comments" ? () => setOpen(true) : null}
            Icon={<ReplyOutlined />}
          />
          {/* <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          sx={{ width: "100%" }}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <Grid item xs={4}>
            <Paper>
              <Formik initialValues={{ text: "" }}>
                <Form>
                  <Editor name="text" placeholder="Write comment" />
                </Form>
              </Formik>
            </Paper>
          </Grid>
        </Menu> */}
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
            text="Like"
          />

          <StyledButton text="Share" Icon={<IosShareOutlined />} />
          <StyledButton text="Report" Icon={<ReportOutlined />} />
        </Grid>
      </Grid>

      <NotificationModal isOpen={open} handleClose={() => setOpen(false)}>
        <Formik
          initialValues={{ comment: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <Editor name="comment" placeholder={"Enter Comment.."} />
            <Grid item sx={{ mt: 2 }}>
              <CustomButton
                isSubmitting={isLoading}
                title="Reply"
                type="submit"
              />
            </Grid>
          </Form>
        </Formik>
      </NotificationModal>
    </>
  );
};
const Post = () => {
  const { postId } = useParams();
  const [state, setState] = useState(true);
  const navigate = useNavigate();
  const { data, isLoading, error } = useGetAPostQuery(postId);
  const validationSchema = Yup.object({
    comment: Yup.string().required("Enter your Comment"),
  });

  const [postAComment, { isLoading: loading }] = usePostCommentMutation();
  const { data: views } = useGetViewsQuery({
    type: "posts",
    parentId: data?.id,
  });

  const [openShareModal, setOpenShareModal] = useState(false);
  const handleShare = () => setOpenShareModal(true);

  const handleSubmit = async (values, onSubmitProps) => {
    const { id } = data;
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
  };
  if (isLoading)
    return <Skeleton animation="wave" height="12rem" width="100%" />;
  if (error) return <p>Soemthing went wrong...</p>;
  return (
    <>
      <Grid item container gap={2} flexWrap="nowrap">
        <Grid item xs={1} display={{ md: "block", xs: "none" }}>
          <Grid container justifyContent="center">
            <IconButton>
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
            // m: 2,
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
              <Comment handleShare={handleShare} data={data} />
            ) : (
              <OtherConversation />
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
          <Grid
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

export default Post;
