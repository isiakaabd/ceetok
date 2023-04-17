import { Avatar, Grid, Typography } from "@mui/material";
import { useGetPostQuery } from "redux/slices/postSlice";
import parser from "html-react-parser";
import { Link } from "react-router-dom";
import { getImage } from "helpers";
import Error from "pages/pages/components/Error";
const Heading = () => {
  const {
    data: array,
    isLoading,
    error,
  } = useGetPostQuery({
    category: "trending",
  });
  if (isLoading) return;
  if (error) return <Error error={error} />;
  const { posts } = array;
  const post = posts?.at(0);

  return (
    <Grid item container>
      <Grid
        item
        container
        flexWrap="nowrap"
        alignItems="center"
        sx={{
          maxHeight: "30rem",
          borderRadius: "1.5rem",
          px: "4rem",
          alignItems: "center",
          background: "#044402",
          // p: { md: 4, xs: 2 },
          // pb: { md: 0, xs: 3 },

          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundColor: "#044402",
          backgroundBlendMode: "overlay",
          backgroundPosition: "cover",
          // height: { md: "40rem", xs: "20rem" },
          // borderRadius: { md: "2rem", xs: "1.2rem" },
        }}
      >
        <Grid
          item
          flex={{ md: 1, xs: 2 }}
          sx={{ minHeight: "20rem", height: "100%" }}
        >
          <Grid item container sx={{ height: "100%" }} alignItems="center">
            <Typography
              fontWeight={700}
              component={post ? Link : null}
              to={`/post/${post?.slug}`}
              sx={{
                color: "#fff",
                // width: "calc(98%)",
                // maxWidth: "90%",
                // overflow: "hidden",
                // textOverflow: "ellipsis",
                // whiteSpace: "nowrap",
              }}
              fontSize={{ md: "4rem", xs: "2rem" }}
            >
              {post ? parser(post?.title) : "No Trending Post yet"}
            </Typography>
          </Grid>
        </Grid>
        {post?.media?.length > 0 && (
          <Grid item flex={{ md: 1, xs: 1, height: "100%" }}>
            <Grid container sx={{ height: "100%" }}>
              <Avatar
                src={
                  post?.media?.length > 0 &&
                  getImage(post?.media[0]?.storage_path)
                }
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  padding: { md: "2rem", xs: "1rem" },
                  borderRadius: "1.2rem",
                  // height: { md: "20rem", xs: "10rem" },
                }}
                alt={post?.title}
              />
            </Grid>
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};

export default Heading;
