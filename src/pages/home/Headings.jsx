import { Grid, Skeleton, Typography } from "@mui/material";
import { getDate, getTime } from "helpers";
import Error from "pages/pages/components/Error";
import { useGetStatsQuery } from "redux/slices/authSlice";
const Headings = () => {
  const { data, isLoading, error } = useGetStatsQuery();

  if (isLoading) return <Skeletons />;
  if (error) return <Error />;

  const { member_count, stats } = data;
  return (
    <Grid
      item
      container
      sx={{
        borderRadius: "1.5rem",
        mt: "4rem",
        p: { md: " 2rem 4rem", xs: "1.5rem" },
        color: "#fff",
        backgroundColor: "#044402",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Typography variant="h1">Welcome to Ceetok</Typography>
      <Typography variant="h2" sx={{ mt: "1rem" }}>
        Where conversations come to life
      </Typography>

      <Grid item sx={{ mt: 2 }}>
        <Grid
          container
          justifyContent={"center"}
          gap={3}
          sx={{ fontSize: "clamp(1.2rem, 8vw, 1.6rem)" }}
        >
          <Typography style={{ fontWeight: 700, font: "inherit" }}>
            Stats:{" "}
            <Typography
              variant="span"
              style={{ fontWeight: 500, font: "inherit" }}
            >
              {`${stats || 0} ${stats > 0 ? "Topics" : "Topic"}`}
            </Typography>{" "}
          </Typography>
          <Typography style={{ fontWeight: 700, font: "inherit" }}>
            Members:
            <Typography
              variant="span"
              style={{ fontWeight: 500, font: "inherit" }}
            >
              {member_count || 0}
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

function Skeletons() {
  return (
    <Grid item container sx={{ height: "14rem" }}>
      <Skeleton variant="rounded" sx={{ height: "100%", width: "100%" }} />
    </Grid>
  );
}
export default Headings;
