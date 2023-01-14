import images from "assets";
import {
  Grid,
  Button,
  Divider,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  MenuItem,
  FormControlLabel,
  Typography,
  Menu,
  List,
  ListItemText,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemIcon,
} from "@mui/material";
import {
  Add,
  AddCircleOutline,
  Filter,
  Filter1,
  Filter1Outlined,
  Filter2Outlined,
  Filter5Outlined,
  FilterList,
  FilterListOutlined,
  RemoveRedEyeOutlined,
} from "@mui/icons-material";
import { Formik, Form } from "formik/dist";
import { useState } from "react";
import { StyledMenu } from "pages/Announcement";
import { useSelector } from "react-redux";
import RegisterModal from "components/modals/RegisterModal";
import { Link } from "react-router-dom";
import SinglePosts from "./SinglePosts";
import Filters from "components/modals/Filters";

const RightTab = ({ setCreatePost }) => {
  const posts = useSelector((state) => state.posts.posts);
  const [register, setRegister] = useState(false);
  const loginStatus = useSelector((state) => state.auth.auth);
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleCreatePost = () => {
    if (!loginStatus) {
      setRegister(true);
    } else {
      setCreatePost(true);
    }
  };
  const array =
    posts.length > 0
      ? posts
      : Array(20).fill({
          title:
            "Obi campaign shutsdown Kaduna and path ways for North Eastern Collaboration",
          category: "Politics",
        });

  return (
    <>
      <Grid
        item
        container
        md={9}
        xs={11}
        sx={{
          borderRadius: "2rem ",
          padding: { md: "2rem", xs: "1rem" },
          marginInline: "auto",
        }}
      >
        <Grid
          item
          container
          justifyContent="space-between"
          alignItems="center"
          flexWrap="nowrap"
          sx={{ pb: 4, alignSelf: "flex-start" }}
        >
          <div>
            <Button
              sx={{
                backgroundColor: "#37D42A",
                fontSize: { md: "1.2rem", xs: "1rem" },
                paddingInline: { md: "3rem", xs: "1rem" },
                borderRadius: 25,
                color: "#fff",
                fontWeight: 600,
                // ":hover": {
                //   background: "#37D42A",
                // },
              }}
              variant="contained"
              disableElevation
              startIcon={<AddCircleOutline />}
              onClick={handleCreatePost}
            >
              Create Post
            </Button>
          </div>
          <Filters
            anchorEl={anchorEl}
            setAnchorEl={setAnchorEl}
            open={open}
            handleClick={handleClick}
            handleClose={handleClose}
          />
          {/* <Button
            id="demo-customized-button"
            aria-controls={open ? "demo-customized-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            variant="outlined"
            disableElevation
            sx={{ borderRadius: 25, paddingInline: "3rem", fontSize: "1.2rem" }}
            onClick={handleClick}
            startIcon={<FilterList />}
          >
            Filter
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
            <Grid container flexWrap="nowrap" sx={{ p: 2 }}>
              <Grid item container>
                <FormControl>
                  <FormLabel id="demo-radio-buttons-group-label">
                    Time
                  </FormLabel>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="female"
                    name="radio-buttons-group"
                  >
                    <FormControlLabel
                      value="All Time"
                      control={<Radio />}
                      label="All Time"
                    />
                    <FormControlLabel
                      value="Today"
                      control={<Radio />}
                      label="Today"
                    />
                    <FormControlLabel
                      value="Last Week"
                      control={<Radio />}
                      label="Last Week"
                    />
                    <FormControlLabel
                      value="Last Month"
                      control={<Radio />}
                      label="Last Month"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Divider orientation="vertical" flexItem xsx={{ p: 2 }} />
              <Grid item container>
                <FormControl sx={{ px: 2 }}>
                  <FormLabel id="demo-radio-buttons-group-label">
                    Show
                  </FormLabel>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="All"
                    name="radio-buttons-group"
                  >
                    <FormControlLabel
                      value="All"
                      control={<Radio />}
                      label="All"
                    />
                    <FormControlLabel
                      value="Discussion only"
                      control={<Radio />}
                      label="Discussion only"
                    />
                    <FormControlLabel
                      value="Photo only"
                      control={<Radio />}
                      label="Photo only"
                    />
                    <FormControlLabel
                      value="Photo only"
                      control={<Radio />}
                      label="Photo only"
                    />
                    <FormControlLabel
                      value="Videos only"
                      control={<Radio />}
                      label="Videos only"
                    />
                    <FormControlLabel
                      value="Links only"
                      control={<Radio />}
                      label="Links only"
                    />
                    <FormControlLabel
                      value="Polls only"
                      control={<Radio />}
                      label="Polls only"
                    />
                    <FormControlLabel
                      value="Events only"
                      control={<Radio />}
                      label="Events only"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
            </Grid>
          </StyledMenu> */}
          {/* <MenuItem>Hello</MenuItem>
        </Select> */}
        </Grid>
        <List
          sx={{
            maxHeight: "80rem",
            overflowY: "scroll",
            "&::-webkit-scrollbar": {
              width: ".85rem",
              display: "none",
            },
          }}
          xs={12}
        >
          {/* {posts.length > 0 ? ( */}
          {array.map((post, index) => {
            return <SinglePosts key={index} post={post} />;
          })}
        </List>
      </Grid>
      {register && (
        <RegisterModal
          handleClose={() => setRegister(false)}
          isOpen={register}
        />
      )}
    </>
  );
};

export default RightTab;
