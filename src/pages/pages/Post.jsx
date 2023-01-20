import {
  ArrowBackOutlined,
  FavoriteBorderOutlined,
  Favorite,
  FilterList,
  IosShareOutlined,
  MoreVertOutlined,
  Instagram,
  ReplyOutlined,
  ReportOutlined,
  SearchOutlined,
  TuneOutlined,
} from "@mui/icons-material";
import parse from "html-react-parser";
import {
  Avatar,
  Button,
  Divider,
  Grid,
  Paper,
  MenuItem,
  Grow,
  IconButton,
  Popper,
  ClickAwayListener,
  Menu,
  MenuList,
  Typography,
  Skeleton,
  ButtonBase,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Formik, Form } from "formik/dist";
import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import FormikControl from "validation/FormikControl";
import UserProfile from "./UserProfile";
import images from "assets";
import Editor from "components/Quil";
import { CustomButton } from "components";
import OtherConversation from "./components/OtherConversation";
import NotificationModal from "components/modals/NotificationModal";
import Facebook from "assets/svgs/FacebookIcon";
import Messenger from "assets/svgs/Messenger";
import Twitter from "assets/svgs/Twitter";
import WhatsApp from "assets/svgs/WhatsApp";
import Copy from "assets/svgs/Copy";
import Save from "assets/svgs/Save";
import Share from "assets/svgs/Share";
import Mail from "assets/svgs/Mail";
import {
  useGetAPostQuery,
  useDeleteAPostMutation,
  useLikeAndUnlikePostMutation,
  useGetLikesQuery,
} from "redux/slices/postSlice";
import Loader from "components/Loader";

import { toast } from "react-toastify";
import * as Yup from "yup";
import CreatePost from "pages/user/modals/CreatePost";
import {
  useGetPostCommentsQuery,
  usePostCommentMutation,
} from "redux/slices/commentSlice";
import { getDate, getTime } from "helpers";
import DeleteIcon from "assets/svgs/DeleteIcon";
import { Comment } from "./components/PostComment";

const socialItems = [
  {
    link: "",
    Icon: Facebook,
  },
  {
    link: "",
    Icon: Instagram,
  },
  {
    link: "",
    Icon: Twitter,
  },
  {
    link: "",
    Icon: WhatsApp,
  },
  {
    link: "",
    Icon: Messenger,
  },
];

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
      "&:hover": {
        cursor: "pointer",
      },
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
export const Details = ({ handleShare, data }) => {
  const [likeState, setLikeState] = useState(false);
  const [likePost] = useLikeAndUnlikePostMutation();
  const { data: numberOfLikes } = useGetLikesQuery({
    type: "posts",
    parentId: data?.id,
  });

  const handleLikePost = async () => {
    await likePost({
      parent_type: "posts",
      parent_id: data?.id,
    });
    setLikeState(!likeState);
  };
  return (
    <Grid item container justifyContent="space-between" flexWrap="nowrap">
      <Grid item container flexWrap="nowrap" justifyContent={"space-between"}>
        <StyledButton text="Reply" Icon={<ReplyOutlined />} />
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
  );
};
const Post = () => {
  const { postId } = useParams();
  const [state, setState] = useState(true);
  const { data, isLoading, error } = useGetAPostQuery(postId);
  const validationSchema = Yup.object({
    comment: Yup.string().required("Enter your Comment"),
  });

  const [postAComment, { isLoading: loading }] = usePostCommentMutation();
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
    console.log(data);
  };
  if (isLoading) return <Skeleton animation="wave" height="100vh" />;
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
              {({ errors, initialValues, values }) => {
                console.log(values.comment);
                return (
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
                );
              }}
            </Formik>
          </Grid>
          <Grid
            item
            container
            sx={{ mt: 2, paddingInline: { xs: "3rem", md: "6rem" } }}
          >
            <Typography
              variant="span"
              color="#FF9B04"
              fontSize={{ md: "1.8rem", xs: "1.5rem", fontWeight: 500 }}
            >
              Viewing this Topic
            </Typography>
            <Grid item>
              <Grid container>
                {Array(20)
                  .fill("Adekunle107")
                  .map((item, index) => (
                    <Typography
                      component={Link}
                      to={`/${index}`}
                      key={index}
                      sx={{ width: "max-content", mr: 0.5 }}
                      color="secondary"
                      fontSize={{ md: "1.8rem", xs: "1.5rem", fontWeight: 500 }}
                    >
                      {item}
                    </Typography>
                  ))}

                <Typography
                  variant="span"
                  color="#FF9B04"
                  fontSize={{ md: "1.8rem", xs: "1.5rem", fontWeight: 500 }}
                >
                  and 102 guests
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <NotificationModal
        isOpen={openShareModal}
        heading="Share Topic"
        width={{ md: "30vw", xs: "90vw", sm: "30vw" }}
        handleClose={() => setOpenShareModal(false)}
      >
        <Grid item container gap={2} flexDirection="column" sx={{ mt: 1 }}>
          <Grid item>
            <IconButton>
              <Mail sx={{ fontSize: "4rem", color: "#5F5C5C" }} />
            </IconButton>
            <Typography variant="span" fontSize="1.2rem" fontWeight={400}>
              Send Direct Message
            </Typography>
          </Grid>

          <Grid item container justifyContent="space-between">
            <Grid item>
              <IconButton sx={{ border: "1px solid #5F5C5C" }}>
                <Save sx={{ fontSize: "2.5rem" }} />
              </IconButton>
              <Typography
                textAlign="center"
                sx={{ fontSize: "1.1rem", fontWeight: 400 }}
              >
                Save
              </Typography>
            </Grid>
            <Grid item>
              <IconButton sx={{ border: "1px solid #5F5C5C" }}>
                <Copy sx={{ fontSize: "2.5rem" }} />
              </IconButton>
              <Typography
                textAlign="center"
                sx={{ fontSize: "1.1rem", fontWeight: 400 }}
              >
                Copy Link
              </Typography>
            </Grid>
            <Grid item>
              <IconButton sx={{ border: "1px solid #5F5C5C" }}>
                <Share sx={{ fontSize: "2.5rem" }} />
              </IconButton>
              <Typography
                textAlign="center"
                sx={{ fontSize: "1.1rem", fontWeight: 400 }}
              >
                Share Via
              </Typography>
            </Grid>
          </Grid>
          <Divider
            variant="middle"
            // sx={{ width: "100%", m: 0, borderWidth: "1.2px" }}
          />
          <Grid
            item
            container
            justifyContent="space-between"
            alignItems="center"
          >
            {socialItems.map((social, index) => (
              <IconButton key={index}>
                <social.Icon sx={{ fontSize: "3rem" }} />
              </IconButton>
            ))}
          </Grid>
        </Grid>
      </NotificationModal>
    </>
  );
};

export default Post;
