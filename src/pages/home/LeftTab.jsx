import React from "react";
import { Grid, Typography, Button } from "@mui/material";
import { Search, SearchOutlined } from "@mui/icons-material";
import { Form, Formik } from "formik/dist";
import FormikControl from "validation/FormikControl";
const LeftTab = () => {
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
          <Form>
            <FormikControl
              control="inputs"
              name="name"
              placeholder="Search..."
              Icon={SearchOutlined}
              order={1}
              buttonStyle={{
                background: "#37D42A",
                color: "#fff",
                width: "2rem",
                height: "2rem",
                fontSize: "6rem",
                padding: ".2rem",
                borderRadius: "50%",
              }}
            />
          </Form>
        </Formik>
        {Array(10)
          .fill(30)
          .map((item) => {
            return (
              <Grid item container>
                <Typography sx={{ flex: 1 }}>Health</Typography>
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
                </div>
              </Grid>
            );
          })}

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
