import { AddCircleOutline, SearchOutlined } from "@mui/icons-material";
import { Button, Grid, List, Typography } from "@mui/material";
import Filters from "components/modals/Filters";
import { Formik, Form } from "formik/dist";
import { useState } from "react";
// import {  } from "react-router-dom";
import FormikControl from "validation/FormikControl";

import SinglePosts from "pages/home/SinglePosts";
import { useSelector } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import { useGetPostQuery } from "redux/slices/postSlice";
import CreatePost from "./user/modals/CreatePost";

const Entertainment = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const params = searchParams.get("category");

  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const initialValues = {
    title: "",
    category: params.toLowerCase(),
    text: "",
  };
  const { data: array } = useGetPostQuery({ category: params.toLowerCase() });

  const [createPostModal, setCreatePostModal] = useState(false);
  return (
    <>
      <Grid item container sx={{ py: 2, background: "#fafafa" }}>
        <Grid
          item
          container
          sx={{
            background: "#fff",
            m: "2rem 4rem",
            //   p:3,
            borderRadius: "2rem",
          }}
        >
          <Grid item container sx={{ p: 3 }} alignItems={"center"}>
            <Typography
              fontWeight={600}
              fontSize={{ md: "3.3rem" }}
              color="#9B9A9A"
              sx={{ mr: 2 }}
            >
              {params}
            </Typography>
            <Typography fontWeight={600} fontSize="2.3rem" color="#FF9B04">
              Follow
            </Typography>
          </Grid>
          <Grid item container>
            <Grid
              item
              container
              alignItems="center"
              sx={{ background: "#F8F4F4", py: 2, px: "3rem" }}
            >
              <Grid item mr={3}>
                <Button
                  sx={{
                    backgroundColor: "#37D42A",
                    fontSize: { md: "1.2rem", xs: "1rem" },
                    paddingInline: { md: "3rem", xs: "1rem" },
                    borderRadius: 25,
                    color: "#fff",
                    fontWeight: 600,
                    // ":hover": {
                    //   background: "#37D42A",
                    // },
                  }}
                  variant="contained"
                  disableElevation
                  startIcon={<AddCircleOutline />}
                  onClick={() => setCreatePostModal(true)}
                >
                  Create Post
                </Button>
              </Grid>
              <Grid item xs={5}>
                <Grid item container>
                  <Formik initialValues={{ name: "" }}>
                    <Form style={{ width: "100%" }}>
                      <FormikControl
                        control="inputs"
                        name="name"
                        placeholder="Search..."
                        Icon={SearchOutlined}
                        order={1}
                        buttonStyle={{
                          background: "#37D42A",
                          color: "#fff",
                        }}
                      />
                    </Form>
                  </Formik>
                </Grid>
              </Grid>
              <Grid item sx={{ ml: "auto" }}>
                <Filters
                  anchorEl={anchorEl}
                  setAnchorEl={setAnchorEl}
                  open={open}
                  handleClick={handleClick}
                  handleClose={handleClose}
                />
              </Grid>
            </Grid>
            <Grid item container sx={{ p: 3 }}>
              <List
                sx={{
                  maxHeight: "80rem",
                  overflowY: "scroll",
                  "&::-webkit-scrollbar": {
                    width: ".85rem",
                    display: "none",
                  },
                }}
                xs={12}
              >
                {array?.length > 0 ? (
                  array.map((post, index) => {
                    return <SinglePosts key={index} post={post} />;
                  })
                ) : (
                  <Typography>No Result </Typography>
                )}
              </List>
            </Grid>
            {array?.length > 0 && (
              <Grid item container sx={{ p: 3 }}>
                {Array(20)
                  .fill("Adekunle107")
                  .map((item, index) => (
                    <Typography
                      component={Link}
                      to={`/${index}`}
                      key={index}
                      sx={{ width: "max-content", mr: 0.5 }}
                      color="secondary"
                      fontSize={{ md: "1.8rem", xs: "1.5rem", fontWeight: 500 }}
                    >
                      {item}
                    </Typography>
                  ))}

                <Typography
                  variant="span"
                  color="#FF9B04"
                  fontSize={{ md: "1.8rem", xs: "1.5rem", fontWeight: 500 }}
                >
                  and 102 guests
                </Typography>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>

      <CreatePost
        handleClose={() => setCreatePostModal(false)}
        initialValues={initialValues}
        open={createPostModal}
      />
    </>
  );
};

export default Entertainment;