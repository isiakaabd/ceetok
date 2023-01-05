import {
  Grid,
  List,
  ListItem,
  Button,
  ListItemText,
  Typography,
} from "@mui/material";
import images from "assets";

const Footer = () => {
  const { facebook, youtube, linkedin, twitter, instagram } = images;
  const icons = [facebook, youtube, linkedin, twitter, instagram];
  return (
    <Grid
      item
      container
      sx={{ color: "#fff", paddingBottom: "4rem", background: "#044402" }}
    >
      <Grid
        item
        container
        gap={4}
        sx={{
          padding: "3rem",

          flexWrap: "nowrap",
        }}
      >
        <Grid item sx={{ flex: 1.2 }}>
          <img src={images.logo} alt="ceetok" style={{ width: "10rem" }} />
          <Typography style={{ fontSize: "1.2rem", fontWeight: 500 }}>
            Tortor, lobortis semper viverra ac, molestie tortor laoreet amet
            euismod et diam quis aliquam consequat porttitor integer a nisl, in
            faucibus nunc et aenean turpis dui dignissim nec scelerisque
            ullamcorper eu neque, augue quam quis lacus pretium eros est amet
            turpis nunc in turpis massa et
          </Typography>
        </Grid>
        <Grid item sx={{ flex: 1 }}>
          <List>
            <ListItem dense disableGutters>
              <ListItemText
                disableTypography
                sx={{ fontSize: "1.3rem", fontWeight: 700 }}
              >
                Company
              </ListItemText>
            </ListItem>
            <ListItem disableGutters>
              <ListItemText>Terms & Condtions</ListItemText>
            </ListItem>
            <ListItem disableGutters>
              <ListItemText>Contact Us</ListItemText>
            </ListItem>
            <ListItem disableGutters>
              <ListItemText>Message Moderator</ListItemText>
            </ListItem>
          </List>
        </Grid>
        <Grid item sx={{ flex: 1 }}>
          <List>
            <ListItem dense disableGutters>
              <ListItemText
                disableTypography
                sx={{ fontSize: "1.3rem", fontWeight: 700 }}
              >
                Quick Links
              </ListItemText>
            </ListItem>
            <ListItem disableGutters>
              <ListItemText>Sign In</ListItemText>
            </ListItem>
            <ListItem disableGutters>
              <ListItemText>Login</ListItemText>
            </ListItem>
            <ListItem disableGutters>
              <ListItemText>Forgotten Password</ListItemText>
            </ListItem>
            <ListItem disableGutters>
              <ListItemText>Forgotten Password</ListItemText>
            </ListItem>
          </List>
        </Grid>
        <Grid item sx={{ flex: 1.2 }}>
          <List>
            <ListItem dense disableGutters>
              <ListItemText
                disableTypography
                sx={{ fontSize: "1.3rem", fontWeight: 700 }}
              >
                Community
              </ListItemText>
            </ListItem>
            <Grid item container gap={4} sx={{ mt: 4 }}>
              {icons.map((icon, index) => (
                //   <ListItem key={index}>
                /* <ListItemIcon> */
                <img src={icon} style={{ height: "3rem", width: "3rem" }} />
                // </ListItemIcon>
                //   </ListItem>
              ))}
            </Grid>
          </List>
        </Grid>
        <Grid item sx={{ flex: 2.5, mt: 3 }}>
          <List>
            <ListItem dense disableGutters>
              <ListItemText
                disableTypography
                sx={{
                  fontSize: "1.3rem",
                  textAlign: "center",
                  fontWeight: 700,
                }}
              >
                Subscribe to our updates{" "}
              </ListItemText>
            </ListItem>

            <ListItemText sx={{ fontSize: "1.2rem" }}>
              Join over 2,000 subscribers and get the latest and trending
              updates{" "}
            </ListItemText>
          </List>
          <Grid
            item
            container
            sx={{ height: "4rem", border: "transparent", flexWrap: "nowrap" }}
          >
            <input
              type="text"
              placeholder="Enter Email Address"
              style={{
                flex: 1,
                outline: "none",
                padding: "1rem 4rem 1rem 3rem",
                height: "100%",
                background: "transparent",
                border: "1.5px solid #C4C4C4",
                borderRadius: "2rem",
                color: "#fff",
              }}
            />
            <Button
              style={{
                background: "#37D42A",
                borderRadius: "2rem",
                padding: "0 2rem",
                marginLeft: "-4rem",
                fontSize: "1.2rem",
                fontWeight: 700,
                color: "#fff",
              }}
              variant="outlined"
            >
              Subscribe
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Typography
        sx={{
          fontSize: "1.3rem",
          textAlign: "center",
          fontWeight: 600,
          width: "100%",
          color: "rgba(255, 255, 255, 0.6)",
        }}
        variant="p"
      >
        Copyright - Ceetok (C) 2022
      </Typography>
    </Grid>
  );
};

export default Footer;
