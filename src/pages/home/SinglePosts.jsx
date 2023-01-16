import images from "assets";
import {
  Grid,
  List,
  ListItemText,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemIcon,
} from "@mui/material";
import { RemoveRedEyeOutlined } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { getDate, getTime } from "helpers";

const AllPosts = ({ post, index }) => {
  const { slug, user, title, category, views_count, updatedAt } = post;

  return (
    <li style={{ marginBottom: "1rem" }}>
      <ListItem button component={Link} to={`/post/${slug}`}>
        <ListItemText
          primary={index}
          primaryTypographyProps={{
            mr: "3rem !important",
            color: "#000",
            fontSize: "1.5rem",
            fontWeight: 700,
            display: {
              md: "block",
              xs: "none",
            },
          }}
          sx={{
            maxWidth: "max-content",
          }}
        />

        <ListItemAvatar
          sx={{
            height: { md: "12rem", xs: "100%" },
            width: { md: "11rem", xs: "5.3rem" },
          }}
        >
          <Avatar
            src={images.obi}
            alt="obi"
            variant="rounded"
            sx={{ marginTop: 2, height: "100%", width: "100%" }}
          />
        </ListItemAvatar>

        <List
          item
          container
          direction="column"
          sx={{
            flex: { md: 3, xs: 1 },
            mx: { md: 3, xs: 1 },
          }}
        >
          <ListItemText
            primary={category}
            primaryTypographyProps={{
              backgroundColor: "#FF9B04",
              padding: ".5rem 1.4rem",
              borderRadius: "2rem",
              fontWeight: 700,
              width: "max-content",
              color: "#fff",
              display: {
                md: "block",
                // xs: "none",
                maxWidth: "max-content",
              },
            }}
            secondary={title}
            secondaryTypographyProps={{
              color: "#5F5C5C",
              mt: { md: 2, xs: 1 },
              fontSize: { md: "2rem", xs: "1.1rem" },
              fontWeight: { md: 700, xs: 600 },
            }}
          />

          <List
            item
            sx={{
              display: { md: "flex", xs: "none" },
              // gap: "2rem",
              justifyContent: "space-between",
              fontSize: { md: "1.2rem", xs: ".8rem" },
              fontWeight: 400,
            }}
          >
            <ListItem disableGutters disablePadding>
              <ListItemText disableTypography sx={{ fontSize: "1rem" }}>
                {user?.email}
              </ListItemText>
              <ListItemText disableTypography sx={{ fontSize: "1rem" }}>
                {getDate(updatedAt)}
              </ListItemText>
              <ListItemText disableTypography sx={{ fontSize: "1rem" }}>
                {getTime(updatedAt)}
              </ListItemText>
            </ListItem>
            {/* <ListItem> */}
            <Grid
              item
              sx={{
                flexWrap: "nowrap",
                alignItems: "center",
                gap: 1,
                display: { xs: "flex", md: "none" },
              }}
            >
              <ListItemIcon sx={{ minWidth: 0 }}>
                <RemoveRedEyeOutlined />
              </ListItemIcon>
              <ListItemText disableTypography primary={200} />
            </Grid>
            {/* </ListItem> */}
          </List>
        </List>
        <Grid
          sx={{
            flex: { sm: 0, md: 1 },
            alignItems: "center",
            display: { md: "flex", xs: "none" },
            justifyContent: "center",
            marginLeft: "auto",
          }}
        >
          <div
            style={{
              width: "2.4rem",
              height: "2.4rem",
              borderRadius: "50%",
              backgroundColor: "#D3D3D3",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {views_count}
          </div>
        </Grid>
      </ListItem>
    </li>
  );
};

export default AllPosts;
