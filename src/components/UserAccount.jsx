import {
  NotificationAddOutlined,
  NotificationsNoneOutlined,
} from "@mui/icons-material";
import {
  Avatar,
  Badge,
  Tooltip,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { useState, useRef } from "react";
import Notifications from "./Notifications";

const UserAccount = () => {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const anchorRefs = useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };
  const [opens, setOpens] = useState(false);

  const handleToggles = () => {
    setOpens((prevOpen) => !prevOpen);
  };

  const handleCloses = (event) => {
    if (anchorRefs.current && anchorRefs.current.contains(event.target)) {
      return;
    }

    setOpens(false);
  };

  return (
    <Grid item>
      <Grid
        item
        container
        gap={{ md: 3, sm: 2, xs: 0.5 }}
        flexWrap="nowrap"
        alignItems="center"
      >
        <IconButton>
          <NotificationsNoneOutlined
            ref={anchorRef}
            id="composition-button"
            aria-controls={open ? "composition-menu" : undefined}
            aria-expanded={open ? "true" : undefined}
            aria-haspopup="true"
            onClick={handleToggle}
            sx={{
              fontSize: { md: "3rem", xs: "2.5rem" },
              color: "#9B9A9A",
            }}
          />
        </IconButton>
        <Notifications
          open={open}
          setOpen={setOpen}
          anchorRef={anchorRef}
          handleClose={handleClose}
          handleToggle={handleToggle}

          //   handleToggles={handleToggles}
        />
        <Grid
          item
          container
          gap={{ md: 1, xs: 0, sm: 1 }}
          alignItems="center"
          flexWrap="nowrap"
        >
          <Tooltip title="Account settings">
            <IconButton
              ref={anchorRefs}
              id="account"
              aria-controls={opens ? "composition-menu" : undefined}
              aria-expanded={opens ? "true" : undefined}
              aria-haspopup="true"
              onClick={handleToggles}
              sx={{ fontSize: { md: "3rem", xs: "1.8rem" }, color: "#9B9A9A" }}
            >
              <Avatar
                sx={{ width: { md: 32, sm: 15 }, height: { md: 32, sm: 15 } }}
              >
                M
              </Avatar>
            </IconButton>
          </Tooltip>
          <Notifications
            opens={opens}
            setOpens={setOpens}
            anchorRefs={anchorRefs}
            handleCloses={handleCloses}
            handleToggles={handleToggles}
          />
          <Typography
            variant="h5"
            fontWeight={700}
            color="#9B9A9A"
            fontSize={{ md: "2rem", xs: "1.4rem", sm: "1.8rem" }}
          >
            Joshua
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default UserAccount;
