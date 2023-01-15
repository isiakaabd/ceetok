import React from "react";
import PropTypes from "prop-types";
import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Radio,
  Switch,
  Typography,
} from "@mui/material";
import { Formik, Form } from "formik/dist";
import FormikControl from "validation/FormikControl";
import { styled } from "@mui/material/styles";
import { CustomButton } from "components";
const Notifications = (props) => {
  const CustomSubTypography = styled(({ text, ...rest }) => (
    <Typography {...rest}>{text}</Typography>
  ))(({ theme }) => ({
    fontSize: "2.2rem",
    fontWeight: 600,
    color: "#5F5C5C",
    // textAlign: "center",
  }));

  return (
    <Grid item container>
      <Grid item md={10} xs={12} sx={{ p: 3 }}>
        <Formik
          initialValues={{
            subscribe: true,
            privateMessage: true,
            birthday: false,
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
                            label: "Hello",
                            value: "Hello",
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
                          <Grid item container alignItems="center">
                            <Checkbox />
                            <Typography>Subscribe to you</Typography>
                          </Grid>
                          <Grid item container alignItems="center">
                            <Checkbox />
                            <Typography>
                              Confirms a subscribe request
                            </Typography>
                          </Grid>
                          <Grid item container alignItems="center">
                            <Checkbox />
                            <Typography>
                              Posts on your visitor message board
                            </Typography>
                          </Grid>
                          <Grid item container alignItems="center">
                            <Checkbox />
                            <Typography>Votes on your polls</Typography>
                          </Grid>
                          <Grid item container alignItems="center">
                            <Checkbox />
                            <Typography>Likes your post</Typography>
                          </Grid>
                          <Grid item container alignItems="center">
                            <Checkbox />
                            <Typography>
                              Mentions you (@Forumnaija) in a pos
                            </Typography>
                          </Grid>
                          <Grid item container alignItems="center">
                            <Checkbox />
                            <Typography>Quotes you in a post</Typography>
                          </Grid>
                          <Grid
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
                          </Grid>
                          <Grid item container alignItems="center">
                            <Checkbox />
                            <Typography>Comments on your discussion</Typography>
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
                        <Grid item container>
                          <Grid item container alignItems="center">
                            <Checkbox />
                            <Typography>
                              Replies to your discussion (this also includes
                              comments in your topics)
                            </Typography>
                          </Grid>
                          <Grid item container alignItems="center">
                            <Checkbox />
                            <Typography>Comments on your discussion</Typography>
                          </Grid>
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
                          label={values.privateMessage ? "Turn Off" : "Turn On"}
                          name="privateMessage"
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
                          label={values.birthday ? "Turn Off" : "Turn On"}
                          name="birthday"
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

                  <CustomButton>Save</CustomButton>
                  <Button
                    variant="outlined"
                    sx={{ padding: "1rem 4em", borderRadius: "5rem" }}
                    color="success"
                  >
                    Reset
                  </Button>
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
