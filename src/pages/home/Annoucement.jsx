import {
  Grid,
  Button,
  Typography,
  ListItem,
  List,
  ListItemText,
  ListItemButton,
} from "@mui/material";
import { useState } from "react";
import images from "assets";
import { Link, useNavigate } from "react-router-dom";
import CreatePost from "pages/user/modals/CreatePost";
import AnnoucementIcon from "assets/svgs/AnnoucementIcon";
import { CustomButton } from "components";
const Annoucement = () => {
  const [openCreatePost, setCreatePost] = useState(false);
  const navigate = useNavigate();
  // const handleCreatePostOpen = () => setCreatePost(true);
  const handleCreatePostClose = () => setCreatePost(false);
  return (
    <>
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
          <Button
            variant="outlined"
            sx={{
              color: "#464646",
              fontSize: { md: "1.9rem", xs: "1.4rem" },
              fontWeight: 700,
              border: "1px solid #FF9B04",
            }}
            startIcon={<AnnoucementIcon style={{ fontSize: "3rem" }} />}
          >
            Annoucement
          </Button>
          <Grid item>
            <Button
              sx={{
                height: "3.5rem",
                borderRadius: ".5rem",
                backgroundColor: "#5F5C5C",
                color: "#fff",
                fontWeight: 600,
                fontSize: { md: "1.4rem", xs: "1.2rem" },
                padding: "1rem 1.5rem",
                whiteSpace: "nowrap",
              }}
              onClick={() => navigate("/user/create-annoucement")}
              variant="contained"
              disableElevation
            >
              Make Annoucement
            </Button>
          </Grid>
        </Grid>
        <Grid item container flexDirection="column">
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
                  <ListItem
                    disableGutters
                    disablePadding
                    alignItems="flex-start"
                    key={i}
                  >
                    <ListItemButton disableGutters dense>
                      <ListItemText
                        primary={item.title}
                        primaryTypographyProps={{
                          color: "#5F5C5C",
                          fontSize: { md: "2rem", xs: "1.5rem" },
                          fontWeight: 700,
                        }}
                        secondary={
                          <Typography
                            sx={{ fontWeight: 400, fontSize: "1.5rem" }}
                          >
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
          <CustomButton
            title="See More"
            width="10rem"
            fontSize={"1.2rem"}
            borderRadius=".5rem"
            background="#FF9B04"
            component={Link}
            to="annoucement"
          />
        </Grid>
      </Grid>

      <CreatePost open={openCreatePost} handleClose={handleCreatePostClose} />
    </>
  );
};

export default Annoucement;
