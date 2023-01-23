import { useState } from "react";
import { styled } from "@mui/material/styles";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Box } from "@mui/material";
import Quotes from "./Quotes";
import Mentions from "./Mentions";
import Likes from "./Likes";
import Infractions from "./Infractions";
import Media from "./Media";
import About from "./About";
import Activities from "./Activities";

const StyledTabs = styled((props) => (
  <Tabs
    {...props}
    TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
  />
))({
  background: "rgba(217, 217, 217, 0.2)",
  color: "#9B9A9A",
  "& .MuiTabs-indicator": {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  "& .MuiTabs-indicatorSpan": {
    maxWidth: "100%",
    width: "100%",
    backgroundColor: "#FF9B04",
  },
});

const StyledTab = styled(({ children, ...rest }) => (
  <Tab disableRipple children={children} {...rest}></Tab>
))(({ theme }) => ({
  textTransform: "none",
  fontSize: "1.7rem",
  fontWeight: 600,
  marginRight: theme.spacing(1),
  color: "#9B9A9A",
  // "rgba(255, 255, 255, 0.7)",
  "&.Mui-selected": {
    color: "#5F5C5C",
    fontWeight: 700,
    fontSize: "1.7rem",
  },
  "&.Mui-focusVisible": {
    backgroundColor: "rgba(100, 95, 228, 0.32)",
  },
}));

function UserTab() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        width: "100%",
        borderRadius: "2rem",
      }}
    >
      <Box>
        <StyledTabs
          scrollButtons={true}
          allowScrollButtonsMobile={true}
          value={value}
          variant="scrollable"
          onChange={handleChange}
          aria-label="user-tab"
        >
          <StyledTab label="Activities" />
          <StyledTab label="About" />
          <StyledTab label="Media" />
          <StyledTab label="Infractions" />
          <StyledTab label="Likes" />
          <StyledTab label="Mention" />
          <StyledTab label="Quote" />
        </StyledTabs>
        {/* <TabPane */}
        {value === 6 && <Quotes />}
        {value === 5 && <Mentions />}
        {value === 4 && <Likes />}
        {value === 3 && <Infractions />}
        {value === 2 && <Media />}
        {value === 1 && <About />}
        {value === 0 && <Activities />}
      </Box>
    </Box>
  );
}
export default UserTab;
