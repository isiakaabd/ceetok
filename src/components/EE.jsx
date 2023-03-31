import { styled } from "@mui/material/styles";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useGetCategoriesQuery } from "redux/slices/postSlice";
import {
  Menu,
  Button,
  Grid,
  ListItemButton,
  ListItemText,
  Skeleton,
} from "@mui/material";
import { Link } from "react-router-dom";
import CustomButton from "./CustomButton";
import { useState } from "react";

const StyledMenu = styled((props) => (
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
  },
}));

export default function CustomizedMenus() {
  const { data: categories, isLoading } = useGetCategoriesQuery();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  if (isLoading) return <Skeleton />;
  return (
    <div>
      <Button
        id="demo-customized-button"
        aria-controls={open ? "demo-customized-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        disableElevation
        disableTouchRipple
        disableRipple
        disableFocusRipple
        sx={{
          textTransform: "inherit",
          color: "#9B9A9A",
          bgcolor: "transparent",
          fontSize: "1.1rem",
          "&:hover": {
            bgcolor: "transparent",
          },
        }}
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
      >
        View All
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
        {categories?.slice(0, 5).map((item, index) => {
          return (
            <ListItemButton
              key={index}
              component={Link}
              alignItems="flex-start"
              to={`/posts/?category=${item.slug}`}
            >
              <ListItemText
                primary={item?.name}
                primaryTypographyProps={{
                  color: "text.primary",
                  fontWeight: 600,
                }}
              />
            </ListItemButton>
          );
        })}
        <Grid item p={2}>
          <CustomButton
            background="#636262"
            width="10rem"
            color="#fff"
            component={Link}
            to="/categories"
            fontWeight={700}
            fontSize={"1.2rem"}
            title="See More"
            borderRadius={".5rem"}
          />
        </Grid>
        {/* <MenuItem onClick={handleClose} disableRipple>
          <EditIcon />
          Edit
        </MenuItem> */}
      </StyledMenu>
    </div>
  );
}
