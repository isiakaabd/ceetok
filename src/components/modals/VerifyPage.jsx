import { Avatar, Grid, Skeleton, Typography } from "@mui/material";

import { Formik, Form } from "formik/dist";
import FormikControl from "validation/FormikControl";
// import { CustomButton } from "components";
import images from "assets";
import {
  CakeOutlined,
  FemaleOutlined,
  RoomOutlined,
} from "@mui/icons-material";
// import { ConfirmMail } from ".";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { ChipItem, CustomButton } from "components";
import Dialogs from "components/Dialog";
import {
  useUserProfileQuery,
  useUserProfileUpdateMutation,
} from "redux/slices/authSlice";
import * as Yup from "yup";
import { TextError } from "validation/TextError";
const VerifyPage = ({ isOpen, handleClose }) => {
  const likes = [
    "entertainment",
    "politics",
    "crimes",
    "romance",
    "education",
    "technology",
    "celebrities",
    "fashion",
    "health",
    "travel",
    "crypto",
    "religion",
    "sports",
    "jobs",
    "tv",
    "science",
    "business",
    "jokes",
  ];
  const boxStyle = {
    padding: "2rem",
    border: "1px solid #9B9A9A",
    borderRadius: "1.2rem",
  };
  const agreement = {
    cursor: "pointer",
    color: "#37D42A",
  };
  const { data: profile, isLoading } = useUserProfileQuery();
  const [updateProfile, { isLoading: loading }] =
    useUserProfileUpdateMutation();
  const validationSchema = Yup.object({
    username: Yup.string("Enter Username").required("Required"),
    location: Yup.string("Enter location").required("Required"),
    dob: Yup.string("Enter DOB").required("Required"),
    gender: Yup.string("Enter DOB").required("Required"),
    full_name: Yup.string("Enter  full Name").required("Required"),
    interests: Yup.array().min(3, "At least 3").required("Required"),
  });
  const handleSubmit = async (values) => {
    const { dob, location, interests, full_name, gender, username } = values;
    const res = await updateProfile({
      dob,
      location,
      interests,
      full_name,
      gender,
      username,
    });
    console.log(res);
  };

  if (isLoading) return <Skeleton />;
  const {
    full_name,
    dob,
    location,
    interests,
    phone,
    id,
    avatar,
    gender,
    username,
  } = profile;
  const initialValues = {
    username: username || "",
    dob: dob || "",
    interests: interests || [],
    gender: gender || "",
    location: location || "",
    full_name: full_name || "",
  };
  return (
    <Dialogs
      height="90vh"
      styles={{ height: { xs: "auto", md: "auto" } }}
      // width={{ md: "60vw", xs: "95%", sm: "90%" }}
      isOpen={isOpen}
      handleClose={handleClose}
      background="#fff"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        enableReinitialize
        onSubmit={handleSubmit}
      >
        {({ values, errors }) => {
          return (
            <Form>
              <Grid
                item
                container
                flexDirection="column"
                sx={{
                  height: "100%",
                  padding: { md: "1rem", xs: "2rem 0" },
                }}
                flexWrap="nowrap"
                gap={2}
              >
                <Typography
                  sx={{
                    color: "#464646",
                    fontWeight: 700,
                    textAlign: "center",
                    fontSize: { md: "2.8rem", xs: "1.5rem" },
                  }}
                >
                  Complete Registration
                </Typography>

                <Grid
                  item
                  gap={3}
                  container
                  display="grid"
                  sx={{
                    gridTemplateColumns: ".8fr 4fr",
                  }}
                >
                  {/* image */}
                  <Grid
                    item
                    justifyContent="center"
                    alignItems={{ xs: "flex-end" }}
                    container
                    // xs={2}
                    sx={{
                      height: "100%",
                      gridColumn: "1/2",
                      gridRow: { md: "1/3", xs: "1/2" },
                    }}
                  >
                    <Grid item>
                      <Avatar
                        sx={{
                          width: "10rem",
                          // display: "inline-block",
                          height: "10rem",
                        }}
                        alt={full_name}
                        src={avatar}
                      />
                      <Typography
                        sx={{
                          textAlign: "center",
                          color: "#5F5C5C",
                          fontWeight: 700,
                          fontSize: { md: "1.5rem", xs: "1rem" },
                          whiteSpace: "nowrap",
                        }}
                      >
                        Update Avatar
                      </Typography>
                    </Grid>
                  </Grid>

                  <Grid
                    container
                    gap={2}
                    gridColumn="2/3"
                    gridRow="1/2"
                    alignItems="center"
                  >
                    <Grid
                      item
                      flex={1}
                      justifyContent="center"
                      sx={{ color: "#464646" }}
                    >
                      <Typography
                        sx={{ fontSize: { md: "2.8rem", xs: "1.5rem" } }}
                      >
                        {full_name}
                      </Typography>
                      <Typography
                        variant="h4"
                        sx={{ fontSize: { md: "1.3rem", xs: "1rem" }, my: 1 }}
                      >
                        ID: {id.slice(0, 7)}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <CustomButton
                        variant="contained"
                        title="change"
                        sx={{
                          padding: { md: ".2rem 2rem", xs: ".2rem 1rem" },
                          borderRadius: 50,
                          color: "#fff",
                          fontSize: "1rem",
                          fontWeight: 500,
                        }}
                        disableElevation
                      />
                    </Grid>
                  </Grid>

                  <Grid
                    item
                    container
                    sx={{ mt: 2 }}
                    gridColumn={{ md: "2/3", xs: "1/3" }}
                    gridRow="2/3"
                  >
                    <Grid item container gap={2} flexDirection="column">
                      <Grid
                        item
                        container
                        gap={2}
                        flexWrap={{ md: "nowrap", xs: "wrap" }}
                      >
                        <Grid item xs={12} md={6}>
                          <FormikControl
                            control="inputs"
                            name="username"
                            placeholder="Username"
                            Icon={AccountCircle}
                            buttonStyle={{ background: "inherit" }}
                          />
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <FormikControl
                            control="inputs"
                            name="dob"
                            placeholder="YYYY-MM-DD"
                            Icon={CakeOutlined}
                            buttonStyle={{ background: "inherit" }}
                          />
                        </Grid>
                      </Grid>
                      <Grid
                        item
                        container
                        gap={2}
                        flexWrap={{ md: "nowrap", xs: "wrap" }}
                      >
                        <Grid item xs={12} md={6}>
                          <FormikControl
                            control="selects"
                            buttonStyle={{ background: "inherit" }}
                            name="gender"
                            options={[
                              {
                                label: "Male",
                                value: "m",
                              },
                              {
                                label: "Female",
                                value: "f",
                              },
                            ]}
                            Icon={FemaleOutlined}
                            placeholder="Gender"
                          />
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <FormikControl
                            buttonStyle={{ background: "inherit" }}
                            control="inputs"
                            name="location"
                            Icon={RoomOutlined}
                            placeholder="Location"
                          />
                        </Grid>
                      </Grid>
                      <Grid
                        item
                        container
                        // gap={2}
                        flexWrap={{ md: "nowrap", xs: "wrap" }}
                      >
                        <FormikControl
                          buttonStyle={{ background: "inherit" }}
                          control="inputs"
                          name="full_name"
                          Icon={RoomOutlined}
                          placeholder="Full Name"
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid
                  item
                  container
                  sx={{ flexDirection: "column" }}
                  // sx={{ }}
                  flexWrap="nowrap"
                >
                  <Grid
                    item
                    container
                    flexDirection={"column"}
                    flexWrap="nowrap"
                    sx={{
                      ...boxStyle,

                      border: { md: "1px solid #9B9A9A", xs: "none" },
                      textAlign: { sm: "center", md: "left" },
                    }}
                  >
                    <Typography
                      sx={{
                        color: "#5F5C5C",
                        fontWeight: 700,
                        fontSize: { md: "2rem", sm: "1.6rem" },
                        textAlign: { xs: "center", md: "left" },
                      }}
                    >
                      Area Of Interest
                    </Typography>
                    <Typography
                      sx={{
                        color: "#464646",
                        mb: 2,
                        fontSize: { md: "1.8rem", sm: "1.4rem" },
                        textAlign: { xs: "justify", md: "left" },
                      }}
                    >
                      Select atleast three (3) interest that matches the updates
                      you want to always get
                    </Typography>
                    <Grid
                      item
                      container
                      gap={2}
                      sx={{
                        height: { xs: "200px", md: "auto" },
                        overflowY: { md: "hidden", xs: "scroll" },
                      }}
                    >
                      {likes.map((item, index) => (
                        <ChipItem
                          item={item}
                          key={index}
                          name="interests"
                          size="medium"
                        />
                      ))}
                    </Grid>
                  </Grid>
                  {errors && <TextError>{errors.interests}</TextError>}
                  <Typography
                    sx={{
                      my: 3,
                      px: "2rem",
                      fontWeight: 700,
                      color: "#636262",
                      fontSize: "1.5rem",
                    }}
                  >
                    Selected:
                    <Grid item container>
                      {values.interests.map((interest) => (
                        <Typography variant="span" sx={{ fontWeight: 400 }}>
                          {interest} {" ,"}
                        </Typography>
                      ))}
                    </Grid>
                  </Typography>

                  <Grid
                    item
                    container
                    sx={{
                      ...boxStyle,
                      border: { md: "1px solid #9B9A9A", xs: "none" },
                    }}
                  >
                    <Typography
                      sx={{
                        color: "#5F5C5C",
                        fontWeight: 700,
                        fontSize: { md: "1.5rem", sm: "1.3rem" },
                        textAlign: { xs: "center", md: "left" },
                        width: "100%",
                      }}
                    >
                      Privacy Policy
                    </Typography>
                    <Typography
                      sx={{
                        mt: 2,
                        mb: 4,
                        color: "#636262",
                        fontSize: { md: "1.6rem", sm: "1.3rem" },
                      }}
                    >
                      By clicking on “Complete Registration” you agree to our{" "}
                      <Typography sx={agreement} variant="span">
                        terms of service
                      </Typography>{" "}
                      and{" "}
                      <Typography sx={agreement} variant="span">
                        privacy policy{" "}
                      </Typography>
                    </Typography>
                    <CustomButton
                      title="Complete Registration"
                      width="30rem"
                      isSubmitting={loading}
                      type="submit"
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Form>
          );
        }}
      </Formik>
    </Dialogs>
  );
};

export default VerifyPage;
