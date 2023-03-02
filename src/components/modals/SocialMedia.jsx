import { Instagram } from "@mui/icons-material";

import {
  Divider,
  Grid,
  IconButton,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";

import NotificationModal from "components/modals/NotificationModal";
import Facebook from "assets/svgs/FacebookIcon";
import Messenger from "assets/svgs/Messenger";
import Twitter from "assets/svgs/Twitter";
import WhatsApp from "assets/svgs/WhatsApp";
import Copy from "assets/svgs/Copy";
import Save from "assets/svgs/Save";
import Share from "assets/svgs/Share";
import Mail from "assets/svgs/Mail";
import { Link, useNavigate } from "react-router-dom";
import Modals from "components/Modal";
import useCopy from "hooks/useCopy";
const buttonStyles = {
  display: "flex",
  flexDirection: "column",
  "&:hover": { background: "transparent" },
  maxWidth: "max-content",
};
const primaryStyles = {
  textAlign: "left",
  fontSize: "1.1rem",
  fontWeight: 400,
  wdith: "100%",
};

const SocialMedia = ({ open, handleClose, copyText, userId, url }) => {
  const [, copyToClipboard] = useCopy();
  const navigate = useNavigate();
  const socialItems = [
    {
      link: `https://www.facebook.com/sharer/sharer.php?u=https://api.ceetok.live/post/have-trust-in-allah-1677684227501`,
      Icon: Facebook,
    },
    {
      link: "",
      Icon: Instagram,
    },
    {
      link: "",
      Icon: Twitter,
    },
    {
      link: "",
      Icon: WhatsApp,
    },
    {
      link: "",
      Icon: Messenger,
    },
  ];
  return (
    <Modals
      styles={{ height: { xs: "auto", md: "auto" } }}
      width={{ md: "30vw", xs: "90%" }}
      isOpen={open}
      background={"#fff"}
      handleClose={handleClose}
    >
      <Grid item container gap={2} sx={{ py: 1 }} flexDirection="column">
        <Typography variant="h2" sx={{ textAlign: "center", width: "100%" }}>
          Share Topic
        </Typography>
        <Grid item>
          <ListItemButton
            disableTouchRipple
            disableRipple
            disableGutters={true}
            component={Link}
            onClick={() => navigate(`user/profile/${userId}`)}
            sx={{
              maxWidth: "max-content",
              px: 1,
            }}
          >
            <ListItemAvatar sx={{ minWidth: "2rem" }}>
              <Mail sx={{ fontSize: "2rem", color: "#5F5C5C" }} />
            </ListItemAvatar>
            <ListItemText
              primary="Send Direct Message"
              primaryTypographyProps={{
                fontSize: "1.2rem",
                fontWeight: 400,
                ml: 1,
              }}
            />
          </ListItemButton>
        </Grid>

        <List sx={{ px: 1, display: "flex", justifyContent: "space-between" }}>
          <ListItemButton
            disableRipple
            disableGutters
            dense
            component="div"
            sx={{ ...buttonStyles }}
          >
            <ListItemIcon>
              <IconButton sx={{ border: "1px solid #5F5C5C" }}>
                <Save sx={{ fontSize: "2rem" }} />{" "}
              </IconButton>
            </ListItemIcon>
            <ListItemText
              primary={"Save"}
              sx={{ width: "100%" }}
              primaryTypographyProps={primaryStyles}
            />
          </ListItemButton>
          <ListItemButton
            disableRipple
            disableGutters
            dense
            component="div"
            onClick={() => copyToClipboard(copyText)}
            sx={buttonStyles}
          >
            <ListItemIcon>
              <IconButton sx={{ border: "1px solid #5F5C5C" }}>
                <Copy sx={{ fontSize: "2rem" }} />
              </IconButton>
            </ListItemIcon>
            <ListItemText
              primary={"Copy Link"}
              primaryTypographyProps={primaryStyles}
            />
          </ListItemButton>
          <ListItemButton
            disableRipple
            disableGutters
            dense
            component="div"
            sx={buttonStyles}
          >
            <ListItemIcon>
              <IconButton sx={{ border: "1px solid #5F5C5C" }}>
                <Share sx={{ fontSize: "2rem" }} />
              </IconButton>
            </ListItemIcon>
            <ListItemText
              primary={"Share Via"}
              primaryTypographyProps={primaryStyles}
            />
          </ListItemButton>
        </List>

        <Divider
          variant="middle"
          flexItem
          // sx={{ width: "100%", m: 0, borderWidth: "1.2px" }}
        />
        <Grid item container justifyContent="space-between" alignItems="center">
          {socialItems.map((social, index) => (
            <IconButton
              key={index}
              onClick={() =>
                navigate(
                  `https://www.facebook.com/sharer/sharer.php?u=${copyText?.text}`
                )
              }
            >
              <social.Icon sx={{ fontSize: "3rem" }} />
            </IconButton>
          ))}
        </Grid>
      </Grid>
    </Modals>
  );
};

SocialMedia.propTypes = {};

export default SocialMedia;
