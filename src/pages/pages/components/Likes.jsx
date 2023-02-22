import { Grid, Checkbox, IconButton, Typography } from "@mui/material";
import DeleteIcon from "assets/svgs/DeleteIcon";

import Thumb from "assets/svgs/Thumb";

const Likes = () => {
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
      <Grid item sx={{ mb: 4, mt: 2 }} alignSelf="flex-end">
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
      <Grid item container gap={4} justifyContent="space-between">
        {Array(20)
          .fill(undefined)
          .map((item, index) => (
            <Grid
              item
              md={5.5}
              xs={12}
              key={index}
              sx={{
                p: 1,
                cursor: "pointer",
                ":hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.04)",
                },
              }}
            >
              <Grid container flexWrap="nowrap">
                <Grid item sx={{ mr: 2 }}>
                  <IconButton sx={{ border: "1px solid #9B9A9A" }}>
                    <Thumb sx={{ fontSize: "2rem" }} />
                  </IconButton>
                </Grid>

                {/* right */}
                <Grid item container>
                  <Grid item>
                    <Grid flexDirection="column" container>
                      <Typography
                        color="secondary"
                        fontWeight={500}
                        fontSize={{ md: "1.9rem", xs: "1.4rem" }}
                      >
                        Nnaji Joshua, Gladys Jay{" "}
                        <Typography variant="span" color="#9B9A9A" to="#">
                          and 12 others Likes your Post.
                        </Typography>
                        <Typography
                          variant="span"
                          color="secondary"
                          fontWeight={700}
                        >
                          “Sanwo Olu Not fit for 2nd Term”{" "}
                        </Typography>
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          ))}
      </Grid>
    </Grid>
  );
};

export default Likes;
