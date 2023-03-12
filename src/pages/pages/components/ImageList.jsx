import { getImage } from "helpers";
import { Grid, ImageListItem, ImageList } from "@mui/material";
import shadows from "@mui/material/styles/shadows";

export default function MasonryImageList({ itemData }) {
  return (
    <Grid item container>
      <ImageList
        sx={{
          width: "100%",
          overflow: "hidden",
          height: "100%",
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
              height: "100%",
              boxShadow: shadows[2],
              padding: "1rem",
            }}
            key={item.id}
            className="imageList-item"
            rows={item.rows || 1}
          >
            <>
              <img
                src={`${getImage(item?.storage_path)}`}
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "1rem",
                }}
                alt={item.title}
                loading="lazy"
              />
            </>
          </ImageListItem>
        ))}
      </ImageList>
    </Grid>
  );
}
