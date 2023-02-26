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

const Message = () => {
  // const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const ws = useMemo(() => new WebSocket("ws://3.80.211.23:5050"), []);
  console.log(messages);
  const { data: profile, isLoading } = useUserProfileQuery();

  const token = useSelector((state) => state.auth.token);

  // useEffect(() => {
  ws.addEventListener("open", () => {
    toast.success("Connection successful");
    ws.send(JSON.stringify({ type: "init", token }));
    ws.send(JSON.stringify({ type: "chat", token, limit: 20, offset: 1 })); // previous chat hiostory
    ws.send(
      JSON.stringify({
        type: "messages",
        token,
        chat_id: "7fa5e405-e67b-40b8-8a3b-d8768e69d2d4",
        limit: 20,
        offset: 0,
      })
    ); // load message related to certain chat

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
    console.log(JSON.parse(data));
    const { type, body } = JSON.parse(data);
    if (type === "messages") return setMessages(body?.messages.reverse());
  });
  // useEffect(() => {
  ws.onmessage = function ({ data }) {};

  //eslint-disable-next-line
  // }, []);

  if (isLoading) return <Skeleton />;

  const handleSubmit = async (values, { resetForm }) => {
    await ws.send(
      JSON.stringify({
        type: "send_message",
        token,
        // user_id: "20bd79b0-c2b1-4339-b14a-6559ef58713b",
        chat_id: "7fa5e405-e67b-40b8-8a3b-d8768e69d2d4",
        message: values.body,
      })
    );
    await ws.send(
      JSON.stringify({
        type: "messages",
        token,
        chat_id: "7fa5e405-e67b-40b8-8a3b-d8768e69d2d4",
        limit: 20,
        offset: 1,
      })
    );

    setTimeout(() => resetForm(), 400);
  };
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
            }}
          >
            {messages.length > 0 ? (
              messages?.map((message, index) => {
                return (
                  <SingleChat
                    messages={
                      message?.last_message?.message || message?.message
                    }
                    key={index}
                  />
                );
              })
            ) : (
              <Typography
                sx={{ textAlign: "center", width: "100%" }}
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
function SingleChat({ messages }) {
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
      sx={{
        my: 2,
        border: "1px solid #9B9A9A",
        borderRadius: "1rem",
        maxWidth: "max-content",
        marginLeft: "auto",
        width: { md: "45%", xs: "70%", sm: "60%" },
      }}
    >
      <ListItemText
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
