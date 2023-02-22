import { Typography, Grid } from "@mui/material";

const Infractions = (props) => {
  return (
    <Grid item container sx={{ p: 4 }}>
      <Typography variant="secondary" fontSize="2rem" fontWeight={700}>
        You do not have any infraction
      </Typography>
    </Grid>
  );
};

Infractions.propTypes = {};

export default Infractions;
