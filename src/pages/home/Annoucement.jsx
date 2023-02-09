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
import { Link } from "react-router-dom";
import CreatePost from "pages/user/modals/CreatePost";
import AnnoucementIcon from "assets/svgs/AnnoucementIcon";
import { CustomButton } from "components";
import { useGetAnnoucementsQuery } from "redux/slices/annoucementSlice";
import { getDate, getTime } from "helpers";
const Annoucement = () => {
  const [openCreatePost, setCreatePost] = useState(false);
  const handleCreatePostOpen = () => setCreatePost(true);
  const [page] = useState(0);
  const { data: annoucements } = useGetAnnoucementsQuery({ page });
  const handleCreatePostClose = () => setCreatePost(false);
  return (
    <>
      <Grid
        container
        sx={{
          padding: { xs: "2rem 0", md: "4rem 3rem" },
          mt: 3,
          mx: "1rem",
          background: "#fff",
          borderRadius: "1.2rem",
        }}
      >
        <Grid
          item
          container
          alignItems="center"
          flexWrap="nowrap"
          gap={{ md: 2, xs: 1 }}
        >
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
                padding: { md: "1rem 1.5rem", xs: "1rem" },
                whiteSpace: "nowrap",
              }}
              onClick={handleCreatePostOpen}
              variant="contained"
              disableElevation
            >
              Make Annoucement
            </Button>
          </Grid>
        </Grid>
        <Grid item container flexDirection="column">
          {annoucements?.announcements?.length > 0 ? (
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
              {annoucements?.announcements?.map((item, i) => {
                const { title, createdAt, user, slug } = item;
                return (
                  <ListItem
                    disableGutters
                    disablePadding
                    alignItems="flex-start"
                    key={i}
                  >
                    <ListItemButton
                      disableGutters
                      dense
                      to={`/user/annoucement/${slug}`}
                    >
                      <ListItemText
                        primary={title}
                        primaryTypographyProps={{
                          color: "#5F5C5C",
                          fontSize: { md: "2rem", xs: "1.5rem" },
                          fontWeight: 700,
                        }}
                        secondary={
                          <Typography
                            sx={{ fontWeight: 400, fontSize: "1.5rem" }}
                          >
                            @{user.full_name} {getDate(createdAt)}{" "}
                            {getTime(createdAt)}
                          </Typography>
                        }
                      />
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          ) : (
            <Typography variant="h2" sx={{ mt: 4 }} textAlign="center">
              No Annoucement Yet
            </Typography>
          )}

          {annoucements?.announcements?.length > 0 && (
            <CustomButton
              title="See More"
              width="10rem"
              fontSize={"1.2rem"}
              borderRadius=".5rem"
              background="#FF9B04"
              component={Link}
              to="/user/annoucement"
            />
          )}
        </Grid>
      </Grid>

      <CreatePost
        open={openCreatePost}
        handleClose={handleCreatePostClose}
        postHeading={"Make Annoucement"}
        uploadType={"annoucement"}
        initialValues={{
          title: "",
          text: "",
          duration: "",
        }}
      />
    </>
  );
};

export default Annoucement;
