import { Button, Grid, Skeleton, Typography } from "@mui/material";
import { Formik, Form } from "formik/dist";
import FormikControl from "validation/FormikControl";
import { styled } from "@mui/material/styles";
import { CustomButton } from "components";
import { useGetUserSettingsQuery } from "redux/slices/authSlice";
const Privacy = (props) => {
  const CustomSubTypography = styled(({ text, ...rest }) => (
    <Typography {...rest}>{text}</Typography>
  ))(({ theme }) => ({
    fontSize: "2.2rem",
    fontWeight: 600,
    color: "#5F5C5C",
    // textAlign: "center",
  }));
  const { data: user, isLoading: loading } = useGetUserSettingsQuery();

  if (loading) return <Skeleton />;
  return (
    <Grid item container>
      <Grid item md={10} xs={12} sx={{ p: { md: 3, xs: 1 } }}>
        <Formik
          initialValues={{
            subscriberRequest: user[8]?.value || "",
            contactInfo: user[9]?.value,
            avatar: user[10]?.value,
            activities: user[11]?.value,
            photos: user[12]?.value,
            videos: user[13]?.value,
          }}
        >
          {({ values }) => {
            return (
              <Form style={{ width: "100%" }}>
                <Grid item container gap={2} sx={{ p: { md: 3, xs: 1 } }}>
                  <Grid item container flexDirection={{ md: "row", xs: "row" }}>
                    <Grid item md={3} xs={12}>
                      <CustomSubTypography
                        fontSize={{ xs: "1.4rem" }}
                        text="Subscriber Request"
                      />
                    </Grid>
                    <Grid item xs={12} md={8}>
                      <Grid item container>
                        <FormikControl
                          control="switch"
                          label={
                            values.subscriberRequest ? "Turn Off" : "Turn On"
                          }
                          name="subscriberRequest"
                        />
                      </Grid>
                      <Typography textAlign="justify">
                        Auto-accept subscriber requests from other members to
                        subscribe to profile updates.
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid item container>
                    <Grid item md={3} xs={12}>
                      <CustomSubTypography
                        text="Profile"
                        fontSize={{ xs: "1.4rem" }}
                      />
                    </Grid>
                    <Grid item xs={12} md={8}>
                      <Typography textAlign="justify">
                        Customize who can see and comment on things you started,
                        replied, followed and following under your profile.
                      </Typography>
                      <Grid item md={6} xs={12} sx={{ mt: 2 }}>
                        <Grid item container gap={2}>
                          <Grid
                            container
                            justifyContent={"space-between"}
                            gap={2}
                          >
                            <Grid item>
                              <CustomSubTypography
                                text="Contact Info"
                                fontSize={{ xs: "1.4rem" }}
                              />
                            </Grid>
                            <Grid item xs={6}>
                              <Grid container>
                                <FormikControl
                                  name="contactInfo"
                                  options={[
                                    { label: "No One", value: "none" },

                                    {
                                      label: user[9]?.value,
                                      value: user[9]?.value,
                                    },
                                  ]}
                                  control="select"
                                />
                              </Grid>
                            </Grid>
                          </Grid>
                          {/*  Avatar*/}
                          <Grid container justifyContent={"space-between"}>
                            <Grid item>
                              <CustomSubTypography
                                text="Avatar"
                                fontSize={{ xs: "1.4rem" }}
                              />
                            </Grid>
                            <Grid item xs={6}>
                              <Grid container>
                                <FormikControl
                                  name="avatar"
                                  options={[
                                    { label: "No One", value: "none" },

                                    {
                                      label: user[10]?.value,
                                      value: user[10]?.value,
                                    },
                                  ]}
                                  control="select"
                                />
                              </Grid>
                            </Grid>
                          </Grid>
                          {/* activities */}
                          <Grid container justifyContent={"space-between"}>
                            <Grid item>
                              <CustomSubTypography
                                text="Activities"
                                fontSize={{ xs: "1.4rem" }}
                              />
                            </Grid>
                            <Grid item xs={6}>
                              <Grid container>
                                <FormikControl
                                  name="activities"
                                  options={[
                                    { label: "No One", value: "none" },

                                    {
                                      label: user[11]?.value,
                                      value: user[11]?.value,
                                    },
                                  ]}
                                  control="select"
                                />
                              </Grid>
                            </Grid>
                          </Grid>
                          {/* <Grid
                            container
                            justifyContent={"space-between"}
                        
                          >
                            <Grid item>
                              <CustomSubTypography
                                text="Visitor Messages"
                                fontSize={{ xs: "1.4rem" }}
                              />
                            </Grid>
                            <Grid item xs={6}>
                              <Grid container>
                                <FormikControl
                                  name="activities"
                                  options={[]}
                                  placeholder="Visitor Messages"
                                  control="select"
                                />
                              </Grid>
                            </Grid>
                          </Grid> */}
                          {/* <Grid
                            container
                            justifyContent={"space-between"}
                         
                          >
                            <Grid item>
                              <CustomSubTypography
                                text="Subscribed"
                                fontSize={{ xs: "1.4rem" }}
                              />
                            </Grid>
                            <Grid item xs={6}>
                              <Grid container>
                                <FormikControl
                                  name="activities"
                                  options={[]}
                                  control="select"
                                  placeholder="Subscribed"
                                />
                              </Grid>
                            </Grid>
                          </Grid> */}
                          {/* <Grid
                            container
                            justifyContent={"space-between"}
                            alignItems="center"
                          >
                            <Grid item>
                              <CustomSubTypography
                                text="Subscribers"
                                fontSize={{ xs: "1.4rem" }}
                              />
                            </Grid>
                            <Grid item xs={6}>
                              <Grid container>
                                <FormikControl
                                  name="subscribers"
                                  options={[]}
                                  placeholder="Subscribers"
                                  control="select"
                                />
                              </Grid>
                            </Grid>
                          </Grid> */}
                          <Grid container justifyContent={"space-between"}>
                            <Grid item>
                              <CustomSubTypography
                                text="Photos"
                                fontSize={{ xs: "1.4rem" }}
                              />
                            </Grid>
                            <Grid item xs={6}>
                              <Grid container>
                                <FormikControl
                                  name="photos"
                                  options={[
                                    { label: "No One", value: "none" },

                                    {
                                      label: user[12]?.value,
                                      value: user[12]?.value,
                                    },
                                  ]}
                                  control="select"
                                />
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid container justifyContent={"space-between"}>
                            <Grid item>
                              <CustomSubTypography
                                text="Videos"
                                fontSize={{ xs: "1.4rem" }}
                              />
                            </Grid>
                            <Grid item xs={6}>
                              <Grid container>
                                <FormikControl
                                  name="videos"
                                  options={[
                                    { label: "No One", value: "none" },

                                    {
                                      label: user[13]?.value,
                                      value: user[13]?.value,
                                    },
                                  ]}
                                  control="select"
                                />
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid
                    item
                    container
                    flexWrap="nowrap"
                    gap={2}
                    justifyContent={{ md: "flex-start", xs: "space-between" }}
                  >
                    <CustomButton title={"Save"} />
                    <Button
                      variant="outlined"
                      sx={{
                        padding: "1rem 4em",
                        fontSize: "1.6rem",
                        borderRadius: "5rem",
                        fontWeight: 700,
                      }}
                      color="success"
                    >
                      Reset
                    </Button>
                  </Grid>
                </Grid>
              </Form>
            );
          }}
        </Formik>
      </Grid>
    </Grid>
  );
};

Privacy.propTypes = {};

export default Privacy;
