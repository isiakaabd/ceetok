import { CloseOutlined } from "@mui/icons-material";
import {
  Grid,
  Button,
  Typography,
  FormControlLabel,
  Switch,
  Divider,
  IconButton,
} from "@mui/material";

import images from "assets";
import { Form, Formik } from "formik/dist";
import { useState } from "react";
import FormikControl from "validation/FormikControl";
import ForgottenPassword from "./ForgottenPassword";
import Modals from "components/Modal";
import { CustomButton } from "components";
import RegisterModal from "./RegisterModal";
import * as Yup from "yup";
import { useLoginMutation } from "redux/slices/authSlice";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { checkAdmin, loginAction } from "redux/reducers/authReducer";
const LoginModal = ({ isLogin, handleClose, setIsLogin }) => {
  const [loginUser, { isLoading }] = useLoginMutation();
  const [state, setState] = useState(false);
  const [register, setRegister] = useState(false);
  const [showForgottenPassword, setShowForgottenPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Validation

  const loginValidation = Yup.object({
    email: Yup.string("Enter Email")
      .email("Email is Required")
      .required("Required"),
    password: Yup.string().required("Enter your password"),
  });
  const dispatch = useDispatch();
  const handleSubmit = async (values) => {
    const { email, password } = values;
    const { data, error } = await loginUser({ email, password });

    if (error) toast.error("Invalid Email/Password");
    if (data) {
      toast.success(data.message);
      dispatch(loginAction(data?.body));
      if (data?.body?.role === "admin") {
        dispatch(checkAdmin(data?.body?.role));
      }
      setTimeout(() => {
        handleClose();
      }, 3000);
    }
  };

  return (
    <>
      <Modals
        // styles={{ height: { xs: "auto", md: "95vh" } }}
        width={{ md: "60vw", xs: "95%", sm: "95%" }}
        isOpen={isLogin}
        handleClose={handleClose}
      >
        <Grid container>
          <Grid
            item
            md={7.5}
            xs={12}
            sx={{
              background: "#fff",
              borderRadius: { md: "2rem 0 0 2rem", xs: "2rem" },
              paddingBottom: { xs: 2, md: 0 },
            }}
          >
            <Grid
              container
              sx={{
                backgroundColor: "inherit",
                height: "100%",
                padding: { md: "2rem", xs: "1.5rem" },
                borderRadius: { md: "2rem 0 0 2rem", xs: "2rem" },
                color: "#fff",
              }}
              flexDirection="column"
            >
              <Grid item sx={{ marginRight: "auto" }}>
                <CloseOutlined
                  onClick={handleClose}
                  style={{ color: "#000", fontSize: 30, cursor: "pointer" }}
                />
              </Grid>
              <Grid
                item
                container
                justifyContent="center"
                sx={{ mt: 1, background: "#fff" }}
                flexDirection="column"
              >
                <Typography
                  sx={{
                    color: "#464646",
                    textAlign: "center",
                    fontSize: { md: "3.5rem", sm: "2.4rem" },
                    fontWeight: "700",
                  }}
                >
                  Welcome Back
                </Typography>
                <Typography
                  sx={{
                    color: "#9B9A9A",
                    textAlign: "center",
                    fontSize: { md: "1.5rem", sm: "1.4rem" },
                    fontWeight: "500",
                  }}
                >
                  Login with social networks
                </Typography>
                <Grid
                  item
                  container
                  gap={8}
                  // sx={{ mt: 4, mb: 3 }}
                  justifyContent="center"
                >
                  <IconButton>
                    <img
                      src={images.fb}
                      style={{
                        objectFit: "contain",
                        height: "3rem",
                        width: "3rem",
                      }}
                      alt="facebook icon"
                    />
                  </IconButton>
                  <IconButton>
                    <img
                      src={images.gmail}
                      style={{
                        objectFit: "contain",
                        height: "3rem",
                        width: "3rem",
                      }}
                      alt="gmail icon"
                    />
                  </IconButton>
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
                    initialValues={{
                      email: "",
                      password: "",
                    }}
                    onSubmit={handleSubmit}
                    validationSchema={loginValidation}
                  >
                    <Form style={{ width: "100%" }}>
                      <Grid md={10} xs={12} sx={{ mx: "auto" }}>
                        <Grid
                          container
                          flexDirection="column"
                          alignItems="center"
                          gap={{ md: 2, xs: 1 }}
                        >
                          <Grid item container mb={2}>
                            <FormikControl
                              control="input"
                              name={"email"}
                              type={state ? "email" : "text"}
                              placeholder={
                                state ? "Email Address" : "Phone number"
                              }
                            />
                          </Grid>
                          <Grid item container>
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
                          >
                            <Typography
                              sx={{
                                fontWeight: 500,
                                fontSize: {
                                  md: "1.2rem",
                                  xs: ".9rem ",
                                },
                                color: "#828484",
                              }}
                              fontSize={{
                                md: "1.2rem",
                                sm: ".7rem !important",
                              }}
                              variant="h6"
                            >
                              Login with{" "}
                              <Typography
                                variant="span"
                                sx={{
                                  color: "#37D42A",
                                  fontWeight: 700,
                                  cursor: "pointer",
                                  fontSize: "inherit",
                                }}
                                onClick={() => setState(!state)}
                              >
                                {state ? "Phone Number?" : "Email Address"}
                              </Typography>
                            </Typography>
                            <Typography
                              sx={{
                                fontWeight: 700,
                                fontSize: { md: "1.2rem", xs: ".9rem" },
                                color: "#828484",
                                cursor: "pointer",
                                "&:hover": {
                                  color: "#37D42A",
                                },
                              }}
                              onClick={async () => {
                                setShowForgottenPassword(true);
                                // setIsLogin(false);
                                // setTimeout(() => handleClose(), 5000);
                              }}
                            >
                              Forgot Password
                            </Typography>
                          </Grid>

                          <Grid
                            item
                            container
                            justifyContent="space-between"
                            alignItems="center"
                            style={{ marginTop: { md: 3, xs: 3 } }}
                          >
                            <FormControlLabel
                              value={showPassword}
                              sx={{
                                m: 0,
                                "& .MuiFormControlLabel-label": {
                                  color: "#828484",
                                  fontSize: "1rem",
                                  fontweight: 500,
                                },
                              }}
                              control={
                                <Switch
                                  color="success"
                                  sx={{ m: 0, color: "#37D42A" }}
                                  onChange={() =>
                                    setShowPassword(!showPassword)
                                  }
                                />
                              }
                              label="Show Password"
                              labelPlacement="bottom"
                            />
                            <CustomButton
                              type="submit"
                              title="Login"
                              isSubmitting={isLoading}
                            />
                          </Grid>
                          <Grid
                            item
                            sx={{
                              display: { sm: "block", md: "none" },
                              mt: 2,
                            }}
                          >
                            <Typography
                              sx={{
                                textAlign: "center",
                                color: "#5F5C5C",
                                fontWeight: 500,
                                fontSize: "1.2rem",
                              }}
                            >
                              New Here?{" "}
                              <Typography
                                variant="span"
                                onClick={() => {
                                  setRegister(true);
                                }}
                                sx={{ color: "#37D42A", cursor: "pointer" }}
                              >
                                Signup{" "}
                              </Typography>
                              and get up-to date news
                            </Typography>
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
          <Grid item xs={4.5} display={{ md: "block", xs: "none" }}>
            <Grid
              container
              sx={{
                backgroundColor: "#044402",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
                padding: "3rem",
                borderRadius: { md: "0 2rem 2rem 0", xs: "2rem" },
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
                  onClick={() => setRegister(true)}
                >
                  Sign-up
                </Button>
              </Grid>
              <Grid
                item
                sx={{
                  display: { sm: "block", md: "none" },
                }}
              >
                <Typography
                  sx={{
                    textAlign: "center",
                    color: "#5F5C5C",
                    fontWeight: 500,
                    fontSize: "1.3rem",
                  }}
                >
                  New Here? Signup{" "}
                  <Typography
                    variant="span"
                    onClick={() => {
                      setRegister(true);
                      handleClose();
                    }}
                    sx={{ color: "#37D42A", cursor: "pointer" }}
                  >
                    Login
                  </Typography>
                  and get up-to date news
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Modals>

      {register && (
        <RegisterModal
          handleClose={() => {
            setRegister(false);
            handleClose();
          }}
          isOpen={register}
          //   handlesetConfirmOpen={() => setRegister(true)}
        />
      )}
      {showForgottenPassword && (
        <ForgottenPassword
          handleClose={() => {
            setShowForgottenPassword(false);
            // handleClose();
          }}
          handleParentModalClose={handleClose}
          isOpen={showForgottenPassword}
        />
      )}

      {/* {showForgottenPassword && <ForgottenPassword />} */}
    </>
  );
};

export default LoginModal;
