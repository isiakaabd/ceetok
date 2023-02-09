import {
  FavoriteBorderOutlined,
  Favorite,
  IosShareOutlined,
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
  List,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Formik, Form } from "formik/dist";
import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import images from "assets";
import Editor from "components/Quil";
import { CustomButton } from "components";

import {
  useLikeAndUnlikePostMutation,
  useGetViewsQuery,
} from "redux/slices/postSlice";

import { toast } from "react-toastify";
import * as Yup from "yup";
import { usePostCommentMutation } from "redux/slices/commentSlice";

import {
  useGetAnnoucementQuery,
  useGetAnnoucementsQuery,
} from "redux/slices/annoucementSlice";
import ArrowBack from "assets/svgs/ArrowBack";
import { getImage } from "helpers";
import {
  useFollowUserMutation,
  useUserProfileQuery,
} from "redux/slices/authSlice";
import SingleComment from "./components/SingleComment";

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
const Details = ({ handleShare, data }) => {
  const liked = Boolean(data?.liked);

  const [likeAnnoucement] = useLikeAndUnlikePostMutation();

  const handleLikePost = async () => {
    await likeAnnoucement({
      parent_type: "announcements",
      parent_id: data?.id,
    });
  };

  return (
    <Grid item container justifyContent="space-between" flexWrap="nowrap">
      <Grid item container flexWrap="nowrap" justifyContent={"space-between"}>
        <StyledButton text="Reply" Icon={<ReplyOutlined />} />
        <StyledButton
          onClick={handleLikePost}
          color={liked ? "#f00" : ""}
          Icon={
            liked ? (
              <Favorite sx={{ fill: "#f00" }} />
            ) : (
              <FavoriteBorderOutlined />
            )
          }
          text={data?.likes_count}
        />

        <StyledButton text="Share" Icon={<IosShareOutlined />} />
        <StyledButton text="Report" Icon={<ReportOutlined />} />
      </Grid>
    </Grid>
  );
};
const SingleAnnoucement = () => {
  const { id } = useParams();

  const { data, isLoading, error } = useGetAnnoucementQuery({ id });
  const validationSchema = Yup.object({
    comment: Yup.string().required("Enter your Comment"),
  });

  const [postAComment, { isLoading: loading }] = usePostCommentMutation();
  const [page] = useState(0);
  const { data: annoucements, isLoading: annoucementLoading } =
    useGetAnnoucementsQuery({ page });

  const [followOrUnfollow] = useFollowUserMutation();
  const { data: views } = useGetViewsQuery({
    type: "announcements",
    parentId: data?.id,
  });

  // const [openShareModal, setOpenShareModal] = useState(false);
  // const handleShare = () => setOpenShareModal(true);

  const navigate = useNavigate();
  const { data: profile } = useUserProfileQuery();
  if (isLoading || annoucementLoading)
    return <Skeleton animation="wave" height="12rem" width="100%" />;
  if (error) return <p>Soemthing went wrong...</p>;
  const {
    body,
    media,
    title,
    id: parent_id,
    user_id,
    recent_comments,
    followed,
    user: { avatar, full_name, username },
  } = data;
  const handleFollow = async () => {
    const { data, error } = await followOrUnfollow({
      user_id,
    });
    if (data) toast.success(data);
    if (error) toast.success(error);
  };
  const handleSubmit = async (values, onSubmitProps) => {
    const { data: dt, error } = await postAComment({
      parent_id,
      parent_type: "announcements",
      comment: values.comment,
    });
    if (dt) {
      toast.success(dt);
      // quill.setContents([{ insert: "\n" }]);
      onSubmitProps.resetForm();
    }
    if (error) {
      toast.error(error);
    }
  };

  return (
    <>
      {/* <Grid item container gap={2} flexWrap="nowrap">
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
    
        </Grid>
      </Grid>
      <SocialMedia
        open={openShareModal}
        handleClose={() => setOpenShareModal(false)}
      /> */}

      <Grid
        item
        container
        gap={2}
        flexWrap={{ md: "nowrap", xs: "wrap" }}
        sx={{
          px: { xs: "1rem", md: "4rem" },
          background: "#E5E5E5",
          py: 4,
        }}
      >
        <Grid
          item
          md={10}
          xs={12}
          sx={{
            p: { md: 4, xs: 2 },
            background: "#fff",
            borderRadius: "2rem 2rem 0 0",
          }}
        >
          <Grid container item flexDirection="column" gap={3}>
            <Grid item container>
              <IconButton onClick={() => navigate(-1)}>
                <ArrowBack sx={{ fontSize: "3rem" }} />
              </IconButton>
            </Grid>

            <Grid item>
              <Grid item container gap={2} flexWrap="nowrap">
                <Avatar alt={full_name} src={getImage(avatar)}>
                  {full_name?.slice(0, 1)?.toUpperCase()}
                </Avatar>
                <Grid item container flexDirection="column">
                  <Typography
                    sx={{
                      color: "#5F5C5C",
                      fontWeight: 700,
                      fontSize: { md: "2rem", xs: "1.5rem" },
                    }}
                  >
                    {full_name || "No Name Yet"}
                  </Typography>
                  <Typography
                    sx={{
                      color: "#9B9A9A",
                      fontWeight: 500,
                      fontSize: { md: "1.8rem", xs: "1.2rem" },
                    }}
                  >
                    @{username || "No Username yet"}
                  </Typography>
                  <CustomButton
                    borderRadius={"0px"}
                    title={followed ? "Unfollow" : "Follow"}
                    width="8rem"
                    sx={{ fontWeight: 400 }}
                    height="3rem"
                    onClick={handleFollow}
                    // width={"max-content"}
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid item container flexDirection="column" gap={3}>
              <Typography
                sx={{
                  color: "#464646",
                  fontSize: { md: "2.5rem", xs: "2rem" },
                }}
              >
                {title}
              </Typography>
              <img
                src={
                  media?.length > 0
                    ? getImage(media[0]?.storage_path)
                    : images.adeleke
                }
                style={{
                  objectFit: "cover",
                  width: "100%",
                  height: "60rem",
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
              <Grid item container>
                <Details data={data} />
              </Grid>
              <Divider sx={{ my: 4 }} />
            </Grid>
          </Grid>
          <Grid
            item
            container
            sx={{
              maxHeight: { xs: "70rem" },
              overflowY: "scroll",
              "&::-webkit-scrollbar": {
                width: ".85rem",
                display: "none",
              },
            }}
          >
            <Typography
              color="secondary"
              fontSize={{ md: "3rem", xs: "2rem" }}
              fontWeight={700}
            >
              Comments
            </Typography>
            {recent_comments?.length > 0 ? (
              <List sx={{ width: "100%" }} dense>
                {recent_comments?.map((item) => (
                  <SingleComment
                    // icons={icons}
                    key={item.id}
                    item={item}
                    type="annoucements"
                    profile={profile}
                  />
                ))}
              </List>
            ) : (
              <Grid item container>
                <Typography>No comments available</Typography>
              </Grid>
            )}
          </Grid>
          <Grid
            sx={{
              mt: { md: 3, xs: 1.5 },
              // paddingInline: { xs: "1rem", md: "4rem" },
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
            sx={{ mt: 2, paddingInline: { xs: "3rem", md: "6rem" } }}
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
                    {" "}
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
        <Grid item xs={3} sx={{ display: { xs: "none", md: "block" } }}>
          <Grid item container gap={2}>
            <Grid container item>
              <Grid container item>
                <CustomButton
                  borderRadius={"0px"}
                  width="100%"
                  sx={{ px: "1.6em", backgroundColor: "#FF9B04" }}
                  title={"People also Viewed"}
                />
              </Grid>
            </Grid>

            {annoucements?.announcements?.length > 0 ? (
              <Grid item container gap={2}>
                {annoucements?.announcements
                  ?.slice(0, 5)
                  ?.map((item, index) => {
                    const { media, body } = item;
                    return (
                      <Grid
                        item
                        container
                        key={index}
                        flexWrap="nowrap"
                        sx={{
                          borderRadius: "1.2rem",
                        }}
                      >
                        <Grid
                          item
                          container
                          // gap={2}
                          sx={{
                            padding: "2rem",
                            border: "1px solid #9B9A9A",
                            borderRadius: "1.2rem",
                            flexDirection: "column",
                          }}
                        >
                          <Grid item>
                            <img
                              src={
                                media?.length > 0
                                  ? getImage(media[0]?.storage_path)
                                  : images.davido
                              }
                              // src={item.media>0? getImage() images.davido}
                              style={{ width: "100%", height: "100%" }}
                              alt="davido"
                            />
                          </Grid>
                          <Grid item sx={{ mt: 2 }}>
                            <Typography
                              sx={{
                                color:
                                  //  !approved ?
                                  "#464646",
                                //  : "#fff",
                                fontSize: "1.3rem",
                                fontWeight: 700,
                                // overflow: "hiddem",
                                // whiteSpace: "nowrap",
                                // textOverflow: "ellipsis",
                              }}
                            >
                              {parse(body)}
                            </Typography>
                          </Grid>
                          <Details data={item} />
                        </Grid>
                      </Grid>
                    );
                  })}
              </Grid>
            ) : (
              <Typography>No Annoucement Yet</Typography>
            )}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default SingleAnnoucement;
