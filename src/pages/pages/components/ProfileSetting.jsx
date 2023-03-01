import { Button, Grid, Skeleton, Typography } from "@mui/material";
import { Formik, Form } from "formik/dist";
import FormikControl from "validation/FormikControl";
import { styled } from "@mui/material/styles";
import {
  useGetUserSettingsQuery,
  useUpdateUserSettingsMutation,
  useUserProfileQuery,
} from "redux/slices/authSlice";
import { getDate } from "helpers";
import * as Yup from "yup";
import { CustomButton } from "components";
import { toast } from "react-toastify";

const validationSchema = Yup.object({
  title: Yup.string().required("Required"),
  occupation: Yup.string(),
  location: Yup.string(),
  contact: Yup.string(),
  web: Yup.string().url("must be a valid URL").required("Required"),
});
const ProfileSetting = (props) => {
  const CustomSubTypography = styled(({ text, ...rest }) => (
    <Typography {...rest}>{text}</Typography>
  ))(({ theme }) => ({
    fontSize: "2.2rem",
    fontWeight: 600,
    color: "#5F5C5C",
  }));
  const { data: user, isLoading: loading } = useGetUserSettingsQuery();
  const [updateProfile, { isLoading }] = useUpdateUserSettingsMutation();
  const { data: profile, isLoading: profileLoading } = useUserProfileQuery();
  if (loading || profileLoading) return <Skeleton />;
  const { occupation, dob, phone, location } = profile;
  const dt = getDate(dob)?.split("-");
  const handleSubmit = async (values) => {
    const { title, web } = values;

    const titleValue = {
      name: "title",
      type: "string",
      value: title,
    };

    const webValue = {
      name: "web",
      type: "string",
      value: web,
    };
    const { data, error } = await updateProfile({
      settings: [titleValue, webValue],
    });
    if (data) toast.success(data);
    if (error) toast.error(error);
  };

  return (
    <Grid item container>
      <Grid item md={10} xs={12} sx={{ p: { md: 3, xs: 1 } }}>
        <Formik
          enableReinitialize
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          initialValues={{
            title: user?.title?.value || "",
            day: dt[0] || "",
            month: dt[1] || "",
            year: dt[2] || "",
            occupation: occupation || "",
            location: location || "",
            bio: "",
            contact: phone || "",
            web: user?.web?.value || "",
            displayDOB: true,
          }}
        >
          <Form style={{ width: "100%" }}>
            <Grid item container gap={2}>
              <Grid item container>
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
              <Grid item container>
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
                        options={[
                          {
                            label: dt[0],
                            value: dt[0],
                          },
                        ]}
                        disabled
                        control="select"
                      />
                    </Grid>
                    <Grid item md={3} xs={12}>
                      <FormikControl
                        placeholder="Month"
                        name="month"
                        control="select"
                        disabled
                        options={[
                          {
                            label: dt[1],
                            value: dt[1],
                          },
                        ]}
                      />
                    </Grid>
                    <Grid item md={3} xs={12}>
                      <FormikControl
                        placeholder="Year"
                        name="year"
                        disabled
                        options={[
                          {
                            label: dt[2],
                            value: dt[2],
                          },
                        ]}
                        control="select"
                      />
                    </Grid>
                  </Grid>
                  <Grid item container flex={1}>
                    <FormikControl
                      control={"checkbox"}
                      name="displayDOB"
                      label={" Display my date of birth on my profile"}
                    />
                  </Grid>
                </Grid>
              </Grid>
              {/* <Grid item container>
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
              </Grid> */}

              <Grid item container>
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
              <Grid item container>
                <Grid item xs={3} display={{ md: "block", xs: "none" }}>
                  <CustomSubTypography fontSize={{ xs: "1.4rem" }} text="Bio" />
                </Grid>
                <Grid item xs={12} md={8}>
                  <Grid item container>
                    <FormikControl
                      name="bio"
                      placeholder="A few details about yourself"
                      control="input"
                      multiline={true}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item container>
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
              {/* <Grid item container>
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
              </Grid> */}
              <Grid
                item
                container
                flexWrap="nowrap"
                gap={2}
                sx={{ mt: 2 }}
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
                    fontWeight: 700,
                    borderRadius: "5rem",
                  }}
                  color="success"
                >
                  Reset
                </Button>
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
