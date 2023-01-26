import images from "assets";
import {
  Typography,
  Menu,
  MenuItem,
  Grid,
  Button,
  IconButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { styled, alpha } from "@mui/material/styles";
import { useState, useRef } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  ChatBubbleOutline,
  Delete,
  Edit,
  FavoriteBorderOutlined,
  FilterList,
  IosShareOutlined,
  Payment,
} from "@mui/icons-material";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

import AnnoucementIcon from "assets/svgs/AnnoucementIcon";
import CreatePost from "./user/modals/CreatePost";
import LoginModal from "components/modals/LoginModal";
import {
  useDeleteAnnoucementsMutation,
  useGetAnnoucementsQuery,
} from "redux/slices/annoucementSlice";
import { useLikeAndUnlikePostMutation } from "redux/slices/postSlice";
import { toast } from "react-toastify";
import SocialMedia from "components/modals/SocialMedia";
import { Link, useNavigate } from "react-router-dom";
import PaymentModal from "components/modals/PaymentModal";

export const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

const Shares = ({ data: item }) => {
  const [likeState, setLikeState] = useState(Boolean(item?.liked));
  console.log(item);
  const [openShareModal, setOpenShareModal] = useState(false);
  const [likePost] = useLikeAndUnlikePostMutation();
  console.log(item);
  const handleLikePost = async () => {
    const { error } = await likePost({
      parent_type: "announcements",
      parent_id: item?.id,
    });

    if (error) toast.error(error);
    setLikeState(!likeState);
  };

  const [deleteAnnoucement, { isLoading }] = useDeleteAnnoucementsMutation();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloses = () => {
    setAnchorEl(null);
  };
  const handleDeleteComment = async (id) => {
    const { data, error } = await deleteAnnoucement({ id });

    if (data) toast.success(data);
    handleCloses();
    if (error) toast.error(error);
  };
  const [editModal, setEditModal] = useState(false);
  const [paymentModal, setPaymentModal] = useState(false);
  return (
    <>
      <Grid
        item
        container
        justifyContent="space-between"
        alignItems="center"
        flexWrap="nowrap"
        sx={{ color: "#5F5C5C", mt: "auto" }}
      >
        <Grid item>
          <Grid container alignItems="center" sx={{ cursor: "pointer" }}>
            <IconButton
              edge="start"
              size="small"
              onClick={() => navigate(`/user/annoucement/${item.slug}`)}
            >
              <ChatBubbleOutline />
            </IconButton>
            <Typography variant="span" sx={{ fontSize: "2rem" }}>
              {item?.comments_count}
            </Typography>
          </Grid>
        </Grid>
        <Grid item>
          <Grid
            container
            alignItems="center"
            onClick={handleLikePost}
            sx={{ cursor: "pointer", color: item?.liked && "red" }}
          >
            {!item?.liked ? <FavoriteBorderOutlined /> : <FavoriteIcon />}
            <Typography variant="span" sx={{ ml: 1, fontSize: "2rem" }}>
              {item?.likes_count}
            </Typography>
          </Grid>
        </Grid>
        <IconButton
          edge="start"
          size="small"
          onClick={() => setOpenShareModal(true)}
        >
          <IosShareOutlined />
        </IconButton>

        <IconButton
          edge="start"
          size="small"
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          <MoreVertIcon />
        </IconButton>

        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleCloses}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem
            onClick={() => handleDeleteComment(item.id)}
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
          <MenuItem
            onClick={() => setEditModal(true)}
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <ListItemIcon>
              <Edit sx={{ fontSize: "2rem" }} />
            </ListItemIcon>
            <ListItemText sx={{ fontSize: "3rem" }}>
              Edit Annoucement
            </ListItemText>
          </MenuItem>
          <MenuItem
            onClick={() => setPaymentModal(true)}
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <ListItemIcon>
              <Payment sx={{ fontSize: "2rem" }} />
            </ListItemIcon>
            <ListItemText sx={{ fontSize: "3rem" }}>Make Payment</ListItemText>
          </MenuItem>
        </Menu>
      </Grid>

      <SocialMedia
        open={openShareModal}
        handleClose={() => setOpenShareModal(false)}
      />
      <CreatePost
        open={editModal}
        postHeading={"Edit Annoucment"}
        handleClose={() => {
          setEditModal(false);
          handleCloses();
        }}
        type="annoucement"
        initialValues={{
          id: item?.id,
          text: item?.body,
          title: item?.title,
          duration: item?.duration,
        }}
      />
      <PaymentModal
        open={paymentModal}
        handleClose={() => setPaymentModal(false)}
        // data={annoucementData?.body?.announcement}
      />
    </>
  );
};

const Announcement = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const loginStatus = useSelector((state) => state.auth.token);
  const [modal, setModal] = useState(false);
  const [openCreatePost, setOpenCreatePost] = useState(false);

  const handleOpenCreateAnnoucement = () => {
    if (!loginStatus) {
      setModal(true);
    }

    setOpenCreatePost(true);
  };
  const { data: annoucements } = useGetAnnoucementsQuery();
  return (
    <>
      <Grid
        item
        container
        sx={{ padding: { xs: "2rem 1rem ", md: "0 4rem " } }}
      >
        <Grid
          item
          container
          alignItems="center"
          justifyContent={{ sm: "space-between", xs: "center" }}
          gap={3}
          flexWrap="nowrap"
        >
          <Grid
            item
            container
            alignItems="center"
            flexWrap={{ xs: "nowrap" }}
            justifyContent={{ xs: "space-between", md: "flex-start" }}
            gap={{ md: 3 }}
          >
            <Grid
              item
              flexWrap="nowrap"
              sx={{
                // border: { md: "1px solid #FF9B04", sm: "none" },
                paddingBlock: "1rem",
              }}
            >
              <Grid
                item
                container
                alignItems="center"
                flexWrap="nowrap"
                gap={{ md: 2, xs: 1 }}
              >
                <Button
                  variant="outlined"
                  sx={{
                    color: "#464646",
                    fontSize: { md: "1.9rem", xs: "1.4rem" },
                    fontWeight: 700,
                    border: "1px solid #FF9B04",
                  }}
                  startIcon={<AnnoucementIcon style={{ fontSize: "3rem" }} />}
                >
                  Annoucement
                </Button>
                <Grid item>
                  <Button
                    sx={{
                      height: "3.5rem",
                      borderRadius: ".5rem",
                      backgroundColor: "#5F5C5C",
                      color: "#fff",
                      fontWeight: 600,
                      fontSize: { md: "1.4rem", xs: "1.2rem" },
                      padding: { md: "1rem 1.5rem", xs: "1rem" },
                      whiteSpace: "nowrap",
                    }}
                    onClick={handleOpenCreateAnnoucement}
                    variant="contained"
                    disableElevation
                  >
                    Make Annoucement
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid item display={{ md: "block", xs: "none" }}>
            <Button
              id="demo-customized-button"
              aria-controls={open ? "demo-customized-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              variant="contained"
              disableElevation
              sx={{ width: "10rem" }}
              onClick={handleClick}
              startIcon={<FilterList />}
            >
              Sort by
            </Button>
            <StyledMenu
              id="demo-customized-menu"
              MenuListProps={{
                "aria-labelledby": "demo-customized-button",
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose} disableRipple>
                Date
              </MenuItem>
              <MenuItem onClick={handleClose} disableRipple>
                Trending
              </MenuItem>
              <MenuItem onClick={handleClose} disableRipple>
                Recent
              </MenuItem>
            </StyledMenu>
          </Grid>
        </Grid>

        {/* list */}
        {annoucements?.length > 0 ? (
          <Grid
            item
            container
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "repeat(4,1fr)" },
              py: 8,
              gap: 4,
              borderRadius: "1.6rem",
              background: "White",
            }}
          >
            {annoucements?.map((item, index) => (
              <Grid item container key={index} flexWrap="nowrap">
                <Grid
                  item
                  container
                  // gap={2}
                  sx={{
                    padding: "2rem",
                    border: "1px solid #9B9A9A",
                    borderRadius: "1.2rem",
                    flexDirection: "column",
                  }}
                >
                  <Grid item>
                    <img
                      src={images.davido}
                      style={{ width: "100%", height: "100%" }}
                      alt="davido"
                    />
                  </Grid>
                  <Grid item sx={{ mt: 2 }}>
                    <Typography
                      sx={{
                        color: "#464646",
                        fontSize: "1.3rem",
                        fontWeight: 700,
                      }}
                    >
                      {parse(item?.body)}
                    </Typography>
                  </Grid>
                  <Shares data={item} />
                </Grid>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography
            variant="h2"
            width="100%"
            textAlign="center"
            sx={{ my: 4 }}
          >
            No Annoucement here
          </Typography>
        )}
      </Grid>

      {modal && (
        <LoginModal
          handleClose={() => setModal(false)}
          // setIsLogin={setIsLogin}
          // handleRegisterOpen={handleRegisterOpen}
          isLogin={modal}
        />
      )}

      <CreatePost
        open={openCreatePost}
        handleClose={() => setOpenCreatePost(false)}
        postHeading={"Make Annoucement"}
        initialValues={{
          title: "",
          text: "",
          duration: "",
        }}
      />
    </>
  );
};

export default Announcement;
