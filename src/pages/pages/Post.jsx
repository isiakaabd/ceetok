import {
  ArrowBackOutlined,
  FavoriteBorderOutlined,
  Favorite,
  IosShareOutlined,
  ChatBubbleOutline,
} from "@mui/icons-material";
// import parse from "html-react-parser";
import { Button, Grid, IconButton, Typography, Skeleton } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Formik, Form } from "formik/dist";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Editor from "components/Quill";
import { CustomButton } from "components";
import OtherConversation from "./components/OtherConversation";
import NotificationModal from "components/modals/NotificationModal";
import { useGetAPostQuery } from "redux/slices/postSlice";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { usePostCommentMutation } from "redux/slices/commentSlice";
import { Comment } from "./components/PostComment";
import SocialMedia from "components/modals/SocialMedia";
import Quotes from "assets/svgs/Quote";
import Error from "./components/Error";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import Seo from "components/Seo";
import { CreateQuoteModal } from "./components/SingleComment";

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
  const { quotes_count, comments_count, likes_count } = data;
  const [quote] = usePostCommentMutation();

  const [openQuoteModal, setOpenQuoteModal] = useState(false);
  const handleSubmit = async (values) => {
    await quote({
      parent_type: type === "live" ? "live" : "comments",
      parent_id: data?.id,
      comment: values.comment,
    });
  };

  const validationSchema = Yup.object({
    comment: Yup.string("Enter Comment").required("Required"),
  });

  const baseUrl = process.env.REACT_APP_LIVE_LINK;
  const dataVal = {
    text: `${baseUrl}/post/${data?.slug}`,
    title: "Link",
  };
  // console.log(data);

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
            text={comments_count}
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
            text={likes_count}
          />
          <StyledButton
            onClick={() => setOpenQuoteModal(true)}
            Icon={<Quotes style={{ color: !state ? "#0f0" : "#5F5C5C" }} />}
            text={quotes_count}
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
      <SocialMedia
        open={open}
        copyText={dataVal}
        userId={data?.user_id}
        handleClose={() => setOpen(false)}
      />
      <CreateQuoteModal
        open={openQuoteModal}
        handleClose={(e) => setOpenQuoteModal(false)}
        item={data}
        type="posts"
      />
    </>
  );
};
const Post = () => {
  const { postId } = useParams();
  const [state, setState] = useState(true);
  const [page, setPage] = useState(0);
  const token = useSelector((state) => state.auth.token);
  const { data, isLoading, error } = useGetAPostQuery(postId);
  const [viewers, setViewers] = useState([]);
  const [guestViewersCount, setGuestViewersCount] = useState(0);
  const [memberViewers, setMemberViewers] = useState([]);
  const [postAComment, { isLoading: loading, error: errs, data: dts }] =
    usePostCommentMutation();

  useEffect(() => {
    let interval = setInterval(async () => {
      if (data.id) {
        try {
          let request = await fetch(`${process.env.REACT_APP_BASE_URL}/view/live-views?parent_type=posts&parent_id=${data.id}`)
          let response = await request.json();
          setViewers(response.body.views);
        } catch (error) {
          console.error(error);
        }
      }
    }, 10000);
    return () => { clearInterval(interval); }

  }, [data]);

  useEffect(()=>{
    let guestCount = 0;
    let members = [];
    for(let i = 0; i < viewers.length; i++){
      if(viewers[i].viewer.full_name){
        members.push(viewers[i]);
      }else{
        guestCount += 1;
      }
    }

    setGuestViewersCount(guestCount);
    setMemberViewers([...members]);

  }, [viewers]);

  const validationSchema = Yup.object({
    comment: Yup.string().required("Enter your Comment"),
  });

  const navigate = useNavigate();

  const [openShareModal, setOpenShareModal] = useState(false);
  const [changeCommentState, setChangeCommentState] = useState(true);
  useEffect(() => {
    if (dts) {
      toast.success(dts);
    } else if (errs) {
      toast.error(errs || "something went wrong, try again...");
    }
  }, [errs, dts]);
  if (isLoading) return <Skeletons />;
  if (error) return <Error />;
  const { recent_views, user_id, slug, body, category, user, title, media } =
    data;

  const handleShare = () => setOpenShareModal(true);

  const handleSubmit = async (values, onSubmitProps) => {
    const { upload_id, comment } = values;
    const { id } = data;

    if (upload_id) {
      await postAComment({
        parent_id: id,
        parent_type: "posts",
        comment,
        id: upload_id,
      });
    } else {
      await postAComment({
        parent_id: id,
        parent_type: "posts",
        comment,
      });
    }

    onSubmitProps.resetForm();
  };
  const baseUrl = process.env.REACT_APP_LIVE_LINK;
  const dataVal = {
    text: `${baseUrl}/post/${slug}`,
    title: "Link",
  };

  // const viewers = recent_views?.filter((value) => value.viewer !== "guest");

  const tempElement = document.createElement("div");
  tempElement.innerHTML = body;
  return (
    <>
      <Seo
        title={title}
        image={media[0]?.storage_path}
        name={user?.full_name}
        description={tempElement?.textContent}
        type={category}
      />
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
                Other Conversations
              </Button>
            </Grid>
            {state ? (
              <Comment
                handleShare={handleShare}
                data={data}
                state={changeCommentState}
                setState={setChangeCommentState}
                page={page}
                setPage={setPage}
              />
            ) : (
              <OtherConversation />
            )}
          </Grid>
          {state && token && (
            <Grid
              item
              md={7}
              xs={12}
              sx={{
                mt: { md: 3, xs: 1.5 },
                paddingInline: { xs: "1rem" },
              }}
            >
              <Formik
                initialValues={{ comment: "", upload_id: "" }}
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
              >
                <Form>
                  {/* <Grid item container sx={{ background: "red" }}> */}
                  <Editor
                    theme="snow"
                    name="comment"
                    value={""}
                    type={"comments"}
                    upload_id={"upload_id"}
                    placeholder="Make a comment..."
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
          {viewers.length > 0 ? (
            <Grid item md={7} xs={12}>
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
                    {viewers?.slice(0, 50).map((item, index) => (
                      <Typography
                        component={Link}
                        to={`/user/profile/?id=${item.viewer?.id}`}
                        key={index}
                        sx={{ width: "max-content", mr: 0.5 }}
                        color="secondary"
                        fontSize={{
                          md: "1.8rem",
                          xs: "1.5rem",
                          fontWeight: 500,
                        }}
                      >
                        {item.viewer.full_name},
                      </Typography>
                    ))}

                    {viewers?.length > 50 ? (
                      <Typography
                        variant="span"
                        color="#FF9B04"
                        fontSize={{
                          md: "1.8rem",
                          xs: "1.5rem",
                          fontWeight: 500,
                        }}
                      >
                        {`and ${viewers - 50}  guests`}
                      </Typography>
                    ) : null}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          ) : null}
        </Grid>
      </Grid>
      <SocialMedia
        open={openShareModal}
        handleClose={() => setOpenShareModal(false)}
        copyText={dataVal}
        userId={user_id}
        data={data}
      />
    </>
  );
};
function Skeletons() {
  return (
    <Grid
      sx={{ px: 2, py: 4, margin: "auto" }}
      item
      flexDirection={"column"}
      container
      gap={2}
      md={10}
      xs={12}
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
