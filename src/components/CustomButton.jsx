import { styled } from "@mui/material/styles";
import { ButtonBase } from "@mui/material";
import Loader from "./Loader";
const CustomButton = ({
  children,
  width,
  height,
  title,
  isSubmitting,
  background,
  fontSize,
  borderRadius,
  ...rest
}) => {
  const CustomBtn = styled(ButtonBase)(({ theme }) => ({
    background: background ? background : "#37D42A",
    display: "block",
    fontFamily: "Raleway",
    // padding: "1em 4em",
    width: width ? width : "10em",
    height: height ? height : "3em",
    borderRadius: borderRadius ? borderRadius : "2.5em",
    color: "#fff",
    fontSize: fontSize ? fontSize : "1.6rem",
    fontWeight: 700,
    "&:hover, &.Mui-focusVisible": {
      zIndex: 1,
    },
  }));

  return (
    <CustomBtn {...rest}>
      {!isSubmitting && title}

      {isSubmitting && <Loader size={20} color="info" />}
    </CustomBtn>
  );
};

export default CustomButton;
