import { Avatar, Divider, Grid, Typography } from "@mui/material";
import { CustomButton } from "components";
import { Formik, Form } from "formik/dist";
import FormikControl from "validation/FormikControl";
import images from "assets";
const ContactUs = () => {
  const { facebook, youtube, linkedin, twitter, instagram } = images;
  const icons = [facebook, youtube, linkedin, twitter, instagram];
  return (
    <Grid
      container
      item
      flexDirection="column"
      gap={3}
      sx={{
        p: { md: "4rem", xs: "1rem" },

        background: "#E5E5E5",
      }}
    >
      <Grid
        item
        container
        flexDirection="column"
        sx={{
          background: "#fff",
          p: { md: 6, xs: 2, sm: 3 },
          pb: "3rem",
          borderRadius: { md: "2rem", xs: "1rem" },
        }}
      >
        <Typography
          sx={{
            color: "#5F5C5C",
            fontSize: { md: "2.5rem", xs: "1.8rem", sm: "2rem" },
          }}
          fontWeight={700}
        >
          Contact Us
        </Typography>
        <Divider flexItem sx={{ borderWidth: "2px", borderColor: "#FF9B04" }} />
        <Grid item md={7} xs={12}>
          <Grid container>
            <Grid item container flexDirection="column">
              <Typography
                sx={{
                  mt: 4,
                  color: "#5F5C5C",
                  textAlign: "justify",
                  fontSize: { md: "2rem", xs: "1.8rem", sm: "1.4rem" },
                }}
                fontWeight={500}
              >
                Send an Email to the Administrator
              </Typography>
              <Formik
                initialValues={{
                  registration: false,
                  feedback: false,
                  name: "",
                  email: "",
                  other: true,
                  advert: false,
                  textarea: "",
                }}
              >
                <Form>
                  <Grid item container gap={2}>
                    <Grid item container>
                      <FormikControl
                        name="name"
                        placeholder="Enter Full Name"
                      />
                    </Grid>
                    <Grid item container>
                      <FormikControl
                        name="email"
                        placeholder="Enter Email Address"
                      />
                    </Grid>
                  </Grid>

                  <Grid item container flexDirection="column">
                    <Typography
                      sx={{
                        mt: 4,
                        color: "#5F5C5C",
                        textAlign: "justify",
                        fontSize: { md: "2rem", xs: "1.8rem", sm: "1.4rem" },
                      }}
                      fontWeight={500}
                    >
                      Subject
                    </Typography>

                    <Grid item container flexDirection={"column"} gap={2}>
                      <Grid item container gap={2} alignItems="center">
                        <Grid item>
                          <FormikControl
                            name="registration"
                            control={"checkbox"}
                            label="Registration Problem"
                          />
                        </Grid>
                        <Grid item>
                          <FormikControl
                            name="feedback"
                            control={"checkbox"}
                            label="Feedback"
                          />
                        </Grid>
                      </Grid>
                      <Grid item container gap={2} alignItems="center">
                        <Grid item>
                          <FormikControl
                            name="advert"
                            control={"checkbox"}
                            label="Advert"
                          />
                        </Grid>
                        <Grid item>
                          <FormikControl
                            name="other"
                            control={"checkbox"}
                            label="Others"
                          />
                        </Grid>
                      </Grid>
                      <Grid item container>
                        <Grid item container>
                          <FormikControl
                            name="textarea"
                            control={"textarea"}
                            rows={8}
                            placeholder="Enter Message here"
                          />
                        </Grid>
                      </Grid>
                      <Grid item>
                        <CustomButton title="Send" borderRadius={"0px"} />
                      </Grid>
                    </Grid>
                  </Grid>
                </Form>
              </Formik>
              <Typography
                color="secondary"
                sx={{ mt: 5 }}
                fontSize={{ md: "2rem", xs: "1.5rem" }}
                fontWeight={600}
              >
                Join our community and get more updates
              </Typography>
              <Grid item container gap={4} sx={{ mt: 4 }}>
                {icons.map((icon, index) => (
                  <Avatar
                    src={icon}
                    key={index}
                    variant="square"
                    style={{ height: "3rem", width: "3rem" }}
                  />
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ContactUs;
