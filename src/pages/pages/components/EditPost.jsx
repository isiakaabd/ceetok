import { Grid, Typography } from "@mui/material";

import { toast } from "react-toastify";
import { useEditCommentMutation } from "redux/slices/commentSlice";
import NotificationModal from "components/modals/NotificationModal";
import { Formik, Form } from "formik/dist";
import Editor from "components/Quill";
import { CustomButton } from "components";

export default function EditModal({ open, item, handleClose, type }) {
  const [editComment] = useEditCommentMutation();
  const handleSubmit = async (values) => {
    const { id } = item;
    const { edit } = values;

    if (type === "quotes") {
      const { data, error } = await editComment({
        comment: edit,
        id,
      });
      if (data) toast.success(data);
      if (error) toast.error(error);
      setTimeout(() => handleClose(), 3000);
    } else {
      const { data, error } = await editComment({
        comment: edit,
        id: item?.id,
      });
      setTimeout(() => handleClose(), 500);
      if (data) toast.success(data);
      if (error) toast.error(error);
    }
  };
  return (
    <NotificationModal isOpen={open} handleClose={handleClose}>
      <Grid item container>
        <Typography
          sx={{ mb: 2, textAlign: "center", width: "100%" }}
          variant="h2"
        >
          {`Edit ${
            type === "quotes" ? "Quote" : "comments" ? "Comment" : "Post"
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
                    upload_id={"upload_id"}
                  />
                  {/* </Grid> */}
                  <CustomButton
                    title={`Edit ${
                      type === "quotes"
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
