import { Button, Chip, Grid, Typography } from "@mui/material";
import { useState } from "react";
import { Formik, Form } from "formik/dist";
import FormikControl from "validation/FormikControl";
// import { CustomButton } from "components";
import images from "assets";
import {
  CakeOutlined,
  CloseOutlined,
  FemaleOutlined,
  RoomOutlined,
} from "@mui/icons-material";
// import { ConfirmMail } from ".";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Modals from "components/Modal";
import { ChipItem, CustomButton } from "components";
const VerifyPage = ({ isOpen, handleClose }) => {
  const [variant, setVariant] = useState(false);
  const [showConfirmMail, setShowConfirmMail] = useState(false);
  const likes = [
    "Entertainment",
    "Sport",

    "Entertainment",
    "Sport",
    "Politics",
    "Health & wellness",
    "Games",
    "Entertainment",
    "Sport",
    "Politics",
    "Health & wellness",
    "Games",
    "Entertainment",
    "Sport",
    "Politics",
    "Health & wellness",
    "Games",
    "Politics",
    "Health & wellness",
    "Games",
    "Health & wellness",
    "Games",
    "Entertainment",
    "Sport",
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

  return (
    <Modals
      styles={{ height: "90vh" }}
      width={{ md: "60vw", xs: "80%", sm: "80%" }}
      isOpen={isOpen}
    >
      <Grid
        item
        container
        flexDirection="column"
        sx={{ mt: 1, height: "100%", overflowY: "scroll", padding: "1rem" }}
        flexWrap="nowrap"
        gap={2}
      >
        <Grid
          item
          container
          alignItems={"center"}
          justifyContent="space-between"
        >
          <Grid item>
            <Typography
              sx={{ color: "#464646", fontWeight: 700, fontSize: "2.8rem" }}
            >
              Complete Registration
            </Typography>
          </Grid>
          <Grid item>
            <CloseOutlined
              onClick={handleClose}
              style={{ color: "#000", fontSize: 20, cursor: "pointer" }}
            />
          </Grid>
        </Grid>

        <Grid
          item
          gap={3}
          // sx={{}}
          container
          // flexWrap="nowrap"
          // alignItems="center"
          display="grid"
          sx={{
            gridTemplateColumns: "1fr 4fr",
          }}
        >
          {/* image */}
          <Grid
            item
            justifyContent="center"
            alignItems={{ md: "flex-end", xs: "flex-start" }}
            container
            // xs={2}
            sx={{
              height: "100%",
              gridColumn: "1/2",
              gridRow: { md: "1/3", xs: "1/2" },
              padding: { xs: "0 2rem" },
            }}
          >
            <Grid item>
              <img
                style={{
                  width: "100%",
                  display: "inline-block",
                  //   height: "100%",
                }}
                alt="name"
                src={images.placeholder}
              />
              <Typography
                sx={{
                  textAlign: "center",
                  color: "#5F5C5C",
                  fontWeight: 700,
                  fontSize: "1.5rem",
                  whiteSpace: "nowrap",
                }}
              >
                Update Avatar
              </Typography>
            </Grid>
          </Grid>
          {/* text */}
          {/* <Grid item xs={12} md={10} sx={{ background: "red" }}> */}
          {/* text */}
          <Grid
            container
            gap={2}
            gridColumn="2/3"
            gridRow="1/2"
            sx={{
              paddingRight: { xs: "2rem" },
            }}
            alignItems="center"
          >
            <Grid item flex={1} sx={{ color: "#464646" }}>
              <Typography sx={{ fontSize: "2.8rem" }}>Nnaji Joshua </Typography>
              <Typography variant="h4" sx={{ fontSize: "1.3rem", my: 1 }}>
                ID: FM9|009865
              </Typography>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="success"
                sx={{
                  padding: ".2rem 2rem",
                  borderRadius: 50,
                  color: "#fff",
                  fontSize: "1rem",
                  fontWeight: 500,
                }}
                disableElevation
              >
                change
              </Button>
            </Grid>
          </Grid>
          {/* input */}''
          <Grid
            item
            container
            sx={{ mt: 2 }}
            gridColumn={{ md: "2/3", xs: "1/3" }}
            gridRow="2/3"
          >
            <Formik>
              <Form style={{ width: "100%" }}>
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
                        name="name"
                        placeholder="Username"
                        Icon={AccountCircle}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <FormikControl
                        control="inputs"
                        name="dob"
                        placeholder="Date of Birth"
                        Icon={CakeOutlined}
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
                        name="name"
                        options={[
                          {
                            label: "Male",
                            value: "Male",
                          },
                          {
                            label: "Female",
                            value: "Female",
                          },
                        ]}
                        Icon={FemaleOutlined}
                        placeholder="Gender"
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <FormikControl
                        control="inputs"
                        name="location"
                        Icon={RoomOutlined}
                        placeholder="Location"
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Form>
            </Formik>
          </Grid>
          {/* </Grid> */}
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
              sx={{ color: "#5F5C5C", fontWeight: 700, fontSize: "2rem" }}
            >
              Area Of Interest
            </Typography>
            <Typography
              sx={{
                color: "#464646",
                mb: 2,
                fontSize: "1.8rem",
                textAlign: { sm: "center", md: "left" },
              }}
            >
              Select atleast three (3) interest that matches the updates you
              want to always get
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
                <ChipItem item={item} key={index} size="medium" />
              ))}
            </Grid>
          </Grid>
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
            <Typography variant="span" sx={{ fontWeight: 400 }}>
              {" "}
              Politics, Game, Interest
            </Typography>{" "}
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
              sx={{ color: "#5F5C5C", fontWeight: 700, fontSize: "1.5rem" }}
            >
              Privacy Policy
            </Typography>
            <Typography
              sx={{ mt: 2, mb: 4, color: "#636262", fontSize: "1.6rem" }}
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
            <CustomButton onClick={handleClose}>
              Complete Registration
            </CustomButton>
          </Grid>
        </Grid>
      </Grid>
    </Modals>
  );
};

export default VerifyPage;
