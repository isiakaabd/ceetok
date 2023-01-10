import { Typography, Grid, Button, Checkbox } from "@mui/material";
import { CustomButton } from "components";
import Editor from "components/Quil";
import NotificationModal from "components/modals/NotificationModal";
import { Formik, Form } from "formik/dist";
import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import * as Yup from "yup";
import FormikControl from "validation/FormikControl";
import { useDispatch } from "react-redux";
import { createPost } from "redux/slices/postSlice";
import { TextError } from "validation/TextError";

const CreatePost = ({ open, handleClose, heading }) => {
  const validation = Yup.object({
    title: Yup.string("Enter Title").required("Required"),
    category: Yup.string("Enter Category").required("Required"),
    text: Yup.string("Enter Category").required("Required"),
    // name: Yup.string("Enter Your name").required("Name is ").trim(),
  });
  const dispatch = useDispatch();

  const handleCreatePost = (values) => {
    // const { title, category, text } = values;
    dispatch(createPost(values));
  };
  return (
    <NotificationModal
      isOpen={open}
      handleClose={handleClose}
      heading={heading}
    >
      <Grid item container gap={2}>
        <Grid item container flexDirection="column">
          <Typography
            color="#464646"
            sx={{ textAlign: "center", fontSize: { md: "2rem", xs: "1.7rem" } }}
            fontWeight={700}
          >
            Create Post
          </Typography>
          <Typography
            sx={{
              textAlign: "center",
              fontSize: { md: "1.7rem", xs: "1.5rem" },
            }}
          >
            You are creating a post. The key to trending post is interesting
            content and a descriptive title
          </Typography>
        </Grid>

        <Formik
          validationSchema={validation}
          onSubmit={handleCreatePost}
          initialValues={{ title: "", category: "", text: "" }}
        >
          {({ values, handleChange, errors }) => {
            return (
              <Form style={{ width: "100%" }}>
                <Grid
                  item
                  container
                  gap={2}
                  flexDirection="column"
                  flexWrap="nowrap"
                >
                  <Grid item container>
                    <FormikControl
                      control="input"
                      name="title"
                      placeholder="Title"
                    />
                  </Grid>
                  <Grid item container>
                    <FormikControl
                      control="input"
                      name="category"
                      placeholder="Category"
                    />
                  </Grid>

                  <Editor
                    theme="snow"
                    value={values.text}
                    handleChange={handleChange("text")}
                    placeholder="write something..."
                  />

                  {errors && <TextError>{errors.text}</TextError>}
                  <Typography
                    fontSize={{ md: "1.3rem", xs: ".9rem", fontWeight: 400 }}
                    color="#9B9A9A"
                  >
                    Please be mindful Ceetok Content Policy and practice good
                    communication
                  </Typography>
                  <Grid
                    item
                    container
                    gap={2}
                    flexWrap="nowrap"
                    alignItems="center"
                  >
                    <Checkbox
                      defaultChecked
                      // fontSize="6rem"
                      sx={{
                        color: "#37D42A",
                        "&.Mui-checked": {
                          color: "#37D42A",
                        },
                      }}
                    />
                    <Typography
                      fontSize={{ md: "1.3rem", xs: ".9rem", fontWeight: 500 }}
                    >
                      Get reply, likes, tag, follow and comments notification
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    container
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Button
                      variant="outlined"
                      sx={{
                        color: "#9B9A9A",
                        border: "2px solid #9B9A9A",
                        fontSize: "1.2rem",
                        fontWeight: 700,
                        padding: ".8rem 2rem",
                        borderRadius: "3rem",
                      }}
                      onClick={handleClose}
                    >
                      Cancel
                    </Button>
                    <CustomButton variant="contained" type="submit">
                      Post
                    </CustomButton>
                  </Grid>
                </Grid>
              </Form>
            );
          }}
        </Formik>
      </Grid>
    </NotificationModal>
  );
};

export default CreatePost;
