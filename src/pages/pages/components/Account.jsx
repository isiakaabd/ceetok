import React from "react";
import PropTypes from "prop-types";
import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Switch,
  Typography,
} from "@mui/material";
import { Formik, Form } from "formik/dist";
import FormikControl from "validation/FormikControl";
import { styled } from "@mui/material/styles";
import { CustomButton } from "components";
const Account = (props) => {
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
      <Grid item xs={10} sx={{ p: 3 }}>
        <Formik
          initialValues={{
            title: "",
            day: "",
            month: "",
            year: "",
            occupation: "",
            interest: "",
            location: "",
            bio: "",
            contact: "",
            web: "",
          }}
        >
          <Form style={{ width: "100%" }}>
            <Grid item container gap={2}>
              <Grid item container alignItems="center">
                <Grid item md={3} display={{ xs: "none", md: "block" }}>
                  <CustomSubTypography text="User Title" />
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
              <Grid item container alignItems="center">
                <Grid item xs={3} display={{ xs: "none", md: "block" }} />

                <Grid item xs={12} md={8}>
                  <Grid container flexDirection="column">
                    <Typography>
                      You must enter your current password if you wish to change
                      your password or email address
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
              <Grid item container alignItems="center">
                <Grid item xs={3} display={{ xs: "none", md: "block" }} />

                <Grid item xs={12} md={8}>
                  <Grid item container>
                    <FormikControl
                      name="confirmNewPassword"
                      placeholder="Contact"
                      control="input"
                      type="password"
                    />
                  </Grid>
                </Grid>
              </Grid>

              <Grid item container alignItems="center">
                <Grid item xs={3} display={{ xs: "none", md: "block" }}>
                  <CustomSubTypography text="Web" />
                </Grid>
                <Grid item xs={12} md={8}>
                  <Typography>Password Tips</Typography>
                  <ul>
                    <li>Make your password atleast 8 characters long.</li>
                    <li>Avoid using your username for password. </li>
                  </ul>
                </Grid>
              </Grid>
              <Grid item container alignItems="center">
                <Grid item xs={3} display={{ xs: "none", md: "block" }}>
                  <CustomSubTypography text="Email Address" />
                </Grid>
                <Grid item xs={12} md={8}>
                  <Typography>Josh4real.@gmail.com</Typography>
                  <Grid item container>
                    <FormikControl
                      name="Email Address"
                      placeholder="Enter new Email Address"
                      control="input"
                      multiline={true}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item container alignItems="center">
                <Grid item xs={3} display={{ xs: "none", md: "block" }}>
                  <CustomSubTypography text="Invisible Mode" />
                </Grid>
                <Grid item xs={8} md={8}>
                  <Grid item container>
                    <FormControlLabel
                      control={<Switch checked={true} name="on" />}
                      labelPlacement="end"
                      label="Turn on"
                    />
                    <Typography>
                      Invisible mode allows you to browse the forums without
                      appearing in the Online Users Module.
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item container alignItems="center">
                <Grid item xs={3} display={{ xs: "none", md: "block" }}>
                  <CustomSubTypography text="Reputation Level" />
                </Grid>
                <Grid item xs={8} md={8}>
                  <Grid item container>
                    <FormControlLabel
                      control={<Switch checked={true} name="on" />}
                      labelPlacement="end"
                      label="Turn on"
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item container alignItems="center">
                <Grid item xs={3} display={{ xs: "none", md: "block" }}>
                  <CustomSubTypography text="Private Messaging" />
                </Grid>
                <Grid item xs={8} md={8}>
                  <Grid item container>
                    <FormControlLabel
                      control={<Switch checked={true} name="on" />}
                      labelPlacement="end"
                      label="Turn on"
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item container alignItems="center">
                <Grid item xs={3} display={{ xs: "none", md: "block" }}>
                  <CustomSubTypography text="Receive Private Messaging" />
                </Grid>
                <Grid item xs={8} md={8}>
                  <Grid item container>
                    <Grid item container flexDirection={"column"}>
                      <Grid item container alignItems="center">
                        <Checkbox />
                        <Typography>From all members</Typography>
                      </Grid>
                      <Grid item container alignItems="center">
                        <Checkbox />
                        <Typography>
                          Only from subscribers, moderators, and administrators
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Typography>
                    You may lim12t the receipt of private messages to just
                    administrators, moderators, and your followers. Other
                    members who attempt to send messages to you will be told
                    that you have disabled private messaging.
                  </Typography>
                </Grid>
              </Grid>
              <Grid item container alignItems="center">
                <Grid item xs={3} display={{ xs: "none", md: "block" }}>
                  <CustomSubTypography text="Visitor Messaging" />
                </Grid>
                <Grid item xs={12} md={8}>
                  <Grid item container>
                    <FormControlLabel
                      control={<Switch checked={true} name="on" />}
                      labelPlacement="end"
                      label="Turn on"
                    />
                  </Grid>
                  <Typography>
                    The visitor messaging allows members to leave messages to
                    one another publicly. If you do not want to receive visitor
                    messages, uncheck the box to turn off the visitor messaging
                    system.
                  </Typography>
                </Grid>
              </Grid>
              <Grid item container alignItems="center">
                <Grid item xs={3} display={{ xs: "none", md: "block" }}>
                  <CustomSubTypography text="Emailing" />
                </Grid>
                <Grid item xs={12} md={8}>
                  <Grid item container>
                    <FormControlLabel
                      control={<Switch checked={true} name="on" />}
                      labelPlacement="end"
                      label="Turn on"
                    />
                  </Grid>
                  <Typography>
                    From time to time, the administrators and/or other members
                    may want to send you email notifications or messages. If you
                    do not want to receive email from certain people then you
                    may disable the options here
                  </Typography>
                </Grid>
              </Grid>
              <Grid item container alignItems="center">
                <Grid item xs={3} display={{ xs: "none", md: "block" }}>
                  <CustomSubTypography text="Date & Time Options" />
                </Grid>
                <Grid item xs={12} md={8}>
                  <Grid item container>
                    <Typography>Time Zone</Typography>
                    <FormikControl
                      name="timezone"
                      control="input"
                      placeholder="(GMT) Western Europe Time, Accra, Casablanca, Dakar"
                    />
                    <Typography>
                      All timestamps displayed on the forums can be
                      automatically corrected to show the correct time for your
                      location in the world. Simply select the appropriate time
                      zone from the list above.
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item container alignItems="center">
                <Grid item xs={3} display={{ xs: "none", md: "block" }}>
                  <CustomSubTypography text="Ignore List" />
                </Grid>
                <Grid item xs={12}>
                  <Grid item container>
                    <Typography>
                      To block certain users' posts, enter their names into the
                      ignore list. To remove users from the ignore list, click
                      the 'x' button.
                    </Typography>
                    <FormikControl
                      name="timezone"
                      control="input"
                      placeholder="(GMT) Western Europe Time, Accra, Casablanca, Dakar"
                    />
                  </Grid>
                </Grid>
              </Grid>
              <CustomButton>Save</CustomButton>
              <Button
                variant="outlined"
                sx={{ padding: "1rem 2rem", borderRadius: ".5rem" }}
                color="success"
              >
                Reset
              </Button>
            </Grid>
          </Form>
        </Formik>
      </Grid>
    </Grid>
  );
};

Account.propTypes = {};

export default Account;
