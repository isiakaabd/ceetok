import { ArrowBack } from "@mui/icons-material";
import { Grid, IconButton } from "@mui/material";
import ProfileDetails from "pages/pages/components/ProfileDetails";
import UserTab from "pages/pages/components/UserTab";

const Profile = () => {
  return (
    <Grid
      item
      container
      flexWrap="nowrap"
      gap={1}
      //   sx={{ }}
      sx={{
        paddingInline: { xs: "1rem", md: "4rem" },
        backgroundColor: "#fafafa",
        // mb: 3,
      }}
    >
      <Grid item container flexDirection="column">
        <Grid item>
          <Grid container sx={{ py: 1, display: { xs: "none", md: "block" } }}>
            <IconButton>
              <ArrowBack sx={{ fontSize: "3rem" }} />
            </IconButton>
          </Grid>
        </Grid>
        <Grid
          item
          container
          justifyContent={"space-between"}
          sx={{
            mb: 3,
            flexDirection: { md: "row", xs: "column" },
            // height: "100%",
          }}
        >
          <Grid item md={3} xs={12} flex={{ xs: 1 }}>
            <ProfileDetails />
          </Grid>
          <Grid
            item
            xs={12}
            md={8.5}
            flex={{ xs: 1 }}
            sx={{
              height: "100%",
              background: "#fff",
              borderRadius: "0 0 2rem 2rem",
            }}
          >
            <UserTab />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Profile;
