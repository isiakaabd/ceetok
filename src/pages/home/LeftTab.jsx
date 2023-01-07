import React from "react";
import { Grid, Typography, Button } from "@mui/material";
import { Search } from "@mui/icons-material";
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
        <Grid>
          <input /> <Search />
        </Grid>
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
          }}
          variant="outlined"
        >
          See More
        </Button>
      </Grid>
    </Grid>
  );
};

export default LeftTab;
