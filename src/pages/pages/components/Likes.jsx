import {
  Grid,
  IconButton,
  Typography,
  Skeleton,
  ListItem,
  ListItemButton,
  ListItemAvatar,
  ListItemText,
  List,
} from "@mui/material";
import parse from "html-react-parser";
import Thumb from "assets/svgs/Thumb";
import Paginations from "components/modals/Paginations";
import { useState } from "react";
import { useGetUsercontentLikeQuery } from "redux/slices/authSlice";
import { DeleteOutline } from "@mui/icons-material";

const Likes = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useGetUsercontentLikeQuery({ offset: page - 1 });
  if (isLoading) return <Skeleton />;
  console.log(data);
  const { total_pages, likes } = data;
  console.log(total_pages);
  return (
    <Grid
      item
      container
      sx={{
        mt: "2rem",
        py: 4,
        px: 2,
        borderRadius: "2rem",
        backgroundColor: "#fff",
      }}
      flexDirection="column"
    >
      <IconButton size="large" sx={{ alignSelf: "flex-end" }}>
        <DeleteOutline sx={{ fontSize: "3rem" }} />
      </IconButton>

      <List sx={{ maxWidth: "100%" }}>
        {likes?.map(({ parent, parent_type }) => {
          const likes = parent?.recent_likes?.map((like) => like?.full_name);

          return (
            <ListItem dense disableGutters>
              <ListItemButton dense alignItems="flex-start">
                <ListItemAvatar sx={{ minWidth: { md: "5rem", xs: "4rem" } }}>
                  <IconButton size="small" sx={{ border: "1px solid #9B9A9A" }}>
                    <Thumb sx={{ fontSize: "2rem" }} />
                  </IconButton>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography
                      color="color.text"
                      fontWeight={600}
                      component="p"
                      fontSize={{ md: "1.8rem", xs: "1.4rem" }}
                    >
                      {likes
                        ?.slice(0, likes.length >= 2 ? 2 : likes.length)
                        .join(", ")}{" "}
                      {` ${
                        likes?.length > 2
                          ? `and ${parent?.likes_count - 2} others`
                          : ""
                      } ${likes?.length >= 2 ? "like" : "likes"} your ${
                        parent_type === "posts"
                          ? "post"
                          : parent_type === "comments"
                          ? "comment"
                          : parent_type
                      }  `}
                    </Typography>
                  }
                  secondary={
                    <Typography
                      variant="span"
                      fontWeight={500}
                      sx={{
                        width: "max-content",
                        fontSize: { md: "1.8rem", xs: "1.4rem" },
                      }}
                      className="likes-content"
                    >
                      {parse(parent?.comment || parent?.body)}
                    </Typography>
                  }
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      <Paginations page={page} setPage={setPage} count={total_pages} />
    </Grid>
  );
};

export default Likes;
