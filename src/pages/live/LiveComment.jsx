import {
  Favorite,
  IosShareOutlined,
  ReplyOutlined,
  ReportOutlined,
} from "@mui/icons-material";
import {
  Grid,
  Paper,
  MenuItem,
  Grow,
  Popper,
  ClickAwayListener,
  MenuList,
  Typography,
  List,
  Skeleton,
} from "@mui/material";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDeleteAPostMutation } from "redux/slices/postSlice";
import { toast } from "react-toastify";
import CreatePost from "pages/user/modals/CreatePost";

import { useLazyUserProfileQuery } from "redux/slices/authSlice";

import { useSelector } from "react-redux";
import { useApprovePostMutation } from "redux/slices/adminSlice";
import SingleComment from "pages/pages/components/SingleComment";
export const LiveComment = ({ handleShare, data, state, setState }) => {
  const { id, recent_comments, recent_quotes } = data;

  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();
  const [getProfile, { data: profile, isLoading }] = useLazyUserProfileQuery();
  const admin = useSelector((state) => state.auth.admin);
  useEffect(() => {
    if (token) getProfile();
    //eslint-disable-next-line
  }, [token]);
  const [open, setOpen] = useState(false);
  const [approvePost, { isLoading: approvalLoading }] =
    useApprovePostMutation();
  const [editPostModal, setEditPostModal] = useState(false);
  const [deletePost, { isLoading: deleteLoading }] = useDeleteAPostMutation();
  const anchorRef = useRef(null);
  // const [update, { isLoading: updating }] = useUserProfileUpdateMutation();

  // const handleToggle = () => {
  //   setOpen((prevOpen) => !prevOpen);
  // };

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

  if (isLoading) return <Skeleton />;

  // const checkUser = profile?.id === user_id;

  return (
    <>
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
                      type="live"
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
                  {admin && (
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
