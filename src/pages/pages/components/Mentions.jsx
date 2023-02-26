import { DeleteOutline } from "@mui/icons-material";
import { Avatar, Grid, Typography, Checkbox, IconButton } from "@mui/material";
import DeleteIcon from "assets/svgs/DeleteIcon";
import { Link } from "react-router-dom";
const Mentions = (props) => {
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
      <IconButton sx={{ ml: "auto" }}>
        <DeleteOutline sx={{ fontSize: "2rem" }} />
      </IconButton>
      <Grid item container gap={4} justifyContent="space-between">
        {Array(6)
          .fill(undefined)
          .map((item, index) => (
            <Grid
              item
              md={5.5}
              xs={12}
              key={index}
              sx={{
                cursor: "pointer",
                p: 1,
                ":hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.04)",
                  borderRadius: ".5rem",
                },
              }}
            >
              <Grid container flexWrap="nowrap">
                <Grid item sx={{ mr: 2 }}>
                  <Avatar>N</Avatar>
                </Grid>

                {/* right */}
                <Grid item container>
                  <Grid item>
                    <Grid flexDirection="column" container>
                      <Typography
                        color="#9B9A9A"
                        fontWeight={700}
                        fontSize={{ md: "1.8rem", xs: "1.5rem" }}
                      >
                        Victor Adeniji{" "}
                        <Typography
                          variant="span"
                          component={Link}
                          color="#0099FF"
                          sx={{ textDecoration: "none" }}
                          to="#"
                        >
                          mentioned{" "}
                        </Typography>
                        <Typography variant="span" fontWeight={500}>
                          you in a Post. BBN Naija Tasha Performance tonight
                        </Typography>
                      </Typography>
                      <Typography
                        color=" #9B9A9A"
                        fontSize={{ md: "1.6rem", xs: "1.2rem" }}
                        fontWeight={400}
                        sx={{ mt: 1 }}
                      >
                        4th Nov, 2022 12:45pm
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item sx={{ ml: { md: 2, xs: "auto" } }}>
                  <Checkbox
                    defaultChecked
                    sx={{
                      "& .MuiSvgIcon-root": {
                        fontSize: { md: "2.5rem", xs: "2rem" },
                        color: "#9B9A9A",
                      },
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>
          ))}
      </Grid>
    </Grid>
  );
};

Mentions.propTypes = {};

export default Mentions;
