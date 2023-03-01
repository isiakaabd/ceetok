import {
  Button,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Skeleton,
  ListItemText,
  Typography,
  useMediaQuery,
  useTheme,
  ListItemAvatar,
  Avatar,
} from "@mui/material";
import { useState } from "react";
import { CustomButton } from "components";
import { Link } from "react-router-dom";
import { RemoveRedEyeOutlined, Star } from "@mui/icons-material";
import Video from "assets/svgs/Video";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import CreatePost from "pages/user/modals/CreatePost";
import { useGetLivePostsQuery } from "redux/slices/adminSlice";
import { getImage } from "helpers";
const Live = () => {
  const theme = useTheme();
  const admin = useSelector((state) => state.auth.admin);
  const breakpoint = useMediaQuery(
    theme.breakpoints.down("sm", { noSsr: true })
  );
  const [state, setState] = useState(true);
  // const [page, setPage] = useState(0);
  const { data: array, isLoading, error } = useGetLivePostsQuery();

  const [open, setOpen] = useState(false);
  if (isLoading) return <Skeletons />;
  // if (error)
  //   return (
  //     <Typography variant="h2" textAlign="center">
  //       {error || "Something went Wrong..."}
  //     </Typography>
  //   );
  // const {

  //   posts,
  // } = array;
  const summaries = array?.posts.filter((item) => item.summary);
  const truncate = (words, maxlength) => {
    if (words.split("").length > maxlength) {
      return `${words.slice(0, maxlength)}…`;
    } else return words;
  };
  return (
    <>
      <Grid
        item
        container
        sx={{ px: { md: "4rem", xs: "1rem" }, py: 4, background: "#E5E5E5" }}
      >
        <Grid
          item
          container
          sx={{
            p: { md: 4, xs: 2 },
            pb: { md: 0, xs: 3 },
            backgroundImage: `url(${
              array?.pinned?.media?.length > 0 &&
              getImage(array?.pinned?.media[0]?.storage_path)
            })`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundColor: "#044402",
            backgroundBlendMode: "overlay",
            backgroundPosition: "cover",
            height: { md: "40rem", xs: "20rem" },
            borderRadius: { md: "2rem", xs: "1.2rem" },
            // "linear-gradient( rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6))",
          }}
        >
          <Grid item>
            <Button
              variant="outlined"
              sx={{
                color: "#37D42A",
                borderColor: "#fff",
                lineHeight: 1.5,
                borderRadius: 0,
                "&:hover": {
                  borderColor: "#fff",
                  borderWidth: ".3rem",
                },
                borderWidth: ".3rem",
                fontSize: { md: "2rem", fontweight: 700 },
              }}
              startIcon={<Video sx={{ fontSize: "large" }} />}
            >
              LIVE
            </Button>
          </Grid>
          <Grid
            item
            container
            sx={{ alignSelf: "flex-end", flexDirection: "column" }}
          >
            <Grid item>
              <Grid container alignItems={"center"} gap={2} sx={{ pb: 3 }}>
                <RemoveRedEyeOutlined sx={{ color: "#fff" }} />{" "}
                <Typography
                  color="#fff"
                  fontSize={{ md: "1.9rem", xs: "1rem" }}
                  fontWeight={400}
                >
                  <Typography fontWeight={700} variant="span">
                    {array?.pinned?.views_count || 0}
                  </Typography>{" "}
                  viewing this page
                </Typography>
              </Grid>
            </Grid>
            <Typography
              color={"#fff"}
              fontWeight={700}
              fontSize={{ md: "5rem", xs: "1.5rem" }}
              component={!error && Link}
              to={array?.pinned?.slug || "#"}
            >
              {array?.pinned?.title
                ? parse(array?.pinned?.title)
                : error && "Something went wrong"}
            </Typography>
          </Grid>
        </Grid>
        {breakpoint && (
          <Grid
            item
            display={{ sm: "none", xs: "flex" }}
            container
            alignItems="center"
            flexWrap="nowrap"
            gap={4}
            sx={{ mt: 4, mb: 2 }}
          >
            <Button
              onClick={() => setState(true)}
              variant="outlined"
              sx={{
                border: state ? "1px solid #FF9B04" : "none",
                color: state ? "#FF9B04" : "#9B9A9A",
                fontSize: "1.5rem",
                fontWeight: 600,
              }}
            >
              OverView
            </Button>
            <Button
              onClick={() => setState(false)}
              variant="outlined"
              sx={{
                border: !state ? "1px solid #FF9B04" : "none",
                color: !state ? "#FF9B04" : "#9B9A9A",
                fontSize: "1.5rem",
                fontWeight: 600,
              }}
            >
              Summary
            </Button>
          </Grid>
        )}
        <Grid item container gap={2} sx={{ mt: 2 }} flexWrap="nowrap">
          <Grid
            item
            md={8}
            display={{
              xs: state && breakpoint ? "block" : "none",
              md: "block",
            }}
            xs={12}
            sx={{
              padding: { md: "2rem 3rem", xs: "1.5rem 2rem" },
              borderRadius: "2rem",
              background: "#fff",
            }}
          >
            <Grid
              item
              container
              sx={{
                height: {
                  md: "12rem",
                  xs: "8rem",
                  borderBottom: "1px solid #C4C4C4",
                },
              }}
              alignItems={"center"}
            >
              {!error ? (
                <Grid item container flexDirection={"column"} flex={1}>
                  <Typography
                    sx={{ fontSize: { md: "3rem", xs: "1.8rem", sm: "2rem" } }}
                    color="#5F5C5C"
                    fontWeight={700}
                  >
                    Reporting Live
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: { md: "2rem", xs: "1.2rem", sm: "1.4rem" },
                    }}
                  >
                    <Typography variant="span" color="#5F5C5C" component={Link}>
                      Josh
                    </Typography>
                    {""} and{" "}
                    <Typography variant="span" color="#5F5C5C" component={Link}>
                      Victor
                    </Typography>
                  </Typography>
                </Grid>
              ) : (
                <Typography variant="h2">Welcome</Typography>
              )}
              {admin && (
                <Grid item sx={{ marginLeft: "auto" }}>
                  <CustomButton
                    sx={{
                      width: { md: "15rem", sm: "12rem", xs: "10rem" },
                      fontSize: { md: "1.5rem", xs: "1.2rem" },
                    }}
                    onClick={() => setOpen(true)}
                    title={error ? "Go Live" : "Get Involved"}
                  />
                </Grid>
              )}
            </Grid>
            <Grid item container sx={{ height: "100%" }}>
              {array?.posts?.length > 0 ? (
                <List
                  item
                  gap={3}
                  sx={{
                    maxHeight: { xs: "30rem", md: "100%" },
                    overflowY: "scroll",
                    width: "100%",
                    "&::-webkit-scrollbar": {
                      width: ".85rem",
                      display: "none",
                    },
                  }}
                >
                  {array?.posts?.map((item, index) => (
                    <ListItem item key={index}>
                      <ListItemButton
                        alignItems="flex-start"
                        sx={{
                          p: 2,
                          borderRadius: "2rem",
                          boxShadow: "0px 8px 9px rgba(0, 0, 0, 0.15)",
                        }}
                        to={`${item.slug}`}
                        disableGutters
                        component={Link}
                      >
                        <ListItemAvatar>
                          <Avatar
                            src={getImage(item?.userProfile?.avatar)}
                            alt={item?.userProfile?.full_name}
                          >
                            {item?.userProfile?.full_name
                              ?.slice(0, 1)
                              .toUpperCase()}
                          </Avatar>
                        </ListItemAvatar>

                        <ListItemText
                          primaryTypographyProps={{
                            color: "#464646",
                            textAlign: "justify",
                            fontSize: { md: "2rem", xs: "1.2rem" },
                          }}
                          secondaryTypographyProps={{
                            color: "#9B9A9A",
                            fontWeight: 500,
                            textAlign: "justify",
                            fontSize: { md: "1.4rem", xs: "1rem" },
                          }}
                          primary={item.title}
                          secondary={parse(truncate(item.body, 500))}
                        />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              ) : (
                <Grid
                  item
                  container
                  justifyContent="center"
                  alignItems="flex-start"
                  sx={{ mt: 4 }}
                >
                  <Typography component="h2" variant="h2">
                    No Post Yet
                  </Typography>
                </Grid>
              )}
            </Grid>
          </Grid>
          <Grid
            item
            md={4}
            xs={12}
            sx={{ height: "100%" }}
            display={{
              xs: !state && breakpoint ? "block" : "none",
              md: "block",
            }}
          >
            <Grid item container>
              <Grid
                item
                container
                justifyContent="center"
                alignItems="center"
                sx={{
                  background: "#044402",
                  height: { md: "14rem", xs: "8rem" },
                  padding: { md: "2rem", xs: "1.5rem" },
                  borderRadius: breakpoint ? 0 : "2rem 2rem 0 0",
                }}
              >
                <Typography
                  color="#fff"
                  sx={{
                    fontWeight: 700,
                    textAlign: "center",
                    fontSize: { md: "3rem", xs: "2rem" },
                  }}
                >
                  Summary
                </Typography>
              </Grid>
              {summaries?.length > 0 ? (
                <List
                  item
                  sx={{
                    p: 2,
                    // pb: 12,
                    backgroundColor: "#fff",
                    width: "100%",
                    // height: "100%",
                    listStyleType: "initial",
                    maxHeight: { xs: "30rem", md: "100%" },
                    overflowY: "scroll",
                    "&::-webkit-scrollbar": {
                      width: ".85rem",
                      display: "none",
                    },
                  }}
                >
                  {summaries?.map((item, index) => (
                    <ListItem dense disableGutters key={index}>
                      <ListItemButton
                        disableRipple
                        component={Link}
                        to={item.slug}
                        alignItems="flex-start"
                        sx={{
                          "& .MuiListItemIcon-root": {
                            minWidth: "3rem",
                          },
                        }}
                      >
                        <ListItemIcon>
                          <Star />
                        </ListItemIcon>
                        <ListItemText
                          sx={{
                            width: "100%",

                            // width: "100%",
                            maxHeight: "15rem",
                            WebkitBoxOrient: "vertical",
                            // display: "block",
                            display: "box",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            lineClamp: 4,
                            WebkitLineClamp: 4,
                          }}
                          primaryTypographyProps={{ textAlign: "justify" }}
                          primary={parse(truncate(item?.body, 400))}
                        />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              ) : (
                <Grid
                  item
                  container
                  sx={{ textAlign: "center", backgroundColor: "#fff", py: 4 }}
                >
                  <Typography variant="h3" width="100%" textAlign="center">
                    No Data Yet
                  </Typography>
                </Grid>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <CreatePost open={open} handleClose={() => setOpen(false)} type="live" />
    </>
  );
};
function Skeletons() {
  return (
    <Grid
      item
      container
      flexWrap={"nowrap"}
      flexDirection="column"
      gap={2}
      // sx={{ , p: 0, overflow: "hidden" }}
      sx={{ mt: 3, px: { xs: "1rem", md: "4rem" }, py: 3 }}
    >
      <Grid item container sx={{ height: "25rem" }}>
        <Skeleton
          sx={{ height: "100%", borderRadius: "1rem", width: "100%" }}
          animation="wave"
          variant="rectangular"
        />
      </Grid>
      <Grid item container flexWrap="nowrap" gap={2} sx={{ height: "15rem" }}>
        <Grid item xs={8}>
          <Skeleton
            sx={{ height: "100%", width: "100%" }}
            animation="wave"
            variant="rectangular"
          />
        </Grid>
        <Grid item xs={4}>
          <Skeleton
            sx={{ height: "100%", width: "100%" }}
            animation="wave"
            variant="rectangular"
          />
        </Grid>
      </Grid>
    </Grid>
  );
}
export default Live;
