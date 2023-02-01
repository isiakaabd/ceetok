import React from "react";
import {
  Grid,
  Button,
  List,
  ListItemText,
  ListItemButton,
} from "@mui/material";

// import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { CustomButton } from "components";
import { useGetCategoriesQuery } from "redux/slices/postSlice";
import SearchComponent from "components/modals/SearchComponent";
import { useState } from "react";
const LeftTab = () => {
  // const loginStatus = useSelector((state) => state.auth.token);
  const [search, setSearch] = useState("");
  const { data: categories } = useGetCategoriesQuery();
  // const navigate = useNavigate();
  const handleSubmit = async () => {};
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
          placeholder={"Search Categorie"}
        />
        <List sx={{ width: "100%" }} dense>
          {categories?.map((item, index) => {
            return (
              <ListItemButton
                key={index}
                component={Link}
                alignItems="flex-start"
                to={`/posts/?category=${item.name}`}
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
        <Grid sx={{ pl: 2 }} item>
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

export default LeftTab;
