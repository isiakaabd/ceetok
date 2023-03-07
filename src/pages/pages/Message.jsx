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
  Toolbar,
  AppBar,
} from "@mui/material";
import { MoreVertOutlined, SendOutlined } from "@mui/icons-material";
import { Formik, Form } from "formik/dist";
import parse from "html-react-parser";
import Editor from "components/Quil";
import { useEffect, useRef, useState } from "react";

import { useSelector } from "react-redux";
import { useOtherUserProfileQuery } from "redux/slices/authSlice";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { getImage, getTimeMoment } from "helpers";
import Error from "./components/Error";
import * as Yup from "yup";
import { useQuill } from "react-quilljs";
const validationSchema = Yup.object({
  body: Yup.string("Enter Your Message").required("Required"),
});
const Message = () => {
  const ref = useRef(null);
  const { quill, quillRef } = useQuill();
  const { id } = useParams();
  const [messages, setMessages] = useState([]);

  const [chats, setChats] = useState(null);

  const [socket, setSocket] = useState(null);
  const { data: profile, isLoading, error } = useOtherUserProfileQuery(id);
  const token = useSelector((state) => state.auth.token);
  const checkChatHistory = chats?.filter((item) => item.user_id === id);

  useEffect(() => {
    // Create a new WebSocket instance when the component mounts
    const newSocket = new WebSocket(process.env.REACT_APP_BASE_URL_CHAT);
    setSocket(newSocket);

    // Close the WebSocket connection when the component unmounts
    return () => newSocket.close();
  }, []);

  useEffect(() => {
    if (socket) {
      socket.addEventListener("open", () => {
        toast.success("Connection successful");
        socket.send(JSON.stringify({ type: "init", token }));
        socket.send(JSON.stringify({ type: "chat", token }));

        socket.send(
          JSON.stringify({
            type: "messages",
            token,
            limit: 20,
            offset: 0,
            chat_id: id,
          })
        );
      });
      socket.onmessage = ({ data }) => {
        const { type, body, messages: mess } = JSON.parse(data);

        if (type === "messages") return setMessages(body?.messages?.reverse());
        if (type === "message") {
          const newArr = mess.reverse();
          setMessages([...newArr]);
        }
        if (type === "send_message") {
          const message = body.messages.reverse();

          setMessages([...message]);
        }
        // return setMessages([...messages,body?.messages.reverse()]);
        if (type === "chat") return setChats(body?.chats);
        if (type === "init_chat") {
          const x = body?.chats?.find((item) => item.reciever_id === id);
          return setMessages(x?.last_message);
        }
        // const data = JSON.parse(event.data);
        // handle incoming data
      };
      // Handle WebSocket errors
      socket.onclose = (event) => {
        if (event.code !== 1000) {
          console.error(
            "WebSocket connection closed with error:",
            event.reason
          );
        }
      };

      socket.onerror = (event) => {
        console.error(event);
        // handle errors
      };
    }
    //eslint-disable-next-line
  }, [socket]);
  useEffect(() => {
    if (chats && checkChatHistory?.length === 0) {
      socket.addEventListener("open", () => {
        socket.send(
          JSON.stringify({
            type: "init_chat",
            token,
            user_id: id,
            message: `<h4> Welcome to Ceektok </h4>`,
          })
        );
      });
    }
    //eslint-disable-next-line
  }, [socket, chats]);

  const handleSubmit = async (values, props) => {
    console.log(props);
    if (checkChatHistory?.length > 0) {
      const details = checkChatHistory[0];
      socket.send(
        JSON.stringify({
          type: "send_message",
          token,
          chat_id: details?.id,
          message: values.body.trim(),
        })
      );
      // quill.setContents([{ insert: "\n" }]);
      props.setFieldValue("body", "");
      setTimeout(() => props.resetForm(), 500);
    }

    //  else {
    //   socket.send(
    //     JSON.stringify({
    //       type: "init_chat",
    //       token,
    //       user_id: id,
    //       message: values.body.trim(),
    //     })
    //   );
    // }
  };
  const scrollToBottom = () => {
    ref?.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  if (isLoading) return <Skeletons />;
  if (error) return <Error />;
  const { avatar, full_name, last_activity } = profile;
  const time = getTimeMoment(last_activity);

  return (
    <Grid
      container
      item
      flexDirection="column"
      gap={3}
      sx={{
        p: { md: "4rem", xs: "1rem" },
        pb: 0,
        background: "#E5E5E5",
      }}
    >
      <Paper sx={{ maxWidth: "100%", position: "relative" }}>
        <AppBar
          position="sticky"
          sx={{
            bottom: "auto",
            background: "#f0f2f5",
            color: "#111b21",
            top: 0,
          }}
        >
          <Toolbar>
            <ListItem
              component="div"
              secondaryAction={
                <IconButton edge="end" aria-label="more-icon">
                  <MoreVertOutlined />
                </IconButton>
              }
            >
              <ListItemAvatar>
                <Avatar src={getImage(avatar)} alt={full_name}>
                  {full_name?.slice(0, 1).toUpperCase()}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={<Typography variant="h4">{full_name}</Typography>}
                secondary={
                  <Typography variant="h6">
                    {time === "now" ? "Status:" : "Last Seen: "}
                    {time === "now" ? ` Online` : `${time} ago`}
                  </Typography>
                }
              />
            </ListItem>
          </Toolbar>
        </AppBar>

        <Grid
          item
          container
          flexDirection={"column"}
          sx={{ height: "90vh", overflowY: "scroll" }}
        >
          <List
            dense
            sx={{
              p: { md: 2, xs: 1 },
              py: 1,
              overflowWrap: "anywhere",
              wordWrap: "wrap",
              maxWidth: "100%",
              width: "100%",
              background: "#efeae2",
              display: "flex",
              flexDirection: "column",

              mt: "auto",
            }}
          >
            {messages?.length > 0 ? (
              messages?.map((message, index) => {
                return (
                  <SingleChat
                    messages={message}
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
            <div ref={ref} style={{ background: "#efeae2" }} />
          </List>
        </Grid>
        <AppBar
          position="sticky"
          sx={{ top: "auto", background: "#f0f2f5", bottom: 0 }}
        >
          <Toolbar>
            <Grid item container sx={{ p: { md: 2, xs: 1 } }}>
              <Formik
                initialValues={{ body: "" }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                <Form style={{ width: "100%" }}>
                  <Grid
                    item
                    container
                    alignItems="center"
                    gap={{ md: 4, xs: 1 }}
                  >
                    <Grid item flex={1}>
                      <Editor name="body" value="" />
                    </Grid>
                    <Grid item>
                      <IconButton
                        siz={{ md: "large", xs: "small" }}
                        type="submit"
                        role="button"
                      >
                        <SendOutlined
                          sx={{ fontSize: { md: "3rem", xs: "2rem" } }}
                        />
                      </IconButton>
                    </Grid>
                  </Grid>
                </Form>
              </Formik>
            </Grid>
          </Toolbar>
        </AppBar>
      </Paper>
    </Grid>
  );
};
function SingleChat({ messages, id, sender_id }) {
  const { createdAt, message: mess } = messages;
  const message = parse(mess);
  return (
    <ListItem
      disableGutters
      disablePadding
      sx={{
        "&.MuiListItem-root": {
          paddingInline: ".6rem",
        },
        boxShadow: "0 1px .5px rgba(11,20,26,.13)",
        my: ".5rem",
        border: "1px solid #9B9A9A",
        borderRadius: ".7rem",
        maxWidth: "max-content",

        marginLeft: sender_id === id ? null : "auto",
        backgroundColor: sender_id === id ? "#fff" : "#d9fdd3",
        borderColor: sender_id === id ? "#fff" : "#d9fdd3",
        color: "#11b211",
        width: { md: "45%", xs: "70%", sm: "60%" },
      }}
    >
      <ListItemText
        primaryTypographyProps={{ fontWeight: 600, color: "#11b211" }}
        primary={
          <Grid item container gap={1}>
            <M message={message} />
            <Typography
              fontSize={"1rem"}
              sx={{
                ml: "auto",
                color: "#667781",
                pl: 1,
                alignSelf: "flex-end",
              }}
            >
              {getTimeMoment(createdAt)}
            </Typography>
          </Grid>
        }
      />
    </ListItem>
  );
}
const M = ({ message }) => {
  return <p className="chat-message">{message}</p>;
};
function Skeletons() {
  return (
    <Grid item container sx={{ p: 3, width: "100%" }}>
      <Grid item container gap={1} flexDirection="column">
        <Grid item container flexWrap="nowrap">
          <Grid item sx={{ mr: 1 }}>
            <Skeleton
              variant="circular"
              sx={{ height: "5rem", width: "5rem" }}
            />
          </Grid>
          <Grid item flex={1}>
            <Grid item container flexDirection="column">
              <Skeleton variant="text" sx={{ height: "1rem", width: "20%" }} />
              <Skeleton variant="text" sx={{ height: ".9rem", width: "15%" }} />
            </Grid>
          </Grid>
          <Grid item sx={{ ml: "auto" }}>
            <Grid item container gap={0.01} flexDirection={"column"}>
              <Grid item>
                <Skeleton
                  variant="circular"
                  sx={{ height: ".5rem", width: ".5rem" }}
                />
              </Grid>
              <Grid item>
                <Skeleton
                  variant="circular"
                  sx={{ height: ".5rem", width: ".5rem" }}
                />
              </Grid>
              <Grid item>
                <Skeleton
                  variant="circular"
                  sx={{ height: ".5rem", width: ".5rem" }}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid item container flexDirection="column">
          {Array(18)
            .fill(undefined)
            .map((_, index) => (
              <Grid item key={index}>
                <Skeleton
                  variant="text"
                  sx={{ height: ".8rem", width: "100%" }}
                />
              </Grid>
            ))}
          <Grid item container flexDirection="column">
            <Skeleton variant="text" sx={{ height: "30rem", width: "100%" }} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
export default Message;
