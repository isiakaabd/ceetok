import { Grid, Typography } from "@mui/material";
const Headings = () => {
  return (
    <Grid
      item
      container
      sx={{
        borderRadius: "1.5rem",
        mt: "4rem",
        p: "3rem",
        color: "#fff",
        backgroundColor: "#044402",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Typography variant="h1">Welcome to Ceetok</Typography>
      <Typography variant="h2" style={{ mt: "1rem" }}>
        As e dey hot...
      </Typography>

      <Grid item sx={{ mt: 4 }}>
        <Grid container gap={3}>
          <Typography style={{ fontWeight: 700 }}>
            Stats: <span style={{ fontWeight: 500 }}>2,943,466</span>{" "}
          </Typography>
          <Typography style={{ fontWeight: 700 }}>
            Members:
            <span style={{ fontWeight: 500 }}>7,128,053 topics.</span>
          </Typography>
          <Typography style={{ fontWeight: 700 }}>
            Date:{" "}
            <span style={{ fontWeight: 500 }}>Thursday, 20 October 2022</span>{" "}
          </Typography>
          <Typography style={{ fontWeight: 700 }}>
            {" "}
            Time: <span style={{ fontWeight: 500 }}>10:58 AM</span>{" "}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Headings;
