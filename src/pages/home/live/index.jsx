import {
  Divider,
  Grid,
  List,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import React from "react";
import images from "assets";
import { CustomButton } from "components";
import { Link } from "react-router-dom";
const Live = () => {
  return (
    <Grid item container sx={{ p: 2, background: "#E5E5E5" }}>
      <Grid item container sx={{ backgroundImage: "url(images.live)" }}>
        <img
          src={images.live}
          alt="live"
          style={{ height: "35rem", width: "100%" }}
        />
      </Grid>

      <Grid item container gap={2} sx={{ mt: 4 }} flexWrap="nowrap">
        <Grid
          item
          md={8}
          xs={12}
          sx={{
            padding: { md: "2rem", xs: "1.5rem" },
            borderRadius: "2rem",
            background: "#fff",
          }}
        >
          <Grid item container sx={{ height: "12rem" }} alignItems={"center"}>
            <Grid item container flexDirection={"column"} flex={1}>
              <Typography
                sx={{ fontSize: { md: "3rem", xs: "2rem" } }}
                color="#5F5C5C"
                fontWeight={700}
              >
                Reporting Live
              </Typography>
              <Typography>
                <Typography component={Link}>Josh</Typography>
                {""} and{" "}
                <Typography variant="span" color="#5F5C5C" component={Link}>
                  Victor
                </Typography>
              </Typography>
            </Grid>
            <Grid item>
              <CustomButton title={"Get Involved"} />
            </Grid>
          </Grid>
          <Divider flexItem sx={{ my: 2 }} />

          <Grid
            item
            container
            sx={{
              p: 2,
              borderRadius: "2rem",
              boxShadow: "0px 8px 9px rgba(0, 0, 0, 0.15)",
            }}
          >
            <Typography
              color="#5F5C5C"
              sx={{ py: 2, fontSize: { md: "1.9rem" } }}
            >
              23:03 &nbsp; 1&nbsp;Nov &nbsp;
            </Typography>
            <Grid item container gap={1} flexWrap="nowrap">
              <Grid item xs={3}>
                <img
                  src={images.adeleke}
                  alt="adeleke"
                  style={{ height: "70%" }}
                />
              </Grid>
              <Grid item xs={8}>
                <Grid item container flexDirection="column">
                  <Typography color="#464646" sx={{ fontSize: { md: "2rem" } }}>
                    David Ifeanyi Adeleke is confirmed dead after drowing in a
                    swimming pool
                  </Typography>
                  <Typography
                    color="#9B9A9A"
                    fontWeight={500}
                    sx={{ fontSize: { md: "1.4rem" } }}
                  >
                    Tortor, lobortis semper viverra ac, molestie tortor laoreet
                    amet euismod et diam quis aliquam consequat porttitor
                    integer a nisl, in faucibus nunc et aenean turpis dui
                    dignissim nec scelerisque ullamcorper eu neque, augue quam
                    quis lacus pretium eros est amet turpis nunc in turpis massa
                    et Tortor, lobortis semper viverra ac, molestie tortor
                    laoreet amet euismod et dia porttitor integer a nisl, in
                    faucibu nec scelerisque ullamcorper eu neque, augue quam
                    quis lacus pretium eros est a
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={4}>
          <Grid
            item
            container
            justifyContent="center"
            alignItems="center"
            sx={{
              background: "#044402",
              height: "12rem",
              padding: { md: "2rem", xs: "1.5rem" },
              borderRadius: "2rem 2rem 0 0",
            }}
          >
            <Typography
              color="#fff"
              sx={{
                fontWeight: 700,
                textAlign: "center",
                fontSize: { md: "3rem", xs: "2rem" },
              }}
            >
              Summary
            </Typography>
          </Grid>
          <List item sx={{ p: 2, backgroundColor: "#fff" }}>
            {Array(10)
              .fill(undefined)
              .map((item) => (
                <ListItemButton>
                  <ListItemText sx={{ width: "100%" }}>
                    David Ifeanyi Adeleke:, molestie tortor laoreet amet euismod
                    et diam quis aliquam consequat porttitor integer a nisl, in
                    faucibus nunc et aenean turpis dui dignissim nec
                  </ListItemText>
                </ListItemButton>
              ))}
          </List>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Live;
