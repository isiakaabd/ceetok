import { SearchOutlined, VerifiedOutlined } from "@mui/icons-material";
import { Grid, List, Skeleton, Typography } from "@mui/material";
import Filters from "components/modals/Filters";
import { Formik, Form } from "formik/dist";
import { useState } from "react";
import FormikControl from "validation/FormikControl";

import SinglePosts from "pages/home/SinglePosts";
import { useSelector } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import { useGetPostQuery } from "redux/slices/postSlice";
import CreatePost from "./user/modals/CreatePost";
import LoginModal from "components/modals/LoginModal";
import {
  useUserProfileQuery,
  useUserProfileUpdateMutation,
} from "redux/slices/authSlice";
import { toast } from "react-toastify";
import Tooltips from "components/ToolTips";
import { CustomButton } from "components";
const Entertainment = () => {
  const [searchParams] = useSearchParams();
  const params = searchParams.get("category");
  const [value, setValue] = useState("");
  const loginStatus = useSelector((state) => state.auth.token);
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [update, { loading: updating }] = useUserProfileUpdateMutation();
  const initialValues = {
    title: "",
    category: params.toLowerCase(),
    text: "",
  };
  const { data: array, isLoading } = useGetPostQuery({
    category: params.toLowerCase(),
    from: value,
  });
  const { data: profile, isLoading: loading } = useUserProfileQuery();
  const [opens, setOpens] = useState(false);
  const [createPostModal, setCreatePostModal] = useState(false);
  if (isLoading || loading) return <Skeleton />;
  const { interests } = profile;
  const check = interests?.includes(params.toLowerCase());
  async function handleCheck() {
    const { interests } = profile;
    if (!check) {
      const { data, error } = await update({
        interests: [...interests, params.toLowerCase()],
      });
      if (data) toast.success(data);
      if (error) toast.error(error);
    } else {
      const newArr = interests.filter((ite) => ite !== params.toLowerCase());
      const { data, error } = await update({
        interests: [...newArr],
      });
      if (data) toast.success(data);
      if (error) toast.error(error);
    }
  }
  return (
    <>
      <Grid item container sx={{ py: 2, background: "#fafafa" }}>
        <Grid
          item
          container
          // xs={11}
          sx={{
            // m: "2rem 4rem",
            //   p:3,
            paddingInline: { xs: "1rem", md: "4rem" },
            // mx: "auto",
            borderRadius: "2rem",
          }}
        >
          <Grid item container sx={{ p: 3 }} alignItems="center">
            <Typography
              fontWeight={600}
              fontSize={{ md: "3rem", xs: "2.5rem" }}
              color="#9B9A9A"
              sx={{ mr: 2 }}
            >
              {params}
            </Typography>
            <Tooltips title={check ? "unfollow" : "Follow"}>
              <Typography
                fontWeight={500}
                component="a"
                sx={{
                  display: "flex",
                  cursor: "pointer",
                  alignItems: "center",
                }}
                fontSize="2rem"
                role="button"
                onClick={handleCheck}
                color={check ? "#37D42A" : "#FF9B04"}
              >
                {check ? "Followed" : updating ? "Following" : "Follow"}
                {check && <VerifiedOutlined />}
              </Typography>
            </Tooltips>
          </Grid>
          <Grid item container>
            <Grid
              item
              container
              alignItems="center"
              justifyContent={"space-between"}
              rowGap={2}
              sx={{
                background: "#F8F4F4",
                py: 2,
                px: { md: "3rem", xs: "1rem" },
              }}
            >
              <Grid item>
                <CustomButton
                  // sx={{
                  //   backgroundColor: "#37D42A",
                  //   fontSize: { md: "1.2rem", xs: "1rem" },
                  //   paddingInline: { md: "3rem", xs: "1rem" },
                  //   borderRadius: 25,
                  //   color: "#fff",
                  //   fontWeight: 600,
                  //   // ":hover": {
                  //   //   background: "#37D42A",
                  //   // },
                  // }}
                  // variant="contained"
                  // disableElevation
                  // startIcon={<AddCircleOutline />}
                  sx={{ height: "4.3rem" }}
                  onClick={() =>
                    loginStatus ? setCreatePostModal(true) : setOpens(true)
                  }
                  title={"Create Post"}
                />

                {/* </Button> */}
              </Grid>
              <Grid
                item
                xs={{ md: 10, xs: 12 }}
                sx={{
                  minWidth: {
                    md: "40rem",
                    xs: "100%",
                  },
                }}
                order={{ md: 1, xs: 2 }}
              >
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
              <Grid item order={1}>
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
            <Grid
              item
              container
              sx={{ py: 3, overflow: "hidden", maxWidth: "100%" }}
            >
              <List
                sx={{
                  maxWidth: "100%",
                  maxHeight: "80rem",
                  overflowY: "scroll",
                  "&::-webkit-scrollbar": {
                    width: ".85rem",
                    display: "none",
                  },
                }}
                xs={12}
              >
                {array?.posts?.length > 0 ? (
                  array.posts?.map((post, index) => {
                    return <SinglePosts key={index} post={post} />;
                  })
                ) : (
                  <Typography>No Result </Typography>
                )}
              </List>
            </Grid>
            {array?.posts?.length > 0 && (
              <Grid item container sx={{ p: 3 }}>
                {array?.posts?.slice(0, 50).map((item, index) => {
                  return item.recent_views.map((numbers) => {
                    return (
                      //  numbers?.viewer.map((view) => (
                      <Typography
                        component={Link}
                        to={`/${index}`}
                        key={index}
                        sx={{ width: "max-content", mr: 0.5 }}
                        color="secondary"
                        fontSize={{
                          md: "1.8rem",
                          xs: "1.5rem",
                          fontWeight: 500,
                        }}
                      >
                        {numbers?.viewer?.full_name}
                      </Typography>
                    );
                    // ));
                  });
                })}
                {array?.posts?.length >= 50 && (
                  <Typography
                    variant="span"
                    color="#FF9B04"
                    fontSize={{ md: "1.8rem", xs: "1.5rem", fontWeight: 500 }}
                  >
                    {`and ${array?.posts?.length - 50} guests`}
                  </Typography>
                )}
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

      <LoginModal isLogin={opens} handleClose={() => setOpens(false)} />
    </>
  );
};

export default Entertainment;
