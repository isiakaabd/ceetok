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
import ArrowBack from "assets/svgs/ArrowBack";
import { useNavigate } from "react-router-dom";
import { Image } from "./components/SingleComment";
import { MoreVertOutlined } from "@mui/icons-material";
import { Formik, Form } from "formik/dist";
import Editor from "components/Quil";
import { Fragment, useEffect, useMemo, useState } from "react";
import { CustomButton } from "components";
import { useSelector } from "react-redux";
import { useUserProfileQuery } from "redux/slices/authSlice";
import { toast } from "react-toastify";

const Message = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const ws = useMemo(() => new WebSocket("ws://3.80.211.23:5050"), []);

  const { data: profile, isLoading } = useUserProfileQuery();

  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    ws.addEventListener("open", () => {
      toast.success("Connection successful");
      ws.send(JSON.stringify({ type: "init", token }));
      ws.send(JSON.stringify({ type: "chat", token, limit: 20, offset: 0 })); // previous chat hiostory

      //   ws.send(
      //     JSON.stringify({
      //       type: "messages",
      //       token,
      //       chat_id: "423956ec-f1f1-4ee6-addf-73f93a6da2f7",
      //       limit: 20,
      //       offset: 0,
      //     })
      //   );   // load message related to certain chat

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
  }, []);

  useEffect(() => {
    ws.onmessage = function ({ data }) {
      console.log(data);
      if (data.type === "chat") setMessages([...messages, data]);
    };
    //eslint-disable-next-line
  }, [messages]);
  if (isLoading) return <Skeleton />;

  // ws.onmessage
  //   ws.addEventListener("message", ({ data }) => {
  //     console.log(JSON.parse(data));
  //   });

  const handleSubmit = async (values, { resetForm }) => {
    ws.send(
      JSON.stringify({
        type: "init_chat",
        token,
        user_id: "20bd79b0-c2b1-4339-b14a-6559ef58713b",
        message: values.body,
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

        <Grid item container sx={{ height: "90%", overflowY: "scroll" }}>
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
              messages?.map((message, index) => (
                <SingleChat message={message} key={index} />
              ))
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
            <Form style={{ width: "100%" }}>
              <Grid item container flexDirection={"column"} gap={4}>
                <Grid item>
                  <Editor name="body" />
                </Grid>
                <Grid item>
                  <CustomButton title={"Send"} type="submit" />
                </Grid>
              </Grid>
            </Form>
          </Formik>
        </Grid>
      </Paper>
    </Grid>
  );
};
function SingleChat({ message }) {
  const initial = 500;
  const [count, setCount] = useState(initial);
  const [state, setState] = useState(message.slice(0, count));
  useEffect(() => {
    setState(message.slice(0, count));
  }, [count, message]);

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
