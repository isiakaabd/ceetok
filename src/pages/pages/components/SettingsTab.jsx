import { styled } from "@mui/material/styles";
import { Box, Tabs, Tab } from "@mui/material";
import ProfileSetting from "./ProfileSetting";
import Account from "./Account";
import Privacy from "./Privacy";
import Notifications from "./Notifications";
import { useState } from "react";
import Person from "assets/svgs/Person";
import AccountIcon from "assets/svgs/Account";
import PrivacyIcon from "assets/svgs/PrivacyIcon";
import NotificationIcon from "assets/svgs/NotificationIcon";
const StyledTabs = styled((props) => (
  <Tabs
    {...props}
    TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
  />
))({
  background: "#044402",
  color: "#fff",
  "& .MuiTabs-indicator": {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  "& .MuiTabs-indicatorSpan": {
    maxWidth: "100%",
    width: "100%",
    // backgroundColor: "#FF9B04",
  },
});

const StyledTab = styled(({ children, ...rest }) => (
  <Tab disableRipple children={children} {...rest}></Tab>
))(({ theme }) => ({
  textTransform: "none",
  fontSize: "1.7rem",
  fontWeight: 600,
  marginRight: theme.spacing(1),
  color: "#fff",
  // "rgba(255, 255, 255, 0.7)",
  "&.Mui-selected": {
    color: "#37D42A",
    fontWeight: 700,
    fontSize: "1.7rem",
  },
  "&.Mui-focusVisible": {
    backgroundColor: "rgba(100, 95, 228, 0.32)",
  },
}));

function SettingsTab() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", background: "#fff", borderRadius: "2rem" }}>
      <Box>
        <StyledTabs
          scrollButtons={true}
          allowScrollButtonsMobile={true}
          value={value}
          variant="scrollable"
          onChange={handleChange}
          aria-label="user-tab"
        >
          <StyledTab label="Profile" iconPosition="start" icon={<Person />} />
          <StyledTab
            label="Account"
            iconPosition="start"
            icon={<AccountIcon />}
          />
          <StyledTab
            label="Privacy"
            iconPosition="start"
            icon={<PrivacyIcon />}
          />
          <StyledTab
            label="Notification"
            iconPosition="start"
            icon={<NotificationIcon />}
          />
        </StyledTabs>
        {/* <TabPane */}
        {value === 0 && <ProfileSetting />}
        {value === 1 && <Account />}
        {value === 2 && <Privacy />}
        {value === 3 && <Notifications />}
      </Box>
    </Box>
  );
}
export default SettingsTab;
