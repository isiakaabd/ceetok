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
} from "@mui/material";
import { Formik, Form } from "formik/dist";
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import FormikControl from "validation/FormikControl";
import UserProfile from "../UserProfile";
import images from "assets";
import {
  useDeleteAPostMutation,
  useLikeAndUnlikePostMutation,
} from "redux/slices/postSlice";
import { VerifiedOutlined } from "@mui/icons-material";
import { toast } from "react-toastify";
import CreatePost from "pages/user/modals/CreatePost";
import { Details } from "../Post";
import {
  useUserProfileQuery,
  useUserProfileUpdateMutation,
} from "redux/slices/authSlice";
import SingleComment from "./SingleComment";
import Tooltips from "components/ToolTips";
import { getImage } from "helpers";
import { useSelector } from "react-redux";
import { useApprovePostMutation } from "redux/slices/adminSlice";
export const Comment = ({ handleShare, data, state, setState }) => {
  const { id, category, user_id, body, recent_quotes, recent_comments, media } =
    data;

  const navigate = useNavigate();
  const { data: profile, isLoading } = useUserProfileQuery();
  const admin = useSelector((state) => state.auth.admin);

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
  const { interests } = profile;
  const check = interests?.includes(category?.toLowerCase());

  const checkUser = profile?.id === user_id;

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
                            label: "Male",
                            value: "Male",
                          },
                          {
                            label: "Female",
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
        <Grid item md={12} xs={12} sm={12} sx={{ my: 3 }}>
          <UserProfile data={data} />
        </Grid>
      </Grid>
      <Grid item md={8} xs={12} sx={{ paddingInline: { xs: "1rem" } }}>
        <Grid
          container
          alignItems="center"
          justifyContent="space-between"
          flexWrap="nowrap"
        >
          <Typography
            color="secondary"
            fontSize={{ md: "3rem", sm: "2rem", xs: "1.5rem" }}
            sx={{ whiteSpace: "nowrap" }}
            fontWeight="700"
          >
            {category}
          </Typography>
          <Tooltips title={check ? "unfollow" : "Follow"}>
            <Typography
              fontWeight={500}
              component="a"
              onClick={handleCheck}
              sx={{ display: "flex", cursor: "pointer", alignItems: "center" }}
              fontSize="2rem"
              color={check ? "#37D42A" : "#FF9B04"}
            >
              {updating ? "Updating..." : check ? "Followed" : "Follow"}
              {check && <VerifiedOutlined />}
            </Typography>
          </Tooltips>
        </Grid>
        <img
          src={
            media?.length > 0 ? getImage(media[0]?.storage_path) : images.obi2
          }
          style={{ width: "100%" }}
          alt={category}
        />
        <Grid container item flexDirection="column" rowGap={2}>
          <Typography
            color="secondary"
            sx={{
              fontWeight: 400,
              fontSize: { md: "2rem", sm: "1rem" },
              textAlign: "justify",
              // pl: 3,
            }}
          >
            {parse(body)}
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
              {recent_comments?.length > 0 ? (
                <List sx={{ width: "100%" }} dense>
                  {recent_comments?.map((item) => (
                    <SingleComment
                      icons={icons}
                      key={item.id}
                      item={item}
                      profile={profile}
                    />
                  ))}
                </List>
              ) : (
                <Grid item container>
                  <Typography>No comments available</Typography>
                </Grid>
              )}
            </Grid>
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
              {recent_quotes?.length > 0 ? (
                <List sx={{ width: "100%" }} dense>
                  {recent_quotes?.map((item) => (
                    <SingleComment
                      icons={icons}
                      key={item.id}
                      item={item}
                      profile={profile}
                      type="quote"
                    />
                  ))}
                </List>
              ) : (
                <Grid item container>
                  <Typography>No Quotes available</Typography>
                </Grid>
              )}
            </Grid>
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
