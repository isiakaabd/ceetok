import {
  IconButton,
  Grid,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Paper,
  List,
  Typography,
  Skeleton,
} from "@mui/material";
// import ArrowBack from "assets/svgs/ArrowBack";
import { MoreVertOutlined } from "@mui/icons-material";
import { Formik, Form } from "formik/dist";
import parse from "html-react-parser";
import Editor from "components/Quil";
import { Fragment, useEffect, useMemo, useState } from "react";
import { CustomButton } from "components";
import { useSelector } from "react-redux";
import { useUserProfileQuery } from "redux/slices/authSlice";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

const Message = () => {
  // const navigate = useNavigate();
  const { id } = useParams();
  const [messages, setMessages] = useState([]);
  const [chats, setChats] = useState([]);
  const ws = useMemo(() => new WebSocket("ws://3.80.211.23:5050"), []);
  // const { data: profile, isLoading } = useUserProfileQuery();
  const checkChatHistory = chats?.filter((item) => item.user_id === id);
  const token = useSelector((state) => state.auth.token);
  const [chat_id, setChatId] = useState(null);
  // useEffect(() => {

  ws.addEventListener("open", () => {
    toast.success("Connection successful");
    ws.send(JSON.stringify({ type: "init", token }));
    ws.send(JSON.stringify({ type: "chat", token }));
    // ws.send(JSON.stringify({ type: "init_chat", token, user_id: id }));
    // ws.send(
    //   JSON.stringify({
    //     type: "init_chat",
    //     user_id: profile?.id,
    //     token,
    //     limit: 20,
    //     offset: 0,
    //   })
    // ); // previous chat hiostory
    // ws.send(
    //   JSON.stringify({
    //     type: "messages",
    //     token,
    //     limit: 20,
    //     offset: 0,
    //     user_id: id,
    //   })
    // ); // previous chat hiostory
    // ws.send(
    //   JSON.stringify({
    //     type: "init_chat",
    //     token,
    //     user_id: profile?.id,
    //     //  "7fa5e405-e67b-40b8-8a3b-d8768e69d2d4",
    //     limit: 20,
    //     offset: 0,
    //   })
    // ); // load message related to certain chat

    // ws.send(
    //   JSON.stringify({
    //     type: "send_message",
    //     token,
    //     message: "Just testing here...",
    //     chat_id: "423956ec-f1f1-4ee6-addf-73f93a6da2f7",
    //   })
    // );
  });
  //eslint-disable-next-line
  // }, []);
  ws.addEventListener("message", ({ data }) => {
    const { type, body } = JSON.parse(data);
    if (type === "messages") return setMessages(body?.messages.reverse());
    if (type === "chat" || type === "init_chat") return setChats(body?.chats);
  });

  // useEffect(() => {
  ws.onmessage = function ({ data }) {};

  //eslint-disable-next-line
  // }, []);

  // if (isLoading) return <Skeleton />;

  const handleSubmit = async (values, { resetForm }) => {
    if (checkChatHistory.length > 0) {
      const details = checkChatHistory[0];
      ws.send(
        JSON.stringify({
          type: "send_message",
          token,
          chat_id: details.id,
          message: values.body.trim(),
        })
      );

      await ws.send(
        JSON.stringify({
          type: "messages",
          token,
          limit: 20,
          offset: 1,
          chat_id: details.id,
        })
      );
    } else {
      ws.send(
        JSON.stringify({
          type: "init_chat",
          token,
          user_id: id,
          message: values.body.trim(),
        })
      );
    }
    // await ws.send(
    //   JSON.stringify({
    //     type: "send_message",
    //     token,
    //     // user_id: "20bd79b0-c2b1-4339-b14a-6559ef58713b",
    //     chat_id: "7fa5e405-e67b-40b8-8a3b-d8768e69d2d4",
    //     message: values.body,
    //   })
    // );
    // await ws.send(
    //   JSON.stringify({
    //     type: "messages",
    //     token,
    //     user_id: profile?.id,
    //     limit: 20,
    //     offset: 1,
    //   })
    // );

    setTimeout(() => resetForm(), 400);
  };
  console.log(messages);
  return (
    <Grid
      container
      item
      flexDirection="column"
      gap={3}
      sx={{
        p: { md: "4rem", xs: "1rem" },
        background: "#E5E5E5",
      }}
    >
      <Paper>
        <ListItem
          component="div"
          secondaryAction={
            <IconButton edge="end" aria-label="more-icon">
              <MoreVertOutlined />
            </IconButton>
          }
        >
          <ListItemAvatar>
            <Avatar>S</Avatar>
          </ListItemAvatar>
          <ListItemText primary="Sule Adekunle" />
        </ListItem>

        <Grid item container sx={{ height: "50vh", overflowY: "scroll" }}>
          <List
            dense
            sx={{
              p: 2,
              maxWidth: "100%",
              display: "flex",
              flexDirection: "column",
              width: "100%",
              mt: "auto",
            }}
          >
            {messages?.length > 0 ? (
              messages?.map((message, index) => {
                return (
                  <SingleChat
                    messages={
                      message?.last_message?.message || message?.message
                    }
                    id={id}
                    sender_id={message.sender_id}
                    key={index}
                  />
                );
              })
            ) : (
              <Typography
                sx={{
                  textAlign: "center",
                  justifySelf: "center",
                  width: "100%",
                }}
                variant="h2"
                color="success"
              >
                No Message Here, Be the First to Send Message
              </Typography>
            )}
          </List>
        </Grid>

        <Grid item container sx={{ p: 4 }}>
          <Formik initialValues={{ body: "" }} onSubmit={handleSubmit}>
            {({ isSubmitting }) => (
              <Form style={{ width: "100%" }}>
                <Grid item container flexDirection={"column"} gap={4}>
                  <Grid item>
                    <Editor name="body" />
                  </Grid>
                  <Grid item>
                    <CustomButton
                      title={"Send"}
                      isSubmitting={isSubmitting}
                      type="submit"
                    />
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </Grid>
      </Paper>
    </Grid>
  );
};
function SingleChat({ messages, id, sender_id }) {
  console.log(sender_id);
  const message = parse(messages);
  const counts = message.length;

  const initial = 500;
  const [count, setCount] = useState(initial);
  const [state, setState] = useState(
    message
    // ?.slice(0, counts < initial ? count : initial)
  );
  // useEffect(() => {
  //   setState(message);
  // }, [count, message]);

  return (
    <ListItem
      disableGutters
      sx={{
        "&.MuiListItem-root": {
          paddingInline: ".6rem",
        },

        my: ".5rem",
        border: "1px solid #9B9A9A",
        borderRadius: ".7rem",
        maxWidth: "max-content",

        marginLeft: sender_id === id ? null : "auto",
        backgroundColor: sender_id === id ? "#37D42A" : "#000",
        borderColor: sender_id === id ? "#37D42A" : "#000",
        color: "#fff",
        width: { md: "45%", xs: "70%", sm: "60%" },
      }}
    >
      <ListItemText
        primaryTypographyProps={{ fontWeight: 600 }}
        primary={
          <Fragment>
            {state}{" "}
            {message.length > initial && state.length !== message.length && (
              <Typography
                onClick={() => {
                  if (
                    message.length - (count + initial - 200) <
                    initial - 100
                  ) {
                    setCount(message.length);
                  } else setCount(count + initial);
                }}
                sx={{ cursor: "pointer" }}
                color="error"
                variant="span"
              >
                ...Read More
              </Typography>
            )}
          </Fragment>
        }
      />
    </ListItem>
  );
}

export default Message;
