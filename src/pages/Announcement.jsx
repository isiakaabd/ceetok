import images from "assets";
import { Typography, Grid, Button } from "@mui/material";
const Announcement = () => {
  return (
    <Grid
      item
      container
      sx={{ paddingInline: { xs: "1rem", md: "4rem" } }}
      gap={3}
    >
      <Grid
        item
        container
        alignItems="center"
        justifyContent="center"
        sx={{
          cursor: "pointer",
          border: "1px solid #FF9B04",
          height: "6rem",
          padding: "1.2rem 2rem",
          width: "34rem",
        }}
        flexWrap="nowrap"
        gap={3}
      >
        <img
          src={images.annoucement}
          alt="annoucement icon"
          style={{ width: "4rem", height: "4rem", display: "inline-block" }}
        />
        <Typography
          sx={{ color: "#464646", fontSize: "2.5rem", fontWeight: 700 }}
        >
          Annoucement
        </Typography>
      </Grid>
      <Button
        sx={{
          height: "3.5rem",
          borderRadius: ".5rem",
          backgroundColor: "#5F5C5C",
          color: "#fff",
          fontWeight: 700,
          fontSize: "1.5rem",
          padding: "1rem 2rem",
        }}
      >
        Make Annoucement
      </Button>
    </Grid>
  );
};

export default Announcement;
