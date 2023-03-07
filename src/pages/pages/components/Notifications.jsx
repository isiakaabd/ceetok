import { Button, Grid, Skeleton, Typography } from "@mui/material";
import { Formik, Form } from "formik/dist";
import FormikControl from "validation/FormikControl";
import { styled } from "@mui/material/styles";
import { CustomButton } from "components";
import {
  useGetUserSettingsQuery,
  useUpdateUserSettingsMutation,
  useUserProfileQuery,
} from "redux/slices/authSlice";
import { toast } from "react-toastify";
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
  const [updateProfile, { isLoading }] = useUpdateUserSettingsMutation();

  if (loading || profileLoading) return <Skeleton />;
  const { username } = profile;
  const {
    automatic_sub,
    notify_if_user_accepts_sub_request,
    notify_if_user_subs_to_you,
    email_notification_frequency,
    notify_if_vote_on_your_poll,
    notify_email_for_private_message,
    notify_if_user_likes_your_post,
    notify_on_mentions,
    notify_email_for_bday,
    notify_on_quotes,
    notify_on_replies_to_your_discussions,
    notify_on_comment_to_your_discussion,
  } = user;
  const initialValues = {
    subscribe: Boolean(Number(automatic_sub?.value)),
    email: email_notification_frequency?.value,
    notify_if_user_subs_to_you: Boolean(
      Number(notify_if_user_subs_to_you?.value)
    ),
    notify_if_user_accepts_sub_request: Boolean(
      Number(notify_if_user_accepts_sub_request?.value)
    ),
    notify_if_vote_on_your_poll: Boolean(
      Number(notify_if_vote_on_your_poll?.value)
    ),
    notify_if_user_likes_your_post: Boolean(
      Number(notify_if_user_likes_your_post?.value)
    ),
    notify_on_mentions: Boolean(Number(notify_on_mentions?.value)),
    notify_on_quotes: Boolean(Number(notify_on_quotes?.value)),
    notify_on_replies_to_your_discussions: Boolean(
      Number(notify_on_replies_to_your_discussions?.value)
    ),
    notify_on_comment_to_your_discussion: Boolean(
      Number(notify_on_comment_to_your_discussion?.value)
    ),
    notify_email_for_private_message: Boolean(
      Number(notify_email_for_private_message?.value)
    ),
    notify_email_for_bday: Boolean(Number(notify_email_for_bday?.value)),
  };
  const handleSubmit = async (values) => {
    const {
      automatic_sub,
      notify_if_user_accepts_sub_request,
      notify_if_user_subs_to_you,
      email,
      notify_if_vote_on_your_poll,
      notify_email_for_private_message,
      notify_if_user_likes_your_post,
      notify_on_mentions,
      notify_email_for_bday,
      notify_on_quotes,
      notify_on_replies_to_your_discussions,
      notify_on_comment_to_your_discussion,
    } = values;
    const getValue = (val) => {
      return val ? "1" : "0";
    };
    const automatic_sub_value = {
      name: "automatic_sub",
      type: "boolean",
      value: getValue(automatic_sub),
    };
    const notify_on_comment_to_your_discussion_value = {
      name: "notify_on_comment_to_your_discussion",
      type: "boolean",
      value: getValue(notify_on_comment_to_your_discussion),
    };
    const notify_on_replies_to_your_discussions_value = {
      name: " notify_on_replies_to_your_discussions",
      type: "boolean",
      value: getValue(notify_on_replies_to_your_discussions),
    };
    const notify_on_quotes_value = {
      name: "notify_on_quotes",
      type: "boolean",
      value: getValue(notify_on_quotes),
    };
    const notify_email_for_bday_value = {
      name: "notify_email_for_bday",
      type: "boolean",
      value: getValue(notify_email_for_bday),
    };
    const notify_on_mentions_value = {
      name: "notify_on_mentions",
      type: "boolean",
      value: getValue(notify_on_mentions),
    };
    const notify_if_user_accepts_sub_request_value = {
      name: "notify_if_user_accepts_sub_request",
      type: "boolean",
      value: getValue(notify_if_user_accepts_sub_request),
    };
    const notify_if_user_subs_to_you_value = {
      name: " notify_if_user_subs_to_you",
      type: "boolean",
      value: getValue(notify_if_user_subs_to_you),
    };
    const email_notification_frequency_value = {
      name: "email_notification_frequency",
      type: "string",
      value: email,
    };
    const notify_if_vote_on_your_poll_value = {
      name: "notify_if_vote_on_your_poll",
      type: "boolean",
      value: getValue(notify_if_vote_on_your_poll),
    };
    const notify_email_for_private_message_value = {
      name: "notify_email_for_private_message",
      type: "boolean",
      value: getValue(notify_email_for_private_message),
    };
    const notify_if_user_likes_your_post_value = {
      name: "notify_if_user_likes_your_post",
      type: "boolean",
      value: getValue(notify_if_user_likes_your_post),
    };

    const { data, error } = await updateProfile({
      settings: [
        notify_email_for_bday_value,

        notify_on_comment_to_your_discussion_value,
        notify_on_replies_to_your_discussions_value,
        notify_on_quotes_value,
        automatic_sub_value,
        notify_on_mentions_value,
        notify_if_user_likes_your_post_value,
        notify_email_for_private_message_value,
        notify_if_vote_on_your_poll_value,
        email_notification_frequency_value,
        notify_if_user_subs_to_you_value,
        notify_if_user_accepts_sub_request_value,
      ],
    });
    if (data) toast.success(data);
    if (error) toast.error(error);
  };
  return (
    <Grid item container>
      <Grid item md={10} xs={12} sx={{ p: { md: 3, xs: 1 } }}>
        <Formik onSubmit={handleSubmit} initialValues={initialValues}>
          {({
            values: {
              email,
              subscribe,
              notify_email_for_bday,
              notify_email_for_private_message,
              notify_if_user_accepts_sub_request,
              notify_if_user_likes_your_post,
              notify_if_user_subs_to_you,
              notify_if_vote_on_your_poll,
              notify_on_comment_to_your_discussion,
              notify_on_mentions,
              notify_on_quotes,
              notify_on_replies_to_your_discussions,
            },
          }) => {
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
                        label={subscribe ? "Turn Off" : "Turn On"}
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
                            label: email,
                            value: email,
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
                          <Grid item>
                            <FormikControl
                              name="notify_if_user_subs_to_you"
                              control="checkbox"
                              label="Subscribe to you"
                            />
                          </Grid>

                          <Grid item>
                            <FormikControl
                              name="notify_if_user_accepts_sub_request"
                              control="checkbox"
                              label="  Confirms a subscribe request"
                            />
                          </Grid>

                          <Grid item>
                            <FormikControl
                              name="notify_if_vote_on_your_poll"
                              control="checkbox"
                              label="Votes on your polls"
                            />
                          </Grid>

                          <Grid item>
                            <FormikControl
                              name="notify_if_user_likes_your_post"
                              control="checkbox"
                              label="Likes your post"
                            />
                          </Grid>

                          <Grid item>
                            <FormikControl
                              name="notify_on_replies_to_your_discussions"
                              control="checkbox"
                              label="Replies to your discussion (this also includes
                              comments in your topics)"
                            />
                          </Grid>

                          <Grid item>
                            <FormikControl
                              name="notify_on_comment_to_your_discussion"
                              control="checkbox"
                              label="Comments on your discussion"
                            />
                          </Grid>
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
                        <Grid item>
                          <FormikControl
                            name="notify_on_mentions"
                            control="checkbox"
                            label={`Mentions you (@${username}) in a pos`}
                          />
                        </Grid>

                        <Grid item>
                          <FormikControl
                            name="notify_on_quotes"
                            control="checkbox"
                            label="Quotes you in a post "
                          />
                        </Grid>
                      </Grid>
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
                        text="Private Message"
                      />
                    </Grid>
                    <Grid item xs={12} md={8}>
                      <Grid item container>
                        <FormikControl
                          control="switch"
                          label={
                            notify_email_for_private_message
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
                          label={notify_email_for_bday ? "Turn Off" : "Turn On"}
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

Notifications.propTypes = {};

export default Notifications;
