import {
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import images from "assets";
import { Link } from "react-router-dom";
import LoginModal from "./modals/LoginModal";
import { useState } from "react";
import RegisterModal from "./modals/RegisterModal";
import ForgottenPassword from "./modals/ForgottenPassword";
import FormikControl from "validation/FormikControl";
import { Formik, Form } from "formik/dist";
import CustomButton from "./CustomButton";
import {
  WhatsappShareButton,
  WhatsappIcon,
  TwitterShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TwitterIcon,
  FacebookIcon,
  FacebookShareButton,
} from "react-share";
import { useSelector } from "react-redux";

const socialItems = [
  {
    Icon: FacebookIcon,
    Button: FacebookShareButton,
  },
  {
    Button: LinkedinShareButton,
    Icon: LinkedinIcon,
  },
  {
    // }&text=${encodeURI("Here is a post on " + data?.title)}`,
    Icon: TwitterIcon,
    Button: TwitterShareButton,
  },
  {
    Icon: WhatsappIcon,
    Button: WhatsappShareButton,
  },
];
const Footer = () => {
  const token = useSelector((state) => state.auth.token);
  const [modal, setModal] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const id = process.env.REACT_APP_ADMIN_ID;
  const [showForgottenPassword, setShowForgottenPassword] = useState(false);
  const handleRegisterClose = () => setModal(false);
  const handleLoginClose = () => setIsLogin(false);

  const items = [
    {
      name: "Terms & Condtions",
      route: "/guideline",
    },
    {
      name: "Contact Us",
      route: "/contact-us",
    },

    {
      name: "Privacy Policy",
      route: "/privacy",
    },
    {
      name: "Message Moderator",
      route: "#",
    },
  ];
  const items2 = [
    {
      name: token ? "Trending" : "Sign Up",
      route: token && "/trending",
    },
    {
      name: token ? "Live Updates" : "Login",
      route: token && "/live",
    },
    {
      name: token ? "Recent Topic" : "Forgotten Password",
      route: token && "/recent",
    },
  ];
  return (
    <>
      <Grid
        item
        container
        sx={{
          color: "#fff",
          p: { md: "4rem", xs: "1rem" },
          backgroundColor: "#044402",
        }}
      >
        <Grid
          item
          container
          gap={4}
          sx={{
            // padding: "3rem",
            mb: 2,
            flexWrap: { md: "nowrap", xs: "wrap" },
            flexDirection: { md: "row", xs: "column" },
          }}
        >
          <Grid item sx={{ flex: { md: 1.2, xs: 1 } }}>
            <img src={images.logo} alt="ceetok" style={{ width: "10rem" }} />
            <Typography
              style={{
                fontSize: "1.2rem",
                fontWeight: 500,
                textAlign: "justify",
              }}
            >
              Join the conversation and share your perspective on pressing and
              trivial social issues with a community of engaged and diverse
              individuals.
            </Typography>
          </Grid>
          <Grid item>
            <List sx={{ maxWidth: "max-content" }}>
              <ListItem dense disableGutters>
                <ListItemText
                  primaryTypographyProps={{
                    fontSize: "1.3rem",
                    fontWeight: 700,
                  }}
                  primary="Company"
                />
              </ListItem>

              {items.map((item, index) => (
                <ListItemButton
                  disableGutters
                  disableRipple
                  key={index}
                  disableTouchRipple
                  component={Link}
                  to={
                    item.name === "Message Moderator" && token
                      ? `user/message/${id}`
                      : item.route
                  }
                  onClick={() => {
                    if (!token) setIsLogin(true);
                  }}
                >
                  <ListItemText primary={item.name} />
                </ListItemButton>
              ))}
            </List>
          </Grid>
          <Grid item sx={{ flex: { md: 1, xs: 0.5 } }}>
            <List>
              <ListItem dense disableGutters>
                <ListItemText
                  primaryTypographyProps={{
                    fontSize: "1.3rem",
                    fontWeight: 700,
                  }}
                  primary="Quick Links"
                />
              </ListItem>

              {items2.map((item, index) => (
                <ListItem
                  disableGutters
                  disablePadding
                  key={index}
                  onClick={() =>
                    item.name === "Sign Up"
                      ? setModal(true)
                      : item.name === "Login"
                      ? setIsLogin(true)
                      : item.name === "Forgotten Password"
                      ? setShowForgottenPassword(true)
                      : null
                  }
                >
                  <ListItemButton
                    disableGutters
                    disableRipple
                    disableTouchRipple
                    component={Link}
                    to={item.route}
                  >
                    <ListItemText primary={item.name} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Grid>
          <Grid item sx={{ flex: { md: 1.2, xs: 0.5 } }}>
            <List>
              <ListItem dense disableGutters>
                <ListItemText
                  disableTypography
                  sx={{ fontSize: "1.3rem", fontWeight: 700 }}
                >
                  Community
                </ListItemText>
              </ListItem>

              <Grid
                item
                container
                justifyContent="space-between"
                // alignItems="center"
              >
                {socialItems.map((social, index) => (
                  <ListItemButton disableGutters key={index}>
                    <social.Button url={"#"} quote={"#"}>
                       <social.Icon size={32} round />
                    </social.Button>
                  </ListItemButton>
                ))}
              </Grid>
            </List>
          </Grid>
          <Grid item sx={{ flex: { md: 2.5, xs: 1 }, order: { xs: 1, md: 5 } }}>
            <List>
              <ListItem dense disableGutters>
                <ListItemText
                  disableTypography
                  sx={{
                    fontSize: "1.3rem",
                    textAlign: "center",
                    fontWeight: 700,
                  }}
                >
                  Subscribe to our updates{" "}
                </ListItemText>
              </ListItem>

              <ListItemText
                sx={{ fontSize: "1.2rem" }}
                primary={
                  "Join over 2,000 subscribers and get the latest and trending updates"
                }
              />
            </List>
            <Grid item container alignItems="center">
              <Formik initialValues={{ address: "" }}>
                <Form style={{ width: "100%" }}>
                  <Grid
                    item
                    container
                    gap={2}
                    flexWrap="nowrap"
                    alignItems="center"
                    sx={{
                      flexWrap: { sm: "nowrap", xs: "wrap" },
                    }}
                    flexDirection={{ xs: "column", sm: "row" }}
                  >
                    <Grid item flex={1} sx={{ width: "100%" }}>
                      <Grid container>
                        <FormikControl
                          type="text"
                          placeholder="Enter Email Address"
                          name="address"
                        />
                      </Grid>
                    </Grid>
                    <Grid item>
                      <CustomButton
                        type="submit"
                        sx={{ minHeight: "4rem" }}
                        height={"4rem"}
                        width={"12rem"}
                        title="Subscribe"
                        borderRadius={0}
                      />
                    </Grid>
                  </Grid>
                </Form>
              </Formik>
            </Grid>
          </Grid>
        </Grid>
        <Typography
          sx={{
            fontSize: "1.3rem",
            textAlign: "center",
            fontWeight: 600,
            width: "100%",
            color: "rgba(255, 255, 255, 0.6)",
          }}
          variant="p"
        >
          Copyright - Ceetok (C) 2023
        </Typography>
      </Grid>
      {modal && (
        <RegisterModal handleClose={handleRegisterClose} isOpen={modal} />
      )}

      {isLogin && (
        <LoginModal
          handleClose={handleLoginClose}
          setIsLogin={setIsLogin}
          isLogin={isLogin}
        />
      )}

      <ForgottenPassword
        handleClose={() => {
          setShowForgottenPassword(false);
          // handleClose();
        }}
        isOpen={showForgottenPassword}
      />
    </>
  );
};

export default Footer;
