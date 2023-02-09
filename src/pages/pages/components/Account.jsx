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
import * as Yup from "yup";
import { toast } from "react-toastify";

const validationSchema = Yup.object({
  invisible_mode: Yup.boolean().required("Required"),
  visitors_message: Yup.boolean().required("Required"),
  private_message_source: Yup.boolean().required("Required"),
  private_message: Yup.boolean().required("Required"),
  show_reputation: Yup.boolean().required("Required"),
  emailing: Yup.boolean().required("Required"),
  email_notification_frequency: Yup.string().required("Required"),
  subscriber_request: Yup.boolean().required("Required"),
});
const Account = (props) => {
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
  const { email } = profile;
  const {
    invisible_mode,
    visitors_message,
    private_message_source,
    private_message,
    show_reputation,
    emailing,
    email_notification_frequency,
    subscriber_request,
  } = user;
  const initialValues = {
    invisible_mode: Boolean(Number(invisible_mode?.value)),
    show_reputation: Boolean(Number(show_reputation?.value)),
    private_message_source: Boolean(Number(private_message_source?.value)),
    subscriber_request: Boolean(Number(subscriber_request?.value)),
    private_message: Boolean(Number(private_message?.value)),
    visitors_message: Boolean(Number(visitors_message?.value)),
    emailing: Boolean(Number(emailing?.value)),
    email_notification_frequency: email_notification_frequency?.value || "",
  };
  const handleSubmit = async (values) => {
    const {
      invisible_mode,
      visitors_message,
      private_message_source,
      private_message,
      show_reputation,
      emailing,
      email_notification_frequency,
      subscriber_request,
    } = values;
    const getValue = (val) => {
      return val ? "1" : "0";
    };
    const invisible_mode_value = {
      name: "invisible_mode",
      type: "boolean",
      value: getValue(invisible_mode),
    };
    const subscriber_request_value = {
      name: "subscriber_request",
      type: "boolean",
      value: getValue(subscriber_request),
    };
    const email_notification_frequency_value = {
      name: "email_notification_frequency",
      type: "string",
      value: email_notification_frequency,
    };
    const emailing_value = {
      name: "emailing",
      type: "boolean",
      value: getValue(emailing),
    };
    const show_reputation_value = {
      name: "show_reputation",
      type: "boolean",
      value: getValue(show_reputation),
    };
    const private_message_value = {
      name: "private_message",
      type: "boolean",
      value: getValue(private_message),
    };

    const visitors_message_value = {
      name: "visitors_message",
      type: "boolean",
      value: getValue(visitors_message),
    };
    const private_message_source_value = {
      name: "private_message_source",
      type: "string",
      value: getValue(private_message_source),
    };
    const { data, error } = await updateProfile({
      settings: [
        invisible_mode_value,
        show_reputation_value,
        private_message_source_value,
        subscriber_request_value,
        private_message_value,
        visitors_message_value,
        emailing_value,
        email_notification_frequency_value,
      ],
    });
    if (data) toast.success(data);
    if (error) toast.error(error);
  };
  return (
    <Grid item container>
      <Grid item md={10} xs={12} sx={{ p: { md: 3, xs: 1 } }}>
        <Formik
          enableReinitialize
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          {({ values }) => {
            return (
              <Form style={{ width: "100%" }}>
                <Grid item container gap={2} sx={{ p: { md: 3, xs: 1 } }}>
                  <Grid item container>
                    <Grid item md={3} display={{ xs: "none", md: "block" }}>
                      <CustomSubTypography
                        fontSize={{ xs: "1.4rem" }}
                        text="Password"
                      />
                    </Grid>
                    <Grid item xs={12} md={8}>
                      <FormikControl
                        name="password"
                        placeholder="Enter current password"
                        control="input"
                        type="password"
                        helperText={
                          "This is the title that appears below on your posts."
                        }
                      />
                    </Grid>
                  </Grid>
                  <Grid item container>
                    <Grid item xs={3} display={{ xs: "none", md: "block" }} />

                    <Grid item xs={12} md={8}>
                      <Grid container flexDirection="column">
                        <Typography
                          fontWeight={600}
                          sx={{ my: "1rem" }}
                          fontSize={{ md: "1.2rem", xs: "1rem" }}
                        >
                          You must enter your current password if you wish to
                          change your password or email address
                        </Typography>
                        <FormikControl
                          name="newPassword"
                          placeholder="Enter New password"
                          type="password"
                          control="input"
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item container>
                    <Grid item xs={3} display={{ xs: "none", md: "block" }} />

                    <Grid item xs={12} md={8}>
                      <Grid item container>
                        <FormikControl
                          name="confirmNewPassword"
                          placeholder="Confirm New Password"
                          control="input"
                          type="password"
                        />
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid item container>
                    <Grid item xs={3} display={{ xs: "none", md: "block" }}>
                      <CustomSubTypography
                        fontSize={{ xs: "1.4rem" }}
                        text="Web"
                      />
                    </Grid>
                    <Grid item xs={12} md={8}>
                      <Typography
                        fontWeight={600}
                        // sx={{ my: "1rem" }}
                        fontSize={{ md: "1.2rem", xs: "1rem" }}
                      >
                        Password Tips
                      </Typography>
                      <ul style={{ fontSize: "1rem" }}>
                        <li>Make your password atleast 8 characters long.</li>
                        <li>Avoid using your username for password. </li>
                      </ul>
                    </Grid>
                  </Grid>
                  <Grid item container>
                    <Grid item xs={3} display={{ xs: "none", md: "block" }}>
                      <CustomSubTypography
                        fontSize={{ xs: "1.4rem" }}
                        text="Email Address"
                      />
                    </Grid>
                    <Grid item xs={12} md={8}>
                      <Typography
                        fontWeight={600}
                        fontSize={{ md: "1.6rem", xs: "1.4rem" }}
                      >
                        {email}
                      </Typography>
                      <Grid item container>
                        <FormikControl
                          name="new_Email "
                          placeholder="Enter new Email Address"
                          control="input"
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item container>
                    <Grid item xs={12} md={3}>
                      <CustomSubTypography
                        fontSize={{ xs: "1.4rem" }}
                        text="Invisible Mode"
                      />
                    </Grid>
                    <Grid item xs={12} md={8}>
                      <Grid item container>
                        <FormikControl
                          name="invisible_mode"
                          control="switch"
                          label={values.invisible_mode ? "Turn Off" : "Turn On"}
                        />
                        <Typography textAlign="justify">
                          Invisible mode allows you to browse the forums without
                          appearing in the Online Users Module.
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid
                    item
                    container
                    // justifyContent={{ xs: "center" }}
                    flexDirection={{ md: "row", xs: "row" }}
                  >
                    <Grid item md={3} xs={12}>
                      <CustomSubTypography
                        fontSize={{ xs: "1.4rem" }}
                        text="Reputation Level"
                      />
                    </Grid>
                    <Grid item xs={12} md={8}>
                      <Grid item container>
                        <FormikControl
                          control="switch"
                          label={
                            values.show_reputation ? "Turn Off" : "Turn On"
                          }
                          name="show_reputation"
                        />
                      </Grid>
                      <Typography textAlign="justify">
                        Your current reputation level is displayed to other
                        users whenever you post a message. If you would like to
                        hide your reputation, disable this option.
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid item container>
                    <Grid item md={3} xs={12}>
                      <CustomSubTypography
                        text="Private Messaging"
                        fontSize={{ xs: "1.4rem" }}
                      />
                    </Grid>
                    <Grid item xs={12} md={8}>
                      <Grid item container>
                        <FormikControl
                          control="switch"
                          name="private_message"
                          label={
                            values.private_message ? "Turn Off" : "Turn On"
                          }
                        />
                      </Grid>
                      <Typography textAlign="justify">
                        If you do not want to send or receive private messages,
                        uncheck the box.
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid item container>
                    <Grid item md={3} xs={12}>
                      <CustomSubTypography
                        text="Receive Private Messaging"
                        fontSize={{ xs: "1.4rem" }}
                      />
                    </Grid>
                    <Grid item xs={12} md={8}>
                      <Grid item container>
                        <Grid item container flexDirection={"column"}>
                          <Grid item>
                            <FormikControl
                              control={"checkbox"}
                              name="private_message_source"
                              label={"From all members"}
                            />
                          </Grid>
                          <Grid
                            item
                            container
                            flexWrap={"nowrap"}
                            alignItems="center"
                          >
                            <FormikControl
                              control={"checkbox"}
                              name="subscriber_request"
                              label={
                                "Only from subscribers, moderators, and administrators"
                              }
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                      <Typography textAlign="justify">
                        You may limit the receipt of private messages to just
                        administrators, moderators, and your followers. Other
                        members who attempt to send messages to you will be told
                        that you have disabled private messaging.
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid item container>
                    <Grid item md={3} xs={12}>
                      <CustomSubTypography
                        text="Visitor Messaging"
                        fontSize={{ xs: "1.4rem" }}
                      />
                    </Grid>
                    <Grid item xs={12} md={8}>
                      <Grid item container>
                        <FormikControl
                          name="visitors_message"
                          control="switch"
                          label={
                            values.visitors_message ? "Turn Off" : "Turn On"
                          }
                        />
                      </Grid>
                      <Typography textAlign="justify">
                        The visitor messaging allows members to leave messages
                        to one another publicly. If you do not want to receive
                        visitor messages, uncheck the box to turn off the
                        visitor messaging system.
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid item container>
                    <Grid item xs={3}>
                      <CustomSubTypography
                        text="Emailing"
                        fontSize={{ xs: "1.4rem" }}
                      />
                    </Grid>
                    <Grid item xs={12} md={8}>
                      <Grid item container>
                        <FormikControl
                          control="switch"
                          label={values.emailing ? "Turn Off" : "Turn On"}
                          name="emailing"
                        />
                      </Grid>
                      <Typography textAlign="justify">
                        From time to time, the administrators and/or other
                        members may want to send you email notifications or
                        messages. If you do not want to receive email from
                        certain people then you may disable the options here
                      </Typography>
                      <Grid item container>
                        <FormikControl
                          name="email_notification_frequency"
                          control="select"
                          options={[
                            {
                              label: email_notification_frequency?.value,
                              value: email_notification_frequency?.value,
                            },
                            {
                              label: "Monthly",
                              value: "monthly",
                            },
                            {
                              label: "Weekly",
                              value: "weekly",
                            },
                          ]}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item container>
                    <Grid item xs={3} display={{ xs: "none", md: "block" }}>
                      <CustomSubTypography
                        fontSize={{ xs: "1.4rem" }}
                        text="Date & Time Options"
                      />
                    </Grid>
                    <Grid item xs={12} md={8}>
                      <Grid item container>
                        <CustomSubTypography
                          text="Time Zone"
                          fontSize={{ xs: "1.4rem" }}
                        />
                        <FormikControl
                          name="timezone"
                          control="input"
                          placeholder="(GMT) Western Europe Time, Accra, Casablanca, Dakar"
                        />
                        <Typography textAlign="justify">
                          All timestamps displayed on the forums can be
                          automatically corrected to show the correct time for
                          your location in the world. Simply select the
                          appropriate time zone from the list above.
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item container>
                    <Grid item xs={3}>
                      <CustomSubTypography
                        text="Ignore List"
                        fontSize={{ xs: "1.4rem" }}
                      />
                    </Grid>
                    <Grid item xs={12} md={8}>
                      <Grid item container>
                        <Typography>
                          To block certain users' posts, enter their names into
                          the ignore list. To remove users from the ignore list,
                          click the 'x' button.
                        </Typography>
                        <FormikControl
                          name="timezone"
                          control="input"
                          placeholder="(GMT) Western Europe Time, Accra, Casablanca, Dakar"
                        />
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
                      isSubmitting={isLoading}
                      title={"Save"}
                      type="submit"
                    />
                    <Button
                      variant="outlined"
                      sx={{
                        padding: "1rem 4em",
                        fontSize: "1.6rem",
                        fontWeight: 700,
                        borderRadius: "5rem",
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

export default Account;
