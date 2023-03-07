import { Divider, Grid, IconButton, Typography } from "@mui/material";
import { CustomButton } from "components";
import { Formik, Form } from "formik/dist";
import FormikControl from "validation/FormikControl";
import Fb from "assets/svgs/Fb";
import Insta from "assets/svgs/Insta";
import Linkedin from "assets/svgs/Linkedin";
import Twitterr from "assets/svgs/Twitterr";
import Utube from "assets/svgs/Utube";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { useContactAdminMutation } from "redux/slices/authSlice";
import { toast } from "react-toastify";

const validationSchema = Yup.object({
  textarea: Yup.string("Enter Your Message").required("Required"),
  name: Yup.string("Enter Your Name").required("Required"),
  registration: Yup.string().required("Required"),
  email: Yup.string().email("Enter Valid Email").required("Required"),
});
const ContactUs = () => {
  const arr = [
    {
      id: 1,
      Icon: Fb,
      link: "#",
    },
    {
      id: 2,
      Icon: Insta,
      link: "#",
    },
    {
      id: 3,
      Icon: Linkedin,
      link: "#",
    },
    {
      id: 4,
      Icon: Twitterr,
      link: "#",
    },
    {
      id: 4,
      Icon: Utube,
      link: "#",
    },
  ];

  const [sendAdminMessage, { isLoading }] = useContactAdminMutation();
  const handleSubmit = async (values, { resetForm }) => {
    const { textarea, name, email, registration } = values;
    const { data, error } = await sendAdminMessage({
      name,
      email,
      subject: registration,
      text: textarea,
    });
    if (data) toast.success(data);
    if (error) toast.success(error);
    setTimeout(() => resetForm(), 3000);
  };
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
                onSubmit={handleSubmit}
                initialValues={{
                  registration: "registration",
                  textarea: "",
                  name: "",
                  email: "",
                }}
                validationSchema={validationSchema}
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
                        fontSize: {
                          md: "2rem",
                          xs: "1.8rem",
                          sm: "1.4rem",
                        },
                      }}
                      fontWeight={500}
                    >
                      Subject
                    </Typography>
                    <Grid item container flexDirection="column" gap={2}>
                      <Grid
                        item
                        container
                        flexWrap={{ md: "nowrap", xs: "wrap" }}
                        gap={1}
                      >
                        <Grid item>
                          <FormikControl
                            name="registration"
                            control={"radio"}
                            label="Registration Problem"
                          />
                        </Grid>
                        <Grid item>
                          <FormikControl
                            name="registration"
                            control={"radio"}
                            label="Feedback"
                          />
                        </Grid>

                        <Grid item>
                          <FormikControl
                            name="registration"
                            control={"radio"}
                            label="Advert"
                          />
                        </Grid>
                        <Grid item>
                          <FormikControl
                            name="registration"
                            control={"radio"}
                            label="Others"
                          />
                        </Grid>
                      </Grid>
                      {/* </RadioGroup> */}

                      <Grid item container>
                        <FormikControl
                          name="textarea"
                          control={"textarea"}
                          rows={8}
                          placeholder="Enter Message here"
                        />
                      </Grid>
                      <Grid item>
                        <CustomButton
                          title="Send"
                          type="submit"
                          isSubmitting={isLoading}
                          borderRadius={"0px"}
                        />
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
                {arr.map((icon, index) => (
                  <IconButton key={icon.id} component={Link} to={icon.link}>
                    <icon.Icon sx={{ fontSize: "3rem" }} />
                  </IconButton>
                  // <Avatar
                  //   src={icon}
                  //   key={index}
                  //   variant="square"
                  //   style={{ height: "3rem", color: "red", width: "3rem" }}
                  // />
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
