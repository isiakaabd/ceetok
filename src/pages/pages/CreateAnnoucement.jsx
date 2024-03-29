import { Typography, Grid } from "@mui/material";
import { CustomButton } from "components";

import { Formik, Form } from "formik/dist";
import { useState } from "react";
import "react-quill/dist/quill.snow.css";
import * as Yup from "yup";
import { TextError } from "validation/TextError";
import NotificationModal from "components/modals/NotificationModal";
import DiscreteSliderMarks from "components/modals/LinearProgress";
import ChipItems from "components/ChipItems";
import PaymentModal from "components/modals/PaymentModal";

const CreateAnnoucement = ({ handleClose, open, title, data }) => {
  //   const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const handleCloseModal = () => setOpenModal(false);
  const handleOpenModal = () => setOpenModal(true);

  const [state, setState] = useState({});
  const handleSubmit = (values) => {
    handleOpenModal();
    setState(values);
  };
  const arr = [
    "1 week",
    "2 Weeks",
    "1 Month",
    "3 Months",
    "6 Months",
    "Custom",
  ];
  const validationSchema = Yup.object({
    slide: Yup.string("Select Budget").required("Required"),
    annoucement: Yup.array().min(1, "At least 1").required("Required"),
  });
  return (
    <>
      {/* <Grid item container>
        <Grid item md={5} xs={12} sm={8} sx={{ marginInline: "auto", p: 2 }}>
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
                Create Annoucement
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
                        name={"text"}
                        value={values.text}
                        handleChange={handleChange("text")}
                        placeholder="write something..."
                      />

                      {errors.text && <TextError>{errors.text}</TextError>}
                      <Typography
                        fontSize={{
                          md: "1.3rem",
                          xs: ".9rem",
                          fontWeight: 400,
                        }}
                        color="#9B9A9A"
                      >
                        Please be mindful Ceetok Content Policy and practice
                        good communication
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
                          fontSize={{
                            md: "1.3rem",
                            xs: ".9rem",
                            fontWeight: 500,
                          }}
                        >
                          Get reply, likes, tag, follow and comments
                          notification
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
                          variant="contained"
                          title="Post"
                          type="submit"
                        />
                      </Grid>
                    </Grid>
                  </Form>
                );
              }}
            </Formik>
          </Grid>
        </Grid>
      </Grid> */}
      <NotificationModal
        isOpen={open}
        handleClose={handleClose}
        width={{ md: "30vw", xs: "95vw" }}
        // height={{ md: "100%", xs: "auto" }}
      >
        <Formik
          initialValues={{
            slide: "",
            annoucement: [],
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, errors }) => {
            return (
              <Form>
                <Grid item container sx={{ height: "100%" }}>
                  <Grid item flexDirection={"column"} sx={{ height: "100%" }}>
                    <Grid
                      item
                      container
                      flexDirection={"column"}
                      //   sx={{ p: 1, height: "100%", background: "red", overflowY: "hidden" }}
                    >
                      <Typography
                        color="secondary"
                        fontWeight={700}
                        fontSize={{ md: "1.9rem", xs: "1.5rem" }}
                      >
                        Schedule and Budget
                      </Typography>
                      <Typography
                        fontSize={{ md: "1.6rem", xs: "1.3rem" }}
                        color="#5F5C5C"
                      >
                        Choose duration of Announcement
                      </Typography>
                      <Grid item xs={12}>
                        <Grid
                          item
                          container
                          gap={3}
                          sx={{ mt: 3 }}
                          justifyContent="space-between"
                        >
                          {arr.map((item, index) => (
                            <ChipItems
                              item={item}
                              key={index}
                              backgroundColor="#FF9B04"
                              borderColor="#5F5C5C"
                              color="#5F5C5C"
                            />
                          ))}
                        </Grid>
                        <Grid item sx={{ mt: 1 }}>
                          {errors && (
                            <TextError>{errors.annoucement}</TextError>
                          )}
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid
                      item
                      container
                      sx={{ mt: 3 }}
                      flexDirection={"column"}
                    >
                      <Typography
                        colorr="#5F5C5C"
                        sx={{ fontSize: { md: "1.6rem", xs: "1.3rem" } }}
                      >
                        Budget
                      </Typography>
                      <DiscreteSliderMarks name="slide" />
                    </Grid>
                    <Grid item container flexDirection={"column"}>
                      <Typography
                        sx={{ my: 4, fontSize: { md: "1.7rem", xs: "1.4rem" } }}
                        fontWeight={700}
                        color="#9B9A9A"
                      >
                        Privacy Policy & Completion
                      </Typography>
                      <Typography sx={{ fontWeight: 600, color: "#5F5C5C" }}>
                        By clicking on “Proceed to Payment” you agree to our
                        terms of{" "}
                        <Typography variant="span" color="#37D42A">
                          service{" "}
                        </Typography>
                        and{" "}
                        <Typography variant="span" color="#37D42A">
                          privacy policy
                        </Typography>
                      </Typography>
                    </Grid>
                    <Grid item container sx={{ mt: 2 }}>
                      <CustomButton
                        title={"Proceed to Payment"}
                        width="22rem"
                        type="submit"
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Form>
            );
          }}
        </Formik>
      </NotificationModal>

      <PaymentModal
        open={openModal}
        handleClose={handleCloseModal}
        state={state}
      />
    </>
  );
};

export default CreateAnnoucement;
