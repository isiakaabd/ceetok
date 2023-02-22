import { Button, Grid, Skeleton, Typography } from "@mui/material";
import { Formik, Form } from "formik/dist";
import FormikControl from "validation/FormikControl";
import { styled } from "@mui/material/styles";
import { CustomButton } from "components";
import {
  useGetUserSettingsQuery,
  useUpdateUserSettingsMutation,
} from "redux/slices/authSlice";
import { toast } from "react-toastify";
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
  const [updateProfile, { isLoading }] = useUpdateUserSettingsMutation();

  if (loading) return <Skeleton />;
  const {
    subscriber_request,
    allow_to_view_photos,
    allow_to_view_activities,
    allow_to_view_avatar,
    allow_to_view_videos,
    allow_to_view_contact,
  } = user;

  const handleSubmit = async (values) => {
    const {
      subscriber_request,
      photos,
      activities,
      avatar,
      videos,
      contactInfo,
    } = values;
    const getValue = (val) => {
      return val ? "1" : "0";
    };
    const allow_to_view_photos_value = {
      name: "allow_to_view_photos",
      type: "string",
      value: photos,
    };
    const subscriber_request_value = {
      name: "subscriber_request",
      type: "boolean",
      value: getValue(subscriber_request),
    };
    const allow_to_view_activities_value = {
      name: "allow_to_view_activities",
      type: "string",
      value: activities,
    };
    const allow_to_view_avatar_value = {
      name: "allow_to_view_avatar",
      type: "string",
      value: avatar,
    };
    const allow_to_view_videos_value = {
      name: "allow_to_view_videos",
      type: "string",
      value: videos,
    };
    const allow_to_view_contact_value = {
      name: "allow_to_view_contact",
      type: "string",
      value: contactInfo,
    };
    const { data, error } = await updateProfile({
      settings: [
        allow_to_view_photos_value,
        allow_to_view_contact_value,
        allow_to_view_videos_value,
        subscriber_request_value,
        allow_to_view_avatar_value,
        allow_to_view_activities_value,
      ],
    });
    if (data) toast.success(data);
    if (error) toast.error(error);
  };
  return (
    <Grid item container>
      <Grid item md={10} xs={12} sx={{ p: { md: 3, xs: 1 } }}>
        <Formik
          onSubmit={handleSubmit}
          initialValues={{
            subscriberRequest: Boolean(Number(subscriber_request?.value)),
            contactInfo: allow_to_view_contact?.value,
            avatar: allow_to_view_avatar?.value,
            activities: allow_to_view_activities?.value,
            photos: allow_to_view_photos?.value,
            videos: allow_to_view_videos?.value,
          }}
          enableReinitialize
        >
          {({
            values: {
              photos,
              videos,
              avatar,
              activities,
              contactInfo,
              subscriberRequest,
            },
          }) => {
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
                          label={subscriberRequest ? "Turn Off" : "Turn On"}
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
                                      label: contactInfo,
                                      value: contactInfo,
                                    },
                                    {
                                      label: "everyone",
                                      value: "everyone",
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
                                      label: avatar,
                                      value: avatar,
                                    },
                                    {
                                      label: "everyone",
                                      value: "everyone",
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
                                      label: activities,
                                      value: activities,
                                    },
                                    {
                                      label: "everyone",
                                      value: "everyone",
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
                                      label: photos,
                                      value: photos,
                                    },
                                    {
                                      label: "everyone",
                                      value: "everyone",
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
                                      label: videos,
                                      value: videos,
                                    },
                                    {
                                      label: "everyone",
                                      value: "everyone",
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
                    <CustomButton
                      title={"Save"}
                      type="submit"
                      isSubmitting={isLoading}
                    />
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
