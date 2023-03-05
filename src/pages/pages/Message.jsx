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
import { MoreVertOutlined } from "@mui/icons-material";
import { Formik, Form } from "formik/dist";
import parse from "html-react-parser";
import Editor from "components/Quil";
import { Fragment, useEffect, useState } from "react";
import { CustomButton } from "components";
import { useSelector } from "react-redux";
import { useOtherUserProfileQuery } from "redux/slices/authSlice";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { getImage, getTimeMoment } from "helpers";
import Error from "./components/Error";

const Message = () => {
  const { id } = useParams();
  const [messages, setMessages] = useState([]);
  const [chats, setChats] = useState([]);

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
        console.log(JSON.parse(data));
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
        console.log(event.code);
        if (event.code !== 1000) {
          console.error(
            "WebSocket connection closed with error:",
            event.reason
          );
        }
      };

      socket.onerror = (event) => {
        console.log(event);
        // handle errors
      };
    }
    //eslint-disable-next-line
  }, [socket]);

  const handleSubmit = async (values, { resetForm }) => {
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
    } else {
      socket.send(
        JSON.stringify({
          type: "init_chat",
          token,
          user_id: id,
          message: values.body.trim(),
        })
      );
    }

    setTimeout(() => resetForm(), 500);
  };
  if (isLoading) return <Skeleton />;
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

        <Grid item container sx={{ height: "50vh", overflowY: "scroll" }}>
          <List
            dense
            sx={{
              p: { md: 2, xs: 1 },
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
          </List>
        </Grid>

        <Grid item container sx={{ p: { md: 4, xs: 1 } }}>
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
  const message = parse(messages?.message);
  console.log(getTimeMoment(messages?.last_activity));
  // const messageLength = messages.message.length;
  // const initial = 500;
  // const [count, setCount] = useState(initial);

  return (
    <ListItem
      disableGutters
      disablePadding
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
            <M message={message} />
            {/* {messageLength > initial && (
              <Typography
                onClick={() => {
                  if (messageLength - initial < initial) {
                    setCount(messageLength);
                  } else setCount(count + initial);
                }}
                sx={{ cursor: "pointer" }}
                color="error"
                variant="span"
              >
                ...Read More
              </Typography>
            )} */}
          </Fragment>
        }
      />
    </ListItem>
  );
}
const M = ({ message }) => {
  return message;
};

export default Message;
