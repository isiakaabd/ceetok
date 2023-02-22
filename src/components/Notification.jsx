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

const Notification = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useGetNotificationsQuery({
    offset: page - 1,
  });
  if (isLoading) return <Skeleton />;

  const { total_pages, notifications } = data;
  console.log(notifications);
  return (
    <Grid item container sx={{ p: 4, background: "#E5E5E5" }}>
      <Grid
        item
        container
        flexDirection="column"
        gap={5}
        sx={{ background: "#fff", px: "3rem", py: "2rem" }}
      >
        <Grid item container flexWrap={"nowrap"} justifyContent="space-between">
          <Typography flex={2}>Notifications</Typography>
          <Grid item flex={1}>
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

        <Paginations page={page} setPage={setPage} count={total_pages} />
      </Grid>
    </Grid>
  );
};

export default Notification;
