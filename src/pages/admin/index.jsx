import { Chip, Grid, Skeleton, Typography } from "@mui/material";
import SearchComponent from "components/modals/SearchComponent";
import React, { useState } from "react";
import CustomizedTables from "./Table";
import Paginations from "components/modals/Paginations";
// import { useGetUsersQuery } from "redux/slices/adminSlice";
import { useListUsersQuery } from "redux/slices/authSlice";

const AllUsers = () => {
  const [username, setUserName] = useState("");
  const { data, isLoading, isFetching, error } = useListUsersQuery({
    username,
  });
  const handleSubmit = (values) => setUserName(values.name);

  // page, setPage, count;
  const [page, setPage] = useState(1);
  if (isLoading) return <Skeleton />;
  if (error) return <p>Something went wrong</p>;
  return (
    <Grid
      item
      container
      sx={{ background: "#E5E5E5", mt: 2, padding: { md: "4rem", xs: "2rem" } }}
    >
      <Typography
        color="#5F5C5C"
        sx={{ fontSize: { md: "2.9rem", xs: "2rem" } }}
        fontWeight={600}
      >
        All Users List
      </Typography>
      <Grid
        item
        flexDirection="column"
        container
        flexWrap="nowrap"
        sx={{ background: "#fff", padding: "2rem", borderRadius: "2rem" }}
        gap={2}
      >
        <Grid item container flexWrap="nowrap" alignItems="center" gap={2}>
          <Typography
            sx={{
              mr: { md: 2, xs: "auto" },
              color: "#9B9A9A",
              fontWeight: 600,
              fontSize: { md: "2.3rem", xs: "1.8rem" },
            }}
          >
            Filter
          </Typography>
          <Grid
            item
            container
            gap={1}
            flex={1}
            sx={{ display: { md: "flex", xs: "none" } }}
          >
            {["All", "A", "B", "C", "E", "F", "G"].map((item) => (
              <Chip
                label={item}
                size="small"
                variant="outlined"
                sx={{
                  borderRadius: ".5rem",
                  fontWeight: 500,
                  color: "#37D42A",
                  fontSize: "1.6rem",
                  borderColor: "#37D42A",
                }}
              />
            ))}
          </Grid>
          {isFetching && (
            <Typography variant="h4" color="success">
              Loading...
            </Typography>
          )}
          <Grid item>
            <SearchComponent
              placeholder={"Search Username"}
              handleSubmit={handleSubmit}
            />
          </Grid>
        </Grid>
        <Grid item container>
          <CustomizedTables rows={data} />
        </Grid>

        {data?.length > 0 ? (
          <Paginations page={page} setPage={setPage} count={10} />
        ) : null}
      </Grid>
    </Grid>
  );
};

export default AllUsers;
