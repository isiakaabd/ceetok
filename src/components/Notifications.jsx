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
  const notificationArr = [
    {
      title: "Chat",
      Icon: EmailOutlined,
      number: 4,
    },
    {
      title: "Like",
      Icon: FavoriteBorderOutlined,
      number: 9,
    },
    {
      title: "Reply",
      Icon: ReplyOutlined,
      number: 4,
    },
    {
      title: "Tags",
      Icon: PermIdentityOutlined,
      number: 4,
    },
    {
      title: "Shares",
      Icon: ShareOutlined,
      number: 4,
    },
    {
      title: "Followed Topics",
      Icon: AddchartOutlined,
      number: 4,
    },
    {
      title: "Followers",
      Icon: PeopleOutlineOutlined,
      number: 9,
    },
    {
      title: "Mentions",
      Icon: ManageAccountsOutlined,
      number: 0,
    },
  ];
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
                >
                  {accountDetails.map((account) => (
                    <MenuItem
                      sx={{
                        px: 2,
                        m: 3,
                        border:
                          account.title === "Logout" && ".7px solid #FF9B04",
                        borderRadius: ".7rem",
                      }}
                      onClick={() => {
                        navigate(account.link);
                        setOpens(false);
                      }}
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
                        disableTypography
                        sx={{
                          fontSize: "1.2rem",
                          fontWeight: 400,
                          color:
                            account.title === "Logout" ? "#FF9B04" : "#5F5C5C",
                        }}
                      >
                        {account.title}
                      </ListItemText>
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