import { useRef, useEffect } from "react";

import {
  MenuList,
  ClickAwayListener,
  MenuItem,
  Grow,
  Paper,
  Popper,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import { AccountCircleOutlined, LogoutOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutAction } from "redux/reducers/authReducer";
import {
  useLazyUserProfileQuery,
  useLogoutMutation,
} from "redux/slices/authSlice";
import { toast } from "react-toastify";

export default function Notifications({
  open,
  opens,
  anchorRef,
  setOpens,

  anchorRefs,
  handleCloses,
}) {
  const state = useSelector((state) => state.auth.auth);
  const [getProfile] = useLazyUserProfileQuery();

  useEffect(() => {
    if (state) {
      getProfile();
    }
    //eslint-disable-next-line
  }, [state]);

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
    //eslint-disable-next-line
  }, [open]);
  const prevOpens = useRef(opens);
  useEffect(() => {
    if (prevOpens.current === true && opens === false) {
      anchorRefs.current.focus();
    }

    prevOpens.current = opens;
    //eslint-disable-next-line
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

  return (
    <>
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
                  {accountDetails?.map((account, index) => (
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
    </>
  );
}
