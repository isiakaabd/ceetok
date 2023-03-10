import {
  Grid,
  ListItemText,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemIcon,
  ListItemButton,
  Typography,
  Badge,
} from "@mui/material";
import { RemoveRedEyeOutlined, StarOutline } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { getImage, getTimeMoment } from "helpers";
import { useState } from "react";
import LoginModal from "components/modals/LoginModal";
import images from "assets";

const AllPosts = ({ post, showUser }) => {
  const { slug, user, media, title, category, views_count, updatedAt } = post;
  const { defaults } = images;
  // const loginStatus = useSelector((state) => state.auth.token);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  return (
    <>
      <ListItemButton
        dense
        onClick={() => navigate(`/post/${slug}`)}
        disableGutters={{ md: false, xs: true }}
        sx={{ maxWidth: "100%", px: { md: 0.5, xs: 0 } }}
      >
        <ListItem
          dense
          secondaryAction={
            <Grid
              item
              container
              flexWrap="nowrap"
              gap={{ md: "4rem" }}
              sx={{ mr: { md: 2, xs: 1 } }}
              alignItems="center"
            >
              <ListItemIcon sx={{ minWidth: "1rem", m: 0 }}>
                <RemoveRedEyeOutlined
                  sx={{
                    fontSize: "2.5rem",
                    display: { md: "block", xs: "none" },
                  }}
                />
              </ListItemIcon>
              <Badge
                badgeContent={views_count}
                color="primary"
                showZero
                max={100}
                sx={{
                  color: "#9B9A9A",
                  "& .MuiBadge-badge": {
                    fontSize: "1.4rem",
                    backgroundColor: "#D3D3D3",
                    width: "3.4rem",
                    height: "3.4rem",
                    borderRadius: "1.7rem",
                    fontWeight: 600,
                  },
                }}
              />
              {/* </Badge> */}
              {/* <div
                style={{
                  width: "2.5rem",
                  height: "2.5rem",
                  borderRadius: "50%",
                  backgroundColor: "#D3D3D3",
                  display: "flex",
                  fontWeight: 700,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography variant="h5" sx={{ m: 0 }}>
                  {views_count}
                </Typography>
              </div> */}
            </Grid>
          }
          alignItems="flex-start"
        >
          <ListItemIcon sx={{ minWidth: "2rem", mt: 0 }}>
            <StarOutline />
          </ListItemIcon>
          <ListItemAvatar
            sx={{
              height: { md: "12rem", xs: "5.3rem" },
              width: { md: "11rem", xs: "5.3rem" },
              mr: 2,
              mt: 0,
            }}
          >
            <Avatar
              src={getImage(media[0]?.storage_path) || defaults}
              alt={title}
              variant="rounded"
              sx={{
                height: "100%",
                width: "100%",
                fontSize: { md: "3rem", xs: "1.5rem" },
              }}
            />
          </ListItemAvatar>

          <ListItemText
            // primary={index + 1}
            // primaryTypographyProps={{
            //   mr: "3rem !important",
            //   color: "#000",
            //   fontSize: "1.5rem",
            //   fontWeight: 700,
            //   display: {
            //     md: "block",
            //     xs: "none",
            //   },
            // }}
            // sx={{
            //   maxWidth: "max-content",
            // }}
            primary={category}
            primaryTypographyProps={{
              backgroundColor: "#FF9B04",
              padding: ".5rem 1.4rem",
              mt: 0,
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
            secondary={
              <>
                <Typography
                  sx={{
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
                >
                  {title}
                </Typography>
                <Grid item container flexWrap="nowrap" gap={2}>
                  {showUser ? (
                    <Typography
                      sx={{
                        fontSize: { md: "2rem", xs: "1.2rem" },
                        maxWidth: "max-content",
                      }}
                    >
                      {user?.username ||
                        user?.email?.split("@")[0] ||
                        user?.full_name}
                    </Typography>
                  ) : null}
                  <Typography
                    sx={{
                      fontSize: { md: "2rem", xs: "1.2rem" },
                      maxWidth: "max-content",
                    }}
                  >
                    {getTimeMoment(updatedAt)}
                  </Typography>
                </Grid>
              </>
            }
            // secondaryTypographyProps={}
          />
        </ListItem>
      </ListItemButton>
      {open && <LoginModal handleClose={() => setOpen(false)} isLogin={open} />}
    </>
  );
};

AllPosts.defaultProps = {
  showUser: true,
};
export default AllPosts;
