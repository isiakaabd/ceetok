import { Grid, Skeleton, Typography } from "@mui/material";
import Error from "pages/pages/components/Error";
import { useGetStatsQuery } from "redux/slices/authSlice";

const OnlineActivity = () => {
  const { data, isLoading, error } = useGetStatsQuery();

  if (isLoading) return <Skeletons />;
  if (error) return <Error />;

  const { member_count, active_visitors } = data;
  return (
    <Grid item container sx={{ pb: 4 }}>
      <Grid
        xs={12}
        md={10}
        sx={{
          backgroundColor: "#5F5C5C",
          paddingBlock: "1.2rem",
          textAlign: "center",
          margin: "auto",
          fontSize: "2.4rem",
          color: "#fff",
          mt: 6,
          fontWeight: 400,
        }}
      >
        <Typography> Members Online:</Typography>
        <Typography>
          <Typography variant="span" sx={{ fontWeight: 700 }}>
            {member_count} {member_count > 1 ? "Members" : "Member"}{" "}
          </Typography>
          and{" "}
          <Typography variant="span" sx={{ fontWeight: 700 }}>
            {active_visitors} {active_visitors > 1 ? "Guests" : "Guest"} online{" "}
          </Typography>
          in last{" "}
          <Typography variant="span" sx={{ fontWeight: 700 }}>
            10 minutes!
          </Typography>
        </Typography>
      </Grid>
    </Grid>
  );
};
function Skeletons() {
  return (
    <Grid item container sx={{ pb: 4 }}>
      <Grid
        xs={11}
        md={10}
        sx={{
          paddingBlock: "1.2rem",
          margin: "auto",
          mt: 6,
          height: "10rem",
        }}
      >
        <Skeleton variant="rounded" sx={{ height: "100%", width: "100%" }} />
      </Grid>
    </Grid>
  );
}
export default OnlineActivity;
