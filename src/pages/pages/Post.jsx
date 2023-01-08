import {
  ChatBubbleOutline,
  FavoriteBorderOutlined,
  FilterList,
  FilterListOffOutlined,
  FilterOutlined,
  IosShareOutlined,
  MoreVertOutlined,
  Reply,
  ReplyAllOutlined,
  ReplyOutlined,
  ReportOutlined,
  SearchOutlined,
  TuneOutlined,
} from "@mui/icons-material";
import {
  Avatar,
  Button,
  Divider,
  Grid,
  IconButton,
  InputBase,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { Formik, Form } from "formik/dist";
import React from "react";
import { Link, useParams } from "react-router-dom";
import FormikControl from "validation/FormikControl";
import UserProfile from "./UserProfile";
import images from "assets";

const Details = () => {
  return (
    <List disablePadding sx={{ display: "flex", gap: 4 }}>
      <ListItem alignItems="center" disableGutters disablePadding>
        <ListItemButton disableGutters>
          <ListItemIcon sx={{ minWidth: 0 }}>
            <ReplyOutlined />
          </ListItemIcon>
          <ListItemText
            disableTypography
            primary="Reply"
            sx={{ minWidth: 0 }}
          />
        </ListItemButton>
      </ListItem>
      {/* 2 */}
      <ListItem alignItems="center" disableGutters disablePadding>
        <ListItemButton disableGutters>
          <ListItemIcon sx={{ minWidth: 0 }}>
            <FavoriteBorderOutlined />
          </ListItemIcon>
          <ListItemText
            disableTypography
            primary="Likes"
            sx={{ minWidth: 0 }}
          />
        </ListItemButton>
      </ListItem>
      <ListItem alignItems="center" disableGutters disablePadding>
        <ListItemButton disableGutters>
          <ListItemIcon sx={{ minWidth: 0 }}>
            <IosShareOutlined />
          </ListItemIcon>
          <ListItemText
            disableTypography
            primary="Share"
            sx={{ minWidth: 0 }}
          />
        </ListItemButton>
      </ListItem>
      <ListItem alignItems="center" disableGutters disablePadding>
        <ListItemButton disableGutters>
          <ListItemIcon sx={{ minWidth: 0 }}>
            <ReportOutlined />
          </ListItemIcon>
          <ListItemText
            disableTypography
            primary="Report Post"
            sx={{ whiteSpace: "nowrap" }}
          />
        </ListItemButton>
      </ListItem>
    </List>
  );
};
const Post = () => {
  const { postId } = useParams();

  return (
    <Grid
      item
      container
      sx={{ mb: 8, paddingInline: { xs: "1rem", md: "4rem" } }}
    >
      <Grid item container>
        <Grid item container alignItems="center" sx={{ my: 3 }}>
          <Button
            sx={{ mr: 2, border: "1px solid #37D42A", borderRadius: ".8rem" }}
            variant="outlined"
          >
            COMMENTS
          </Button>
          <Link style={{ textDecoration: "none" }}>
            <Typography color="rgba(55, 212, 42, 0.5)">
              Other Conversations
            </Typography>
          </Link>
        </Grid>
        <Grid
          item
          container
          alignItems="center"
          sx={{ backgroundColor: "#044402", borderRadius: ".7rem", py: 2.5 }}
          justifyContent="flex-end"
        >
          <Grid item xs={7}>
            <Formik initialValues={{ filter: "" }}>
              <Form style={{ width: "100%" }}>
                <Grid
                  item
                  container
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Grid item xs={6}>
                    <FormikControl
                      control="inputs"
                      name="filter"
                      borderRadius="1rem"
                      // color="#fff"
                      Icon={SearchOutlined}
                      order={2}
                      color={"#fff"}
                      buttonStyle={{ color: "#fff" }}
                      border="2px solid #fff"
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <FormikControl
                      control="selects"
                      name="filter"
                      borderRadius="1rem"
                      placeholder="filter"
                      Icon={FilterList}
                      order={2}
                      buttonStyle={{ color: "#fff" }}
                      border="2px solid #fff"
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
                    />
                  </Grid>
                  <Grid item xs={1}>
                    <TuneOutlined sx={{ fontSize: "3rem", color: "#fff" }} />
                  </Grid>
                </Grid>
              </Form>
            </Formik>
          </Grid>
        </Grid>
        {/* user Profile */}
        <Grid item xs={3} sx={{ my: 3 }}>
          <UserProfile />
        </Grid>
      </Grid>
      <Grid item xs={8}>
        <Grid
          container
          alignItems="center"
          justifyContent="space-between"
          flexWrap="nowrap"
        >
          <Typography
            color="secondary"
            fontSize="3rem"
            sx={{ whiteSpace: "nowrap" }}
            fontWeight="700"
          >
            Obi campaign shutsdown Kaduna
          </Typography>

          <Typography sx={{ color: "#FF9B04" }}>Follow</Typography>
        </Grid>
        <img src={images.obi2} style={{ width: "100%" }} alt="peter obi" />
        <Grid container item flexDirection="column" rowGap={2}>
          <Typography
            color="secondary"
            sx={{ fontWeight: 400, fontSize: "2rem", textAlign: "justify" }}
          >
            Tortor, lobortis semper viverra ac, molestie tortor laoreet amet
            euismod et diam quis aliquam consequat porttitor integer a nisl, in
            faucibus nunc et aenean turpis dui dignissim nec scelerisque
            ullamcorper eu neque, augue quam quis lacus pretium eros est amet
            turpis nunc in turpis massa et eget facilisis ante molestie
            penatibus dolor volutpat, porta pellentesque scelerisque at ornare
            dui tincidunt cras feugiat tempor lectus
          </Typography>
          <Typography
            color="secondary"
            sx={{ fontSize: "2.5rem" }}
            fontWeight={700}
          >
            Lorem ipsum dolor sit amet cons
          </Typography>
          <Typography
            color="secondary"
            sx={{ fontWeight: 400, fontSize: "2rem", textAlign: "justify" }}
          >
            dignissim nec scelerisque ullamcorper eu neque, augue quam quis
            lacus pretium eros est amet turpis nunc in turpis massa et eget
            facilisis ante molestie penatibus dolor volutpat, porta pellentesque
            scelerisque at ornare dui tincidunt cras feugiat tempor lectus
          </Typography>
        </Grid>
        <Grid item xs={7} sx={{ color: "#5F5C5C", mt: 3 }}>
          <Details />
          {/* <Grid
            item
            container
            justifyContent="space-between"
            alignItems="center"
            flexWrap="nowrap"
          >
            <Grid item>
              <Grid container alignItems="center">
                <ReplyOutlined />
                <Typography variant="span" sx={{ ml: 1 }}>
                  223
                </Typography>
              </Grid>
            </Grid>
            <Grid item>
              <Grid container alignItems="center">
                <FavoriteBorderOutlined />
                <Typography variant="span" sx={{ ml: 1 }}>
                  223
                </Typography>
              </Grid>
            </Grid>
            <Grid item>
              <Grid container alignItems="center">
                <IosShareOutlined />
                <Typography variant="span" sx={{ ml: 1 }}>
                  Share
                </Typography>
              </Grid>
            </Grid>
            <Grid item>
              <Grid container alignItems="center">
                <ReportOutlined />
                <Typography variant="span" sx={{ ml: 1 }}>
                  Report Post
                </Typography>
              </Grid>
            </Grid>
          </Grid> */}
        </Grid>
        <Divider flexItem sx={{ py: 2 }} />
      </Grid>
      <Grid item xs={5}>
        <Typography color="secondary" fontSize="2.5rem" fontWeight={700}>
          Comment
        </Typography>

        <List>
          <ListItem alignItems="flex-start" sx={{ width: "100%" }}>
            <ListItemAvatar>
              <Avatar alt="Remy Sharp">N</Avatar>
            </ListItemAvatar>
            <ListItemText disableTypography>
              <Typography fontWeight={700} color="#9B9A9A" fontSize="2rem">
                VictorAdeniji{" "}
                <Typography
                  variant="span"
                  color="#9B9A9A"
                  fontWeight={400}
                  fontSize="1.6rem"
                >
                  - 4th Nov, 2022 12:38pm
                </Typography>
              </Typography>
              <Typography
                color="secondary"
                fontWeight={600}
                fontSize={"1.8rem"}
              >
                Its time to for Change. THE NAN WE KNOW
              </Typography>
            </ListItemText>
            <ListItemButton sx={{ flex: 1 }}>
              <MoreVertOutlined />
            </ListItemButton>
          </ListItem>
        </List>
        <Grid item container xs={4}>
          <Details />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Post;
