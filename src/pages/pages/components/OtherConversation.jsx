import { Grid, List, Skeleton, Typography } from "@mui/material";
import SinglePosts from "pages/home/SinglePosts";
import { useGetPostQuery } from "redux/slices/postSlice";
const OtherConversation = () => {
  const { data: posts, isLoading } = useGetPostQuery({
    category: "politics",
  });
  if (isLoading) return <Skeleton />;
  return (
    <Grid item container>
      <Grid
        item
        container
        alignItems="center"
        sx={{
          backgroundColor: "#FF9B04",
          borderRadius: { md: ".7rem", sm: 0 },
          py: 2,
          px: 1,
        }}
      >
        <Typography
          sx={{
            fontSize: { md: "3rem", xs: "2.3rem" },
            fontWeight: 600,
            color: "#fff",
          }}
        >
          Politics
        </Typography>
      </Grid>
      {posts?.posts?.length > 0 ? (
        <List
          sx={{
            maxHeight: "80rem",
            overflowY: "scroll",
            width: "100%",
            "&::-webkit-scrollbar": {
              width: ".85rem",
              display: "none",
            },
          }}
          xs={12}
        >
          {posts?.posts?.map((post, index) => {
            return (
              <SinglePosts
                key={index}
                post={post}
                display={{ xs: "none", md: "flex" }}
              />
            );
          })}
        </List>
      ) : (
        <Typography
          variant="h2"
          sx={{ py: 2, width: "100%", textAlign: "center" }}
        >
          No Data
        </Typography>
      )}
    </Grid>
  );
};

export default OtherConversation;
