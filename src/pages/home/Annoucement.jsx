import {
  Grid,
  Button,
  Typography,
  ListItem,
  List,
  ListItemText,
  ListItemButton,
} from "@mui/material";
import React from "react";
import images from "assets";
import { Link } from "react-router-dom";
const Annoucement = () => {
  return (
    <Grid
      container
      sx={{
        padding: { xs: "2rem", md: "4rem 3rem" },
        mt: 3,
        mx: "1rem",
        background: "#fff",
        borderRadius: "1.2rem",
      }}
    >
      <Grid item container alignItems="center" gap={2}>
        <Grid
          item
          flexWrap="nowrap"
          sx={{ border: "1px solid #FF9B04", padding: "1rem 1.2rem" }}
        >
          <Grid
            container
            alignItems="center"
            justifyContent="center"
            sx={{
              cursor: "pointer",
            }}
            flexWrap="nowrap"
            columnGap={1}
          >
            <img
              src={images.annoucement}
              alt="annoucement icon"
              style={{ width: "3rem", display: "block" }}
            />
            <Typography
              sx={{ color: "#464646", fontSize: "2rem", fontWeight: 700 }}
            >
              Annoucement
            </Typography>
          </Grid>
        </Grid>
        <Grid item>
          <Button
            sx={{
              height: "3.5rem",
              borderRadius: ".5rem",
              backgroundColor: "#5F5C5C",
              color: "#fff",
              fontWeight: 600,
              fontSize: "1.2rem",
              padding: "1rem 1.5rem",
              whiteSpace: "nowrap",
            }}
            variant="contained"
            disableElevation
          >
            Make Annoucement
          </Button>
        </Grid>
      </Grid>
      <List
        item
        container
        sx={{
          mt: 6,
          gap: { md: 3, xs: 2 },
          display: "grid",
          gridTemplateColumns: {
            md: "repeat(3,1fr)",
            xs: "1fr",
            sm: "1fr 1fr",
          },
        }}
      >
        {Array(10)
          .fill({
            title: "Obasanjo dies @86 after brief illness at his home town",
            time: "Joshua@4real   15 oct, 2022  7:39pm",
          })
          .map((item, i) => {
            return (
              <ListItem disableGutters disablePadding alignItems="flex-start">
                <ListItemButton disableGutters dense>
                  <ListItemText
                    primary={item.title}
                    primaryTypographyProps={{
                      color: "#5F5C5C",
                      fontSize: { md: "2rem", xs: "1.5rem" },
                      fontWeight: 700,
                    }}
                    secondary={
                      <Typography sx={{ fontWeight: 400, fontSize: "1.5rem" }}>
                        {item.time}
                      </Typography>
                    }
                  />
                </ListItemButton>

                {/* </ListItemText> */}
              </ListItem>
              // <Grid item>
              //   <Typography
              //     sx={{

              //     {item.title}
              //   </Typography>
              //   <Typography sx={{ fontWeight: 400, fontSize: "1.5rem" }}>
              //     {item.time}
              //   </Typography>
              // </Grid>
            );
          })}
      </List>
      <Link to="annoucement" style={{ textDecoration: "none" }}>
        <Button
          sx={{
            backgroundColor: "#FF9B04",
            color: "#fff",
            fontSize: "1.2rem",
            fontWeight: 700,
            textTransform: "capitalize",
            outline: "none",
            mt: 4,
            ":hover": {
              backgroundColor: "#FF9B04",
            },
          }}
          variant="contained"
        >
          See More
        </Button>
      </Link>
    </Grid>
  );
};

export default Annoucement;
