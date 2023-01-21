import {
  ArrowBackOutlined,
  FavoriteBorderOutlined,
  Favorite,
  FilterList,
  IosShareOutlined,
  MoreVertOutlined,
  Instagram,
  ReplyOutlined,
  ReportOutlined,
  SearchOutlined,
  TuneOutlined,
  Delete,
} from "@mui/icons-material";
import parse from "html-react-parser";
import {
  Avatar,
  Divider,
  Grid,
  Paper,
  MenuItem,
  Grow,
  IconButton,
  Popper,
  ClickAwayListener,
  Menu,
  MenuList,
  Typography,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Formik, Form } from "formik/dist";
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import FormikControl from "validation/FormikControl";
import UserProfile from "../UserProfile";
import images from "assets";
import { useDeleteAPostMutation } from "redux/slices/postSlice";

import { toast } from "react-toastify";
import CreatePost from "pages/user/modals/CreatePost";
import {
  useDeleteCommentMutation,
  useGetPostCommentsQuery,
} from "redux/slices/commentSlice";
import { getDate, getTime } from "helpers";
import DeleteIcon from "assets/svgs/DeleteIcon";
import { Details } from "../Post";
export const Comment = ({ handleShare, data }) => {
  const { id } = data;
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [editPostModal, setEditPostModal] = useState(false);
  const [deletePost, { isLoading: deleteLoading }] = useDeleteAPostMutation();
  const anchorRef = useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };
  const [anchorEl, setAnchorEl] = useState(null);
  const opens = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloses = () => {
    setAnchorEl(null);
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

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(open);
  const [deleteComment, { isLoading }] = useDeleteCommentMutation();
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  const { data: comments } = useGetPostCommentsQuery({
    parentId: data?.id,
    limit: 5,
  });
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
  const handleDeleteComment = async (id) => {
    const { data } = await deleteComment({ id });

    if (data) toast.success(data);
    handleCloses();
  };
  console.log(comments);

  return (
    <>
      <Grid
        item
        container
        // sx={{ my: 3, paddingInline: { xs: "1rem", md: "4rem" } }}
      >
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
            <Formik initialValues={{ filter: "" }}>
              <Form style={{ width: "100%" }}>
                <Grid
                  item
                  container
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Grid item xs={6}>
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
                  <Grid item xs={3}>
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
                </Grid>
              </Form>
            </Formik>
          </Grid>
        </Grid>
        {/* user Profile */}
        <Grid item md={6} xs={12} sm={6} sx={{ my: 3 }}>
          <UserProfile data={data} />
        </Grid>
      </Grid>
      <Grid
        item
        md={8}
        xs={12}
        sx={{ paddingInline: { xs: "1rem", md: "4rem" } }}
      >
        <Grid
          container
          sx={{
            mb: 2,
          }}
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
            {data?.title}
          </Typography>

          <Typography sx={{ color: "#FF9B04" }}>Follow</Typography>
        </Grid>
        <img src={images.obi2} style={{ width: "100%" }} alt="peter obi" />
        <Grid container item flexDirection="column" rowGap={2}>
          <Typography
            color="secondary"
            sx={{
              fontWeight: 400,
              fontSize: { md: "2rem", sm: "1rem" },
              textAlign: "justify",
            }}
          >
            {parse(data?.body)}
          </Typography>
          <Typography
            color="secondary"
            fontSize={{ md: "2.5rem", sm: "1.5rem" }}
            fontWeight={700}
          >
            {data?.category}
          </Typography>
          <Typography
            color="secondary"
            sx={{
              fontWeight: 400,
              fontSize: { md: "2rem", sm: "1rem" },
              textAlign: "justify",
            }}
          >
            dignissim nec scelerisque ullamcorper eu neque, augue quam quis
            lacus pretium eros est amet turpis nunc in turpis massa et eget
            facilisis ante molestie penatibus dolor volutpat, porta pellentesque
            scelerisque at ornare dui tincidunt cras feugiat tempor lectus
          </Typography>
        </Grid>
        <Grid item md={7} xs={12} sx={{ color: "#5F5C5C", mt: 3 }}>
          <Details handleShare={handleShare} icons={icons} data={data} />
        </Grid>
        <Divider flexItem sx={{ py: 2 }} />
      </Grid>
      <Grid
        item
        md={7}
        xs={12}
        sx={{ paddingInline: { xs: "1rem", md: "4rem" } }}
      >
        <Typography
          color="secondary"
          sx={{ my: 1 }}
          fontSize={{ md: "2.5rem", xs: "1.5rem" }}
          fontWeight={700}
        >
          Comment
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
          {comments?.length > 0 ? (
            comments?.map((item, index) => {
              const { avatar, full_name, comment, createdAt, id } = item;
              console.log(item);
              return (
                <Grid
                  item
                  container
                  key={index}
                  sx={{ mb: 2 }}
                  flexWrap="nowrap"
                  gap={2}
                >
                  <Grid item alignSelf={{ xs: "center", md: "flex-start" }}>
                    <Avatar alt={full_name} src={avatar}>
                      {full_name?.slice(0, 1).toUpperCase()}
                    </Avatar>
                  </Grid>
                  <Grid item>
                    <Grid container>
                      <Grid
                        item
                        container
                        alignItems="center"
                        justifyContent="space-between"
                      >
                        <Typography
                          fontWeight={700}
                          color="#9B9A9A"
                          fontSize={{ md: "2rem", xs: "1.2rem" }}
                        >
                          {full_name}
                          <Typography
                            variant="span"
                            color="#9B9A9A"
                            fontWeight={400}
                            fontSize={{ md: "1.6rem", xs: "1rem" }}
                          >
                            {" "}
                            -{getDate(createdAt)} {getTime(createdAt)}
                          </Typography>
                        </Typography>

                        <IconButton
                          id="basic-button"
                          aria-controls={opens ? "basic-menu" : undefined}
                          aria-haspopup="true"
                          aria-expanded={opens ? "true" : undefined}
                          onClick={handleClick}
                        >
                          <MoreVertOutlined />
                        </IconButton>

                        <Menu
                          id="basic-menu"
                          anchorEl={anchorEl}
                          open={opens}
                          onClose={handleCloses}
                          MenuListProps={{
                            "aria-labelledby": "basic-button",
                          }}
                        >
                          <MenuItem
                            onClick={() => handleDeleteComment(id)}
                            sx={{
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <ListItemIcon>
                              <Delete sx={{ fontSize: "2rem" }} />
                            </ListItemIcon>
                            <ListItemText sx={{ fontSize: "3rem" }}>
                              {isLoading ? "Deleting" : "Delete"}
                            </ListItemText>
                          </MenuItem>
                        </Menu>
                      </Grid>
                      <Typography
                        color="secondary"
                        fontWeight={600}
                        sx={{ wordBreak: "break-all" }}
                        fontSize={{ md: "1.8rem", sm: "1.4rem" }}
                      >
                        {parse(comment)}
                      </Typography>
                      <Grid item container>
                        <Details icons={icons} data={item} />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              );
            })
          ) : (
            <Grid item container>
              <Typography>No comments available</Typography>
            </Grid>
          )}
        </Grid>
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
                  <MenuItem onClick={() => setEditPostModal(true)}>
                    Edit Topic
                  </MenuItem>
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
