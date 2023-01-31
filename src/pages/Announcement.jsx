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
  Skeleton,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { styled, alpha } from "@mui/material/styles";
import { useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  ApprovalSharp,
  ChatBubbleOutline,
  Delete,
  Edit,
  FavoriteBorderOutlined,
  FilterList,
  IosShareOutlined,
  Payment,
  ReportOutlined,
  VerifiedUserRounded,
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
import { useNavigate } from "react-router-dom";
import PaymentModal from "components/modals/PaymentModal";
import { useUserProfileQuery } from "redux/slices/authSlice";
import { useValidateAnnoucementMutation } from "redux/slices/annoucementSlice";
import { getImage } from "helpers";
import { useApproveAnnoucementMutation } from "redux/slices/adminSlice";
import Paginations from "components/modals/Paginations";

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
  const {
    id,
    liked,
    user_id,
    title,
    duration,
    payment,
    comments_count,
    edited,
    approved,
    likes_count,
    body,
  } = item;
  const [likeState, setLikeState] = useState(Boolean(liked));
  const { data: profile } = useUserProfileQuery();

  const [openShareModal, setOpenShareModal] = useState(false);
  const [likePost] = useLikeAndUnlikePostMutation();
  const [approveAnnoucement, { isLoading: isApprovalLoading }] =
    useApproveAnnoucementMutation();
  const [validate, { isLoading: validating }] =
    useValidateAnnoucementMutation();
  const check = profile?.id === user_id;
  const handleLikePost = async () => {
    const { error } = await likePost({
      parent_type: "announcements",
      parent_id: id,
    });

    if (error) toast.error(error);
    setLikeState(!likeState);
  };
  const admin = useSelector((state) => state.auth.admin);

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
  const handleDeleteComment = async () => {
    const { data, error } = await deleteAnnoucement({ id });

    if (data) toast.success(data);
    handleCloses();
    if (error) toast.error(error);
  };
  const handleApproval = async () => {
    const { data, error } = await approveAnnoucement({ id });
    if (data) {
      toast.success(data);
      handleCloses();
    }
    if (error) toast.success(error);
  };

  const validatePayment = async () => {
    const { data, error } = await validate({
      payment_id: item?.payment?.id,
    });
    if (data) toast.success(data);
    if (error) toast.error(error);
    handleCloses();
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
        sx={{
          color: "#5F5C5C",
          mt: "auto",
        }}
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
              {comments_count}
            </Typography>
          </Grid>
        </Grid>
        <Grid item>
          <Grid
            container
            alignItems="center"
            onClick={handleLikePost}
            sx={{ cursor: "pointer", color: liked && "red" }}
          >
            {!liked ? <FavoriteBorderOutlined /> : <FavoriteIcon />}
            <Typography variant="span" sx={{ ml: 1, fontSize: "2rem" }}>
              {likes_count}
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
          {admin && (
            <MenuItem
              disabled={approved}
              onClick={handleApproval}
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <ListItemIcon>
                <ApprovalSharp sx={{ fontSize: "2rem" }} />
              </ListItemIcon>
              <ListItemText sx={{ fontSize: "3rem" }}>
                {isApprovalLoading
                  ? "Approving"
                  : approved
                  ? "Approved"
                  : "Approve"}
              </ListItemText>
            </MenuItem>
          )}
          {(check || admin) && (
            <MenuItem
              onClick={handleDeleteComment}
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
          )}
          {(check || admin) && (
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
                {edited ? "Edit Again" : "Edit Annoucement"}
              </ListItemText>
            </MenuItem>
          )}
          {check && !admin && payment?.status !== "completed" && (
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
              <ListItemText sx={{ fontSize: "3rem" }}>
                Make Payment
              </ListItemText>
            </MenuItem>
          )}
          {check && !admin && payment?.status === "completed" && !approved && (
            <MenuItem
              onClick={validatePayment}
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <ListItemIcon>
                <VerifiedUserRounded sx={{ fontSize: "2rem" }} />
              </ListItemIcon>
              <ListItemText sx={{ fontSize: "3rem" }}>
                {validating ? "Validating" : "Validate Payment"}
              </ListItemText>
            </MenuItem>
          )}
          {!check && !admin && (
            <MenuItem
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <ListItemIcon>
                <ReportOutlined sx={{ fontSize: "2rem" }} />
              </ListItemIcon>
              <ListItemText sx={{ fontSize: "3rem" }}>Report</ListItemText>
            </MenuItem>
          )}
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
          id: id,
          text: body,
          title: title,
          duration: duration,
        }}
      />
      <PaymentModal
        open={paymentModal}
        handleClose={() => {
          handleCloses();
          setPaymentModal(false);
        }}
        data={payment}
        duration={duration}
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
  const [page, setPage] = useState(0);
  const { data: annoucements, isLoading } = useGetAnnoucementsQuery({ page });
  if (isLoading) return <Skeleton />;

  return (
    <>
      <Grid
        item
        container
        sx={{
          padding: { xs: "2rem 1rem ", md: "0 4rem " },
        }}
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
        {annoucements?.announcements?.length > 0 ? (
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
            {annoucements?.announcements?.map((item, index) => {
              const {
                payment,

                approved,
                media,

                body,
              } = item;
              return (
                <Grid
                  item
                  container
                  key={index}
                  flexWrap="nowrap"
                  sx={{
                    borderRadius: "1.2rem",
                    background:
                      payment?.status === "completed" && approved
                        ? "#37D42A"
                        : payment?.status === "completed" && !approved
                        ? "#FF9B04"
                        : "#FF9B04",
                  }}
                >
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
                        src={
                          media?.length > 0
                            ? getImage(media[0]?.storage_path)
                            : images.davido
                        }
                        // src={item.media>0? getImage() images.davido}
                        style={{ width: "100%", height: "100%" }}
                        alt="davido"
                      />
                    </Grid>
                    <Grid item sx={{ mt: 2 }}>
                      <Typography
                        sx={{
                          color: !approved ? "#464646" : "#fff",
                          fontSize: "1.3rem",
                          fontWeight: 700,
                          // overflow: "hiddem",
                          // whiteSpace: "nowrap",
                          // textOverflow: "ellipsis",
                        }}
                      >
                        {parse(body)}
                      </Typography>
                    </Grid>
                    <Shares data={item} />
                  </Grid>
                </Grid>
              );
            })}
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

        <Grid item container>
          <Paginations
            setPage={setPage}
            page={page}
            count={annoucements?.total_pages || 5}
          />
        </Grid>
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
        uploadType={"annoucement"}
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
