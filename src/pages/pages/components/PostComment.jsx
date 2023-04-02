import {
  BlockOutlined,
  Delete,
  Edit,
  Favorite,
  FilterList,
  IosShareOutlined,
  MoreVertOutlined,
  PersonAddAltRounded,
  ReplyOutlined,
  ReportOutlined,
  SearchOutlined,
  TuneOutlined,
} from "@mui/icons-material";
import parse from "html-react-parser";
import * as Yup from "yup";
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
  ListItemButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemIcon,
  Menu,
} from "@mui/material";
import { Formik, Form } from "formik/dist";
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import FormikControl from "validation/FormikControl";
import UserProfile from "../UserProfile";
import {
  useDeleteAPostMutation,
  useLikeAndUnlikePostMutation,
  useReportPostMutation,
} from "redux/slices/postSlice";
import { VerifiedOutlined } from "@mui/icons-material";
import { toast } from "react-toastify";
import CreatePost from "pages/user/modals/CreatePost";
import { Details } from "../Post";
import {
  useBlockUserMutation,
  useFollowUserMutation,
  useLazyUserProfileQuery,
  useUnBlockUserMutation,
  useUserProfileUpdateMutation,
} from "redux/slices/authSlice";
import SingleComment from "./SingleComment";
import Tooltips from "components/ToolTips";
import { getImage, getTimeMoment } from "helpers";
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
import NotificationModal from "components/modals/NotificationModal";
import Editor from "components/Quill";
import { CustomButton } from "components";
import Paginations from "components/modals/Paginations";
import Error from "./Error";
import Replies from "./Replies";
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

  const handleDeleteTopic = async (e) => {
    const { data, error } = await deletePost({ id });
    if (data) {
      toast.success(data);
      navigate("/");
    }
    if (error) {
      toast.error(error);
    }
    handleClose(e);
  };
  const handleApproveTopic = async (e) => {
    const { data, error } = await approvePost({
      id,
    });
    if (data) {
      toast.success(data);
      handleClose(e);
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
  const [handlereport, setHandleReport] = useState(false);
  const [report] = useReportPostMutation();
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
      const newArr = interests?.filter(
        (ite) => ite !== category?.toLowerCase()
      );
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
  const validationSchema = Yup.object({
    body: Yup.string().required("Required"),
  });
  const handleReport = async (values) => {
    const { body } = values;
    const { data, error } = await report({
      parent_type: "posts",
      parent_id: id,
      reason: body,
    });
    if (data) {
      toast.success(data);
      setTimeout(() => setHandleReport(false), 3000);
    }
    if (error) toast(error);
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
                    {token && (
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
        <Grid
          item
          container
          sx={{
            p: { xs: "1rem" },
            height: { md: "30rem", xs: "20rem" },
          }}
        >
          {media?.length >= 2 ? (
            <MasonryImageList
              itemData={media?.slice(0, media.length > 4 ? 3 : media.length)}
            />
          ) : media?.length === 1 && media[0]?.type === "image" ? (
            <Avatar
              src={getImage(media[0]?.storage_path)}
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                // maxHeight: "0rem",
              }}
              alt={category}
              variant="square"
            />
          ) : media?.length === 1 && media[0]?.type === "video" ? (
            // <div className="player-wrapper">
            <ReactPlayer
              url={getImage(media[0]?.storage_path)}
              controls={true}
              volume={0.6}
              width="100%"
              height="100%"
              // className="react-player"
              style={{ aspectRatio: 1 }}
            />
          ) : (
            // </div>
            <Avatar
              src={defaults}
              sx={{
                width: "100%",
                height: "100%",
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
        {/* {state ? ( */}
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
        {/* // ) : (
        //   <Grid item container>
        //     <Typography
        //       color="secondary"
        //       sx={{ my: 1 }}
        //       fontSize={{ md: "3rem", xs: "2rem" }}
        //       fontWeight={700}
        //     >
        //       Quotes
        //     </Typography>
        //     <AllQuotes id={id} icons={icons} profile={profile} />
        //   </Grid>
        // )} */}
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
                  {(!admin || !checkUser) && (
                    <MenuItem
                      onClick={(e) => {
                        handleClose(e);
                        setHandleReport(true);
                      }}
                    >
                      Report Topic
                    </MenuItem>
                  )}
                  {(check || admin) && (
                    <MenuItem
                      onClick={handleDeleteTopic}
                      sx={{
                        fontWeight: deleteLoading && 700,
                        color: deleteLoading && "red",
                      }}
                    >
                      {deleteLoading ? "Deleting..." : "Delete Topic"}
                    </MenuItem>
                  )}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
      <NotificationModal
        isOpen={handlereport}
        handleClose={(e) => {
          handleClose(e);
          setHandleReport(false);
        }}
      >
        <Formik
          initialValues={{ body: "" }}
          onSubmit={handleReport}
          validationSchema={validationSchema}
        >
          {({ isSubmitting }) => (
            <Form>
              <Grid item container flexDirection="column" gap={4}>
                <Typography
                  color="#464646"
                  sx={{
                    textAlign: "center",
                    fontSize: { md: "2rem", xs: "1.7rem" },
                  }}
                  fontWeight={700}
                >
                  Report Abuse
                </Typography>
                <Grid item>
                  <Editor name="body" placeholder={"Report Abuse..."} />
                </Grid>
                <Grid item>
                  <CustomButton
                    title={"Report"}
                    type="submit"
                    isSubmitting={isSubmitting}
                  />
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </NotificationModal>
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
    isLoading,
    // isFetching,
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
  const {
    data: quotes,
    // error,
    // isLoading,
  } = useGetPostQuotesQuery({
    parent_type: "posts",
    parentId: id,
    offset: page - 1,
  });
  if (isLoading) return <Skeletons />;
  if (error) return <Error />;

  return (
    <>
      <Grid
        item
        container
        flexDirection="column"
        sx={{
          // maxHeight: { xs: "70rem" },
          overflowY: "scroll",
          "&::-webkit-scrollbar": {
            width: ".85rem",
            display: "none",
          },
        }}
        // ref={root}
      >
        {quotes?.quotes?.length > 0 ? (
          <List sx={{ width: "100%" }}>
            {quotes?.quotes?.map((item) => {
              return <Replies item={item} />;
            })}
          </List>
        ) : (
          <Grid item container>
            <Typography>No Quotes available</Typography>
          </Grid>
        )}
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
        {quotes?.total_pages > 1 && (
          <Paginations
            page={page}
            setPage={setPage}
            count={quotes?.total_pages}
          />
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
    isLoading,
  } = useGetPostQuotesQuery({
    parent_type: "posts",
    parentId: id,
    offset: page - 1,
  });
  const {
    data: comments,
    // error,
    // isLoading,
    // isFetching,
  } = useGetPostCommentsQuery({
    parent_type: "posts",
    parentId: id,
    offset: page - 1,
  });
  // console.log(profile);

  // const hasNextPage = page + 1 < quotes?.total_pages;

  // const [sentryRef] = useInfiniteScroll({
  //   loading: isFetching,
  //   hasNextPage,
  //   onLoadMore: () => setPage((page) => page + 1),
  //   disabled: !!error,
  //   rootMargin: "0px 0px 200px 0px",
  // });

  if (isLoading) return <Skeletons />;
  if (error) return <Error />;
  console.log(comments);
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
        {/* // <List sx={{ width: "100%" }} dense>
          //   {quotes?.quotes?.map((item) => ( */}
        {/* //     <SingleComment
          //       icons={icons}
          //       key={item.id}
          //       item={item}
          //       profile={profile}
          //       type="quote"
          //     />
          //   ))}
          //   {/* {hasNextPage && <div ref={sentryRef} />}
          //   {!hasNextPage && (
          //     <Typography
          //       fontWeight={700}
          //       width="100%"
          //       textAlign="center"
          //       variant="h5"
          //     >
          //       No more Quotes
          //     </Typography>
          //   )} 
         </List>
          */}
      </Grid>
      {/* {isFetching && hasNextPage && (
        <Typography width="100%" textAlign="center" variant="h4">
          Loading more qotes...
        </Typography>
      )} */}
    </>
  );
}
const Skeletons = () => {
  return (
    <Grid item container flexDirection="column" gap={2}>
      {Array(3)
        .fill(undefined)
        .map((_, index) => (
          <Grid item key={index} container flexWrap={"nowrap"} gap={1}>
            <Grid item>
              <Skeleton
                sx={{ height: "5rem", width: "5rem" }}
                animation="wave"
                variant="circular"
              />
            </Grid>
            <Grid item container gap={1} flexDirection={"column"}>
              <Grid item>
                <Skeleton
                  sx={{ height: ".9rem", width: "100%" }}
                  animation="wave"
                  variant="text"
                />
              </Grid>
              <Grid item>
                <Skeleton
                  sx={{ height: ".9rem", width: "100%" }}
                  animation="wave"
                  variant="text"
                />
              </Grid>

              <Grid
                item
                justifyContent="space-between"
                container
                flexWrap="nowrap"
              >
                {Array(3)
                  .fill(undefined)
                  .map((i, index) => (
                    <Grid item container key={index} flexWrap={"nowrap"}>
                      <Grid item>
                        <Skeleton
                          sx={{ height: ".8rem", width: ".9rem" }}
                          animation="wave"
                          variant="text"
                        />
                      </Grid>
                      <Grid item>
                        <Skeleton
                          sx={{ height: ".8rem", width: ".9rem" }}
                          animation="wave"
                          variant="text"
                        />
                      </Grid>
                    </Grid>
                  ))}
              </Grid>
            </Grid>
          </Grid>
        ))}
    </Grid>
  );
};
