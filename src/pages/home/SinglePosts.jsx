import images from "assets";
import {
  Grid,
  List,
  ListItemText,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemIcon,
  ListItemButton,
  Skeleton,
} from "@mui/material";
import { RemoveRedEyeOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { getDate, getImage, getTime } from "helpers";
import { useSelector } from "react-redux";
import { useState } from "react";
import LoginModal from "components/modals/LoginModal";

const AllPosts = ({ post, index, showUser }) => {
  const {
    slug,
    id,
    user,
    media,
    title,
    recent_views,
    category,
    views_count,
    updatedAt,
  } = post;

  const loginStatus = useSelector((state) => state.auth.token);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  // const handleLogin = () => setOpen(true);

  function Skeletons() {
    return (
      <Grid item container gap={3} flexWrap={{ md: "nowrap", xs: "wrap" }}>
        {Array(3)
          .fill(undefined)
          .map((item, index) => (
            <Grid item container gap={4} key={index}>
              <Skeleton
                sx={{ height: "15rem", width: "10rem" }}
                animation="wave"
                variant="rectangular"
              />

              <Skeleton
                sx={{ height: "15rem", width: "100%" }}
                animation="wave"
                variant="rectangular"
              />
            </Grid>
          ))}
      </Grid>
    );
  }

  return (
    <>
      <ListItemButton
        button
        // component={Link}
        onClick={() =>
          loginStatus ? navigate(`/post/${slug}`) : setOpen(true)
        }
      >
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
            src={
              media.length > 0 ? getImage(media[0]?.storage_path) : images.obi
            }
            alt="obi"
            variant="rounded"
            sx={{ height: "100%", width: "100%" }}
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
          dense
          disablePadding
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
              // mt: { md: 2, xs: 1 },
              fontSize: { md: "2rem", xs: "1.2rem" },
              fontWeight: { md: 700, xs: 600 },
              width: "calc(98%)",
              maxWidth: "100%",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              display: "inlineBlock",
            }}
          />

          <List
            item
            sx={{
              display: { xs: "flex" },
              fontSize: { md: "1.2rem", xs: "1rem" },
              fontWeight: 400,
            }}
            disablePadding
            dense
          >
            <ListItem
              disableGutters
              // disablePadding
              sx={{ gap: { md: "2rem", xs: "1rem" } }}
            >
              {showUser ? (
                <ListItemText
                  disableTypography
                  sx={{
                    fontSize: { md: "2rem", xs: "1.2rem" },
                    maxWidth: "max-content",
                  }}
                >
                  {user?.username || user?.email?.split("@")[0]}
                </ListItemText>
              ) : null}
              <ListItemText
                disableTypography
                sx={{
                  fontSize: { md: "2rem", xs: "1.2rem" },
                  maxWidth: "max-content",
                }}
              >
                {getDate(updatedAt)}
              </ListItemText>
              <ListItemText
                disableTypography
                sx={{
                  fontSize: { md: "2rem", xs: "1.2rem" },
                  maxWidth: "max-content",
                }}
              >
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
                display: { md: "none", xs: "flex" },
              }}
            >
              <ListItemIcon sx={{ minWidth: 0 }}>
                <RemoveRedEyeOutlined />
              </ListItemIcon>
              <ListItemText disableTypography primary={views_count} />
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
              fontWeight: 700,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {views_count}
          </div>
        </Grid>
      </ListItemButton>

      {open && (
        <LoginModal
          handleClose={() => setOpen(false)}
          // setIsLogin={setIsLogin}
          // handleRegisterOpen={handleRegisterOpen}
          isLogin={open}
        />
      )}
    </>
  );
};

AllPosts.defaultProps = {
  showUser: true,
};
export default AllPosts;
