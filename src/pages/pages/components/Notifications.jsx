import React from "react";
import PropTypes from "prop-types";
import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Radio,
  Skeleton,
  Switch,
  Typography,
} from "@mui/material";
import { Formik, Form } from "formik/dist";
import FormikControl from "validation/FormikControl";
import { styled } from "@mui/material/styles";
import { CustomButton } from "components";
import {
  useGetUserSettingsQuery,
  useUserProfileQuery,
} from "redux/slices/authSlice";
const Notifications = (props) => {
  const CustomSubTypography = styled(({ text, ...rest }) => (
    <Typography {...rest}>{text}</Typography>
  ))(({ theme }) => ({
    fontSize: "2.2rem",
    fontWeight: 600,
    color: "#5F5C5C",
    // textAlign: "center",
  }));
  const { data: user, isLoading: loading } = useGetUserSettingsQuery();
  const { data: profile, isLoading: profileLoading } = useUserProfileQuery();
  console.log(user);
  if (loading || profileLoading) return <Skeleton />;
  const { username } = profile;
  return (
    <Grid item container>
      <Grid item md={10} xs={12} sx={{ p: { md: 3, xs: 1 } }}>
        <Formik
          initialValues={{
            subscribe: user[14]?.value || "",
            email: user[15]?.value || "",
            notify_if_user_subs_to_you: user[16]?.value || "",
            notify_if_user_accepts_sub_request: user[17]?.value || "",
            notify_if_vote_on_your_poll: user[18]?.value || "",
            notify_if_user_likes_your_post: user[19]?.value || "",
            notify_on_mentions: user[20]?.value || "",
            notify_on_quotes: user[21]?.value || "",
            notify_on_replies_to_your_discussions: user[22]?.value || "",
            notify_on_comment_to_your_discussion: user[23]?.value || "",
            notify_email_for_private_message: user[24]?.value || "",
            notify_email_for_bday: user[25]?.value || "",
          }}
        >
          {({ values }) => {
            return (
              <Form style={{ width: "100%" }}>
                <Grid item container gap={2}>
                  <Grid item container alignItems="center">
                    <Grid item md={3}>
                      <CustomSubTypography
                        text="Automatic Subscriptions"
                        fontSize={{ xs: "1.4rem" }}
                      />
                    </Grid>
                    <Grid item xs={12} md={8}>
                      <FormikControl
                        name="subscribe"
                        label={values.subscribe ? "Turn Off" : "Turn On"}
                        control="switch"
                      />
                      <Typography>
                        When you create or participate in a topic, you will
                        automatically be subscribed to it.{" "}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid item container alignItems="center">
                    <Grid item md={3}>
                      <CustomSubTypography
                        text="Email Notification"
                        fontSize={{ xs: "1.4rem" }}
                      />
                    </Grid>
                    <Grid item xs={12} md={8}>
                      <FormikControl
                        name="email"
                        options={[
                          {
                            label: "Weekly",
                            value: "weekly",
                          },
                          {
                            label: "Monthly",
                            value: "monthly",
                          },
                        ]}
                        control="select"
                      />
                      <Typography textAlign="justify">
                        When you post a new conversation, reply to a topic or
                        someone likes your post, you can choose to automatically
                        receive email notification or select the frequency of
                        email notification.{" "}
                      </Typography>
                    </Grid>
                  </Grid>

                  <Grid item container alignItems="center">
                    <Grid item md={3} xs={12}>
                      <CustomSubTypography
                        text="General"
                        fontSize={{ xs: "1.4rem" }}
                      />
                    </Grid>
                    <Grid item xs={12} md={8}>
                      <Typography textAlign="justify">
                        Customize who can see and comment on things you started,
                        replied, followed and following under your profile.
                      </Typography>
                      <Grid item xs={12} sx={{ mt: 2 }}>
                        <Grid item container>
                          <Grid
                            item
                            container
                            alignItems="center"
                            flexWrap="nowrap"
                          >
                            <Grid item>
                              <FormikControl
                                name="notify_if_user_subs_to_you"
                                control="checkbox"
                              />
                            </Grid>
                            <Typography>Subscribe to you</Typography>
                          </Grid>
                          <Grid
                            item
                            container
                            alignItems="center"
                            flexWrap="nowrap"
                          >
                            <Grid item>
                              <FormikControl
                                name="notify_if_user_accepts_sub_request"
                                control="checkbox"
                              />
                            </Grid>
                            <Typography>
                              Confirms a subscribe request
                            </Typography>
                          </Grid>
                          <Grid
                            item
                            container
                            alignItems="center"
                            flexWrap="nowrap"
                          >
                            <Grid item>
                              <FormikControl
                                name="notify_if_vote_on_your_poll"
                                control="checkbox"
                              />
                            </Grid>
                            <Typography>Votes on your polls</Typography>
                          </Grid>
                          <Grid
                            item
                            container
                            alignItems="center"
                            flexWrap="nowrap"
                          >
                            <Grid item>
                              <FormikControl
                                name="notify_if_user_likes_your_post"
                                control="checkbox"
                              />
                            </Grid>
                            <Typography>Likes your post</Typography>
                          </Grid>

                          <Grid
                            item
                            container
                            alignItems="center"
                            flexWrap="nowrap"
                          >
                            <Grid item>
                              <FormikControl
                                name="notify_on_replies_to_your_discussions"
                                control="checkbox"
                              />
                            </Grid>
                            <Typography>
                              Replies to your discussion (this also includes
                              comments in your topics){" "}
                            </Typography>
                          </Grid>
                          <Grid
                            item
                            container
                            alignItems="center"
                            flexWrap="nowrap"
                          >
                            <Grid item>
                              <FormikControl
                                name="notify_on_comment_to_your_discussion"
                                control="checkbox"
                              />
                            </Grid>
                            <Typography>Comments on your discussion</Typography>
                          </Grid>

                          {/* <Grid item container alignItems="center">
                            <Checkbox />
                            <Typography>
                              Posts on your visitor message board
                            </Typography>
                          </Grid> 
                          <Grid item container alignItems="center">
                            <Checkbox />
                            <Typography></Typography>
                          </Grid>*/}
                          {/* <Grid item container alignItems="center">
                            <Checkbox />
                            <Typography></Typography>
                          </Grid> */}
                          {/* <Grid item container alignItems="center">
                            <Checkbox />
                            <Typography>
                            
                            </Typography>
                          </Grid> */}
                          {/* <Grid item container alignItems="center">
                            <Checkbox />
                            <Typography></Typography>
                          </Grid> */}
                          {/* <Grid
                            item
                            container
                            alignItems="center"
                            flexWrap="nowrap"
                          >
                            <Checkbox />
                            <Typography>
                              Replies to your discussion (this also includes
                              comments in your topics)
                            </Typography>
                          </Grid> */}
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item container alignItems="center">
                      <Grid item md={3} display={{ xs: "none", md: "block" }}>
                        <CustomSubTypography
                          text="Discussions"
                          fontSize={{ xs: "1.4rem" }}
                        />
                      </Grid>
                      <Grid item xs={12} md={8}>
                        <Grid
                          item
                          container
                          alignItems="center"
                          flexWrap="nowrap"
                        >
                          <Grid item>
                            <FormikControl
                              name="notify_on_mentions"
                              control="checkbox"
                            />
                          </Grid>
                          <Typography>
                            {" "}
                            {`Mentions you (@${username}) in a pos`}
                          </Typography>
                        </Grid>
                        <Grid
                          item
                          container
                          alignItems="center"
                          flexWrap="nowrap"
                        >
                          <Grid item>
                            <FormikControl
                              name="notify_on_quotes"
                              control="checkbox"
                            />
                          </Grid>
                          <Typography>Quotes you in a post </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  {/* <Grid
                    item
                    container
                    alignItems="center"
                    // justifyContent={{ xs: "center" }}
                    flexDirection={{ md: "row", xs: "row" }}
                  >
                    <Grid item md={3} xs={12}>
                      <CustomSubTypography
                        fontSize={{ xs: "1.4rem" }}
                        text="Moderation"
                      />
                    </Grid>
                    <Grid item xs={12} md={8}>
                      <Grid item container>
                        <Grid item container alignItems="center" gap={1}>
                          <Typography>Notify on Monitored Word</Typography>
                          <FormControlLabel
                            control={<Radio name="notify" />}
                            label="Yes"
                          />
                          <FormControlLabel
                            control={<Radio name="notify" />}
                            label="No"
                          />
                          <FormControlLabel
                            control={<Radio name="notify" />}
                            label="Send Mail"
                          />
                        </Grid>
                        <Grid item container alignItems="center" gap={1}>
                          <Typography>Notify on Reported Post</Typography>
                          <FormControlLabel
                            control={<Radio name="notify" />}
                            label="Yes"
                          />
                          <FormControlLabel
                            control={<Radio name="notify" />}
                            label="No"
                          />
                          <FormControlLabel
                            control={<Radio name="notify" />}
                            label="Send Mail"
                          />
                        </Grid>
                        <Grid item container alignItems="center" gap={1}>
                          <Typography>Notify on Unapproved Post</Typography>
                          <FormControlLabel
                            control={<Radio name="notify" />}
                            label="Yes"
                          />
                          <FormControlLabel
                            control={<Radio name="notify" />}
                            label="No"
                          />
                          <FormControlLabel
                            control={<Radio name="notify" />}
                            label="Send Mail"
                          />
                        </Grid>
                        <Grid item container alignItems="center" gap={1}>
                          <Typography>Notify on Spam</Typography>
                          <FormControlLabel
                            control={<Radio name="notify" />}
                            label="Yes"
                          />
                          <FormControlLabel
                            control={<Radio name="notify" />}
                            label="No"
                          />
                          <FormControlLabel
                            control={<Radio name="notify" />}
                            label="Send Mail"
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid> */}
                  <Grid
                    item
                    container
                    alignItems="center"
                    // justifyContent={{ xs: "center" }}
                    flexDirection={{ md: "row", xs: "row" }}
                  >
                    <Grid item md={3} xs={12}>
                      <CustomSubTypography
                        fontSize={{ xs: "1.4rem" }}
                        text="Private Message"
                      />
                    </Grid>
                    <Grid item xs={12} md={8}>
                      <Grid item container>
                        <FormikControl
                          control="switch"
                          label={
                            values.notify_email_for_private_message
                              ? "Turn Off"
                              : "Turn On"
                          }
                          name="notify_email_for_private_message"
                        />
                      </Grid>
                      <Typography textAlign="justify">
                        This setting allows you to be notified via email of new
                        private messages. The setting is independent of other
                        notification options.
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid
                    item
                    container
                    alignItems="center"
                    // justifyContent={{ xs: "center" }}
                    flexDirection={{ md: "row", xs: "row" }}
                  >
                    <Grid item md={3} xs={12}>
                      <CustomSubTypography
                        fontSize={{ xs: "1.4rem" }}
                        text="Birthday Email"
                      />
                    </Grid>
                    <Grid item xs={12} md={8}>
                      <Grid item container>
                        <FormikControl
                          control="switch"
                          label={
                            values.notify_email_for_bday
                              ? "Turn Off"
                              : "Turn On"
                          }
                          name="notify_email_for_bday"
                        />
                      </Grid>
                      <Typography textAlign="justify">
                        This allows you to receive a happy birthday email
                        message on your birthday. This setting is independent of
                        other notification options. The option Receive Email
                        from Administrators in the Account tab must also be
                        enabled in order to receive a birthday email.
                      </Typography>
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

Notifications.propTypes = {};

export default Notifications;
