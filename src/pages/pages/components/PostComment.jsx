import {
  Favorite,
  FilterList,
  IosShareOutlined,
  ReplyOutlined,
  ReportOutlined,
  SearchOutlined,
  TuneOutlined,
} from "@mui/icons-material";
import parse from "html-react-parser";
import {
  Divider,
  Grid,
  Paper,
  MenuItem,
  Grow,
  IconButton,
  Popper,
  ClickAwayListener,
  MenuList,
  Typography,
  List,
  Skeleton,
  Avatar,
} from "@mui/material";
import { Formik, Form } from "formik/dist";
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import FormikControl from "validation/FormikControl";
import UserProfile from "../UserProfile";
import {
  useDeleteAPostMutation,
  useLikeAndUnlikePostMutation,
} from "redux/slices/postSlice";
import { VerifiedOutlined } from "@mui/icons-material";
import { toast } from "react-toastify";
import CreatePost from "pages/user/modals/CreatePost";
import { Details } from "../Post";
import {
  useLazyUserProfileQuery,
  useUserProfileUpdateMutation,
} from "redux/slices/authSlice";
import SingleComment from "./SingleComment";
import Tooltips from "components/ToolTips";
import { getImage } from "helpers";
import ReactPlayer from "react-player";
import { useSelector } from "react-redux";
import { useApprovePostMutation } from "redux/slices/adminSlice";
// import useInfiniteScroll from "react-infinite-scroll-hook";
import images from "assets";
import {
  useGetPostCommentsQuery,
  // useLazyGetPostCommentsQuery,
} from "redux/slices/commentSlice";
import {
  useGetPostQuotesQuery,
  // useGetUserQuotesQuery,
} from "redux/slices/quoteSlice";
import MasonryImageList from "./ImageList";
export const Comment = ({ handleShare, data, state, setState }) => {
  const { id, category, user_id, body, media } = data;
  // recent_quotes, recent_comments,
  // const [page, setPage] = useState(0);
  // const {
  //   data: comments,
  //   error,
  //   isFetching,
  // } = useGetPostCommentsQuery({
  //   parent_type: "posts",
  //   parentId: id,
  //   offset: page,
  // });
  // const hasNextPage = page + 1 < comments?.total_pages;

  // const [sentryRef] = useInfiniteScroll({
  //   loading: isFetching,
  //   hasNextPage,
  //   onLoadMore: () => setPage((page) => page + 1),
  //   // When there is an error, we stop infinite loading.
  //   // It can be reactivated by setting "error" state as undefined.
  //   disabled: !!error,
  //   rootMargin: "0px 0px 200px 0px",
  // });

  const admin = useSelector((state) => state.auth.admin);
  // const targetRef = useRef(null);
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);
  const [getProfile, { data: profile, isLoading }] = useLazyUserProfileQuery();

  // const [commentsArray, setCommentsArray] = useState();

  useEffect(() => {
    if (token) {
      getProfile();
    }
    //eslint-disable-next-line
  }, [token]);

  // useEffect(() => {
  //   const options = {
  //     root: null,
  //     rootMargin: "800px",
  //     threshold: 1,
  //   };

  //   const observer = new IntersectionObserver((entry) => {
  //     if (entry[0].isIntersecting && hasNextPage) {
  //       setPage((page) => page + 1);
  //       console.log("intersecting");
  //     }
  //   }, options);

  //   if (targetRef.current) {
  //     observer.observe(targetRef.current);
  //   }

  //   // Cleanup function
  //   return () => {
  //     observer.disconnect();
  //   };
  // }, [hasNextPage, setPage]);

  const [open, setOpen] = useState(false);

  const [approvePost, { isLoading: approvalLoading }] =
    useApprovePostMutation();
  const [editPostModal, setEditPostModal] = useState(false);
  const [deletePost, { isLoading: deleteLoading }] = useDeleteAPostMutation();
  const anchorRef = useRef(null);
  const [update, { isLoading: updating }] = useUserProfileUpdateMutation();

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  const handleDeleteTopic = async () => {
    const { data, error } = await deletePost({ id });
    if (data) {
      toast.success(data);
      navigate("/");
    }
    if (error) {
      toast.error(error);
    }
    handleClose();
  };
  const handleApproveTopic = async () => {
    const { data, error } = await approvePost({
      id,
    });
    if (data) {
      toast.success(data);
      handleClose();
    }
    if (error) toast.error(error);
  };

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(open);

  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  const icons = [
    {
      title: "Reply",
      Icon: ReplyOutlined,
      link: "",
    },
    {
      title: "Likes",
      Icon: Favorite,
      link: "",
    },
    {
      title: "Share",
      Icon: IosShareOutlined,
      link: "",
    },
    {
      title: "Report Post",
      Icon: ReportOutlined,
      link: "",
    },
  ];
  const [likePost] = useLikeAndUnlikePostMutation();

  if (isLoading) return <Skeleton />;

  const { defaults } = images;

  const checkUser = profile?.id === user_id;

  const check = profile?.interests?.includes(category?.toLowerCase());
  async function handleCheck() {
    const { interests } = profile;
    if (!check) {
      const data = await update({
        interests: [...interests, category?.toLowerCase()],
      });
      if (data) toast.success(data);
    } else {
      const newArr = interests.filter((ite) => ite !== category?.toLowerCase());
      const data = await update({
        interests: [...newArr],
      });
      if (data) toast.success(data);
    }
  }

  const handleLikePost = async () => {
    await likePost({
      parent_type: "posts",
      parent_id: data?.id,
    });

    // setLikeState(!likeState);
  };
  const x = (message) => {
    const messageWithMentions = message.replace(
      /@\w+/g,
      `<a class="mention" href="#">$&</a>`
    );
    return messageWithMentions;
  };
  return (
    <>
      <Grid item container>
        <Grid
          item
          container
          alignItems="center"
          sx={{
            backgroundColor: "#044402",
            borderRadius: { md: ".7rem", sm: 0 },
            py: 2,
            px: 1,
          }}
          justifyContent={{ md: "flex-end", xs: "flex-start" }}
        >
          <Grid item md={7} xs={12}>
            <Grid item container>
              <Formik initialValues={{ filter: "" }}>
                <Form style={{ width: "100%" }}>
                  <Grid
                    item
                    container
                    justifyContent="space-between"
                    alignItems="center"
                    flexWrap="nowrap"
                    gap={2}
                  >
                    <Grid item flex={{ md: 0.8, xs: 1 }}>
                      <FormikControl
                        control="inputs"
                        name="filter"
                        borderRadius="1rem"
                        // color="#fff"
                        Icon={SearchOutlined}
                        order={2}
                        height="4rem"
                        color={"#fff"}
                        buttonStyle={{ color: "#fff" }}
                        border="2px solid #fff"
                      />
                    </Grid>
                    <Grid item>
                      <FormikControl
                        control="selects"
                        name="filter"
                        borderRadius="1rem"
                        placeholder="filter"
                        Icon={FilterList}
                        order={2}
                        height="4rem"
                        buttonStyle={{ color: "#fff" }}
                        border="2px solid #fff"
                        options={[
                          {
                            label: "2 Weeks",
                            value: "Male",
                          },
                          {
                            label: "3 Weeks",
                            value: "Female",
                          },
                          {
                            label: "Today",
                            value: "Female",
                          },
                        ]}
                      />
                    </Grid>
                    {(checkUser || admin) && (
                      <Grid item>
                        <IconButton
                          ref={anchorRef}
                          id="composition-avatar"
                          aria-controls={open ? "composition-menu" : undefined}
                          aria-expanded={open ? "true" : undefined}
                          aria-haspopup="true"
                          onClick={handleToggle}
                        >
                          <TuneOutlined
                            sx={{ fontSize: "2.5rem", color: "#fff" }}
                          />
                        </IconButton>
                      </Grid>
                    )}
                  </Grid>
                </Form>
              </Formik>
            </Grid>
          </Grid>
        </Grid>
        {/* user Profile */}
        {/* {token && ( */}
        <Grid item md={12} xs={12} sm={12} sx={{ my: 3 }}>
          <UserProfile data={data} />
        </Grid>
        {/* )} */}
      </Grid>
      <Grid item md={9} xs={12}>
        <Grid
          item
          container
          alignItems="center"
          justifyContent="space-between"
          sx={{
            paddingInline: { xs: "1rem", md: "1.5rem" },
            background: "red",
          }}
          flexWrap="nowrap"
        >
          <Typography
            color="secondary"
            fontSize={{ md: "3rem", sm: "2rem", xs: "1.5rem" }}
            sx={{ whiteSpace: "nowrap" }}
            fontWeight="700"
          >
            {category.slice(0, 1).toUpperCase() + category.slice(1)}
          </Typography>
          {token && (
            <Tooltips title={check ? "unfollow" : "Follow"}>
              <Typography
                fontWeight={500}
                component="a"
                onClick={handleCheck}
                sx={{
                  display: "flex",
                  cursor: "pointer",
                  alignItems: "center",
                }}
                fontSize="2rem"
                color={check ? "#37D42A" : "#FF9B04"}
              >
                {updating ? "Updating..." : check ? "Followed" : "Follow"}
                {check && <VerifiedOutlined />}
              </Typography>
            </Tooltips>
          )}
        </Grid>
        <Grid item container sx={{ p: { xs: "1rem" } }}>
          {media?.length >= 2 ? (
            <MasonryImageList
              itemData={media?.slice(0, media.length > 4 ? 3 : media.length)}
            />
          ) : media?.length === 1 && media[0]?.type === "image" ? (
            <Avatar
              src={getImage(media[0]?.storage_path)}
              sx={{
                width: "100%",
                height: "auto",
                objectFit: "cover",
                // maxHeight: "0rem",
              }}
              alt={category}
              variant="square"
            />
          ) : media?.length === 1 && media[0]?.type === "video" ? (
            <div className="player-wrapper">
              <ReactPlayer
                url={getImage(media[0]?.storage_path)}
                // pip
                light={<img src={defaults} alt="Thumbnail" />}
                // stopOnUnmount
                controls={true}
                volume={0.6}
                width="100%"
                height="50rem"
                className="react-player"
                style={{ maxheight: "10rem" }}
              />
            </div>
          ) : (
            <Avatar
              src={defaults}
              sx={{
                width: "100%",
                height: "auto",
                objectFit: "cover",
                // maxHeight: "0rem",
              }}
              alt={category}
              variant="square"
            />
          )}
        </Grid>
        <Grid
          container
          item
          flexDirection="column"
          rowGap={2}
          sx={{ paddingInline: { xs: "1rem", md: "1.5rem" } }}
        >
          <Typography
            color="secondary"
            sx={{
              fontWeight: 400,
              fontSize: { md: "2rem", sm: "1.6rem", xs: "1.2rem`" },
              textAlign: "justify",
              // pl: 3,
            }}
            className="likes-content"
          >
            {parse(x(body))}
          </Typography>
        </Grid>
        <Grid item md={7} xs={12} sx={{ color: "#5F5C5C", mt: 3 }}>
          <Details
            handleShare={handleShare}
            icons={icons}
            data={data}
            type="posts"
            state={state}
            setState={setState}
            handleLikePost={handleLikePost}
          />
        </Grid>
        <Divider flexItem sx={{ pb: 2 }} />
      </Grid>
      <Grid item md={7} xs={12} sx={{ paddingInline: { xs: "1rem" } }}>
        {state ? (
          <Grid item container>
            <Typography
              color="secondary"
              sx={{ my: 1 }}
              fontSize={{ md: "3rem", xs: "2rem" }}
              fontWeight={700}
            >
              Comments
            </Typography>
            <AllComments profile={profile} id={id} icons={icons} />
          </Grid>
        ) : (
          <Grid item container>
            <Typography
              color="secondary"
              sx={{ my: 1 }}
              fontSize={{ md: "3rem", xs: "2rem" }}
              fontWeight={700}
            >
              Quotes
            </Typography>
            <AllQuotes id={id} icons={icons} profile={profile} />
          </Grid>
        )}
      </Grid>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        placement="bottom-start"
        transition
        disablePortal
        sx={{ zIndex: 900 }}
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom-start" ? "left top" : "left bottom",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  id="composition-menu"
                  aria-labelledby="composition-button"
                  onKeyDown={handleListKeyDown}
                >
                  {/* {user_id !=== profile?.id} */}
                  {(check || admin) && (
                    <MenuItem onClick={() => setEditPostModal(true)}>
                      Edit Topic
                    </MenuItem>
                  )}
                  {admin && (
                    <MenuItem
                      onClick={handleApproveTopic}
                      disabled={data?.approved}
                    >
                      {approvalLoading
                        ? "Approving"
                        : data?.approved
                        ? "Approved"
                        : "Approve Topic"}
                    </MenuItem>
                  )}
                  <MenuItem onClick={handleClose}>Close Topic</MenuItem>
                  <MenuItem
                    onClick={handleDeleteTopic}
                    sx={{
                      fontWeight: deleteLoading && 700,
                      color: deleteLoading && "red",
                    }}
                  >
                    {deleteLoading ? "Deleting..." : "Delete Topic"}
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>

      <CreatePost
        open={editPostModal}
        handleClose={() => setEditPostModal(false)}
        data={data}
        type="edit"
      />
    </>
  );
};
function AllComments({ id, profile, icons }) {
  const [page, setPage] = useState(1);
  const {
    data: comments,
    error,
    isFetching,
  } = useGetPostCommentsQuery({
    parent_type: "posts",
    parentId: id,
    offset: page - 1,
  });

  // const hasNextPage = page + 1 < comments?.total_pages;

  // const [sentryRef] = useInfiniteScroll({
  //   loading: isFetching,
  //   hasNextPage,
  //   onLoadMore: () => setPage((page) => page + 1),
  //   // When there is an error, we stop infinite loading.
  //   // It can be reactivated by setting "error" state as undefined.
  //   disabled: !!error,
  //   rootMargin: "0px 0px 200px 0px",
  // });
  return (
    <>
      <Grid
        item
        container
        flexDirection="column"
        sx={{
          maxHeight: { xs: "70rem" },
          overflowY: "scroll",
          "&::-webkit-scrollbar": {
            width: ".85rem",
            display: "none",
          },
        }}
        // ref={root}
      >
        {comments?.comments?.length > 0 ? (
          <Grid item container flexDirection="column">
            <List sx={{ width: "100%" }} dense>
              {comments?.comments?.map((item) => (
                <SingleComment
                  icons={icons}
                  key={item.id}
                  item={item}
                  profile={profile}
                />
              ))}
              {/* {hasNextPage && <div ref={sentryRef} />} */}
              {/* {!hasNextPage && (
                <Typography
                  fontWeight={700}
                  width="100%"
                  textAlign="center"
                  variant="h5"
                >
                  No More comment
                </Typography>
              )} */}
            </List>
          </Grid>
        ) : (
          <Grid item container>
            <Typography>No comments available</Typography>
          </Grid>
        )}
      </Grid>
      {/* {isFetching && hasNextPage && (
        <Typography width="100%" textAlign="center" variant="h4">
          Loading more comments...
        </Typography>
      )} */}
    </>
  );
}

function AllQuotes({ id, icons, profile }) {
  const [page, setPage] = useState(1);
  const {
    data: quotes,
    error,
    isFetching,
  } = useGetPostQuotesQuery({
    parent_type: "posts",
    parentId: id,
    offset: page - 1,
  });

  // const hasNextPage = page + 1 < quotes?.total_pages;

  // const [sentryRef] = useInfiniteScroll({
  //   loading: isFetching,
  //   hasNextPage,
  //   onLoadMore: () => setPage((page) => page + 1),
  //   disabled: !!error,
  //   rootMargin: "0px 0px 200px 0px",
  // });
  return (
    <>
      <Grid
        item
        container
        sx={{
          maxHeight: { xs: "70rem" },
          overflowY: "scroll",
          "&::-webkit-scrollbar": {
            width: ".85rem",
            display: "none",
          },
        }}
      >
        {quotes?.quotes?.length > 0 ? (
          <List sx={{ width: "100%" }} dense>
            {quotes?.quotes?.map((item) => (
              <SingleComment
                icons={icons}
                key={item.id}
                item={item}
                profile={profile}
                type="quote"
              />
            ))}
            {/* {hasNextPage && <div ref={sentryRef} />}
            {!hasNextPage && (
              <Typography
                fontWeight={700}
                width="100%"
                textAlign="center"
                variant="h5"
              >
                No more Quotes
              </Typography>
            )} */}
          </List>
        ) : (
          <Grid item container>
            <Typography>No Quotes available</Typography>
          </Grid>
        )}
      </Grid>
      {/* {isFetching && hasNextPage && (
        <Typography width="100%" textAlign="center" variant="h4">
          Loading more qotes...
        </Typography>
      )} */}
    </>
  );
}
