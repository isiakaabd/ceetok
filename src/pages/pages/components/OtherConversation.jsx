import React from "react";
import { Grid, List, Typography } from "@mui/material";
import SinglePosts from "pages/home/SinglePosts";
import { useSelector } from "react-redux";
const OtherConversation = () => {
  const posts = useSelector((state) => state.posts.posts);
  const array =
    posts.length > 0
      ? posts
      : Array(20).fill({
          title:
            "Obi campaign shutsdown Kaduna and path ways for North Eastern Collaboration",
          category: "Politics",
        });

  return (
    <Grid item container>
      <Grid
        item
        container
        alignItems="center"
        sx={{
          backgroundColor: "#FF9B04",
          borderRadius: { md: ".7rem", sm: 0 },
          py: 2,
          px: 1,
        }}
      >
        <Typography
          sx={{
            fontSize: { md: "3rem", xs: "2.3rem" },
            fontWeight: 600,
            color: "#fff",
          }}
        >
          Politics
        </Typography>
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
        {array.map((post, index) => {
          return (
            <SinglePosts
              key={index}
              post={post}
              display={{ xs: "none", md: "flex" }}
            />
          );
        })}
      </List>
    </Grid>
  );
};

export default OtherConversation;
