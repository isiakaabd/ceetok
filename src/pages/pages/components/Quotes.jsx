import { Avatar, Grid, Typography, Checkbox } from "@mui/material";
import DeleteIcon from "assets/svgs/DeleteIcon";

const Quotes = () => {
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
        {Array(6)
          .fill(undefined)
          .map((item, index) => (
            <Grid
              item
              md={5.5}
              xs={12}
              key={index}
              sx={{
                p: 1,
                //   ":hover": {
                //     backgroundColor: "rgba(0, 0, 0, 0.04)",
                //     borderRadius: ".5rem",
                //   },
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
                        color="secondary"
                        fontWeight={700}
                        fontSize="1.4rem"
                      >
                        @VictorAdeniji{" "}
                        <Typography
                          variant="span"
                          fontSize="1.3rem"
                          fontWeight={400}
                        >
                          4th Nov. 2022 12:45pm
                        </Typography>
                      </Typography>
                      <Typography
                        color=" #9B9A9A"
                        fontSize="1.6rem"
                        fontWeight={700}
                      >
                        No other person than Peter Obi.... I’m Obedient
                      </Typography>
                    </Grid>
                  </Grid>

                  {/* second */}
                  <Grid
                    item
                    container
                    sx={{
                      mt: 3,
                      p: 2,
                      border: "1px  solid #9B9A9A",
                      borderRadius: "1rem",
                    }}
                    flexWrap="nowrap"
                  >
                    {/* Image */}
                    <Grid item sx={{ mr: 2 }}>
                      <Avatar>J</Avatar>
                    </Grid>
                    <Grid>
                      {/* <Grid container> */}
                      <Typography
                        color="secondary"
                        fontWeight="600"
                        fontSize={"1.4rem"}
                      >
                        Joshua@4real
                      </Typography>
                      <Typography color="#9B9A9A" fontWeight="700">
                        If you could only ever vote for one person who will that
                        be?
                      </Typography>
                      {/* </Grid> */}
                      <Typography
                        color="#9B9A9A"
                        sx={{ mt: 2 }}
                        fontWeight={"400"}
                        fontSize="1.4rem"
                      >
                        4th Nov, 2022 12:45pm
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

export default Quotes;
