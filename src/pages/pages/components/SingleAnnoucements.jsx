import {
  Typography,
  ListItem,
  ListItemText,
  ListItemButton,
} from "@mui/material";

import { getDate, getTime } from "helpers";
const SingleAnnoucements = ({ annoucements }) => {
  const { title, createdAt, user } = annoucements;
  return (
    <ListItem disableGutters disablePadding alignItems="flex-start">
      <ListItemButton disableGutters dense>
        <ListItemText
          primary={title}
          primaryTypographyProps={{
            color: "#5F5C5C",
            fontSize: { md: "2rem", xs: "1.5rem" },
            fontWeight: 700,
          }}
          secondary={
            <Typography sx={{ fontWeight: 400, fontSize: "1.5rem" }}>
              @{user.full_name} {getDate(createdAt)} {getTime(createdAt)}
            </Typography>
          }
        />
      </ListItemButton>
    </ListItem>
  );
};

SingleAnnoucements.propTypes = {};

export default SingleAnnoucements;
