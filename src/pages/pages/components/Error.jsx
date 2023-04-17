import { Avatar, Grid, Typography } from "@mui/material";
import images from "assets";
const Error = ({ error }) => {
  return (
    <Grid item container justifyContent={"center"}>
      {error === "Unauthorized request" ? (
        <Typography variant="h4" gutterBottom py={3}>
          {error}
        </Typography>
      ) : (
        <Grid item sx={{ height: "80vh" }}>
          <Avatar src={images.err} sx={{ width: "100%", height: "100%" }} />
        </Grid>
      )}
    </Grid>
    // <Typography
    //   variant="h2"
    //   sx={{ px: 1, py: 3, width: "100%", textAlign: "center" }}
    // >
    //   {error.status === "FETCH_ERROR"
    //     ? "Network Error, Failed to fetch"
    //     : "Something went wrong..."}
    // </Typography>
  );
};

export default Error;
