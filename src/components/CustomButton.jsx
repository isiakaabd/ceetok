import { styled } from "@mui/material/styles";
import { ButtonBase } from "@mui/material";
const CustomButton = ({ children, ...rest }) => {
  const CustomBtn = styled(ButtonBase)(({ theme }) => ({
    background: "#37D42A",
    display: "block",
    fontFamily: "Raleway",
    padding: "1em 3em",
    borderRadius: "2em",
    color: "#fff",
    fontSize: "1.4rem",
    fontWeight: 700,
    "&:hover, &.Mui-focusVisible": {
      zIndex: 1,
    },
  }));

  return <CustomBtn {...rest}>{children}</CustomBtn>;
};

export default CustomButton;
