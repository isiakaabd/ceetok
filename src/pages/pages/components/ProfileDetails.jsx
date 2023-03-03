import { useEffect, useState } from "react";
import {
  Divider,
  Grid,
  IconButton,
  List,
  Typography,
  Skeleton,
} from "@mui/material";
import ProfileImage from "./ProfileImage";
import Pen from "assets/svgs/Pen";
import { styled } from "@mui/material/styles";
import { CustomButton } from "components";
import {
  PersonAddAlt1Outlined,
  PersonRemoveAlt1Outlined,
} from "@mui/icons-material";
import { Link, useSearchParams } from "react-router-dom";
import ProfileItem from "./ProfileItem";
import {
  useFollowUserMutation,
  useLazyOtherUserProfileQuery,
  useListUsersQuery,
  useUserProfileQuery,
} from "redux/slices/authSlice";
import { getDate, getTimeMoment } from "helpers";
import VerifyPage from "components/modals/VerifyPage";
import { useSelector } from "react-redux";
import CustomizedTooltips from "components/ToolTips";
import { toast } from "react-toastify";
import Error from "./Error";

const Sk = () => {
  return (
    <Grid>
      <Skeleton
        sx={{ height: "1.4rem", width: "1.4rem" }}
        animation="wave"
        variant="rectangular"
      />
    </Grid>
  );
};

const ProfileDetails = (props) => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const CustomTypography = styled(Typography)(({ theme }) => ({
    fontSize: "1.7rem",
    fontWeight: 700,
    color: "#5F5C5C",
  }));
  const CustomSubTypography = styled(({ ...rest }) => <Typography {...rest} />)(
    ({ theme }) => ({
      fontSize: "1.3rem",
      fontWeight: 500,
      color: "#9B9A9A",
      textAlign: "center",
    })
  );

  const [open, setOpen] = useState(false);
  const [follow, { isLoading: followLoading }] = useFollowUserMutation();
  const {
    data: userProfile,
    isLoading,
    error: isError,
  } = useUserProfileQuery();
  const [state, setState] = useState(userProfile);
  const [fetchProfile, { data: dt, isLoading: load, error }] =
    useLazyOtherUserProfileQuery();

  const admin = useSelector((state) => state.auth.admin);
  // const [follows, setFollows] = useState(false);
  const {
    data,
    isLoading: usersLoading,
    error: err,
  } = useListUsersQuery({
    username: "",
    followed: admin ? false : true,
    // following: admin ? false : true,
  }); //

  // {
  //   followers: true,
  // }
  //   const handleSubmit=async()=>{
  // listUser({

  // })
  //   }

  // console.log(userProfile.id, dt.id);

  useEffect(() => {
    if (id) {
      async function x() {
        const { data } = await fetchProfile(id);

        if (data) {
          setState(data);
        }
      }
      x();
    } else {
      setState(userProfile);
    }
    //eslint-disable-next-line
  }, [userProfile, dt, id]);
  const [listNumber, setListNumber] = useState(5);

  if (isLoading || usersLoading || load) return <Skeletons />;
  if (error || err || isError) return <Error />;
  const { users } = data;
  const condition = !id || dt?.id === userProfile?.id;
  const list = users;
  // const { is_followed } = dt;
  const handleFollowUser = async () => {
    const { data, error } = await follow({ user_id: id });
    toast.success(data);
    toast.error(error);
  };

  // const { full_name, location, email, avatar, username, createdAt } = state;
  return (
    <>
      <Grid
        item
        container
        flexDirection="column"
        justifyContent="flex-start"
        sx={{
          height: "100%",
          // pt: 8,
          // px: 1,
          background: "#fff",
          borderRadius: "2rem",
          // background: "#fff",
        }}
      >
        <Grid item container flexDirection="column">
          <Grid item container flexDirection="column" alignItems="center">
            <Grid
              item
              container
              sx={{
                // background: "#044402",
                pt: "8rem",
                justifyContent: "center",
              }}
            >
              <ProfileImage avatar={state?.avatar} name={state?.full_name} />
            </Grid>
            <Grid item container justifyContent="center" alignItems="center">
              <Typography fontWeight={700} fontSize="2.2rem">
                {state?.full_name}
              </Typography>
              <div
                style={{
                  width: "1rem",
                  height: "1rem",
                  marginLeft: ".5rem",
                  borderRadius: "50%",
                  backgroundColor: "#37D42A",
                }}
              />
            </Grid>
            <Typography color="#9B9A9A" fontWeight={500} fontSize="1.7rem">
              {state?.email}
            </Typography>
            <Grid item>
              <Grid item container gap={2} alignItems="center">
                <Typography color="#9B9A9A" fontWeight={700} fontSize="1.4rem">
                  {state?.username || state?.role}
                </Typography>
                {followLoading ? (
                  <Sk />
                ) : (
                  !condition && (
                    <Grid item>
                      <CustomizedTooltips
                        title={dt?.is_followed ? "Unfollow" : "follow"}
                      >
                        <IconButton
                          edge="start"
                          size="small"
                          onClick={handleFollowUser}
                        >
                          {dt?.is_followed ? (
                            <PersonRemoveAlt1Outlined />
                          ) : (
                            <PersonAddAlt1Outlined
                              title={dt?.is_followed ? "Unfollow" : "follow"}
                            />
                          )}
                        </IconButton>
                      </CustomizedTooltips>
                    </Grid>
                  )
                )}
                {condition && (
                  <Grid item>
                    <Grid container alignItems="center">
                      <Typography
                        color="#9B9A9A"
                        // variant="span"
                        fontWeight={500}
                        fontSize="1rem"
                      >
                        Edit
                      </Typography>{" "}
                      <IconButton onClick={() => setOpen(true)}>
                        <Pen sx={{ color: "#9B9A9A", fontSize: "1rem" }} />
                      </IconButton>
                    </Grid>
                  </Grid>
                )}
              </Grid>
            </Grid>
          </Grid>

          <Grid
            item
            container
            alignItems="center"
            justifyContent="space-between"
            sx={{ p: 3 }}
          >
            <Grid item>
              <CustomTypography>{state?.post_count || 0}</CustomTypography>
              <CustomSubTypography>post</CustomSubTypography>
            </Grid>
            <Grid item>
              <CustomTypography>{state?.likes_count || 0}</CustomTypography>
              <CustomSubTypography>Likes</CustomSubTypography>
            </Grid>
            <Grid item>
              <CustomTypography>{state?.followers_count || 0}</CustomTypography>
              <CustomSubTypography>Followers</CustomSubTypography>
            </Grid>
            <Grid item>
              <CustomTypography>{state?.following_count || 0}</CustomTypography>
              <CustomSubTypography>Following</CustomSubTypography>
            </Grid>
          </Grid>
          <Divider flexItem sx={{ border: "1px solid #9B9A9A" }} />
          <Grid item sx={{ pt: 2, pb: 1 }}>
            <CustomSubTypography fontSize="1.4rem !important">
              Last Activity: {getTimeMoment(state?.last_activity)}
            </CustomSubTypography>
            <CustomSubTypography fontSize="1.4rem !important">
              Joined: {getDate(state?.createdAt)}
            </CustomSubTypography>
            <CustomSubTypography fontSize="1.4rem !important">
              Location: {state?.location || "No Location yet"}
            </CustomSubTypography>
          </Grid>

          {condition && (
            <Grid
              item
              container
              alignItems="center"
              justifyContent="center"
              sx={{ p: 2 }}
            >
              <CustomButton
                component={Link}
                width="10rem"
                // onClick={() => {
                //   !admin && setFollows(true);
                //   refetch();
                // }}
                fontSize={{ md: "2.5rem", xs: "1.8rem" }}
                // fontSize={{ md: "20rem", xs: "1.6rem" }}
                title={" Update Settings"}
                to={"/user/settings"}
              />
            </Grid>
          )}
        </Grid>
        <Divider sx={{ border: "1px solid #9B9A9A" }} />

        {condition && (
          <>
            <Grid
              item
              container
              flexWrap="nowrap"
              alignItems="center"
              sx={{ mt: 4, p: 2 }}
            >
              <Typography flex={1} sx={{ fontWeight: 600, fontSize: "1.5rem" }}>
                {admin ? "Users List" : "Followers List"}
              </Typography>
              <Grid item>
                {/* <Formik initialValues={{ option: "" }} onSubmit={handleSubmit}>
                  <Form style={{ width: "100%" }}>
                    <Grid item container>
                      <FormikControl
                        name="option"
                        control="select"
                        options={[
                          {
                            label: "All",
                            value: "All",
                          },
                          {
                            label: "Following",
                            value: "Following",
                          },
                          {
                            label: "Followers",
                            value: "Following",
                          },
                        ]}
                        placeholder="Filter By"
                      />
                    </Grid>
                  </Form>
                </Formik> */}
                {list?.length > 0 && (
                  <CustomButton
                    title={"See All"}
                    component={Link}
                    onClick={() => {
                      if (!admin) {
                        listNumber > list.length
                          ? setListNumber(list?.length)
                          : setListNumber(listNumber + 5);
                      }
                    }}
                    to={admin ? "/admin/all-users" : null}
                    fontSize={{ md: "1.6rem", xs: "1.4rem" }}
                  />
                )}
              </Grid>
            </Grid>
            {list?.length > 0 ? (
              <List sx={{ p: 2, maxWidth: "100%" }}>
                {list?.slice(0, listNumber)?.map((item) => (
                  <ProfileItem profile={item} condition={condition} />
                ))}
              </List>
            ) : (
              <Typography
                variant="h2"
                textAlign="center"
                width="100%"
                sx={{ alignSelf: "center", py: 3 }}
              >
                No data here
              </Typography>
            )}
          </>
        )}
      </Grid>

      <VerifyPage isOpen={open} handleClose={() => setOpen(false)} />
    </>
  );
};
function Skeletons() {
  return (
    <Grid
      item
      container
      sx={{ background: "#fff", borderRadius: "1rem", px: 3, py: 5 }}
      flexWrap={"nowrap"}
      overflow="hidden"
    >
      <Grid item container flexDirection="column" gap={2}>
        <Skeleton
          sx={{ height: "10rem", mx: "auto", width: "10rem" }}
          animation="wave"
          variant="circular"
        />
        <Grid
          item
          justifyContent={"center"}
          container
          gap={1}
          flexWrap="nowrap"
          alignItems={"center"}
        >
          <Skeleton
            sx={{ height: "1rem", width: "12rem" }}
            animation="pulse"
            variant="text"
          />
          <Skeleton
            sx={{ height: ".8rem", width: ".8rem", borderRadius: "50%" }}
            animation="pulse"
            variant="rounded"
          />
        </Grid>
        <Grid
          item
          justifyContent={"center"}
          container
          gap={3}
          alignItems={"center"}
          flexWrap="nowrap"
        >
          <Skeleton
            sx={{ height: "1rem", width: "15rem" }}
            animation="pulse"
            variant="text"
          />
          <Skeleton
            sx={{ height: "1rem", width: "4rem" }}
            animation="pulse"
            variant="text"
          />
        </Grid>
        <Grid item container flexWrap="nowrap" justifyContent="space-around">
          <Grid item>
            <Skeleton
              sx={{ height: "3rem", width: "4rem" }}
              animation="pulse"
              variant="rectangular"
            />
          </Grid>
          <Grid item>
            <Skeleton
              sx={{ height: "3rem", width: "4rem" }}
              animation="pulse"
              variant="rectangular"
            />
          </Grid>
          <Grid item>
            <Skeleton
              sx={{ height: "3rem", width: "4rem" }}
              animation="pulse"
              variant="rectangular"
            />
          </Grid>
          <Grid item>
            <Skeleton
              sx={{ height: "3rem", width: "4rem" }}
              animation="pulse"
              variant="rectangular"
            />
          </Grid>
        </Grid>
        <Skeleton
          sx={{ height: ".4rem", width: "100%" }}
          animation="pulse"
          variant="text"
        />
        <Grid
          item
          sx={{ mb: 2 }}
          container
          alignItems="center"
          flexDirection="column"
          gap={1}
        >
          <Grid item>
            <Skeleton
              sx={{ height: "1rem", width: "16rem" }}
              animation="pulse"
              variant="text"
            />
          </Grid>
          <Grid item>
            <Skeleton
              sx={{ height: "1rem", width: "12rem" }}
              animation="pulse"
              variant="text"
            />
          </Grid>
          <Grid item>
            <Skeleton
              sx={{ height: "1rem", width: "16rem" }}
              animation="pulse"
              variant="text"
            />
          </Grid>
        </Grid>
        <Grid item container justifyContent="center" sx={{ mb: 2 }}>
          <Skeleton
            sx={{ height: "4rem", borderRadius: "4rem", width: "18rem" }}
            animation="pulse"
            variant="rectangular"
          />
        </Grid>
        <Skeleton
          sx={{ height: ".4rem", width: "100%" }}
          animation="pulse"
          variant="text"
        />
        <Grid
          item
          container
          flexWrap="nowrap"
          alignItems="center"
          justifyContent="space-between"
        >
          <Grid item>
            <Skeleton
              sx={{ height: "1.5rem", width: "5rem" }}
              animation="pulse"
              variant="text"
            />
          </Grid>
          <Grid item>
            <Skeleton
              sx={{ height: "3rem", borderRadius: "2rem", width: "8rem" }}
              animation="pulse"
              variant="rectangular"
            />
          </Grid>
        </Grid>
        <Grid item container flexDirection="column" gap={1}>
          <Skeleton
            sx={{ height: "8rem", width: "100%" }}
            animation="pulse"
            variant="rounded"
          />
          <Skeleton
            sx={{ height: "8rem", width: "100%" }}
            animation="pulse"
            variant="rounded"
          />
          <Skeleton
            sx={{ height: "8rem", width: "100%" }}
            animation="pulse"
            variant="rounded"
          />
          <Skeleton
            sx={{ height: "8rem", width: "100%" }}
            animation="pulse"
            variant="rounded"
          />
          <Skeleton
            sx={{ height: "8rem", width: "100%" }}
            animation="pulse"
            variant="rounded"
          />
        </Grid>
      </Grid>
    </Grid>
  );
}

ProfileDetails.propTypes = {};

export default ProfileDetails;
