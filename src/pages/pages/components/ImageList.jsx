import { getImage } from "helpers";
import { Grid, ImageListItem, ImageList } from "@mui/material";
import shadows from "@mui/material/styles/shadows";
import ReactPlayer from "react-player";

export default function MasonryImageList({ itemData }) {
  return (
    <Grid item container sx={{ maxHeight: "100%" }}>
      <ImageList
        sx={{
          width: "100%",
          overflow: "hidden",
          maxHeight: "100%",
          borderRadius: "1.2rem",
          padding: { xs: "1rem", md: "1.5rem" },
        }}
        variant="quilted"
        rowHeight={50}
        className="imageList"
      >
        {itemData.map((item) => (
          <ImageListItem
            sx={{
              width: "100%",
              maxHeight: "100%",
              boxShadow: shadows[2],
              padding: "1rem",
            }}
            key={item.id}
            className="imageList-item"
            rows={item.rows || 1}
          >
            {item.type === "image" ? (
              <img
                src={`${getImage(item?.storage_path)}`}
                style={{
                  width: "100%",
                  height: "10rem",
                  borderRadius: "1rem",
                }}
                alt={item.title}
                loading="lazy"
              />
            ) : (
              <ReactPlayer
                url={getImage(item?.storage_path)}
                controls={true}
                volume={0.6}
                width="100%"
                height="100%"
                // className="react-player"
                // style={{ maxheight: "10rem" }}
              />
            )}
          </ImageListItem>
        ))}
      </ImageList>
    </Grid>
  );
}
