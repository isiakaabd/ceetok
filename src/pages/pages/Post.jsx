import {
  ArrowBackOutlined,
  BookmarkAddRounded,
  ChatBubbleOutline,
  CopyAllRounded,
  CopyrightRounded,
  FacebookOutlined,
  FavoriteBorderOutlined,
  FilterList,
  IosShareOutlined,
  MailOutline,
  MailOutlineOutlined,
  MessageOutlined,
  MoreVertOutlined,
  Reply,
  Instagram,
  ReplyAllOutlined,
  ReplyOutlined,
  ReportOutlined,
  SearchOutlined,
  ShareOutlined,
  TuneOutlined,
} from "@mui/icons-material";
import {
  Avatar,
  Button,
  Divider,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { Formik, Form } from "formik/dist";
import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import FormikControl from "validation/FormikControl";
import UserProfile from "./UserProfile";
import images from "assets";
import Editor from "components/Quil";
import { CustomButton } from "components";
import OtherConversation from "./components/OtherConversation";
import NotificationModal from "components/modals/NotificationModal";
import Facebook from "assets/svgs/FacebookIcon";
import Messenger from "assets/svgs/Messenger";
import Twitter from "assets/svgs/Twitter";
import WhatsApp from "assets/svgs/WhatsApp";
import Copy from "assets/svgs/Copy";
import Save from "assets/svgs/Save";
import Share from "assets/svgs/Share";
import Mail from "assets/svgs/Mail";

const icons = [
  {
    title: "Reply",
    Icon: ReplyOutlined,
    link: "",
  },
  {
    title: "Likes",
    Icon: FavoriteBorderOutlined,
    link: "",
  },
  {
    title: "Share",
    Icon: IosShareOutlined,
    link: "",
  },
  {
    title: "Report Post",
    Icon: ReportOutlined,
    link: "",
  },
];
const socialItems = [
  {
    link: "",
    Icon: Facebook,
  },
  {
    link: "",
    Icon: Instagram,
  },
  {
    link: "",
    Icon: Twitter,
  },
  {
    link: "",
    Icon: WhatsApp,
  },
  {
    link: "",
    Icon: Messenger,
  },
];
const Comment = ({ handleShare }) => {
  return (
    <>
      <Grid
        item
        container
        // sx={{ my: 3, paddingInline: { xs: "1rem", md: "4rem" } }}
      >
        <Grid
          item
          container
          alignItems="center"
          sx={{
            backgroundColor: "#044402",
            borderRadius: { md: ".7rem", sm: 0 },
            py: 2,
            px: 1,
          }}
          justifyContent={{ md: "flex-end", xs: "flex-start" }}
        >
          <Grid item md={7} xs={12}>
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
                      height="4rem"
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
                      height="4rem"
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
                  <Grid item>
                    <IconButton>
                      <TuneOutlined sx={{ fontSize: "3rem", color: "#fff" }} />
                    </IconButton>
                  </Grid>
                </Grid>
              </Form>
            </Formik>
          </Grid>
        </Grid>
        {/* user Profile */}
        <Grid item md={4} xs={12} sm={6} sx={{ my: 3 }}>
          <UserProfile />
        </Grid>
      </Grid>
      <Grid
        item
        md={8}
        xs={12}
        sx={{ paddingInline: { xs: "1rem", md: "4rem" } }}
      >
        <Grid
          container
          sx={{
            mb: 2,
          }}
          alignItems="center"
          justifyContent="space-between"
          flexWrap="nowrap"
        >
          <Typography
            color="secondary"
            fontSize={{ md: "3rem", sm: "2rem", xs: "1.5rem" }}
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
            sx={{
              fontWeight: 400,
              fontSize: { md: "2rem", sm: "1rem" },
              textAlign: "justify",
            }}
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
            fontSize={{ md: "2.5rem", sm: "1.5rem" }}
            fontWeight={700}
          >
            Lorem ipsum dolor sit amet cons
          </Typography>
          <Typography
            color="secondary"
            sx={{
              fontWeight: 400,
              fontSize: { md: "2rem", sm: "1rem" },
              textAlign: "justify",
            }}
          >
            dignissim nec scelerisque ullamcorper eu neque, augue quam quis
            lacus pretium eros est amet turpis nunc in turpis massa et eget
            facilisis ante molestie penatibus dolor volutpat, porta pellentesque
            scelerisque at ornare dui tincidunt cras feugiat tempor lectus
          </Typography>
        </Grid>
        <Grid item md={7} xs={12} sx={{ color: "#5F5C5C", mt: 3 }}>
          <Details handleShare={handleShare} />
        </Grid>
        <Divider flexItem sx={{ py: 2 }} />
      </Grid>
      <Grid
        item
        md={7}
        xs={12}
        sx={{ paddingInline: { xs: "3rem", md: "4rem" } }}
        // sx={{ maxHeight: { xs: "10rem" }, overflowY: "scroll" }}
      >
        <Typography
          color="secondary"
          sx={{ my: 1 }}
          fontSize={{ md: "2.5rem", xs: "1.5rem" }}
          fontWeight={700}
        >
          Comment
        </Typography>
        <Grid
          item
          container
          sx={{
            maxHeight: { xs: "30rem" },
            overflowY: "scroll",
            "&::-webkit-scrollbar": {
              width: ".85rem",
              display: "none",
            },
          }}
        >
          {Array(20)
            .fill(undefined)
            .map((item, index) => (
              <Grid
                item
                container
                key={index}
                sx={{ mb: 2 }}
                flexWrap="nowrap"
                gap={2}
              >
                <Grid item alignSelf={{ xs: "center", md: "flex-start" }}>
                  <Avatar alt="Remy Sharp">N</Avatar>
                </Grid>
                <Grid item container flexDirection="column">
                  <Grid item container justifyContent="space-between">
                    <Typography
                      fontWeight={700}
                      color="#9B9A9A"
                      fontSize={{ md: "2rem", xs: "1.2rem" }}
                    >
                      Victor Adeniji{" "}
                      <Typography
                        variant="span"
                        color="#9B9A9A"
                        fontWeight={400}
                        fontSize={{ md: "1.6rem", xs: "1rem" }}
                      >
                        {" "}
                        - 4th Nov, 2022 12:38pm
                      </Typography>
                    </Typography>

                    <IconButton>
                      <MoreVertOutlined />
                    </IconButton>
                  </Grid>
                  <Typography
                    color="secondary"
                    fontWeight={600}
                    fontSize={{ md: "1.8rem", sm: "1.4rem" }}
                  >
                    Its time to for Change. THE NAN WE KNOW
                  </Typography>
                  <Grid container>
                    <Grid item md={8} sm={12}>
                      <Details />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            ))}
        </Grid>
      </Grid>
    </>
  );
};
const Details = ({ handleShare }) => {
  return (
    <Grid item container justifyContent="space-between" flexWrap="nowrap">
      {icons.map((icon) => (
        <Grid item key={icon.title}>
          <IconButton
            onClick={() => {
              if (icon.title === "Share") {
                handleShare();
              }
            }}
          >
            <icon.Icon />
          </IconButton>
          <Typography variant="span" sx={{ whiteSpace: "nowrap" }}>
            {icon.title}
          </Typography>
        </Grid>
      ))}
    </Grid>
  );
};
const Post = () => {
  const { postId } = useParams();
  const [state, setState] = useState(true);
  const [openShareModal, setOpenShareModal] = useState(false);
  const handleShare = () => {
    console.log(123);
    setOpenShareModal(true);
  };
  return (
    <>
      <Grid item container gap={2} flexWrap="nowrap">
        <Grid item xs={1} display={{ md: "block", xs: "none" }}>
          <Grid container justifyContent="center">
            <IconButton>
              <ArrowBackOutlined
                sx={{
                  fontSize: "3rem",
                  background: "#fff",
                  borderRadius: ".5rem",
                  color: "#9B9A9A",
                }}
              />
            </IconButton>
          </Grid>
        </Grid>
        <Grid
          item
          md={10}
          xs={12}
          sx={{
            mb: 8,
            mt: 2,
            pb: 3,
            background: "#fff",
            borderRadius: { md: "2rem", xs: 0 },
            // m: 2,
            mx: "auto",
          }}
        >
          <Grid item container>
            <Grid
              item
              container
              alignItems="center"
              sx={{ my: 3, paddingInline: { xs: "1rem", md: "4rem" } }}
            >
              <Button
                sx={{
                  mr: 4,
                  border: state ? "1px solid #37D42A" : "none",
                  borderRadius: state ? ".8rem" : "none",
                  color: state ? "#37D42A" : "rgba(55, 212, 42, 0.5)",
                  fontWeight: state ? 700 : 400,
                  ":hover,:focus": {
                    border: state ? "1px solid #37D42A" : "none",
                    background: "transparent",
                  },
                }}
                onClick={() => setState(true)}
                variant="outlined"

                // sx={{color:{state ? "success" : "rgba(55, 212, 42, 0.5)"}}
              >
                COMMENTS
              </Button>
              <Button
                onClick={() => setState(false)}
                sx={{
                  mr: 2,
                  border: !state ? "1px solid #37D42A" : "none",
                  borderRadius: !state ? ".8rem" : "none",
                  fontWeight: !state ? 700 : 400,
                  color: !state ? "#37D42A" : "rgba(55, 212, 42, 0.5)",
                  ":hover,:focus": {
                    border: !state ? "1px solid #37D42A" : "none",
                    background: "transparent",
                  },
                }}
                variant="outlined"
              >
                Other Conversation
              </Button>
            </Grid>
            {state ? (
              <Comment handleShare={handleShare} />
            ) : (
              <OtherConversation />
            )}
          </Grid>
          <Grid
            sx={{
              mt: { md: 3, xs: 1.5 },
              paddingInline: { xs: "1rem", md: "4rem" },
            }}
          >
            <Editor />

            <Grid
              item
              container
              sx={{ mt: 2 }}
              justifyContent="space-between"
              alignItems="center"
            >
              <Button
                variant="outlined"
                sx={{
                  color: "#9B9A9A",
                  borderColor: "inherit",
                  // border: "2px solid #9B9A9A",
                  fontSize: "1.2rem",
                  fontWeight: 700,
                  padding: ".8rem 2rem",
                  borderRadius: "3rem",
                }}
              >
                Cancel
              </Button>
              <CustomButton variant="contained" type="submit">
                Post
              </CustomButton>
            </Grid>
          </Grid>
          <Grid
            item
            container
            sx={{ mt: 2, paddingInline: { xs: "3rem", md: "6rem" } }}
          >
            <Typography
              variant="span"
              color="#FF9B04"
              fontSize={{ md: "1.8rem", xs: "1.5rem", fontWeight: 500 }}
            >
              Viewing this Topic
            </Typography>
            <Grid item>
              <Grid container>
                {Array(20)
                  .fill("Adekunle107")
                  .map((item, index) => (
                    <Typography
                      component={Link}
                      to={`/${index}`}
                      key={index}
                      sx={{ width: "max-content", mr: 0.5 }}
                      color="secondary"
                      fontSize={{ md: "1.8rem", xs: "1.5rem", fontWeight: 500 }}
                    >
                      {item}
                    </Typography>
                  ))}

                <Typography
                  variant="span"
                  color="#FF9B04"
                  fontSize={{ md: "1.8rem", xs: "1.5rem", fontWeight: 500 }}
                >
                  and 102 guests
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <NotificationModal
        isOpen={openShareModal}
        heading="Share Topic"
        width={{ md: "30vw", xs: "90vw", sm: "30vw" }}
        handleClose={() => setOpenShareModal(false)}
      >
        <Grid item container gap={2} flexDirection="column" sx={{ mt: 1 }}>
          <Grid item>
            <IconButton>
              <Mail sx={{ fontSize: "4rem", color: "#5F5C5C" }} />
            </IconButton>
            <Typography variant="span" fontSize="1.2rem" fontWeight={400}>
              Send Direct Message
            </Typography>
          </Grid>

          <Grid item container justifyContent="space-between">
            <Grid item>
              <IconButton sx={{ border: "1px solid #5F5C5C" }}>
                <Save sx={{ fontSize: "2.5rem" }} />
              </IconButton>
              <Typography
                textAlign="center"
                sx={{ fontSize: "1.1rem", fontWeight: 400 }}
              >
                Save
              </Typography>
            </Grid>
            <Grid item>
              <IconButton sx={{ border: "1px solid #5F5C5C" }}>
                <Copy sx={{ fontSize: "2.5rem" }} />
              </IconButton>
              <Typography
                textAlign="center"
                sx={{ fontSize: "1.1rem", fontWeight: 400 }}
              >
                Copy Link
              </Typography>
            </Grid>
            <Grid item>
              <IconButton sx={{ border: "1px solid #5F5C5C" }}>
                <Share sx={{ fontSize: "2.5rem" }} />
              </IconButton>
              <Typography
                textAlign="center"
                sx={{ fontSize: "1.1rem", fontWeight: 400 }}
              >
                Share Via
              </Typography>
            </Grid>
          </Grid>
          <Divider
            variant="middle"
            // sx={{ width: "100%", m: 0, borderWidth: "1.2px" }}
          />
          <Grid
            item
            container
            justifyContent="space-between"
            alignItems="center"
          >
            {socialItems.map((social) => (
              <IconButton>
                <social.Icon sx={{ fontSize: "3rem" }} />
              </IconButton>
            ))}
          </Grid>
        </Grid>
      </NotificationModal>
    </>
  );
};

export default Post;