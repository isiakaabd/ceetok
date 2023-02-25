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

const Notification = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading, error } = useGetNotificationsQuery({
    offset: page - 1,
  });
  if (isLoading) return <Skeletons />;
  if (error) return <Error />;
  const { total_pages, notifications } = data;
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
              <List sx={{ width: "100%" }} dense>
                {notifications?.map((item, index) => (
                  <ListItem
                    dense
                    key={index}
                    sx={{
                      textDecoration: "none",
                      color: "text.primary",
                    }}
                    disableGutters
                  >
                    <ListItemButton
                      sx={{
                        background: !item?.seen && "rgba(0, 0, 0, 0.04)",
                      }}
                      dense
                    >
                      <div
                        style={{
                          width: "100%",
                          display: "flex",
                        }}
                      >
                        <ListItemAvatar>
                          <Avatar
                            //   alt={full_name}
                            //   src={getImage(avatar)}
                            //   onClick={() => handleClicks(user_id)}
                            sx={{ cursor: "pointer" }}
                          >
                            J{/* {full_name?.slice(0, 1).toUpperCase()} */}
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            <Grid
                              item
                              container
                              flexDirection="column"
                              alignItems="center"
                            >
                              <Grid
                                item
                                container
                                justifyContent={"space-between"}
                                flexWrap="nowrap"
                                sx={{ overflow: "hidden" }}
                              >
                                <Grid
                                  item
                                  container
                                  alignItems="center"
                                  flexWrap="nowrap"
                                >
                                  <Typography
                                    fontWeight={700}
                                    sx={{
                                      whiteSpace: "nowrap",
                                      overflow: "hidden",
                                      textOverflow: "ellipsis",
                                      // flex: 0.5,
                                    }}
                                  >
                                    {/* {full_name} */} Adekunle
                                  </Typography>

                                  <Grid item sx={{ ml: "auto" }}>
                                    <IconButton
                                      edge="start"
                                      id="basic-button"
                                      // aria-controls={
                                      //   opens ? "basic-menu" : undefined
                                      // }
                                      aria-haspopup="true"
                                      // aria-expanded={opens ? "true" : undefined}
                                      // onClick={handleClick}
                                      sx={{ ml: { xs: "1rem" } }}
                                      //  sx={{ visibility: !check && "hidden" }}
                                    >
                                      <MoreVertOutlined />
                                    </IconButton>
                                    <Menu
                                      id="basic-menu"
                                      // anchorEl={anchorEl}
                                      // open={opens}
                                      // onClose={handleCloses}
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
                                  </Grid>
                                </Grid>
                              </Grid>

                              <Typography
                                component="h4"
                                width="100%"
                                textAlign="left"
                              >
                                {item?.message}
                              </Typography>
                            </Grid>
                          }
                        />
                      </div>
                    </ListItemButton>
                  </ListItem>
                ))}
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
