import {
  Avatar,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Skeleton,
  Typography,
} from "@mui/material";
import SearchComponent from "./modals/SearchComponent";
import { Delete, MoreVertOutlined } from "@mui/icons-material";
import { useGetNotificationsQuery } from "redux/slices/authSlice";
import Paginations from "./modals/Paginations";
import { useState } from "react";
import Error from "pages/pages/components/Error";
import { getImage } from "helpers";

const Notification = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading, error } = useGetNotificationsQuery({
    offset: page - 1,
  });

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  if (isLoading) return <Skeletons />;
  if (error) return <Error />;
  const { total_pages, notifications } = data;
  console.log(data);
  return (
    <Grid item container sx={{ p: { md: 4, xs: 1 }, background: "#E5E5E5" }}>
      <Grid
        item
        container
        flexDirection="column"
        gap={3}
        sx={{ background: "#fff", px: { md: "3rem", xs: ".5rem" }, py: "2rem" }}
      >
        <Grid
          item
          container
          flexDirection={{ md: "row", xs: "column" }}
          alignItems="center"
          gap={2}
          justifyContent="space-between"
        >
          <Typography flex={1} variant="h2">
            Notifications
          </Typography>
          <Grid item sx={{ width: "100%" }} flex={{ xs: 1 }}>
            <SearchComponent
              placeholder={"Search Username"}
              handleSubmit={{}}
            />
          </Grid>
        </Grid>
        <Grid item container>
          <Grid md={8} xs={12} sx={{ margin: "auto" }}>
            {notifications.length > 0 ? (
              <List sx={{ width: "100%" }} dense component="ol">
                {notifications?.map((item) => {
                  const {
                    message,
                    owner,
                    seen,
                    id,
                    owner_type,

                    owner_id,
                  } = item;
                  console.log(item);
                  return (
                    <ListItem
                      dense
                      key={id}
                      disablePadding
                      secondaryAction={
                        <>
                          <ListItemIcon>
                            <IconButton
                              edge="start"
                              id="basic-button"
                              aria-controls={open ? "basic-menu" : undefined}
                              aria-haspopup="true"
                              aria-expanded={open ? "true" : undefined}
                              onClick={handleClick}
                              sx={{ ml: { xs: "1rem" } }}
                            >
                              <MoreVertOutlined />
                            </IconButton>
                          </ListItemIcon>
                          <Menu
                            variant="menu"
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            className="menu-item-notification"
                            onClose={handleClose}
                            sx={{
                              "& .MuiPaper-root": {
                                boxShadow: "0px 0px 2px 2px rgba(0,0,0,0.01)",
                              },
                            }}
                            MenuListProps={{
                              "aria-labelledby": "basic-button",
                            }}
                          >
                            <MenuItem
                              // onClick={handleDeleteComment}
                              sx={{
                                display: "flex",
                                alignItems: "center",
                              }}
                              // disabled={check}
                            >
                              <ListItemIcon>
                                <Delete sx={{ fontSize: "2rem" }} />
                              </ListItemIcon>

                              <ListItemText sx={{ fontSize: "3rem" }}>
                                Delete
                              </ListItemText>
                            </MenuItem>
                          </Menu>
                        </>
                      }
                      sx={{
                        textDecoration: "none",
                        color: "text.primary",
                      }}
                      disableGuttecommentsrs
                    >
                      <ListItemButton
                        sx={{
                          background: !seen && "rgba(0, 0, 0, 0.04)",
                        }}
                        dense
                        to={
                          owner_type === "user"
                            ? `profile/?id=${owner_id}`
                            : owner_type === "comments"
                            ? `comment/?id=${owner_id}`
                            : owner_type === "posts"
                            ? `/post/${owner?.slug}`
                            : owner_type === "live"
                            ? `/post/${owner?.slug}`
                            : owner_type === "chat"
                            ? `/user/message/${owner?.sender_id}`
                            : null
                        }
                      >
                        <ListItemAvatar>
                          <Avatar
                            alt={owner?.full_name}
                            src={getImage(owner?.avatar)}
                          >
                            {owner?.full_name?.slice(0, 1).toUpperCase()}
                          </Avatar>
                        </ListItemAvatar>
                        {/* <ListItemIcon>
                          <StarOutline />
                        </ListItemIcon> */}

                        <ListItemText primary={message} />
                      </ListItemButton>
                    </ListItem>
                  );
                })}
              </List>
            ) : (
              <Typography
                variant="h2"
                sx={{ width: "100%", textAlign: "center" }}
              >
                No Notification Yet
              </Typography>
            )}
          </Grid>
        </Grid>

        {total_pages > 1 && (
          <Paginations page={page} setPage={setPage} count={total_pages} />
        )}
      </Grid>
    </Grid>
  );
};

function Skeletons() {
  return (
    <Grid
      item
      sx={{ p: 3, width: { md: "70%", xs: "100%" }, margin: "auto" }}
      gap={3}
      overflow={"hidden"}
    >
      <Grid
        item
        container
        gap={2}
        flexDirection={{ xs: "column", md: "row" }}
        alignItems={"center"}
        justifyContent={"space-between"}
        flexWrap="nowrap"
      >
        <Grid item sx={{ width: "20%" }}>
          <Skeleton
            sx={{ height: "1rem", width: "100%", mr: 2 }}
            animation="wave"
            variant="text"
          />
        </Grid>
        <Grid item sx={{ width: "80%" }}>
          <Skeleton
            sx={{ height: "3rem", borderRadius: "2rem", width: "100%" }}
            animation="wave"
            variant="rectangular"
          />
        </Grid>
      </Grid>

      <Grid container flexDirection="column" sx={{ mt: 4 }} gap={2}>
        {Array(7)
          .fill(undefined)
          .map((item, index) => (
            <Grid
              item
              container
              flexWrap="nowrap"
              alignItems="center"
              justifyContent="space-around"
            >
              <Grid item>
                <Skeleton
                  key={index}
                  sx={{ height: "5rem", width: "5rem", mr: 2 }}
                  animation="wave"
                  variant="circular"
                />
              </Grid>
              <Grid item xs={7}>
                <Grid container gap={1} flexDirection={"column"}>
                  <Skeleton
                    key={index}
                    sx={{ height: "1rem", width: "40%" }}
                    animation="wave"
                    variant="text"
                  />
                  <Skeleton
                    key={index}
                    sx={{ height: ".8rem", width: "70%" }}
                    animation="wave"
                    variant="text"
                  />
                </Grid>
              </Grid>
              <Grid item marginLeft="auto">
                <Skeleton
                  key={index}
                  sx={{ height: "2rem", width: ".3rem" }}
                  animation="wave"
                  variant="rectangular"
                />
              </Grid>
            </Grid>
          ))}
      </Grid>
    </Grid>
  );
}
export default Notification;
