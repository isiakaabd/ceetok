import { Grid, Button, List, Skeleton, Typography } from "@mui/material";
import { AddCircleOutline } from "@mui/icons-material";
import { useState } from "react";

import { useSelector } from "react-redux";
import RegisterModal from "components/modals/RegisterModal";

import SinglePosts from "./SinglePosts";
import Filters from "components/modals/Filters";
import LoginModal from "components/modals/LoginModal";
import { useGetPostQuery } from "redux/slices/postSlice";

const RightTab = ({ setCreatePost }) => {
  // const posts = useSelector((state) => state.posts.posts);
  const [register, setRegister] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const loginStatus = useSelector((state) => state.auth.token);
  const { data: array, error, isLoading } = useGetPostQuery("");

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

  if (isLoading) return <Skeleton />;
  if (error) return <p>Something went wrong...</p>;
  return (
    <>
      <Grid
        item
        container
        md={9}
        xs={11}
        sx={{
          borderRadius: "2rem ",
          padding: { md: "0", xs: "1rem" },
          marginInline: "auto",
        }}
        gap={2}
        flexDirection="column"
        alignItems="flex-start"
      >
        <Grid
          item
          container
          justifyContent="space-between"
          alignItems="center"
          flexWrap="nowrap"
          // sx={{ pb: 4, alignSelf: "flex-start" }}
        >
          <Button
            background={"#37D42A"}
            sx={{
              backgroundColor: "#37D42A",
              fontSize: { md: "1.9rem", xs: "1.4rem" },
              paddingInline: { md: "3rem", xs: "1.2rem" },
              borderRadius: 25,
              color: "#fff",
              fontWeight: 600,
              height: "100%",
              ":hover": {
                background: "#37D42A",
              },
            }}
            variant="contained"
            disableElevation
            startIcon={<AddCircleOutline />}
            onClick={handleCreatePost}
          >
            Create Post
          </Button>

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
        <Grid item container>
          {array.length > 0 ? (
            <List
              sx={{
                maxHeight: "100%",
                overflowY: "scroll",
                width: "100%",
                "&::-webkit-scrollbar": {
                  width: ".85rem",
                  display: "none",
                  background: "green",
                },
              }}
              xs={12}
            >
              {/* {posts.length > 0 ? ( */}
              {array.map((post, index) => {
                return <SinglePosts key={index} index={index} post={post} />;
              })}
            </List>
          ) : (
            <Typography variant="h2">No Data yet</Typography>
          )}
        </Grid>
      </Grid>
      {register && (
        <LoginModal handleClose={() => setRegister(false)} isLogin={register} />
      )}
    </>
  );
};

export default RightTab;
