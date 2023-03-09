import React from "react";
import {
  Grid,
  List,
  ListItemText,
  ListItemButton,
  Skeleton,
} from "@mui/material";

// import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { CustomButton } from "components";
import { useGetCategoriesQuery } from "redux/slices/postSlice";
import SearchComponent from "components/modals/SearchComponent";

const LeftTab = () => {
  const { data: categories, isLoading } = useGetCategoriesQuery();
  console.log(categories);
  // const navigate = useNavigate();
  const handleSubmit = async () => {};
  if (isLoading) return <Skeletons />;
  return (
    <Grid
      item
      md={3}
      display={{ md: "block", xs: "none" }}
      sx={{
        background: "white",
        borderRadius: "0 2rem 2rem 0",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
      }}
    >
      <Grid
        container
        gap={2}
        sx={{
          padding: { xs: "1rem", md: "2rem 2rem 2rem 4rem" },
        }}
      >
        <SearchComponent
          handleSubmit={handleSubmit}
          placeholder={"Search Categories"}
        />
        <List sx={{ width: "100%" }} dense>
          {categories?.map((item, index) => {
            return (
              <ListItemButton
                key={index}
                component={Link}
                alignItems="flex-start"
                to={`/posts/?category=${item.slug}`}
              >
                <ListItemText
                  primary={item?.name}
                  primaryTypographyProps={{
                    color: "text.primary",
                    fontWeight: 600,
                  }}
                />

                <ListItemText
                  disableGutters
                  primary={item?.posts_count}
                  sx={{ display: "flex", justifyContent: "flex-end" }}
                  primaryTypographyProps={{
                    minWidth: "3.4rem",
                    minHeight: "3.4rem",
                    borderRadius: "50%",
                    backgroundColor: "#D3D3D3",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                />
              </ListItemButton>
            );
          })}
        </List>
        <Grid item>
          <CustomButton
            background="#636262"
            width="10rem"
            color="#fff"
            component={Link}
            to="/categories"
            fontWeight={700}
            fontSize={"1.2rem"}
            title="See More"
            borderRadius={".5rem"}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};
function Skeletons() {
  return (
    <Grid
      item
      md={3}
      sx={{
        display: { md: "block", xs: "none" },
        // width: "30rem",
        padding: { xs: "1rem", md: "2rem" },

        background: "white",
        borderRadius: "0 2rem 2rem 0",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
      }}
      gap={3}
    >
      <Grid container flexDirection="column" gap={2} overflow={"hidden"}>
        <Skeleton
          sx={{ height: "4rem", borderRadius: "2rem", width: "100%" }}
          animation="wave"
          variant="rounded"
        />
        <Grid
          item
          container
          flexDirection="column"
          flexWrap={"nowrap"}
          gap={1.5}
        >
          {Array(7)
            .fill(undefined)
            .map((item, index) => (
              <Grid
                item
                container
                flexWrap="nowrap"
                alignItems="center"
                justifyContent="space-between"
              >
                <Grid item xs={8}>
                  <Skeleton
                    key={index}
                    sx={{ height: "1.5rem", width: "100%" }}
                    animation="wave"
                    variant="text"
                  />
                </Grid>
                <Grid item>
                  <Skeleton
                    key={index}
                    sx={{ height: "1.5rem", width: "1.5rem" }}
                    animation="wave"
                    variant="circular"
                  />
                </Grid>
              </Grid>
            ))}
        </Grid>
        <Skeleton
          sx={{ height: "3.5rem", width: "10rem" }}
          animation="wave"
          variant="rounded"
        />
      </Grid>
    </Grid>
  );
}

export default LeftTab;
