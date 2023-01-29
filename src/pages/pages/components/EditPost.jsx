import { Grid, Typography } from "@mui/material";

import { toast } from "react-toastify";
import {
  useDeleteCommentMutation,
  useEditCommentMutation,
  useGetPostCommentsQuery,
} from "redux/slices/commentSlice";
// import { Comment } from "./components/PostComment";
// import SocialMedia from "components/modals/SocialMedia";
// import { useUserProfileQuery } from "redux/slices/authSlice";
import { getAgo, link } from "helpers";
import NotificationModal from "components/modals/NotificationModal";
import { Formik, Form } from "formik/dist";
import Editor from "components/Quil";
import { CustomButton } from "components";

export default function EditModal({ open, item, handleClose }) {
  const [editComment, { isLoading: loading }] = useEditCommentMutation();
  console.log(item);
  const handleSubmit = async (values) => {
    const { edit } = values;
    const { data, error } = await editComment({
      comment: edit,
      id: item?.id,
    });
    setTimeout(() => handleClose(), 500);
    if (data) toast.success(data);
    if (error) toast.error(error);
  };
  return (
    <NotificationModal isOpen={open} handleClose={handleClose}>
      <Grid item container>
        <Typography
          sx={{ mb: 2, textAlign: "center", width: "100%" }}
          variant="h2"
        >
          Edit Comment
        </Typography>
        <Formik
          onSubmit={handleSubmit}
          enableReinitialize
          initialValues={{ edit: item?.comment }}
        >
          {({ initialValues }) => {
            return (
              <Form>
                <Grid item container flexDirection={"column"} gap={2}>
                  {/* <Grid item container> */}
                  <Editor name="edit" value={initialValues.edit} />
                  {/* </Grid> */}
                  <CustomButton
                    title={"Edit Post"}
                    type="submit"
                    isSubmitting={loading}
                  />
                </Grid>
              </Form>
            );
          }}
        </Formik>
      </Grid>
    </NotificationModal>
  );
}
