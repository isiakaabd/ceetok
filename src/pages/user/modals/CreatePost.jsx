import { Typography, Grid, Button, Checkbox } from "@mui/material";
import { CustomButton } from "components";
import Editor from "components/Quil";
import NotificationModal from "components/modals/NotificationModal";
import { Formik, Form } from "formik/dist";
import "react-quill/dist/quill.snow.css";
import * as Yup from "yup";
import FormikControl from "validation/FormikControl";

import { TextError } from "validation/TextError";
import { useCreatePostMutation } from "redux/slices/postSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const validation = Yup.object({
  title: Yup.string("Enter Title").required("Required"),
  category: Yup.string("Enter Category")
    // .mi?xed()
    // .oneOf([
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
const CreatePost = ({ open, handleClose, heading }) => {
  const [create, { isLoading }] = useCreatePostMutation();
  const navigate = useNavigate();

  const handleCreatePost = async (values, onSubmitProps) => {
    const { title, category, text } = values;
    const { data, error } = await create({ title, category, body: text });
    if (error) toast.error(error);
    if (data) {
      toast.success(data);
      onSubmitProps.resetForm();
      setTimeout(() => handleClose(), 3000);
      navigate("/");
    }
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
            You are creating a post. The label to trending post is interesting
            content and a descriptive titlesss
          </Typography>
        </Grid>

        <Formik
          validationSchema={validation}
          onSubmit={handleCreatePost}
          initialValues={{ title: "", category: "", text: "" }}
        >
          {({ errors }) => {
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
                      options={[
                        { label: "entertainment", value: "entertainment" },
                        { label: "politics", value: "politics" },
                        { label: "crimes", value: "crimes" },
                        { label: "romance", value: "romance" },
                        { label: "education", value: "education" },
                        { label: "technology", value: "technology" },
                        { label: "celebrities", value: "celebrities" },
                        { label: "fashion", value: "fashion" },
                        { label: "health", value: "health" },
                        { label: "travel", value: "travel" },
                        { label: "crypto", value: "crypto" },
                        { label: "religion", value: "religion" },
                        { label: "sports", value: "sports" },
                        { label: "jobs", value: "jobs" },
                        { label: "tv", value: "tv" },
                        { label: "science", value: "science" },
                        { label: "business", value: "business" },
                        { label: "jokes", value: "jokes" },
                      ]}
                    />
                  </Grid>

                  <Editor
                    theme="snow"
                    name="text"
                    placeholder="write something..."
                  />

                  {errors.text && <TextError>{errors.text}</TextError>}
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
                      isSubmitting={isLoading}
                      title=" Post"
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
