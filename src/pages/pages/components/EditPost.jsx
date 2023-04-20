import { Grid, Typography } from "@mui/material";

import { toast } from "react-toastify";
import { useEditCommentMutation } from "redux/slices/commentSlice";
import NotificationModal from "components/modals/NotificationModal";
import { Formik, Form } from "formik/dist";
import Editor from "components/Quill";
import { CustomButton } from "components";

export default function EditModal({
  open,
  item,
  handleClose,
  type,
  types,
  editPostBool,
  editPostId,
}) {
  const [editComment] = useEditCommentMutation();
  const handleSubmit = async (values) => {
    const { id } = item;
    const { edit } = values;

    const { data, error } = await editComment({
      comment: edit,
      id,
    });
    if (data) toast.success(data);
    if (error) toast.error(error);
    setTimeout(() => handleClose(), 3000);
  };
  return (
    <NotificationModal isOpen={open} handleClose={handleClose}>
      <Grid item container>
        <Typography
          sx={{ mb: 2, textAlign: "center", width: "100%" }}
          variant="h2"
        >
          {`Edit ${
            types === "quotes" ? "Quote" : "comments" ? "Comment" : "Post"
          }`}
        </Typography>
        <Formik
          onSubmit={handleSubmit}
          enableReinitialize
          initialValues={{ edit: item?.comment || item?.body }}
        >
          {({ initialValues, isSubmitting }) => {
            return (
              <Form>
                <Grid item container flexDirection={"column"} gap={2}>
                  {/* <Grid item container> */}
                  <Editor
                    name="edit"
                    value={initialValues.edit}
                    type={type}
                    upload_id={"post_id"}
                    editPost={editPostBool}
                    editPostId={editPostId}
                  />
                  {/* </Grid> */}
                  <CustomButton
                    title={`Edit ${
                      types === "quotes"
                        ? "Quote"
                        : "comments"
                        ? "Comment"
                        : "Post"
                    }`}
                    type="submit"
                    isSubmitting={isSubmitting}
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
