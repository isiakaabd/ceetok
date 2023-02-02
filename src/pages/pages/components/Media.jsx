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
const Media = (props) => {
  const [page, setPage] = useState(0);
  const { data, error, isLoading } = useAllMediaQuery(page);

  if (isLoading) return <Skeleton />;
  if (error) return "Something Went Wrong";
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
      {data?.media?.length > 0 ? (
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

Media.propTypes = {};

export default Media;
