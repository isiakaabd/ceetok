import {
  Avatar,
  Grid,
  IconButton,
  Checkbox,
  Typography,
  Skeleton,
} from "@mui/material";
import { useAllMediaQuery } from "redux/slices/authSlice";
import Paginations from "components/modals/Paginations";
import { useState } from "react";
import { DeleteOutline } from "@mui/icons-material";
import { getImage } from "helpers";
import Error from "./Error";
const Media = () => {
  const [page, setPage] = useState(0);
  const { data, error, isLoading } = useAllMediaQuery(page);

  if (isLoading) return <Skeletons />;
  if (error) return <Error />;
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
      <Grid item sx={{ mb: 4, mt: 2 }}>
        <Grid container alignItems="center" gap={0.5}>
          <IconButton edge="start" size="small">
            <DeleteOutline sx={{ fontSize: "2rem" }} />
          </IconButton>

          <Typography
            fontSize="2rem"
            fontWeight={400}
            lineHeight={2}
            color="secondary"
          >
            Delete All
          </Typography>
          <IconButton edge="start" size="small">
            <Checkbox
              defaultChecked
              sx={{
                "& .MuiSvgIcon-root": { fontSize: "2rem", color: "#9B9A9A" },
              }}
            />
          </IconButton>
        </Grid>
      </Grid>
      {isLoading ? (
        <Skeletons />
      ) : data?.media?.length > 0 ? (
        <Grid item container gap={2}>
          {data?.media?.map((item, index) => (
            <Avatar
              key={index}
              src={getImage(item?.storage_path)}
              sx={{ height: "8rem", width: "10rem", objectFit: "contain" }}
              variant="square"
            />
          ))}
        </Grid>
      ) : (
        <Typography variant="h2" width="100%" textAlign="center">
          No Data yet
        </Typography>
      )}

      <Paginations page={page} setPage={setPage} count={data?.total_pages} />
    </Grid>
  );
};

function Skeletons() {
  return (
    <Grid
      item
      container
      gap={2}
      display="grid"
      gridTemplateColumns={{ md: "repeat(3,1fr)", xs: "repeat(2,1fr)" }}
      sx={{ background: "#fff", borderRadius: "1rem", px: 3, py: 5 }}
    >
      {Array(12)
        .fill(undefined)
        .map((_, index) => (
          <Grid item key={index}>
            <Skeleton
              sx={{ height: "10rem", width: "100%" }}
              animation="wave"
              variant="rounded"
            />
          </Grid>
        ))}
    </Grid>
  );
}

export default Media;
