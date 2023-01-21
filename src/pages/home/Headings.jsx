import { Grid, Typography } from "@mui/material";
import { getDate, getTime } from "helpers";
const Headings = () => {
  return (
    <Grid
      item
      container
      sx={{
        borderRadius: "1.5rem",
        mt: "4rem",
        p: { md: "4rem", xs: "1.5rem" },
        color: "#fff",
        backgroundColor: "#044402",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Typography variant="h1">Welcome to Ceetok</Typography>
      <Typography variant="h2" sx={{ mt: "2rem" }}>
        As e dey hot...
      </Typography>

      <Grid item sx={{ mt: 4 }}>
        <Grid
          container
          justifyContent={"center"}
          gap={3}
          sx={{ fontSize: "clamp(1rem, 8vw, 1.2rem)" }}
        >
          <Typography style={{ fontWeight: 700, font: "inherit" }}>
            Stats:{" "}
            <Typography
              variant="span"
              style={{ fontWeight: 500, font: "inherit" }}
            >
              2,943,466
            </Typography>{" "}
          </Typography>
          <Typography style={{ fontWeight: 700, font: "inherit" }}>
            Members:
            <Typography
              variant="span"
              style={{ fontWeight: 500, font: "inherit" }}
            >
              7,128,053 topics.
            </Typography>
          </Typography>
          <Typography style={{ fontWeight: 700, font: "inherit" }}>
            Date:{" "}
            <Typography
              variant="span"
              style={{ fontWeight: 500, font: "inherit" }}
            >
              {getDate(new Date())}
            </Typography>{" "}
          </Typography>
          <Typography style={{ fontWeight: 700, font: "inherit" }}>
            {" "}
            Time:{" "}
            <Typography
              variant="span"
              style={{ fontWeight: 500, font: "inherit" }}
            >
              {getTime(new Date())}
            </Typography>{" "}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Headings;
