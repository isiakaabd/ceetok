import { DeleteOutline } from "@mui/icons-material";
import {
  Avatar,
  Grid,
  Typography,
  IconButton,
  Skeleton,
  List,
  ListItemButton,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import Paginations from "components/modals/Paginations";
import { getImage } from "helpers";
import { useState } from "react";
import { Link } from "react-router-dom";
import parse from "html-react-parser";
import { useGetMentionsQuery } from "redux/slices/authSlice";
const Mentions = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useGetMentionsQuery({
    offset: page - 1,
  });
  if (isLoading) return <Skeletons />;

  const { mentions, total_pages } = data;

  return (
    <>
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
        <IconButton sx={{ ml: "auto" }}>
          <DeleteOutline sx={{ fontSize: "2rem" }} />
        </IconButton>
        <List dense>
          {mentions.map((item, index) => {
            const {
              parent: { comment, user, body, slug },
              parent_type,
            } = item;
            return (
              <ListItemButton
                alignItems="flex-start"
                item
                component={Link}
                to={`${parent_type === "posts" ? `/post/${slug}` : null}`}
                key={index}
              >
                <ListItemAvatar>
                  <Avatar src={getImage(user?.avatar)} alt={user?.full_name}>
                    {user?.full_name?.slice(0, 1).toUpperCase()}
                  </Avatar>
                </ListItemAvatar>

                <ListItemText
                  primaryTypographyProps={{
                    fontWeight: 600,

                    color: "color.text",
                    fontSize: { md: "1.8rem", xs: "1.4rem" },
                  }}
                  primary={
                    <>
                      <Typography variant="span">
                        {user?.full_name} mentioned{" "}
                      </Typography>
                      <Typography variant="span">
                        {`you in a ${
                          parent_type === "posts"
                            ? "post"
                            : parent_type === "comments"
                            ? "comment"
                            : parent_type
                        }.`}
                      </Typography>
                    </>
                  }
                  secondary={
                    <>
                      <Typography
                        variant="span"
                        fontWeight={500}
                        sx={{
                          width: "max-content",
                          fontSize: { md: "1.8rem", xs: "1.4rem" },
                        }}
                        className="likes-content"
                      >
                        {parse(comment || body || "something went wrong...")}
                      </Typography>
                    </>
                  }
                />
              </ListItemButton>
            );
          })}
        </List>

        {total_pages > 1 && (
          <Paginations page={page} setPage={setPage} count={total_pages} />
        )}
      </Grid>
    </>
  );
};

function Skeletons() {
  return (
    <Grid
      sx={{ px: 2, py: 4 }}
      item
      flexDirection={"column"}
      container
      gap={3}
      overflow={"hidden"}
    >
      <Grid item marginLeft="auto">
        <Skeleton
          sx={{ height: "2.5rem", width: "2rem" }}
          animation="wave"
          variant="rectangular"
        />
      </Grid>

      <Grid container flexDirection="column" sx={{ mt: 4 }} gap={2}>
        {Array(10)
          .fill(undefined)
          .map((item, index) => (
            <Grid item container key={index}>
              <Skeleton
                key={index}
                sx={{ height: "6rem", width: "100%" }}
                animation="wave"
                variant="rounded"
              />
            </Grid>
          ))}
      </Grid>
    </Grid>
  );
}

export default Mentions;
