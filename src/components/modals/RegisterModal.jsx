import { CloseOutlined } from "@mui/icons-material";
import {
  Grid,
  Button,
  Typography,
  Divider,
  Switch,
  FormControlLabel,
} from "@mui/material";
import images from "assets";
import Modals from "components/Modal";
import { Form, Formik } from "formik/dist";
import { useEffect, useState } from "react";
import FormikControl from "validation/FormikControl";
import Verification from "./Verification";
import { Phoneverification } from "./Phoneverification";
import LoginModal from "./LoginModal";
// import EmailVerification from "./EmailVerification";
import * as Yup from "yup";
import { useRegisterMutation } from "redux/slices/authSlice";
import { toast } from "react-toastify";
import CustomButton from "components/CustomButton";
import { useDispatch } from "react-redux";
import { registerAction } from "redux/reducers/authReducer";

const RegisterModal = ({ isOpen, handleClose, handleLoginOpen }) => {
  const [register, { data, error }] = useRegisterMutation();

  const [state, setState] = useState(true);
  const validationSchema = Yup.object({
    em: state
      ? Yup.string("Enter Email")
          .email("Enter Valid Email")
          .required("Required")
      : Yup.number("Enter Phone Number").required("Required"),
    full_name: Yup.string("Enter your Name").required("Required"),
    psd: Yup.string()
      .required("Enter your password")
      .min(8, "password too short")
      .matches(/^(?=.*[a-z])/, "Must contain at least one lowercase character")
      .matches(/^(?=.*[A-Z])/, "Must contain at least one uppercase character")
      .matches(/^(?=.*[0-9])/, "Must contain at least one number")
      .matches(/^(?=.*[!@#%&])/, "Must contain at least one special character"),
  });
  const dispatch = useDispatch();
  const [login, setLogin] = useState(false);
  const [showEmailVerification, setEmailVerifications] = useState(false);
  const [showPasswordVerification] = useState(false); //
  const [showPassword, setShowPassword] = useState(false);
  useEffect(() => {
    if (data) {
      toast.success(data.message);
      dispatch(registerAction(data?.body));
      setTimeout(() => {
        handleClose();
      }, 3000);
    }

    if (error) toast.error(error);
    //eslint-disable-next-line
  }, [error, data]);
  const handleSubmit = async (values) => {
    const { em, psd, full_name } = values;
    if (state) {
      await register({
        email: em,
        password: psd,
        full_name,
      });
    } else {
      await register({
        phone: em,
        password: psd,
        full_name,
      });
    }
  };

  return (
    <>
      <Modals
        styles={{ height: { xs: "auto", md: "auto" } }}
        width={{ md: "60vw", xs: "95%", sm: "95%" }}
        isOpen={isOpen}
        handleClose={handleClose}
      >
        <Grid
          item
          container
          sx={{
            // position: { md: "absolute" },
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
                  onClick={() => {
                    setLogin(true);
                    // handleClose();
                  }}
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
                  style={{ color: "#000", fontSize: 30, cursor: "pointer" }}
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
                    validationSchema={validationSchema}
                    enableReinitialize
                    initialValues={{
                      em: "",
                      full_name: "",
                      psd: "",
                    }}
                    onSubmit={handleSubmit}
                  >
                    {({ isSubmitting }) => (
                      <Form style={{ width: "100%" }}>
                        <Grid item md={10} sm={12} sx={{ mx: "auto" }}>
                          <Grid
                            container
                            gap={2}
                            flexDirection="column"
                            alignItems="center"
                          >
                            <Grid item container>
                              <FormikControl
                                control="input"
                                name="full_name"
                                placeholder="Full Name"
                              />
                            </Grid>
                            <Grid item container>
                              <FormikControl
                                control="input"
                                name={"em"}
                                autoComplete={false}
                                autoSuggest={false}
                                placeholder={
                                  state ? "Email Address" : "Phone number"
                                }
                              />
                            </Grid>
                            <Grid item container>
                              <FormikControl
                                control="input"
                                name="psd"
                                placeholder="Password"
                                type={showPassword ? "text" : "password"}
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
                            <Grid
                              item
                              container
                              justifyContent="space-between"
                              alignItems="center"
                              style={{ marginTop: { xs: 3 } }}
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
                                title="Sign Up"
                                isSubmitting={isSubmitting}
                              />
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
                                Already have an account?{" "}
                                <Typography
                                  variant="span"
                                  onClick={() => {
                                    setLogin(true);
                                    handleClose();
                                  }}
                                  sx={{ color: "#37D42A", cursor: "pointer" }}
                                >
                                  Login
                                </Typography>
                              </Typography>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Form>
                    )}
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
