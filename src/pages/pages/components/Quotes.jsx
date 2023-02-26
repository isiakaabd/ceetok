import {
  Avatar,
  Grid,
  Typography,
  Skeleton,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  List,
} from "@mui/material";
import parse from "html-react-parser";
import Paginations from "components/modals/Paginations";
import { useState } from "react";
import { useGetUserQuotesQuery } from "redux/slices/quoteSlice";
import Error from "./Error";
import { DeleteOutline } from "@mui/icons-material";
import { useUserProfileQuery } from "redux/slices/authSlice";
import { getImage, getTimeMoment } from "helpers";

const Quotes = () => {
  const [pages, setPages] = useState(1);
  const { data, isLoading, error, isFetching } = useGetUserQuotesQuery(
    pages - 1
  );
  const {
    data: profile,
    isLoading: loading,
    error: err,
  } = useUserProfileQuery();

  if (isLoading || loading) return <Skeletons />;

  if (error || err) return <Error />;

  const { total_pages, quotes, edited, updatedAt } = data;
  const { full_name, avatar } = profile;
  return (
    <Grid
      item
      container
      sx={{
        mt: "2rem",
        py: 4,
        px: { md: 2, xs: 0 },
        borderRadius: "2rem",
        backgroundColor: "#fff",
      }}
      flexDirection="column"
    >
      <Grid
        item
        container
        alignItems={"center"}
        // sx={{ }}
      >
        {isFetching && (
          <Typography varinat="h4" fontWeight={700}>
            Loading...
          </Typography>
        )}
        <IconButton sx={{ ml: "auto" }}>
          <DeleteOutline sx={{ fontSize: "2rem" }} />
        </IconButton>
      </Grid>
      <Grid item container sx={{ maxHeight: "10%", overflowY: "scroll" }}>
        {quotes?.length > 0 ? (
          <List sx={{ maxWidth: "100%" }}>
            {quotes?.map((item) => {
              const { body, id, createdAt, parent } = item;
              return (
                <>
                  <ListItem dense disableGutters key={id}>
                    <ListItemButton alignItems="flex-start">
                      <ListItemAvatar>
                        <Avatar src={getImage(avatar)} alt={full_name}>
                          {full_name?.slice(0, 1).toUpperCase()}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Typography
                            fontWeight={700}
                            color="color.text"
                            fontSize={{ md: "1.8rem", xs: "1.4rem" }}
                          >
                            {full_name}
                            <Typography
                              variant="span"
                              fontWeight={400}
                              sx={{ ml: 1 }}
                            >
                              {getTimeMoment(edited ? updatedAt : createdAt)}
                            </Typography>
                          </Typography>
                        }
                        secondary={
                          <>
                            <Typography
                              // color=" #9B9A9A"
                              // fontWeight={700}
                              variant="span"
                              fontWeight={500}
                              sx={{
                                // width: "max-content",
                                fontSize: { md: "1.8rem", xs: "1.4rem" },
                              }}
                              className="likes-content"
                            >
                              {parse(body)}
                            </Typography>

                            <Grid
                              item
                              container
                              sx={{
                                mt: 1,
                                p: 2,
                                border: "1px  solid #9B9A9A",
                                borderRadius: "1rem",
                              }}
                              flexWrap="nowrap"
                            >
                              {/* Image */}
                              <Grid item sx={{ mr: 2 }}>
                                <Avatar
                                  src={getImage(parent?.user?.avatar)}
                                  alt={parent?.user?.full_name}
                                >
                                  {parent?.user?.full_name
                                    ?.slice(0, 1)
                                    .toUpperCase()}
                                </Avatar>
                              </Grid>
                              <Grid item container flexDirection="column">
                                <Grid container gap={1} flexWrap="nowrap">
                                  <Typography
                                    color="secondary"
                                    fontWeight="600"
                                    fontSize={"1.4rem"}
                                  >
                                    {parent?.user?.full_name}
                                  </Typography>
                                  <Typography
                                    color="#9B9A9A"
                                    fontWeight={"400"}
                                    fontSize="1.4rem"
                                  >
                                    {getTimeMoment(parent?.createdAt)}
                                  </Typography>
                                </Grid>
                                <Typography
                                  variant="span"
                                  fontWeight={500}
                                  sx={{
                                    fontSize: { md: "1.8rem", xs: "1.4rem" },
                                  }}
                                  className="likes-content"
                                >
                                  {parent?.body
                                    ? parse(parent?.body)
                                    : parent?.comments &&
                                      parse(parent?.comments)}
                                </Typography>
                              </Grid>
                            </Grid>
                          </>
                        }
                      />
                    </ListItemButton>
                  </ListItem>
                </>
              );
            })}
          </List>
        ) : (
          <Typography variant="h2" sx={{ width: "100%", textAlign: "center" }}>
            No Data Yet
          </Typography>
        )}
      </Grid>
      {total_pages > 1 && (
        <Paginations page={pages} setPage={setPages} count={total_pages} />
      )}
    </Grid>
  );
};
function Skeletons() {
  return (
    <Grid
      sx={{ px: { md: 2, xs: 1 }, py: 4 }}
      item
      flexDirection={"column"}
      container
      gap={3}
      overflow={"hidden"}
    >
      <Grid item marginLeft="auto">
        <Skeleton
          sx={{ height: "2.5rem", width: "2rem" }}
          animation="wave"
          variant="rectangular"
        />
      </Grid>

      <Grid container flexDirection="column" gap={2}>
        {Array(7)
          .fill(undefined)
          .map((item, index) => (
            <Grid item container flexWrap="nowrap" gap={2}>
              <Grid item>
                <Skeleton
                  key={index}
                  sx={{ height: "5rem", width: "5rem" }}
                  animation="wave"
                  variant="circular"
                />
              </Grid>
              <Grid item container>
                <Grid item gap={2} container flexDirection="Column">
                  <Grid item container>
                    <Skeleton
                      key={index}
                      sx={{ height: "3rem", width: "100%" }}
                      animation="wave"
                      variant="rounded"
                    />
                  </Grid>
                  <Grid item container gap={1} flexWrap="nowrap">
                    <Grid item>
                      <Skeleton
                        key={index}
                        sx={{ height: "3rem", width: "3rem" }}
                        animation="wave"
                        variant="circular"
                      />
                    </Grid>
                    <Grid item container>
                      <Skeleton
                        key={index}
                        sx={{ height: "2rem", width: "100%" }}
                        animation="wave"
                        variant="rounded"
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          ))}
      </Grid>
    </Grid>
  );
}

export default Quotes;
