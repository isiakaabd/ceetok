import { Button, Grid, List, Skeleton, Typography } from "@mui/material";
import Filters from "components/modals/Filters";
import { useEffect, useState } from "react";
import {
  useGetCategoriesQuery,
  useGetPostQuery,
  useLazyGetPostQuery,
} from "redux/slices/postSlice";
import SinglePosts from "pages/home/SinglePosts";
import { NavigateNext, SkipNext } from "@mui/icons-material";
import { CustomButton } from "components";
const Categories = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const { data: AllPosts, isLoading: loading } = useGetPostQuery();
  const [state, setState] = useState([]);
  const { data: categories, isLoading } = useGetCategoriesQuery();
  //   const [getPost, { data }] = useLazyGetPostQuery();
  //   console.log(state, 123);
  //   useEffect(() => {
  //     if (categories) {
  //       categories?.map(async (i) => {
  //         const { data } = await getPost({ category: i.name.toLowerCase() });
  //         if (data) {
  //           setState([...state, data]);
  //         }
  //         // console.log(data);
  //       });

  //       //   console.log(z());
  //     }
  //   }, [categories]);
  console.log(AllPosts);
  if ((isLoading, loading)) return <Skeleton />;
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

        <Grid item>
          <Filters
            anchorEl={anchorEl}
            setAnchorEl={setAnchorEl}
            open={open}
            handleClick={handleClick}
            handleClose={handleClose}
          />
        </Grid>
      </Grid>

      <Grid item container gap={3}>
        {categories?.map((item, index) => {
          return (
            <Grid item container sx={{ border: "1px solid #C4C4C4", p: 2 }}>
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
        })}
      </Grid>
    </Grid>
  );
};

export default Categories;
