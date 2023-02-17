import {
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import images from "assets";
import { Link } from "react-router-dom";

const Footer = () => {
  const { facebook, youtube, linkedin, twitter, instagram } = images;
  const icons = [facebook, youtube, linkedin, twitter, instagram];
  const items = [
    {
      name: "Terms & Condtions",
      route: "/guideline",
    },
    {
      name: "Contact Us",
      route: "/contact-us",
    },
    {
      name: "Message Moderator",
      route: "/message-us",
    },
    {
      name: "Privacy Policy",
      route: "/privacy",
    },
  ];
  const items2 = [
    {
      name: "Sign In",
      route: "#",
    },
    {
      name: "Login",
      route: "#",
    },
    {
      name: "Forgotten Password",
      route: "#",
    },
  ];
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

          flexWrap: { md: "nowrap", xs: "wrap" },
          flexDirection: { md: "row", xs: "column" },
        }}
      >
        <Grid item sx={{ flex: { md: 1.2, xs: 1 } }}>
          <img src={images.logo} alt="ceetok" style={{ width: "10rem" }} />
          <Typography style={{ fontSize: "1.2rem", fontWeight: 500 }}>
            Tortor, lobortis semper viverra ac, molestie tortor laoreet amet
            euismod et diam quis aliquam consequat porttitor integer a nisl, in
            faucibus nunc et aenean turpis dui dignissim nec scelerisque
            ullamcorper eu neque, augue quam quis lacus pretium eros est amet
            turpis nunc in turpis massa et
          </Typography>
        </Grid>
        <Grid item sx={{ flex: { md: 1, xs: 1 } }}>
          <List>
            <ListItem dense disableGutters>
              <ListItemText
                primaryTypographyProps={{
                  fontSize: "1.3rem",
                  fontWeight: 700,
                }}
                primary="Company"
              />
            </ListItem>

            {items.map((item, index) => (
              <ListItem disableGutters disablePadding key={index}>
                <ListItemButton
                  disableGutters
                  disableRipple
                  disableTouchRipple
                  component={Link}
                  to={item.route}
                >
                  <ListItemText primary={item.name} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Grid>
        <Grid item sx={{ flex: { md: 1, xs: 1 } }}>
          <List>
            <ListItem dense disableGutters>
              <ListItemText
                primaryTypographyProps={{
                  fontSize: "1.3rem",
                  fontWeight: 700,
                }}
                primary="Quick Links"
              />
            </ListItem>

            {items2.map((item, index) => (
              <ListItem disableGutters disablePadding key={index}>
                <ListItemButton
                  disableGutters
                  disableRipple
                  disableTouchRipple
                  component={Link}
                  to={item.route}
                >
                  <ListItemText primary={item.name} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Grid>
        <Grid item sx={{ flex: { md: 1.2, xs: 1 } }}>
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
                <img
                  src={icon}
                  key={index}
                  style={{ height: "3rem", width: "3rem" }}
                />
              ))}
            </Grid>
          </List>
        </Grid>
        <Grid
          item
          sx={{ flex: { md: 2.5, xs: 1 }, mt: 3, order: { xs: 1, md: 5 } }}
        >
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
          {/* <Grid
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
          </Grid> */}
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
