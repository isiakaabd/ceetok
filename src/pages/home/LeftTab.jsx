import React from "react";
import {
  Grid,
  Button,
  List,
  ListItemText,
  ListItemButton,
} from "@mui/material";
import { SearchOutlined } from "@mui/icons-material";
import { Form, Formik } from "formik/dist";
import FormikControl from "validation/FormikControl";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
const LeftTab = () => {
  const loginStatus = useSelector((state) => state.auth.token);
  return (
    <Grid
      item
      md={3}
      display={{ md: "block", xs: "none" }}
      sx={{
        background: "white",
        borderRadius: "0 2rem 2rem 0",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
      }}
    >
      <Grid
        container
        gap={2}
        sx={{
          padding: { xs: "1rem", md: "2rem 2rem 2rem 4rem" },
        }}
      >
        <Formik initialValues={{ name: "" }}>
          <Form style={{ width: "100%" }}>
            <FormikControl
              control="inputs"
              name="name"
              placeholder="Search..."
              Icon={SearchOutlined}
              order={1}
              buttonStyle={{
                background: "#37D42A",
                color: "#fff",
              }}
            />
          </Form>
        </Formik>
        <List sx={{ width: "100%" }}>
          {Array(10)
            .fill(30)
            .map((item, index) => {
              return (
                <ListItemButton
                  key={index}
                  component={loginStatus ? Link : "li"}
                  to={"/entertainment"}
                >
                  <ListItemText
                    primary="Entertainment"
                    primaryTypographyProps={{
                      color: "#9B9A9A",
                      fontWeight: 600,
                    }}
                  />

                  <ListItemText
                    disableGutters
                    primary="1.2k"
                    sx={{ display: "flex", justifyContent: "flex-end" }}
                    primaryTypographyProps={{
                      minWidth: "3.4rem",
                      minHeight: "3.4rem",
                      borderRadius: "50%",
                      backgroundColor: "#D3D3D3",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    30
                  </ListItemText>
                  {/* </div> */}
                  {/* <Typography sx={{ flex: 1 }}>Health</Typography>
                  <div
                    style={{
                      width: "2.4rem",
                      height: "2.4rem",
                      borderRadius: "50%",
                      backgroundColor: "#D3D3D3",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {item}
                  </div> */}
                </ListItemButton>
              );
            })}
        </List>
        <Button
          sx={{
            backgroundColor: "#636262",
            width: "10rem",
            color: "#fff",
            fontWeight: 700,
            outline: "none",
          }}
          variant="contained"
          disableElevation
        >
          See More
        </Button>
      </Grid>
    </Grid>
  );
};

export default LeftTab;
