import { CloseOutlined } from "@mui/icons-material";
import {
  Grid,
  Button,
  Typography,
  FormControlLabel,
  Switch,
  ButtonBase,
  Divider,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import images from "assets";
import { Form, Formik } from "formik/dist";
import { useState } from "react";
import FormikControl from "validation/FormikControl";
import { ForgottenPassword } from ".";
import Modals from "components/Modal";

export const CustomButton = styled(ButtonBase)(({ theme }) => ({
  background: "#37D42A",
  display: "block",
  fontFamily: "Raleway",
  padding: "1em 3em",
  borderRadius: "2em",
  color: "#fff",
  fontSize: "1.4rem",
  fontWeight: 700,
  "&:hover, &.Mui-focusVisible": {
    zIndex: 1,
  },
}));
const LoginModal = ({ handleClose, handleRegisterOpen }) => {
  const [state, setState] = useState(false);
  const [showForgottenPassword, setShowForgottenPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const handleConfirmOpen = () => {
    setShowForgottenPassword(true);
    setShowPassword(true);
  };
  return (
    <>
      <Grid
        container
        sx={{
          position: "absolute",
          zIndex: 3,
          borderRadius: "2.5rem",
          top: 0,
          left: 0,
          height: "100%",
        }}
      >
        <Grid
          item
          xs={7.5}
          sx={{ background: "#fff", borderRadius: "2rem 0 0 2rem" }}
        >
          <Grid
            container
            sx={{
              backgroundColor: "inherit",
              height: "100%",
              padding: "3rem",
              borderRadius: "2rem 0 0 2rem",
              color: "#fff",
            }}
            flexDirection="column"
          >
            <Grid item sx={{ marginRight: "auto" }}>
              <CloseOutlined
                onClick={handleClose}
                style={{ color: "#000", fontSize: 20, cursor: "pointer" }}
              />
            </Grid>
            <Grid
              item
              container
              justifyContent="center"
              sx={{ mt: 4, background: "#fff" }}
              flexDirection="column"
            >
              <Typography
                sx={{
                  color: "#464646",
                  textAlign: "center",
                  fontSize: "3.5rem",
                  fontWeight: "700",
                }}
              >
                Welcome Back
              </Typography>
              <Typography
                sx={{
                  color: "#9B9A9A",
                  textAlign: "center",
                  fontSize: "1.5rem",
                  fontWeight: "500",
                }}
              >
                Login with social networks
              </Typography>
              <Grid
                item
                container
                gap={8}
                sx={{ mt: 4, mb: 3 }}
                justifyContent="center"
              >
                <img
                  src={images.fb}
                  style={{
                    objectFit: "contain",
                    height: "3rem",
                    width: "3rem",
                  }}
                  alt="facebook icon"
                />
                <img
                  src={images.gmail}
                  style={{
                    objectFit: "contain",
                    height: "3rem",
                    width: "3rem",
                  }}
                  alt="gmail icon"
                />
              </Grid>
              <Divider
                flexItem
                variant="middle"
                textAlign="center"
                sx={{
                  color: "#828484",
                  fontSize: "1.2rem",
                  alignItems: "center",
                  fontWeight: 700,
                }}
              >
                OR
              </Divider>
              <Grid item container sx={{ mt: 3 }}>
                <Formik
                  enableReinitialize
                  initialValues={{ email_or_phone: "", name: "", password: "" }}
                >
                  <Form style={{ width: "100%" }}>
                    <Grid xs={10} sx={{ mx: "auto" }}>
                      <Grid
                        container
                        flexDirection="column"
                        alignItems="center"
                      >
                        <Grid item container sx={{ mt: 2 }}>
                          <FormikControl
                            control="input"
                            name={"email_or_phone"}
                            type={state ? "email" : "text"}
                            placeholder={
                              state ? "Email Address" : "Phone number"
                            }
                          />
                        </Grid>
                        <Grid item container sx={{ mt: 2 }}>
                          <FormikControl
                            control="input"
                            name="password"
                            placeholder="Password"
                            type={showPassword ? "text" : "password"}
                          />
                        </Grid>
                        <Grid
                          item
                          container
                          flexWrap="nowrap"
                          justifyContent="space-between"
                          alignItems="center"
                          sx={{ mt: 1 }}
                        >
                          <Typography
                            sx={{
                              fontWeight: 500,
                              fontSize: "1.3rem",
                              color: "#828484",
                            }}
                          >
                            Login with{" "}
                            <Typography
                              variant="span"
                              sx={{
                                color: "#37D42A",
                                fontWeight: 700,
                                cursor: "pointer",
                              }}
                              onClick={() => setState(!state)}
                            >
                              {state ? "Phone Number?" : "Email Address"}
                            </Typography>
                          </Typography>
                          <Typography
                            sx={{
                              fontWeight: 700,
                              fontSize: "1rem",
                              color: "#828484",
                              cursor: "pointer",
                              "&:hover": {
                                color: "#37D42A",
                              },
                            }}
                            onClick={() => setShowForgottenPassword(true)}
                          >
                            Forgot Password
                          </Typography>
                        </Grid>

                        <Grid
                          item
                          container
                          justifyContent="space-between"
                          alignItems="center"
                          style={{ marginTop: 3 }}
                        >
                          <FormControlLabel
                            value={showPassword}
                            sx={{ m: 0 }}
                            control={
                              <Switch
                                color="success"
                                sx={{ m: 0, color: "#37D42A" }}
                                onChange={() => setShowPassword(!showPassword)}
                              />
                            }
                            label="Show Password"
                            labelPlacement="bottom"
                          />
                          <CustomButton>Login</CustomButton>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Form>
                </Formik>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        {/* right */}
        <Grid item xs={4.5}>
          <Grid
            container
            sx={{
              backgroundColor: "#044402",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              padding: "3rem",
              borderRadius: "0 2rem 2rem 0",
              color: "#fff",
            }}
          >
            <Grid item container justifyContent="center">
              <Typography
                style={{
                  fontSize: "3.2rem",
                  textAlign: "center",
                  fontWeight: 700,
                  color: "#fff",
                }}
              >
                New Here?
              </Typography>
              <Typography
                sx={{
                  fontSize: "1.8rem",
                  fontWeight: 400,
                  my: 6,
                  textAlign: "center",
                }}
              >
                Stay connected with up-to-date news
              </Typography>

              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#fff",
                  padding: "1rem 5em",
                  color: "#464646",
                  borderRadius: 50,
                  fontWeight: 700,
                  fontSize: "1.2rem",
                  "&:hover": {
                    background: "#fff",
                  },
                }}
                onClick={handleRegisterOpen}
              >
                Sign-up
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Modals
        styles={{ width: "60vw", height: "95vh" }}
        isOpen={showForgottenPassword}
      >
        <ForgottenPassword
          handleClose={() => {
            setShowForgottenPassword(false);
            handleClose();
          }}
          handlesetConfirmOpen={() => showForgottenPassword(true)}
        />
      </Modals>
      {/* {showForgottenPassword && <ForgottenPassword />} */}
    </>
  );
};

export default LoginModal;
