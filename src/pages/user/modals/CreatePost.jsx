import { Typography, Grid, Button } from "@mui/material";
import { CustomButton } from "components";
import Editor from "components/Quill";
import NotificationModal from "components/modals/NotificationModal";
import { Formik, Form } from "formik/dist";
import "react-quill/dist/quill.snow.css";
import * as Yup from "yup";
import FormikControl from "validation/FormikControl";
import {
  useCreatePostMutation,
  useEditAPostMutation,
  useGetCategoriesQuery,
} from "redux/slices/postSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  useCreateAnnoucementMutation,
  useEditAnnoucementMutation,
} from "redux/slices/annoucementSlice";
import PaymentModal from "components/modals/PaymentModal";
import { useSelector } from "react-redux";
import {
  useEditLivePostMutation,
  useLivePostMutation,
} from "redux/slices/adminSlice";

const validation = Yup.object({
  title: Yup.string("Enter Title").required("Required"),
  category: Yup.string("Enter Category").required("Required"),
  text: Yup.string("Enter Category").required("Required"),
  // acceptTerm: Yup.boolean(),
});
const annoucementValidation = Yup.object({
  title: Yup.string("Enter Title").required("Required"),
  duration: Yup.string("Enter Duration").required("Required"),
  text: Yup.string("Enter Content").required("Required"),
});
const LiveValidation = Yup.object({
  title: Yup.string("Enter Title").required("Required"),
  text: Yup.string("Enter Content").required("Required"),
});
const CreatePost = ({
  open,
  handleClose,
  type,
  initialValues,
  heading,
  postHeading,
  uploadType,
  data,
  editLive,
  editPostId,
  editPostBool,
}) => {
  const [create] = useCreatePostMutation();
  const [livePost] = useLivePostMutation();
  const admin = useSelector((state) => state.auth.admin);
  const handleCreateOpen = () => setCreateAnnoucement(true);
  const [openCreateAnnoucement, setCreateAnnoucement] = useState(false);
  const handleCreateAnnoucementClose = () => setCreateAnnoucement(false);
  const [editLivePost] = useEditLivePostMutation();
  const [editPost] = useEditAPostMutation();
  const [createAnnouncement, { data: annoucementData }] =
    useCreateAnnoucementMutation();
  const [editAnnoucement] = useEditAnnoucementMutation();
  const navigate = useNavigate();
  const editState = {
    title: data?.title,
    category: data?.category,
    text: data?.body,
  };

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
      onSubmitProps.setFieldValue("text", "");
      navigate("/");
    }
    if (error) {
      toast.error(error);
    }
  };
  const [categories, setCategories] = useState([]);
  const { data: dt, isLoading: categoryLoading } = useGetCategoriesQuery();
  useEffect(() => {
    if (dt) {
      const cats = dt?.map((category) => {
        return {
          label: category.name,
          value: category.slug,
        };
      });
      setCategories(cats);
    }
  }, [dt]);
  // if (categoryLoading) return <Skeleton />;
  const handleCreateAnnoucement = async (values, onSubmitProps) => {
    const { title, text, duration, post_id } = values;
    if (post_id) {
      const { data, error } = await createAnnouncement({
        title,
        duration,
        body: text,
        post_id,
      });
      if (data) {
        toast.success(data.message);
        onSubmitProps.resetForm();
        onSubmitProps.setFieldValue("text", "");
        setTimeout(() => handleClose(), 2000);
        setTimeout(() => handleCreateOpen(), 4000);
      }
      if (error) toast.error(error);
    } else {
      const { data, error } = await createAnnouncement({
        title,
        duration,
        body: text,
      });
      if (data) {
        toast.success(
          "your announcement has been submitted... Please proceed to payment"
        );
        onSubmitProps.resetForm();
        onSubmitProps.setFieldValue("text", "");
        setTimeout(() => handleClose(), 2000);
        setTimeout(() => handleCreateOpen(), 4000);
      }
      if (error) toast.error(error);
    }
  };
  const handEditAnnoucement = async (values, { resetForm, setFieldValue }) => {
    const { id } = initialValues;
    const { title, text } = values;
    const body = {
      id,
      title,
      body: text,
    };
    const { data, error } = await editAnnoucement(body);
    if (data) {
      resetForm();
      toast.success(data);
      setFieldValue("text", "");
      setTimeout(() => handleClose(), 3000);
    }
    if (error) toast.success(error);
  };

  const handleCreatePost = async (values, onSubmitProps) => {
    const { title, category, text, post_id } = values;
    if (post_id) {
      const { data, error } = await create({
        title,
        category,
        body: text,
        post_id,
      });
      if (error) toast.error(error);
      if (data) {
        toast.success(data);
        onSubmitProps.resetForm();
        setTimeout(() => handleClose(), 3000);
      }
    } else {
      const { data, error } = await create({
        title,
        category,
        body: text,
      });
      if (error) toast.error(error);
      if (data) {
        toast.success(data);
        onSubmitProps.resetForm();
        setTimeout(() => handleClose(), 3000);
      }
    }
  };
  const initialValue = {
    title: "",
    category: admin && type === "trending" ? "trending" : "",
    text: "",
    post_id: "",
    acceptTerm: false,
    summary: false,
    allow_interaction: false,
    pin_to_top: false,
  };

  const handleCreateLivePost = async (values, { resetForm }) => {
    const { title, text, summary, post_id, allow_interaction, pin_to_top } =
      values;
    if (post_id) {
      const { data, error } = await livePost({
        title,
        body: text,
        summary,
        id: post_id,
        allow_interaction,
        pin_to_top,
      });
      if (data) {
        toast.success(data);
        resetForm();
        setTimeout(() => handleClose(), 3000);
      }
      if (error) toast.error(error);
    } else {
      const { data, error } = await livePost({
        title,
        body: text,
        summary,
        allow_interaction,
        pin_to_top,
      });
      if (data) {
        toast.success(data);
        resetForm();
        setTimeout(() => handleClose(), 3000);
      }
      if (error) toast.error(error);
    }
  };
  const handleEditLivePost = async (values, { resetForm }) => {
    const { title, text, summary, id, allow_interaction, pin_to_top } = values;
    const { data, error } = await editLivePost({
      title,
      body: text,
      id,
      summary,
      allow_interaction,
      pin_to_top,
    });
    if (data) {
      toast.success(data);
      resetForm();
      setTimeout(() => handleClose(), 3000);
    }
    if (error) toast.error(error);
  };
  return (
    <>
      <NotificationModal
        isOpen={open}
        handleClose={handleClose}
        heading={heading}
      >
        <Grid item container gap={2}>
          <Grid item container flexDirection="column">
            <Typography
              color="#464646"
              sx={{
                textAlign: "center",
                fontSize: { md: "2rem", xs: "1.7rem" },
              }}
              fontWeight={700}
            >
              {type === "edit"
                ? "Edit Post"
                : type === "live"
                ? "Live Post"
                : postHeading
                ? postHeading
                : "Create Post"}
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
            validationSchema={
              postHeading
                ? annoucementValidation
                : type === "live"
                ? LiveValidation
                : validation
            }
            onSubmit={
              type === "annoucement"
                ? handEditAnnoucement
                : type === "live" && !editLive
                ? handleCreateLivePost
                : type === "live" && editLive
                ? handleEditLivePost
                : type === "edit"
                ? handleEditPost
                : postHeading
                ? handleCreateAnnoucement
                : handleCreatePost
            }
            initialValues={
              type === "annoucement"
                ? initialValues
                : type === "edit"
                ? editState
                : initialValues
                ? initialValues
                : initialValue
            }
          >
            {({ initialValues, isSubmitting, values }) => {
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
                        maxlength="180"
                        helperTextColor="red"
                        helperText={
                          values.title.length >= 180
                            ? "Max length of 180 characters"
                            : null
                        }
                      />
                    </Grid>
                    <Grid item container>
                      {postHeading ? (
                        <FormikControl
                          control="input"
                          name="duration"
                          disabled={type === "annoucement"}
                          placeholder="Duration should be in days"
                        />
                      ) : (
                        type !== "live" && (
                          <FormikControl
                            control="select"
                            name="category"
                            placeholder="Category"
                            defaultValue={
                              admin && type === "trending" && "trending"
                            }
                            options={
                              categoryLoading
                                ? [{ label: "Loading", value: "" }]
                                : [
                                    ...categories,
                                    admin && {
                                      label: "Trending",
                                      value: "trending",
                                    },
                                    admin && {
                                      label: "Live",
                                      value: "live",
                                    },
                                    admin && {
                                      label: "Front Page",
                                      value: "front_page",
                                    },
                                  ]
                            }
                          />
                        )
                      )}
                    </Grid>

                    <Editor
                      theme="snow"
                      name="text"
                      placeholder="write something..."
                      value={initialValues.text}
                      upload_id={"post_id"}
                      type={
                        uploadType === "annoucement"
                          ? "announcements"
                          : type === "live"
                          ? "live"
                          : "posts"
                      }
                      editPost={editPostBool}
                      editPostId={editPostId}
                    />
                    {type === "live" && (
                      <Grid
                        item
                        container
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Grid item>
                          <FormikControl
                            control="switch"
                            name="summary"
                            label="Summary"
                          />
                        </Grid>

                        <Grid item>
                          <FormikControl
                            control="switch"
                            name="allow_interaction"
                            label="Allow Interaction"
                          />
                        </Grid>
                        <Grid item>
                          <FormikControl
                            control="switch"
                            name="pin_to_top"
                            label="Pin To Top"
                          />
                        </Grid>
                      </Grid>
                    )}
                    <Typography
                      fontSize={{ md: "1.3rem", xs: ".9rem", fontWeight: 400 }}
                      color="#9B9A9A"
                    >
                      Please be mindful Ceetok Content Policy and practice good
                      communication
                    </Typography>
                    <Grid item container>
                      <FormikControl
                        control="checkbox"
                        name="acceptTerm"
                        label=" Get reply, likes, tag, follow and comments notification"
                      />
                    </Grid>
                    <Grid
                      item
                      container
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Button
                        disableElevation
                        disableFocusRipple
                        disableRipple
                        variant="outlined"
                        sx={{
                          color: "#9B9A9A",
                          fontSize: "1.2rem",
                          fontWeight: 700,
                          padding: "1rem 2rem",
                          borderRadius: "3rem",
                        }}
                        onClick={handleClose}
                      >
                        Cancel
                      </Button>
                      <CustomButton
                        isSubmitting={isSubmitting}
                        title={
                          type !== "edit"
                            ? " Post"
                            : type === "annoucement"
                            ? "Edit"
                            : "Update"
                        }
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
      <PaymentModal
        open={openCreateAnnoucement}
        handleClose={handleCreateAnnoucementClose}
        data={annoucementData?.body?.announcement}
      />
    </>
  );
};

export default CreatePost;
