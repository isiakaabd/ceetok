import { Grid, Typography } from "@mui/material";

import { toast } from "react-toastify";
import { useEditCommentMutation } from "redux/slices/commentSlice";
import NotificationModal from "components/modals/NotificationModal";
import { Formik, Form } from "formik/dist";
import Editor from "components/Quil";
import { CustomButton } from "components";
import { useEditQuoteMutation } from "redux/slices/quoteSlice";

export default function EditModal({ open, item, handleClose, type }) {
  const [editComment] = useEditCommentMutation();
  const [editQuote] = useEditQuoteMutation();
  const handleSubmit = async (values) => {
    const { id } = item;
    const { edit } = values;

    if (type === "quote") {
      const { data, error } = await editQuote({
        body: edit,
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
          {`Edit ${type === "quote" ? "Quote" : "Comment"}`}
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
                  <Editor name="edit" value={initialValues.edit} />
                  {/* </Grid> */}
                  <CustomButton
                    title={"Edit Post"}
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
