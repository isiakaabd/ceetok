import { useRef, useEffect } from "react";

import {
  Stack,
  MenuList,
  ClickAwayListener,
  MenuItem,
  Grow,
  Paper,
  Popper,
  ListItemText,
  Typography,
  ListItemIcon,
  Grid,
  Menu,
  Divider,
  Avatar,
  Skeleton,
} from "@mui/material";
import {
  Message,
  PermIdentityOutlined,
  ShareOutlined,
  AddchartOutlined,
  PeopleOutlineOutlined,
  ChatBubbleOutlineSharp,
  FavoriteBorderOutlined,
  ReplyOutlined,
  ManageAccountsOutlined,
  EmailOutlined,
  PersonAdd,
  Settings,
  Logout,
  AccountCircleOutlined,
  LogoutOutlined,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutAction } from "redux/reducers/authReducer";
import { useLogoutMutation, useUserProfileQuery } from "redux/slices/authSlice";
import { toast } from "react-toastify";

export default function Notifications({
  open,
  opens,
  anchorRef,
  setOpen,
  setOpens,
  handleClose,
  handleToggle,
  anchorEls,
  anchorRefs,
  handleCloses,
}) {
  const { data: profile, isLoading } = useUserProfileQuery();
  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }
  function handleListKeyDowns(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpens(false);
    } else if (event.key === "Escape") {
      setOpens(false);
    }
  }

  const accountDetails = [
    {
      title: "Profile",
      Icon: AccountCircleOutlined,
      link: "/user/profile",
    },
    {
      title: "Logout",
      Icon: LogoutOutlined,
    },
  ];

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);
  const prevOpens = useRef(opens);
  useEffect(() => {
    if (prevOpens.current === true && opens === false) {
      anchorRefs.current.focus();
    }

    prevOpens.current = opens;
  }, [opens]);
  const navigate = useNavigate();
  const [logoutUser] = useLogoutMutation();
  const handleClick = (link) => {
    navigate(link);
    setOpens(false);
  };
  const dispatch = useDispatch();
  const handleLogout = async () => {
    const { data, error } = await logoutUser();
    if (data) {
      toast.success(data);
      dispatch(logoutAction());
    }
    if (error) {
      toast.error(error);
    }
  };
  if (isLoading) return <Skeleton />;
  const notificationArr = [
    {
      title: "Chat",
      Icon: EmailOutlined,
      number: profile?.chat || 0,
    },
    {
      title: "Like",
      Icon: FavoriteBorderOutlined,
      number: profile?.like || 0,
    },
    {
      title: "Reply",
      Icon: ReplyOutlined,
      number: profile?.reply || 0,
    },
    {
      title: "Tags",
      Icon: PermIdentityOutlined,
      number: profile?.tags || 0,
    },
    {
      title: "Shares",
      Icon: ShareOutlined,
      number: profile?.share || 0,
    },
    {
      title: "Followed Topics",
      Icon: AddchartOutlined,
      number: profile?.topics || 0,
    },
    {
      title: "Followers",
      Icon: PeopleOutlineOutlined,
      number: profile?.followers_count || 0,
    },
    {
      title: "Following",
      Icon: PeopleOutlineOutlined,
      number: profile?.following_count || 0,
    },
    {
      title: "Post Count",
      Icon: ManageAccountsOutlined,
      number: profile?.post_count || 0,
    },
  ];
  return (
    <>
      <Popper
        open={open}
        anchorEl={anchorRef?.current}
        role={undefined}
        placement="bottom-start"
        transition
        disablePortal
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
                  {notificationArr.map((notification) => (
                    <MenuItem sx={{ px: 4, py: 1.5 }}>
                      <ListItemIcon>
                        {
                          <notification.Icon
                            sx={{
                              fontSize: "2.5rem",
                              fontWeight: 400,
                              borderColor: "#5F5C5C",
                              color: "#5F5C5C",
                              strokeWidth: 5,
                              strokeOpacity: 0.1,
                            }}
                          />
                        }
                      </ListItemIcon>
                      <ListItemText
                        disableTypography
                        sx={{
                          fontSize: "1.4rem",
                          fontWeight: 400,
                          color: "#5F5C5C",
                        }}
                      >
                        {notification.title}
                      </ListItemText>
                      <Grid
                        sx={{
                          width: "1.7rem",
                          ml: 3,
                          background:
                            notification.number > 5 ? "#FF9B04" : "#37D42A",
                          height: "1.7rem",
                          borderRadius: "50%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Typography fontSize="1rem" color="#fff">
                          {notification.number}
                        </Typography>
                      </Grid>
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
      <Popper
        open={opens}
        anchorEl={anchorRefs?.current}
        role={undefined}
        placement="bottom-start"
        transition
        disablePortal
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
              <ClickAwayListener onClickAway={handleCloses}>
                <MenuList
                  autoFocusItem={opens}
                  id="composition-menu"
                  aria-labelledby="composition-button"
                  onKeyDown={handleListKeyDowns}
                  sx={{ p: 2 }}
                >
                  {accountDetails.map((account, index) => (
                    <MenuItem
                      sx={{
                        px: 2,
                        mb: 1,
                        border:
                          account.title === "Logout" && ".7px solid #FF9B04",
                        borderRadius: ".7rem",
                      }}
                      onClick={() =>
                        account.title !== "Logout"
                          ? handleClick(account.link)
                          : handleLogout()
                      }
                      key={index}
                    >
                      <ListItemIcon>
                        {
                          <account.Icon
                            sx={{
                              fontSize: "2.5rem",
                              color: account.title === "Logout" && "#FF9B04",
                            }}
                          />
                        }
                      </ListItemIcon>
                      <ListItemText
                        primary={account.title}
                        primaryTypographyProps={{
                          fontSize: "1.2rem",
                          fontWeight: 400,
                          color:
                            account.title === "Logout" ? "#FF9B04" : "#5F5C5C",
                        }}
                      />
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>

      {/* <Menu
        anchorEl={anchorEls}
        id="account-menu"
        open={opens}
        onClose={handleCloses}
        onClick={handleCloses}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem>
          <Avatar /> Profile
        </MenuItem>
        <MenuItem>
          <Avatar /> My account
        </MenuItem>
        <Divider />
        <MenuItem>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          Add another account
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu> */}
    </>
  );
}
