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

const RightTab = ({ setCreatePost }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const posts = useSelector((state) => state.posts.posts);
  const [register, setRegister] = useState(false);
  const loginStatus = useSelector((state) => state.auth.auth);

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
        xs={12}
        sx={{
          background: "#fff",
          borderRadius: "2rem ",
          padding: "2rem",
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
                background: "#37D42A",
                fontSize: "1.2rem",
                paddingInline: "3rem",
                borderRadius: 25,
                color: "#fff",
                fontWeight: 600,
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
          </div>
          {/* <Formik initialValues={{ name: "filter" }}>
          <Form>
            <FormikControl
              control="selects"
              name="name"
              options={[
                {
                  label: "Male",
                  value: "Male",
                },
                {
                  label: "Female",
                  value: "Female",
                },
              ]}
              Icon={FilterListOutlined}
              placeholder="Filter"
            />
          </Form>
        </Formik> */}
          {/* <SelectDialog /> */}
          <Button
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
          </StyledMenu>
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
            return (
              <li>
                <ListItem
                  key={index}
                  button
                  component={Link}
                  to={`/post/${index}`}
                >
                  <ListItemText
                    disableTypography
                    sx={{
                      mr: "3rem !important",
                      color: "#000",
                      fontSize: "1.5rem",
                      fontWeight: 700,
                      display: {
                        md: "block",
                        xs: "none",
                        maxWidth: "max-content",
                      },
                    }}
                  >
                    {index}
                  </ListItemText>

                  <ListItemAvatar
                    sx={{
                      height: { md: "12rem", xs: "100%" },
                      width: { md: "11rem", xs: "5.3rem" },
                    }}
                  >
                    <Avatar
                      src={images.obi}
                      alt="obi"
                      variant="rounded"
                      sx={{ marginTop: 2, height: "100%", width: "100%" }}
                    />
                  </ListItemAvatar>

                  <List
                    item
                    container
                    direction="column"
                    sx={{
                      flex: { md: 3, xs: 1 },
                      mx: { md: 3, xs: 1 },
                    }}
                  >
                    <ListItemText
                      disableTypography
                      sx={{
                        background: "#FF9B04",
                        padding: ".5rem 1.4rem",
                        borderRadius: "2rem",
                        fontWeight: 700,
                        width: "max-content",
                        color: "#fff",
                        display: {
                          md: "block",
                          xs: "none",
                          maxWidth: "max-content",
                        },
                      }}
                    >
                      {post.category}
                    </ListItemText>
                    <ListItemText
                      disableTypography
                      sx={{
                        color: "#5F5C5C",
                        mt: { md: 2, xs: 1 },
                        fontSize: { md: "2rem", xs: "1.1rem" },
                        fontWeight: { md: 700, xs: 600 },
                      }}
                    >
                      {post.title}
                    </ListItemText>

                    <List
                      item
                      sx={{
                        display: "flex",
                        // gap: "2rem",
                        justifyContent: "space-between",
                        fontSize: { md: "1.2rem", xs: ".8rem" },
                        fontWeight: 400,
                      }}
                    >
                      <ListItemText disableTypography>
                        Joshual@gamil.com
                      </ListItemText>
                      <ListItemText disableTypography>15 Oct.2022</ListItemText>
                      <ListItemText disableTypography>8:39pm</ListItemText>
                      {/* <ListItem> */}
                      <Grid
                        item
                        sx={{
                          flexWrap: "nowrap",
                          alignItems: "center",
                          gap: 1,
                          display: { xs: "flex", md: "none" },
                        }}
                      >
                        <ListItemIcon sx={{ minWidth: 0 }}>
                          <RemoveRedEyeOutlined />
                        </ListItemIcon>
                        <ListItemText disableTypography primary={200} />
                      </Grid>
                      {/* </ListItem> */}
                    </List>
                  </List>
                  <Grid
                    sx={{
                      flex: { sm: 0, md: 1 },
                      alignItems: "center",
                      display: "flex",
                      justifyContent: "center",
                      marginLeft: "auto",
                    }}
                  >
                    <div
                      style={{
                        width: "2.4rem",
                        height: "2.4rem",
                        borderRadius: "50%",
                        backgroundColor: "#D3D3D3",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      {20}
                    </div>
                  </Grid>
                </ListItem>
              </li>
            );
          })}
          {/* // ) : (
          //   <Typography 
          //     fontSize={{ md: "3rem", sm: "2.5rem", xs: "2rem" }}
          //     textAlign="center"
          //   >
          //     No Post Yet
          //   </Typography>
          // )}*/}
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
