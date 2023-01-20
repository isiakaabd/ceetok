import { Typography, Grid, Button, Checkbox } from "@mui/material";
import { CustomButton } from "components";
import Editor from "components/Quil";
import NotificationModal from "components/modals/NotificationModal";
import { Formik, Form } from "formik/dist";
import "react-quill/dist/quill.snow.css";
import * as Yup from "yup";
import FormikControl from "validation/FormikControl";

import { TextError } from "validation/TextError";
import {
  useCreatePostMutation,
  useEditAPostMutation,
  useGetCategoriesQuery,
} from "redux/slices/postSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const validation = Yup.object({
  title: Yup.string("Enter Title").required("Required"),
  category: Yup.string("Enter Category")
    // .mi?xed()
    // .oneOf([d
    //   "entertainment",
    //   "politics",
    //   "crimes",
    //   "romance",
    //   "education",
    //   "technology",
    //   "celebrities",
    //   "fashion",
    //   "health",
    //   "travel",
    //   "crypto",
    //   "religion",
    //   "sports",
    //   "jobs",
    //   "tv",
    //   "science",
    //   "business",
    //   "jokes",
    // ])
    .required("Required"),
  text: Yup.string("Enter Category").required("Required"),
  // name: Yup.string("Enter Your name").required("Name is ").trim(),
});
const CreatePost = ({
  open,
  handleClose,
  type,
  initialValues,
  heading,
  data,
}) => {
  const [create] = useCreatePostMutation();
  const [editPost] = useEditAPostMutation();
  const navigate = useNavigate();
  // const { id, title, category, body } = data;
  const editState = {
    title: data?.title,
    category: data?.category,
    text: data?.body,
  };
  // console.log(data.body);
  const handleEditPost = async (values, onSubmitProps) => {
    const { title, category, text } = values;
    const details = {
      title,
      category,
      body: text,
      id: data?.id,
    };
    const { data: dt, error } = await editPost(details);

    if (dt) {
      toast.success(dt);
      setTimeout(() => handleClose(), 3000);
      onSubmitProps.resetForm();
      navigate("/");
    }
    if (error) {
      toast.error(error);
    }
  };
  const [categories, setCategories] = useState([]);
  const { data: dt } = useGetCategoriesQuery();
  useEffect(() => {
    const cats = dt?.map((category) => {
      return {
        label: category.name,
        value: category.slug,
      };
    });
    setCategories(cats);
  }, [dt]);
  const handleCreatePost = async (values, onSubmitProps) => {
    const { title, category, text } = values;
    const { data, error } = await create({ title, category, body: text });
    if (error) toast.error(error);
    if (data) {
      toast.success(data);
      onSubmitProps.resetForm();
      setTimeout(() => handleClose(), 3000);
    }
  };
  const initialValue = { title: "", category: "", text: "" };
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
            {type === "edit" ? "Edit Post" : "Create Post"}
          </Typography>
          <Typography
            sx={{
              textAlign: "center",
              fontSize: { md: "1.7rem", xs: "1.5rem" },
            }}
          >
            You are creating a post. The label to trending post is interesting
            content and a descriptive titlesss
          </Typography>
        </Grid>

        <Formik
          validationSchema={validation}
          onSubmit={type === "edit" ? handleEditPost : handleCreatePost}
          initialValues={
            type === "edit"
              ? editState
              : initialValues
              ? initialValues
              : initialValue
          }
        >
          {({ initialValues, isSubmitting }) => {
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
                      control="select"
                      name="category"
                      placeholder="Category"
                      options={categories}
                    />
                  </Grid>

                  <Editor
                    theme="snow"
                    name="text"
                    placeholder="write something..."
                    value={initialValues.text}
                  />

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
                    <CustomButton
                      isSubmitting={isSubmitting}
                      title={type !== "edit" ? " Post" : "Update"}
                      type="submit"
                    />
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
