import { Button, Grid } from "@mui/material";
import ArrowBack from "assets/svgs/ArrowBack";
import { useNavigate } from "react-router-dom";
const BackIcon = ({ text }) => {
  const navigate = useNavigate();
  return (
    <Grid item>
      <Button
        sx={{ fontSize: "1.7rem", textTransform: "initial" }}
        fontWeight={600}
        color="secondary"
        startIcon={<ArrowBack />}
        onClick={() => navigate(-1)}
      >
        {text}
      </Button>
    </Grid>
  );
};

export default BackIcon;
