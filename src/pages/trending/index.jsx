import { Grid, List, Pagination, Skeleton, Typography } from "@mui/material";
import { useState } from "react";
import SinglePosts from "../home/SinglePosts";
import Heading from "./Heading";
import SearchComponent from "components/modals/SearchComponent";
// import { SettingsOutlined, TuneOutlined } from "@mui/icons-material";
import { CustomButton } from "components";
import Filters from "components/modals/Filters";
import { useGetPostQuery } from "redux/slices/postSlice";
import CreatePost from "pages/user/modals/CreatePost";
import { useSelector } from "react-redux";
import LoginModal from "components/modals/LoginModal";
import { getImage } from "helpers";
import Paginations from "components/modals/Paginations";
const Trending = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const loginStatus = useSelector((state) => state.auth.token);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [page, setPage] = useState(1);
  const [value, setValue] = useState("");
  const { data: array, isLoading } = useGetPostQuery({
    offset: page - 1,
    category: "trending",
    from: value,
  });

  const handleChange = (e, value) => {
    setPage(value);
  };
  const [openModal, setOpenModal] = useState(false);
  const [openLoginModal, setOpenLoginModal] = useState(false);
  return (
    <>
      <Grid item container>
        <Grid
          item
          gap={2}
          container
          // sx={{
          //
          //   background: "#E5E5E5",
          // }}
          sx={{
            p: { md: "4rem", xs: "1rem" },
          }}
        >
          <Heading />
          <Grid
            item
            container
            sx={{
              p: { md: "4rem", xs: "1rem" },
              borderRadius: "1.5rem",
              background: "#fff",
              mt: "2.5rem",
            }}
          >
            <Grid item container sx={{ pb: 2 }}>
              <Grid
                item
                container
                alignItems="center"
                flexWrap="nowrap"
                justifyContent="space-between"
              >
                <Grid item>
                  <CustomButton
                    background={"#37D42A"}
                    variant="contained"
                    disableElevation
                    title={"Create Post"}
                    sx={{
                      width: { md: "18rem", xs: "10rem" },
                      fontSize: { xs: "1.2rem", md: "1.8rem" },
                    }}
                    // startIcon={
                    //   <IconButton>
                    //     <AddCircleOutline />
                    //   </IconButton>
                    // }
                    onClick={() =>
                      loginStatus ? setOpenModal(true) : setOpenLoginModal(true)
                    }
                  />
                </Grid>
                <Grid
                  item
                  sx={{ minWidth: "40rem" }}
                  display={{ md: "block", xs: "none" }}
                >
                  <SearchComponent handleSubmit={{}} />
                </Grid>
                <Grid item>
                  <Grid item container gap={{ md: 3, xs: 1 }} flexWrap="nowrap">
                    <Filters
                      anchorEl={anchorEl}
                      setAnchorEl={setAnchorEl}
                      open={open}
                      value={value}
                      setValue={setValue}
                      handleClick={handleClick}
                      handleClose={handleClose}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item md={11} xs={12} sx={{ margin: "auto" }}>
              <Grid item container>
                {isLoading ? (
                  <Skeletons />
                ) : array?.posts?.length > 0 ? (
                  <>
                    <List
                      dense
                      sx={{
                        maxHeight: "120rem",
                        overflowY: "scroll",
                        width: "100%",
                        "&::-webkit-scrollbar": {
                          width: ".85rem",
                          display: "none",
                        },
                      }}
                    >
                      {/* {posts.length > 0 ? ( */}
                      {array?.posts?.map((post, index) => {
                        return (
                          <SinglePosts key={index} index={index} post={post} />
                        );
                      })}
                    </List>
                    {array?.total_pages > 1 && (
                      <Pagination
                        page={page}
                        count={array?.total_pages}
                        sx={{ margin: "auto", py: 2 }}
                        onChange={handleChange}
                      />
                    )}
                  </>
                ) : (
                  <Typography
                    variant="h2"
                    sx={{ py: 3 }}
                    width="100%"
                    textAlign="center"
                  >
                    No Data yet
                  </Typography>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        {array?.total_pages > 1 && (
          <Paginations
            count={array?.total_pages}
            page={page}
            setPage={setPage}
          />
        )}
      </Grid>
      <CreatePost
        open={openModal}
        handleClose={() => setOpenModal(false)}
        type="trending"
      />

      <LoginModal
        isLogin={openLoginModal}
        handleClose={() => setOpenLoginModal(false)}
      />
    </>
  );
};

function Skeletons() {
  return (
    <Grid item container gap={2}>
      {Array(3)
        .fill("undefined")
        .map((i, index) => (
          <Grid item container key={index} flexWrap={"nowrap"} gap={2}>
            <Grid item>
              <Grid item container gap={1}>
                <Grid item>
                  <Skeleton
                    sx={{ height: "1rem", width: "1rem" }}
                    animation="wave"
                    variant="rounded"
                  />
                </Grid>
                <Skeleton
                  sx={{ height: "8rem", width: "8rem" }}
                  animation="wave"
                  variant="rounded"
                />
              </Grid>
            </Grid>
            <Grid item flex={1}>
              <Grid item container flexDirection="column">
                <Skeleton
                  sx={{ height: "3rem", borderRadius: "1rem", width: "8rem" }}
                  animation="wave"
                  variant="text"
                />
                <Grid item container gap={0.5} flexDirection="column">
                  <Grid item>
                    <Skeleton
                      sx={{ height: "1rem", width: "100%" }}
                      animation="wave"
                      variant="text"
                    />
                  </Grid>
                  <Grid item>
                    <Skeleton
                      sx={{ height: "1rem", width: "60%" }}
                      animation="wave"
                      variant="text"
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        ))}
    </Grid>
  );
}

export default Trending;
