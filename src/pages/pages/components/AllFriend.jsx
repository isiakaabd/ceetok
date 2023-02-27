import {
  Avatar,
  Checkbox,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import ArrowBack from "assets/svgs/ArrowBack";
import { DeleteOutline, SettingsOutlined } from "@mui/icons-material";
const AllFriend = (props) => {
  return (
    <Grid
      item
      container
      flexWrap="nowrap"
      gap={1}
      //   sx={{ }}
      sx={{
        paddingInline: { xs: "1rem", md: "4rem" },
        backgroundColor: "#fafafa",
        // mb: 3,
      }}
    >
      <Grid item container flexDirection="column">
        <Grid flex={1} sx={{ py: 1, display: { xs: "none", md: "block" } }}>
          <IconButton>
            <ArrowBack sx={{ fontSize: "3rem" }} />
          </IconButton>
        </Grid>
        <Grid
          item
          container
          justifyContent={"space-between"}
          sx={{
            mb: 3,
            flexDirection: { md: "row", xs: "column" },
            background: "#fff",
            p: 3,
            borderRadius: "2rem",
          }}
        >
          <Grid
            item
            container
            justifyContent="space-between"
            alignItems="center"
            flexWrap="nowrap"
          >
            <Typography
              flex={1}
              color="#9B9A9A"
              fontSize={{ md: "3rem", xs: "1.5rem" }}
            >
              Friends List
            </Typography>
            <Grid item>
              <Grid item container alignItems="center" gap={0.5}>
                <IconButton edge="start">
                  <DeleteOutline sx={{ fontSize: "2.5rem", mt: 1 }} />
                </IconButton>
                <Typography
                  fontSize="1.4rem"
                  fontWeight={400}
                  color="secondary"
                >
                  Delete All
                </Typography>
                <Checkbox
                  defaultChecked
                  sx={{
                    "& .MuiSvgIcon-root": {
                      fontSize: "2.5rem",
                      color: "#9B9A9A",
                    },
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item container>
            <List
              sx={{
                width: "100%",
                p: 2,
                display: "flex",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: 2,
              }}
            >
              {Array(10)
                .fill(undefined)
                .map((item) => (
                  <Grid xs={12} md={5}>
                    <ListItem
                      sx={{
                        borderRadius: "1rem",
                        mb: 2,
                        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                      }}
                      xs={4}
                      md={4}
                    >
                      <ListItemAvatar alignItems="flex-start">
                        <Avatar alt="Remy Sharp">R</Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Grid
                            item
                            alignItems="center"
                            gap={1}
                            container
                            flexWrap="nowrap"
                          >
                            <Typography
                              color="#9B9A9A"
                              fontSize="1.4rem"
                              fontWeight={400}
                            >
                              John Friday
                            </Typography>
                            <div
                              style={{
                                width: ".5rem",
                                background: "#37D42A",
                                height: ".5rem",
                                borderRadius: "50%",
                              }}
                            />
                          </Grid>
                        }
                        // "Brunch this weekend?"
                        secondary={
                          <Typography
                            fontSize="1.4rem"
                            fontWeight={400}
                            color="#9B9A9A"
                          >
                            @johnneskey
                          </Typography>
                        }
                      />
                      <ListItemIcon>
                        <SettingsOutlined
                          sx={{ fontSize: "3rem", color: "#9B9A9A" }}
                        />
                      </ListItemIcon>
                    </ListItem>
                  </Grid>
                ))}
            </List>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

AllFriend.propTypes = {};

export default AllFriend;
