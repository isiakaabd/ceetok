import { Grid, List, Skeleton, Typography } from "@mui/material";

import { useState } from "react";
import { useGetPostQuery } from "redux/slices/postSlice";
import SinglePosts from "pages/home/SinglePosts";

import Paginations from "components/modals/Paginations";
import GroupedSelect from "components/modals/GroupSelect";
const Categories = () => {
  const [page, setPage] = useState(1);

  const [category, setCategory] = useState("");

  const {
    data: AllPosts,
    isLoading: loading,
    isFetching,
  } = useGetPostQuery({
    offset: page - 1,
    category,
  });
  if (loading) return <Skeleton />;
  const { posts, total_pages } = AllPosts;

  return (
    <Grid item container sx={{ p: { md: 4, xs: 1 } }}>
      <Grid item container flexWrap="nowrap" alignItems="center" sx={{ mb: 3 }}>
        <Typography
          sx={{
            flex: 1,
            color: "#9B9A9A",
            fontWeight: 700,
            fontSize: { md: "1.6rem", xs: "1.4rem" },
          }}
        >
          All Categories
        </Typography>
        {isFetching && (
          <Typography
            flex={1}
            variant="h4"
            sx={{ color: "#37D42A" }}
            color="success"
          >
            Loading...
          </Typography>
        )}

        <Grid item>
          <GroupedSelect
            category={category}
            setCategory={setCategory}
            setPage={setPage}
          />
        </Grid>
      </Grid>
      <Grid item container>
        {posts?.length > 0 ? (
          <>
            <List
              dense
              sx={{
                maxHeight: "120rem",
                overflowY: "scroll",
                width: "100%",
                "&::-webkit-scrollbar": {
                  width: ".8rem",
                  display: "none",
                  ml: 0.4,
                },
              }}
            >
              {posts?.map((post, index) => {
                return <SinglePosts key={index} index={index} post={post} />;
              })}
            </List>

            {total_pages > 1 && (
              <Paginations
                page={page}
                setPage={setPage}
                count={AllPosts?.total_pages}
              />
            )}
            {/* </Grid> */}
          </>
        ) : (
          <Typography variant="h2" sx={{ width: "100%" }} textAlign="center">
            No Data yet
          </Typography>
        )}
      </Grid>

      {/* <Grid item container gap={3}> */}
      {/* {categories?.map((item, index) => {
          return (
            <Grid
              item
              key={index}
              container
              sx={{ border: "1px solid #C4C4C4", p: 2 }}
            >
              <Grid item container flexWrap="nowrap" alignItems="center">
                <Typography
                  fontWeight={700}
                  fontSize={{ md: "2rem", xs: "1.6rem" }}
                  color="#9B9A9A"
                  sx={{
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                  }}
                >
                  {item?.name}
                </Typography>
                <Grid item flex={1} sx={{ ml: { md: 3, xs: 2 } }}>
                  <CustomButton
                    title={"Create Post"}
                    fontSize={{ md: "2rem", xs: ".8rem" }}
                    // width={{ md: "20rem", xs: "40rem" }}
                  />
                </Grid>

                <Grid item>
                  <Button
                    sx={{
                      color: "#9B9A9A",
                      fontWeight: 700,
                      whiteSpace: "nowrap",
                      fontSize: { md: "1.4rem", xs: "1rem" },
                    }}
                    endIcon={<NavigateNext />}
                  >
                    See All
                  </Button>
                </Grid>
              </Grid>
              <Grid
                item
                container
                sx={{
                  maxHeight: "20rem",
                  overflowY: "scroll",
                  "&::-webkit-scrollbar": {
                    width: ".85rem",
                    display: "none",
                  },
                }}
              >
                {AllPosts?.length > 0 ? (
                  AllPosts.slice(0, 5).map((post, index) => {
                    return <SinglePosts key={index} post={post} />;
                  })
                ) : (
                  <Typography>No Result </Typography>
                )}
              </Grid>
            </Grid>
          );
        })} */}
      {/* </Grid> */}
    </Grid>
  );
};

export default Categories;
