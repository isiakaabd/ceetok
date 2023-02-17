import { Button, Grid, IconButton, Skeleton, Typography } from "@mui/material";
import ArrowBack from "assets/svgs/ArrowBack";
import { getImage, getTime } from "helpers";
// import { Comment } from "./components/PostComment";
import { Comment } from "pages/pages/components/PostComment";
import parse from "html-react-parser";
import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useGetLivePostQuery } from "redux/slices/adminSlice";
import images from "assets";
import { CustomButton } from "components";
import Editor from "components/Quil";
import { Form, Formik } from "formik/dist";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { usePostCommentMutation } from "redux/slices/commentSlice";
import { useCreateQuoteMutation } from "redux/slices/quoteSlice";

const validationSchema = Yup.object({
  comment: Yup.string().trim().required("Enter your Comment"),
});

const SingleLivePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [changeCommentState, setChangeCommentState] = useState(true);
  const [postAComment] = usePostCommentMutation();
  const [createQuote] = useCreateQuoteMutation();
  const { data: post, isLoading: loading } = useGetLivePostQuery(id);
  console.log(post);
  const [openShareModal, setOpenShareModal] = useState(false);
  const handleShare = () => setOpenShareModal(true);
  if (loading) return <Skeleton />;

  const handleSubmit = async (values, onSubmitProps) => {
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
  const { title, media, createdAt, body, recent_views: views } = post;
  return (
    <Grid
      container
      item
      flexDirection="column"
      gap={3}
      sx={{
        p: { md: "4rem", xs: "1rem" },
        background: "#E5E5E5",
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
            {title}
          </Typography>
          <Typography
            sx={{
              color: "#464646",
              fontSize: { md: "2.5rem", xs: "2rem" },
            }}
          >
            Posted : {getTime(createdAt)}
          </Typography>
        </Grid>
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
      </Grid>

      {/* <Comment
        handleShare={handleShare}
        data={post}
        state={changeCommentState}
        setState={setChangeCommentState}
      /> */}
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
  );
};

export default SingleLivePage;
