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

import Copy from "assets/svgs/Copy";
import Save from "assets/svgs/Save";
import Share from "assets/svgs/Share";
import Mail from "assets/svgs/Mail";
import { Link } from "react-router-dom";
import Modals from "components/Modal";
import useCopy from "hooks/useCopy";
import {
  WhatsappShareButton,
  WhatsappIcon,
  TwitterShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TwitterIcon,
  FacebookIcon,
  FacebookShareButton,
} from "react-share";
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

const baseUrl = process.env.REACT_APP_LIVE_LINK;
const SocialMedia = ({ open, handleClose, copyText, data, userId, url }) => {
  const link = `${baseUrl}/post/${data?.slug}`;

  const [, copyToClipboard] = useCopy();

  const socialItems = [
    {
      Icon: FacebookIcon,
      Button: FacebookShareButton,
    },
    {
      Button: LinkedinShareButton,
      Icon: LinkedinIcon,
    },
    {
      // }&text=${encodeURI("Here is a post on " + data?.title)}`,
      Icon: TwitterIcon,
      Button: TwitterShareButton,
    },
    {
      Icon: WhatsappIcon,
      Button: WhatsappShareButton,
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
            to={`/user/message/${userId}`}
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
            <social.Button url={link} quote={data?.title}>
               <social.Icon size={32} round />
            </social.Button>
          ))}
        </Grid>
      </Grid>
    </Modals>
  );
};

SocialMedia.propTypes = {};

export default SocialMedia;
