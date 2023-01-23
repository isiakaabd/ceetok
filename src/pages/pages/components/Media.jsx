import { Avatar, Grid, IconButton, Checkbox, Typography } from "@mui/material";
import DeleteIcon from "assets/svgs/DeleteIcon";
import PropTypes from "prop-types";
import images from "assets";
const Media = (props) => {
  return (
    <Grid
      item
      container
      sx={{
        mt: "2rem",
        py: 4,
        px: 2,
        borderRadius: "2rem",
        backgroundColor: "#fff",
      }}
      flexDirection="column"
    >
      <Grid item sx={{ mb: 4, mt: 2 }}>
        <Grid container alignItems="center" gap={0.5}>
          {/* <IconButton> */}
          <DeleteIcon sx={{ fontSize: "2.5rem", mt: 1 }} />
          {/* </IconButton> */}
          <Typography fontSize="1.4rem" fontWeight={400} color="secondary">
            Delete All
          </Typography>
          <Checkbox
            defaultChecked
            sx={{
              "& .MuiSvgIcon-root": { fontSize: "2.5rem", color: "#9B9A9A" },
            }}
          />
        </Grid>
      </Grid>
      <Grid item container gap={2}>
        {Array(6)
          .fill(undefined)
          .map((item, index) => (
            <Avatar
              key={index}
              src={images.image04}
              sx={{ height: "8rem", width: "10rem", objectFit: "contain" }}
              variant="square"
            />
          ))}
      </Grid>
    </Grid>
  );
};

Media.propTypes = {};

export default Media;
