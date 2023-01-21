import { Instagram } from "@mui/icons-material";

import { Divider, Grid, IconButton, Typography } from "@mui/material";

import NotificationModal from "components/modals/NotificationModal";
import Facebook from "assets/svgs/FacebookIcon";
import Messenger from "assets/svgs/Messenger";
import Twitter from "assets/svgs/Twitter";
import WhatsApp from "assets/svgs/WhatsApp";
import Copy from "assets/svgs/Copy";
import Save from "assets/svgs/Save";
import Share from "assets/svgs/Share";
import Mail from "assets/svgs/Mail";

const socialItems = [
  {
    link: "",
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

const SocialMedia = ({ open, handleClose }) => {
  return (
    <NotificationModal
      isOpen={open}
      heading="Share Topic"
      width={{ md: "40vw", xs: "90vw", sm: "30vw" }}
      handleClose={handleClose}
    >
      <Grid
        item
        container
        gap={2}
        flexDirection="column"
        sx={{ alignItems: "flex-start" }}
      >
        <Grid item>
          <IconButton edge="start" size="small">
            <Mail sx={{ fontSize: "2rem", color: "#5F5C5C" }} />
          </IconButton>
          <Typography
            variant="span"
            fontSize="1.2rem"
            sx={{ ml: 2 }}
            fontWeight={400}
          >
            Send Direct Message
          </Typography>
        </Grid>

        <Grid item container justifyContent="space-between">
          <Grid item>
            <IconButton sx={{ border: "1px solid #5F5C5C" }}>
              <Save sx={{ fontSize: "2rem" }} />
            </IconButton>
            <Typography
              textAlign="center"
              sx={{ fontSize: "1.1rem", fontWeight: 400 }}
            >
              Save
            </Typography>
          </Grid>
          <Grid item>
            <IconButton sx={{ border: "1px solid #5F5C5C" }}>
              <Copy sx={{ fontSize: "2rem" }} />
            </IconButton>
            <Typography
              textAlign="center"
              sx={{ fontSize: "1.1rem", fontWeight: 400 }}
            >
              Copy Link
            </Typography>
          </Grid>
          <Grid item>
            <IconButton sx={{ border: "1px solid #5F5C5C" }}>
              <Share sx={{ fontSize: "2rem" }} />
            </IconButton>
            <Typography
              textAlign="center"
              sx={{ fontSize: "1.1rem", fontWeight: 400 }}
            >
              Share Via
            </Typography>
          </Grid>
        </Grid>
        <Divider
          variant="middle"
          flexItem
          // sx={{ width: "100%", m: 0, borderWidth: "1.2px" }}
        />
        <Grid item container justifyContent="space-between" alignItems="center">
          {socialItems.map((social, index) => (
            <IconButton key={index}>
              <social.Icon sx={{ fontSize: "3rem" }} />
            </IconButton>
          ))}
        </Grid>
      </Grid>
    </NotificationModal>
  );
};

SocialMedia.propTypes = {};

export default SocialMedia;
