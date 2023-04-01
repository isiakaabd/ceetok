import {
  Typography,
  Grid,
  Skeleton,
  List,
  ListItem,
  ListItemButton,
  IconButton,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import { useState } from "react";
import { useGetInfractionsQuery } from "redux/slices/authSlice";
import Error from "./Error";
import Paginations from "components/modals/Paginations";
import { ReportOffOutlined } from "@mui/icons-material";
import parse from "html-react-parser";
import { getParent, getTimeMoment } from "helpers";
const Infractions = (props) => {
  const [page, setPage] = useState(1);
  const { data, error, isLoading } = useGetInfractionsQuery({
    offset: page - 1,
  });
  if (isLoading) return <Skeletons />;
  if (error) return <Error />;
  const { total_pages, reports } = data;
  console.log(data);
  return (
    <Grid item container sx={{ p: 4 }}>
      {reports?.length > 0 ? (
        <List sx={{ width: "100%" }}>
          {reports?.map(
            ({ parent, reason, yellow_card, parent_type, createdAt }) => {
              // const likes = parent?.recent_likes?.map((like) => like?.full_name);

              return (
                <ListItemButton
                  disableTouchRipple
                  dense
                  alignItems="flex-start"
                >
                  <ListItem
                    dense
                    disableGutters
                    disablePadding
                    secondaryAction={
                      <Typography
                        variant="h5"
                        fontWeight={600}
                        sx={{ display: { xs: "none", md: "block" } }}
                      >
                        {yellow_card
                          ? "Yellow card(Warning!!"
                          : "No Action yet"}
                      </Typography>
                    }
                  >
                    <ListItemIcon sx={{ minWidth: { md: "5rem", xs: "4rem" } }}>
                      <IconButton
                        size="small"
                        sx={{ border: "1px solid #9B9A9A" }}
                      >
                        <ReportOffOutlined sx={{ fontSize: "2rem" }} />
                      </IconButton>
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Grid
                          item
                          container
                          // variant="span"
                          // fontWeight={500}
                          gap={1}
                          sx={{
                            width: "100%",
                            //   fontSize: { md: "1.8rem", xs: "1.4rem" },
                          }}
                          // cla ssName="likes-content"
                        >
                          <Typography variant="p">{`Your ${getParent(
                            parent_type
                          )}`}</Typography>

                          <Typography
                            variant="span"
                            fontWeight={700}
                            className="likes-content"
                          >
                            {parse(
                              parent?.comment || parent?.post || "Something"
                            )}
                          </Typography>
                          <Typography variant="p">was reported as</Typography>
                          <Typography
                            variant="span"
                            fontWeight={700}
                            className="likes-content"
                          >
                            {"  "}
                            {parse(reason)}
                          </Typography>
                        </Grid>
                      }
                      secondary={
                        <>
                          <Typography variant="h6">
                            {getTimeMoment(createdAt)}
                          </Typography>
                          <Typography
                            variant="h5"
                            fontWeight={600}
                            sx={{ display: { md: "none" } }}
                          >
                            {yellow_card
                              ? "Yellow card(Warning!!"
                              : "No Action yet"}
                          </Typography>
                        </>
                      }
                    />
                  </ListItem>
                </ListItemButton>
              );
            }
          )}
        </List>
      ) : (
        <Typography variant="h2" sx={{ width: "100%", textAlign: "center" }}>
          You do not have any infraction
        </Typography>
      )}
      <Typography
        variant="secondary"
        fontSize="2rem"
        fontWeight={700}
      ></Typography>

      {total_pages.length > 1 && (
        <Paginations page={page} setPage={setPage} count={total_pages} />
      )}
    </Grid>
  );
};

Infractions.propTypes = {};

export default Infractions;
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
        {Array(7)
          .fill(undefined)
          .map((item, index) => (
            <Grid item container flexWrap="nowrap" alignItems="center">
              <Grid item>
                <Skeleton
                  key={index}
                  sx={{ height: "5rem", width: "5rem" }}
                  animation="wave"
                  variant="circular"
                />
              </Grid>
              <Grid item container sx={{ ml: 1 }}>
                <Skeleton
                  key={index}
                  sx={{ height: "6rem", width: "100%" }}
                  animation="wave"
                  variant="text"
                />
              </Grid>
            </Grid>
          ))}
      </Grid>
    </Grid>
  );
}
