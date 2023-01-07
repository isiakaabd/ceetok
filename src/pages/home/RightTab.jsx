import images from "assets";
import { Grid, Button, Select, MenuItem, Typography } from "@mui/material";

const RightTab = () => {
  return (
    <Grid
      item
      container
      md={9}
      xs={12}
      sx={{
        background: "#fff",
        borderRadius: "2rem ",
        padding: "2rem",
      }}
    >
      <Grid item container justifyContent="space-between" sx={{ pb: 4 }}>
        <div>
          <Button>Create Post</Button>
        </div>
        <Select sx={{ width: "10rem", height: "5rem" }}>
          <MenuItem>Hello</MenuItem>
        </Select>
      </Grid>
      <Grid
        sx={{
          maxHeight: "80rem",
          overflowY: "scroll",
          "&::-webkit-scrollbar": {
            width: ".85rem",
            display: "none",
          },
        }}
      >
        {Array(20)
          .fill({
            topic:
              "Obi campaign shutsdown Kaduna and path ways for North Eastern Collaboration",
          })
          .map((item, index) => {
            return (
              <Grid item container flexWrap="nowrap" sx={{ mb: 4 }}>
                <Typography
                  variant="h6"
                  sx={{
                    mr: "3rem !important",
                    color: "#000",
                    fontSize: "1.5rem",
                    fontWeight: 700,
                  }}
                >
                  {index}
                </Typography>

                <img
                  src={images.obi}
                  style={{ marginTop: 2, height: "8rem" }}
                  alt="obi"
                />
                <Grid
                  item
                  container
                  direction="column"
                  sx={{ flex: { md: 3, sm: 1 }, mx: 2 }}
                >
                  <Typography
                    variant="p"
                    sx={{
                      background: "#FF9B04",
                      padding: ".5rem 1.4rem",
                      borderRadius: "2rem",
                      fontWeight: 700,
                      width: "max-content",
                      color: "#fff",
                    }}
                  >
                    politics
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      color: "#5F5C5C",
                      mt: { md: 2, xs: 1 },
                      fontSize: { md: "2rem", xs: "1rem" },
                      fontWeight: 700,
                    }}
                  >
                    {item.topic}
                  </Typography>
                  <Grid
                    item
                    container
                    gap={2}
                    sx={{
                      fontSize: { md: "1.2rem", xs: ".8rem" },
                      fontWeight: 400,
                    }}
                  >
                    <Typography sx={{ font: "inherit" }}>
                      Joshual@gamil.com
                    </Typography>
                    <Typography sx={{ font: "inherit" }}>
                      15 Oct.2022
                    </Typography>
                    <Typography sx={{ font: "inherit" }}>8:39pm</Typography>
                  </Grid>
                </Grid>
                <Grid
                  sx={{
                    flex: { sm: 0, md: 1 },
                    alignItems: "center",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <div
                    style={{
                      width: "2.4rem",
                      height: "2.4rem",
                      borderRadius: "50%",
                      backgroundColor: "#D3D3D3",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {20}
                  </div>
                </Grid>
              </Grid>
            );
          })}
      </Grid>
    </Grid>
  );
};

export default RightTab;
