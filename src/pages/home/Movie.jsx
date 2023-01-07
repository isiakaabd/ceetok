import images from "assets";
import { Grid } from "@mui/material";
const Movie = () => {
  return (
    <Grid
      sx={{
        height: "40rem",
        display: { xs: "none", md: "block" },
        position: "relative",
      }}
    >
      <img
        src={images.vedio}
        alt="bg"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          borderRadius: "1.5rem",
        }}
      />
      <div
        style={{
          position: "absolute",
          background: " rgba(255, 255, 255, 0.4)",
          top: "50%",
          left: "50%",
          height: 120,
          width: 120,
          display: "flex",
          borderRadius: "50%",
          transform: "translate(-50%,-50%)",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img src={images.play} style={{ width: 60, height: 60 }} alt="play" />
      </div>
    </Grid>
  );
};

export default Movie;
