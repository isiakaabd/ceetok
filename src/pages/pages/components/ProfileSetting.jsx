import React from "react";
import PropTypes from "prop-types";
import { Checkbox, Grid, Typography } from "@mui/material";
import { Formik, Form } from "formik/dist";
import FormikControl from "validation/FormikControl";
import { styled } from "@mui/material/styles";
const ProfileSetting = (props) => {
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
                <Grid item md={3} xs={0} display={{ md: "block", xs: "none" }}>
                  <CustomSubTypography
                    fontSize={{ xs: "1.4rem" }}
                    text="User Title"
                  />
                </Grid>
                <Grid item md={8} xs={12}>
                  <FormikControl
                    name="title"
                    placeholder="User"
                    control="input"
                    helperText={
                      "This is the title that appears below on your posts."
                    }
                  />
                </Grid>
              </Grid>
              <Grid item container alignItems="center">
                <Grid item md={3} display={{ xs: "none", md: "block" }}>
                  <CustomSubTypography
                    fontSize={{ xs: "1.4rem" }}
                    text="Date of Birth"
                  />
                </Grid>
                <Grid item md={8} xs={12}>
                  <Grid
                    item
                    container
                    gap={2}
                    flexWrap={{ md: "nowrap", xs: "wrap" }}
                    justifyContent="space-between"
                  >
                    <Grid item md={3} xs={12}>
                      <FormikControl
                        name="day"
                        placeholder="Day"
                        options={[
                          {
                            label: "1",
                            value: "1",
                          },
                        ]}
                        control="select"
                      />
                      <Grid
                        item
                        container
                        flexWrap="nowrap"
                        alignItems="center"
                      >
                        <Checkbox />
                        <Typography sx={{ whiteSpace: "nowrap" }}>
                          Display my date of birth on my profile
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid item md={3} xs={12}>
                      <FormikControl
                        placeholder="Month"
                        name="month"
                        control="select"
                        options={[
                          {
                            label: 0,
                            value: 0,
                          },
                          {
                            label: "1",
                            value: "1",
                          },
                          {
                            label: "2",
                            value: "2",
                          },

                          {
                            label: 3,
                            value: "3",
                          },
                        ]}
                      />
                    </Grid>
                    <Grid item md={3} xs={12}>
                      <FormikControl
                        placeholder="Year"
                        name="year"
                        options={[
                          {
                            label: 0,
                            value: 0,
                          },
                          {
                            label: "1",
                            value: "1",
                          },
                          {
                            label: "2",
                            value: "2",
                          },

                          {
                            label: 3,
                            value: "3",
                          },
                        ]}
                        control="select"
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item container alignItems="center">
                <Grid item xs={3} display={{ md: "block", xs: "none" }}>
                  <CustomSubTypography
                    fontSize={{ xs: "1.4rem" }}
                    text="Contact"
                  />
                </Grid>
                <Grid item md={8} xs={12}>
                  <Grid
                    item
                    container
                    gap={2}
                    flexWrap="nowrap"
                    justifyContent="space-between"
                  >
                    <Grid item container>
                      <FormikControl
                        name="contact"
                        placeholder="Contact"
                        control="input"
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item container alignItems="center">
                <Grid item xs={3} display={{ md: "block", xs: "none" }}>
                  <CustomSubTypography fontSize={{ xs: "1.4rem" }} text="Web" />
                </Grid>
                <Grid item xs={12} md={8}>
                  <Grid
                    item
                    container
                    gap={2}
                    flexWrap="nowrap"
                    justifyContent="space-between"
                  >
                    <Grid item container>
                      <FormikControl
                        name="web"
                        placeholder="Web"
                        control="input"
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item container alignItems="center">
                <Grid item xs={3} display={{ md: "block", xs: "none" }}>
                  <CustomSubTypography fontSize={{ xs: "1.4rem" }} text="Bio" />
                </Grid>
                <Grid item xs={12} md={8}>
                  <Grid item container>
                    <FormikControl
                      name="web"
                      placeholder="A few details about yourself"
                      control="input"
                      multiline={true}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item container alignItems="center">
                <Grid item xs={3} display={{ md: "block", xs: "none" }}>
                  <CustomSubTypography
                    fontSize={{ xs: "1.4rem" }}
                    text="Location"
                  />
                </Grid>
                <Grid item md={8} xs={12}>
                  <Grid item container>
                    <FormikControl
                      name="location"
                      placeholder="location"
                      control="input"
                      helperText="Where do you stay"
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item container alignItems="center">
                <Grid item xs={3} display={{ md: "block", xs: "none" }}>
                  <CustomSubTypography
                    fontSize={{ xs: "1.4rem" }}
                    text="Occupation"
                  />
                </Grid>
                <Grid item md={8} xs={12}>
                  <Grid item container>
                    <FormikControl
                      name="occupation"
                      placeholder="Occupation"
                      control="input"
                      helperText="Where do you do"
                    />
                  </Grid>
                </Grid>
              </Grid>
              {/* interest */}
            </Grid>
          </Form>
        </Formik>
      </Grid>
    </Grid>
  );
};

ProfileSetting.propTypes = {};

export default ProfileSetting;
