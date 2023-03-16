import { Home } from "@mui/icons-material";
import { Button, Grid, Typography } from "@mui/material";
import React from "react";

const Page404 = () => {
  return (
    <Grid
      item
      container
      sx={{ py: { xs: 1 }, minHeight: "calc(100vh - 10rem)" }}
    >
      <Grid item xs={10} md={8} sx={{ marginX: "auto" }}>
        <Grid
          item
          gap={2}
          sx={{ height: "100%", py: { md: 4, xs: 1 } }}
          container
          flexDirection="column"
          alignItems="center"
        >
          <Typography
            variant="h1"
            sx={{
              color: "#5F5C5C",
              fontSize: { md: "4rem", xs: "3rem", sm: "3.5rem" },
              fontWeight: 700,
            }}
          >
            404
          </Typography>
          <Typography
            variant="h1"
            sx={{
              color: "#FF9B04",
              fontSize: { md: "4rem", xs: "3rem", sm: "3.5rem" },
              fontWeight: 700,
            }}
          >
            Page Not Found
          </Typography>
          <Typography
            variant="h4"
            sx={{ px: { md: 3, xs: 1 }, textAlign: "center" }}
          >
            The link you clicked may be broken or the page is undergoing
            upgrade. Visit the Homepage or Contact us about the problem
          </Typography>
          <Button
            startIcon={<Home />}
            variant="contained"
            sx={{
              background: "#37D42A",
              fontSize: { md: "1.8rem", xs: "1.4rem" },
              mt: "auto",
            }}
            disableElevation
          >
            Back to Homepage
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Page404;
