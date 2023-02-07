import { Button, Checkbox, Grid, Skeleton, Typography } from "@mui/material";
import { Formik, Form } from "formik/dist";
import FormikControl from "validation/FormikControl";
import { styled } from "@mui/material/styles";
import { CustomButton } from "components";
import {
  useGetUserSettingsQuery,
  useUserProfileQuery,
} from "redux/slices/authSlice";
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

  if (loading || profileLoading) return <Skeleton />;
  const { email } = profile;

  return (
    <Grid item container>
      <Grid item md={10} xs={12} sx={{ p: { md: 3, xs: 1 } }}>
        <Formik
          enableReinitialize
          initialValues={{
            invisibleMode: user[2]?.value || "",
            reputation: user[3]?.value || "",
            private_message_source: user[5]?.value || "",
            privateMessaging: user[4]?.value || "",
            visitorMessaging: user[6]?.value || "",
            emailing: user[7]?.value || "",
          }}
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
                          name="invisibleMode"
                          control="switch"
                          label={values.invisibleMode ? "Turn Off" : "Turn On"}
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
                          label={values.reputation ? "Turn Off" : "Turn On"}
                          name="reputation"
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
                          name="privateMessaging"
                          label={
                            values.privateMessaging ? "Turn Off" : "Turn On"
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
                          <Grid item container alignItems="center">
                            <Checkbox
                              // checked={private_message_source}
                              name="private_message_source"
                            />
                            <Typography>From all members</Typography>
                          </Grid>
                          <Grid
                            item
                            container
                            flexWrap={"nowrap"}
                            alignItems="center"
                          >
                            <Checkbox />
                            <Typography textAlign="justify">
                              Only from subscribers, moderators, and
                              administrators
                            </Typography>
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
                          name="visitorMessaging"
                          control="switch"
                          label={
                            values.visitorMessaging ? "Turn Off" : "Turn On"
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
                          name="emailing"
                          control="switch"
                          label={values.emailing ? "Turn Off" : "Turn On"}
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
                    <CustomButton title={"Save"} />
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

Account.propTypes = {};

export default Account;
