import { Typography, Grid, Button, Checkbox } from "@mui/material";
import { CustomButton } from "components";
import Editor from "components/Quil";
import { Formik, Form, FieldArray } from "formik/dist";
import "react-quill/dist/quill.snow.css";
import * as Yup from "yup";
import FormikControl from "validation/FormikControl";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "redux/reducers/postReducer";
import { TextError } from "validation/TextError";
import { useCreateAdsMutation } from "redux/slices/adsSlice";
import { toast } from "react-toastify";
import PaymentModal from "components/modals/PaymentModal";
import { useState } from "react";

const CreateAdvert = ({ handleClose, title }) => {
  const validation = Yup.object({
    title: Yup.string("Enter Title").required("Required"),
    format: Yup.string("Enter Format").required("Required"),
    duration: Yup.string("Enter duration").required("Required"),
    files: Yup.mixed().required("File is required"),
    actions: Yup.array()
      .of(
        Yup.object().shape({
          value: Yup.string("Enter Value").required("Required"),
          name: Yup.string("Enter name").required("Required"),
        })
      )
      .required("Must have action")
      .min(1, "Minimum of 1 action"),
  });
  // const dispatch = useDispatch();
  // const token = useSelector((state) => state.auth.token);
  const [paymentModal, setPaymentModal] = useState(false);
  const [createAds, { isLoading, data }] = useCreateAdsMutation();
  const handleCreateAdvert = async (values) => {
    const { title, actions, files, duration, format } = values;
    const form = new FormData();
    const body = {
      title,
      files: files[0],
      format,
      duration,
      actions,
    };
    // const actn = actions.map((i) => JSON.stringify(i));
    // console.log(actn, 1233);
    form.append("title", title);
    form.append("format", format);
    form.append("duration", duration);

    if (files.length === 1) {
      form.append("ad_assets", files[0]);
    } else {
      for (let i = 0; i < files.length; i++) {
        form.append("ad_assets", files[i]);
      }
    }
    actions.forEach((item, index) => {
      form.append(`actions[${[index]}][name]`, item.name);
    });
    actions.forEach((item, index) => {
      form.append(`actions[${[index]}][value]`, item.value);
    });
    console.log(form);

    const { data, error } = await createAds(form);

    if (data?.message) {
      toast.success(data.message);
      setTimeout(() => setPaymentModal(true), 3000);
    }
    if (error) toast.error(error || "Something went wrong..");
    // dispatch(createPost(values));
  };

  return (
    <>
      <Grid item container>
        <Grid item md={5} xs={12} sm={8} sx={{ marginInline: "auto", p: 2 }}>
          <Grid item container gap={2}>
            <Grid item container flexDirection="column">
              <Typography
                sx={{
                  color: "#5F5C5C",
                  textAlign: "center",
                  fontSize: { md: "2rem", xs: "1.7rem" },
                }}
                fontWeight={700}
              >
                Place Advert
              </Typography>
            </Grid>

            <Formik
              validationSchema={validation}
              onSubmit={handleCreateAdvert}
              initialValues={{
                title: "",
                format: "",
                files: "",
                duration: "",
                multiple: false,

                actions: [{ name: "", value: "" }],
              }}
            >
              {({ values, handleChange, errors }) => {
                return (
                  <Form style={{ width: "100%" }}>
                    <Grid item container gap={2}>
                      <Grid item container gap={2} flexWrap="nowrap">
                        <Typography
                          sx={{
                            color: "#9B9A9A",
                            fontWeight: 700,
                            fontSize: { md: "2.2rem", xs: "1rem" },
                          }}
                        >
                          Create New Advert
                        </Typography>
                        <Typography
                          sx={{
                            color: "#9B9A9A",
                            fontWeight: 700,
                            fontSize: { md: "2.2rem", xs: "1rem" },
                          }}
                        >
                          Use Existing Advert
                        </Typography>
                      </Grid>

                      <Grid>
                        <Typography>Format</Typography>
                        <Typography>
                          Choose how you’d like your advert to look
                        </Typography>
                      </Grid>
                      <Grid item container sx={{ mb: 2 }}>
                        <FormikControl
                          name="format"
                          placeholder="Choose how your advert look like"
                          options={[
                            {
                              label: "Single Image",
                              value: "single",
                            },
                            {
                              value: "carousel",
                              label: "Carousel",
                            },
                            {
                              value: "video",
                              label: "Single Video",
                            },
                          ]}
                          control="select"
                        />
                      </Grid>
                      <Grid
                        item
                        container
                        gap={2}
                        flexWrap="nowrap"
                        sx={{ mb: 2 }}
                      >
                        <Grid item xs={6}>
                          <FormikControl
                            placeholder="Title"
                            control="input"
                            name="title"
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <FormikControl
                            placeholder="Duration"
                            control="input"
                            name="duration"
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid
                      item
                      sx={{ mb: 2 }}
                      container
                      gap={2}
                      flexDirection="column"
                    >
                      <Typography>Upload</Typography>
                      <FormikControl
                        control="file"
                        name="files"
                        multiple={values.format === "carousel" && true}
                      />
                    </Grid>
                    <Grid
                      item
                      container
                      flexDirection="column"
                      gap={2}
                      sx={{ mb: 2 }}
                    >
                      <Grid item container>
                        <FieldArray
                          name="actions"
                          render={(arrayHelpers) => (
                            <Grid item container gap={2} flexDirection="column">
                              <Grid item container flexWrap={"nowrap"}>
                                <Typography sx={{ flex: 1 }}>
                                  Advert Action
                                </Typography>

                                <Grid item>
                                  <CustomButton
                                    type="button"
                                    sx={{
                                      borderRadius: "1rem",
                                      maxWidth: "10rem",
                                      height: "3rem",
                                      fontSize: { md: "2rem", xs: "1.5rem" },
                                    }}
                                    onClick={() =>
                                      arrayHelpers.push({
                                        name: "",
                                        value: "",
                                      })
                                    }
                                    title={"+"}
                                  />
                                </Grid>
                              </Grid>

                              <Grid item container gap={2}>
                                {values.actions.map((action, index) => (
                                  <Grid
                                    item
                                    container
                                    alignItems={"center"}
                                    flexWrap="nowrap"
                                    gap={{ xs: 1, sm: 2 }}
                                  >
                                    {/** both these conventions do the same */}
                                    <Grid item md={6} xs={12}>
                                      <Grid container>
                                        <FormikControl
                                          control={"select"}
                                          name={`actions[${index}].name`}
                                          placeholder="Select Advert Action"
                                          options={[
                                            {
                                              label: "Direct Message",
                                              value: "direct_message",
                                            },
                                            {
                                              label: "Chat Via WhatsApp",
                                              value: "whatsapp",
                                            },
                                            {
                                              label: "Goto Website",
                                              value: "website",
                                            },
                                            {
                                              label: "Email",
                                              value: "email",
                                            },
                                          ]}
                                        />
                                      </Grid>
                                    </Grid>
                                    <Grid item md={6} xs={12}>
                                      <Grid container>
                                        <FormikControl
                                          placeholder="Action Value"
                                          name={`actions[${index}].value`}
                                        />
                                      </Grid>
                                    </Grid>
                                    <Grid item md={3} xs={4}>
                                      <CustomButton
                                        type="button"
                                        sx={{
                                          borderRadius: "1rem",
                                          width: "100%",
                                          backgroundColor: "#FF9B04",
                                          height: "3rem",
                                          fontSize: {
                                            md: "2rem",
                                            xs: "1.5rem",
                                          },
                                        }}
                                        onClick={() =>
                                          arrayHelpers.remove(index)
                                        }
                                        title={"-"}
                                      />
                                    </Grid>
                                  </Grid>
                                ))}
                              </Grid>
                            </Grid>
                          )}
                        />
                      </Grid>
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
                        isSubmitting={isLoading}
                        type="submit"
                      />
                    </Grid>
                  </Form>
                );
              }}
            </Formik>
          </Grid>
        </Grid>
      </Grid>
      <PaymentModal
        open={paymentModal}
        handleClose={() => {
          setPaymentModal(false);
          handleClose();
        }}
        type="ads"
        data={data?.body?.payment}
        duration={data?.body?.duration}
      />
    </>
  );
};

export default CreateAdvert;
