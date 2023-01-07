import { CloseOutlined } from "@mui/icons-material";
import { Grid, Button, Typography, ButtonBase, Divider } from "@mui/material";
import { styled } from "@mui/material/styles";
import images from "assets";
import Modals from "components/Modal";
import { Form, Formik } from "formik/dist";
import { useState, lazy } from "react";
import FormikControl from "validation/FormikControl";
import Verification from "./Verification";
import { Phoneverification } from "./Phoneverification";
import LoginModal from "./LoginModal";
// import EmailVerification from "./EmailVerification";
//
const RegisterModal = ({ isOpen, handleClose, handleLoginOpen }) => {
  const CustomButton = styled(ButtonBase)(({ theme }) => ({
    background: "#37D42A",
    display: "block",
    padding: "1rem 6rem",
    borderRadius: "2em",
    fontWeight: 700,
    "&:hover, &.Mui-focusVisible": {
      zIndex: 1,
    },
  }));
  const [state, setState] = useState(true);
  const [login, setLogin] = useState(false);
  const [showEmailVerification, setEmailVerifications] = useState(false);
  const [showPasswordVerification, setShowPasswordVerification] =
    useState(false);

  return (
    <>
      <Modals
        styles={{ height: { xs: "auto", md: "95vh" } }}
        width={{ md: "60vw", xs: "90%", sm: "80%" }}
        isOpen={isOpen}
      >
        <Grid
          item
          container
          sx={{
            position: { md: "absolute" },
            zIndex: 3,
            borderRadius: "2.5rem",
            top: 0,
            left: 0,
            height: "100%",
          }}
        >
          <Grid
            item
            md={4.5}
            xs={0}
            sx={{ display: { md: "block", xs: "none" } }}
          >
            <Grid
              container
              sx={{
                backgroundColor: "#044402",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
                padding: "2rem",
                borderRadius: "2rem 0 0 2rem",
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
                  Already have an Account?
                </Typography>
                <Typography
                  sx={{
                    fontSize: "1.3rem",
                    fontWeight: 400,
                    my: 6,
                    textAlign: "center",
                  }}
                >
                  Login and get the latest info
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
                  onClick={() => setLogin(true)}
                >
                  Login
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            item
            md={7.5}
            xs={12}
            sx={{
              background: "#fff",
              borderRadius: { md: " 0 2rem 2rem 0", xs: "2rem" },
            }}
          >
            <Grid
              container
              sx={{
                backgroundColor: "inherit",

                height: "100%",
                padding: "2rem",
                borderRadius: { md: " 0 2rem 2rem 0", xs: "2rem" },
                color: "#fff",
              }}
              flexDirection="column"
            >
              <Grid item sx={{ marginLeft: "auto" }}>
                <CloseOutlined
                  onClick={handleClose}
                  style={{ color: "#000", fontSize: 20, cursor: "pointer" }}
                />
              </Grid>
              <Grid
                item
                container
                justifyContent="center"
                sx={{ mt: 2 }}
                flexDirection="column"
              >
                <Typography
                  sx={{
                    color: "#464646",
                    textAlign: "center",
                    fontSize: { md: "3.2rem", xs: "2.2rem" },
                    fontWeight: "700",
                  }}
                >
                  We are glad to have you!
                </Typography>
                <Typography
                  sx={{
                    color: "#9B9A9A",
                    textAlign: "center",
                    fontSize: "1.5rem",
                    fontWeight: "500",
                  }}
                >
                  Signup using social networks
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
                      cursor: "pointer",
                    }}
                    alt="facebook icon"
                  />
                  <img
                    src={images.gmail}
                    style={{
                      objectFit: "contain",
                      cursor: "pointer",
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
                    initialValues={{
                      email_or_phone: "",
                      name: "",
                      password: "",
                    }}
                  >
                    <Form style={{ width: "100%" }}>
                      <Grid md={10} sm={12} sx={{ mx: "auto" }}>
                        <Grid
                          container
                          gap={2}
                          flexDirection="column"
                          alignItems="center"
                        >
                          <Grid item container>
                            <FormikControl
                              control="input"
                              name="name"
                              placeholder="Name"
                            />
                          </Grid>
                          <Grid item container>
                            <FormikControl
                              control="input"
                              name={"email_or_phone"}
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
                              type="password"
                            />
                          </Grid>
                          <Typography
                            sx={{
                              fontWeight: 700,
                              fontSize: "1.4rem",
                              color: "#828484",
                              textAlign: "center",
                            }}
                          >
                            Or Sign-up with{" "}
                            <Typography
                              variant="span"
                              sx={{ color: "#37D42A", cursor: "pointer" }}
                              onClick={() => setState(!state)}
                            >
                              {state ? "Phone Number?" : "Email Address"}
                            </Typography>
                          </Typography>
                          <div style={{ marginTop: 3 }}>
                            <CustomButton
                              onClick={() => {
                                if (!state) {
                                  setShowPasswordVerification(true);
                                } else {
                                  setEmailVerifications(true);
                                }
                              }}
                            >
                              Sign Up
                            </CustomButton>
                          </div>
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
                              Already have an account?{" "}
                              <Typography
                                variant="span"
                                onClick={() => setLogin(true)}
                                sx={{ color: "#37D42A", cursor: "pointer" }}
                              >
                                Login
                              </Typography>
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
        </Grid>
      </Modals>

      <Verification
        handleClose={() => {
          handleClose();
          setEmailVerifications(false);
        }}
        isOpen={showEmailVerification}
      />

      {login && (
        <LoginModal
          handleClose={() => {
            handleClose();
            setLogin(false);
          }}
          isLogin={login}
        />
      )}

      {showPasswordVerification && (
        <Phoneverification
          handleClose={() => {
            handleClose();
            showPasswordVerification(false);
          }}
          isOpen={showPasswordVerification}
        />
      )}
    </>
  );
};

export default RegisterModal;
