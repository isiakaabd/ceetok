import images from "assets";
import {
  Grid,
  Skeleton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useGetAdsQuery } from "redux/slices/adsSlice";
import { getImage } from "helpers";
const Advert = () => {
  const { obi } = images;
  const { data: allAds, isLoading } = useGetAdsQuery();

  return (
    <Grid
      item
      container
      // sx={{ paddingInline: { xs: "1rem", md: "4rem", overflowX: "scroll" } }}
    >
      <Grid
        item
        container
        gap={2}
        alignItems="center"
        sx={{ p: { md: 4, xs: 2 }, justifyContent: { md: "left" } }}
      >
        <Typography
          sx={{
            color: "#464646",
            textAlign: { md: "left", xs: "center" },
            fontSize: "3rem",
            fontWeight: 700,
          }}
        >
          Ads
        </Typography>
        <Link to="user/create-advert" style={{ color: "#0099FF" }}>
          <Typography sx={{ fontSize: "2rem" }}>Create Advert</Typography>
        </Link>
      </Grid>
      {isLoading ? (
        <Skeletons />
      ) : allAds?.ads?.length > 0 ? (
        <Grid
          item
          container
          // gap={2}
          display="grid"
          flexWrap="nowrap"
          sx={{
            overflowX: "scroll",
            gridAutoFlow: "column",
            gridAutoColumns: { md: "21%", xs: "90%" },
            overscrollBehaviorInline: "contain",
            scrollPaddingInline: { md: "1rem", xs: ".5rem" },
            scrollSnapType: "inline mandatory",
            "&::-webkit-scrollbar": {
              width: ".85rem",
              display: "none",
            },
            padding: { md: "2rem", xs: "1rem" },
          }}
          gap={{ md: 3, xs: 2 }}
        >
          {allAds?.ads?.map((item) => (
            <Grid item container sx={{ scrollSnapAlign: "start" }}>
              {item?.media?.map((i) => (
                <Link to={`/user/ads/${item?.slug}`} style={{ width: "100%" }}>
                  <img
                    loading="lazy"
                    src={
                      item?.media.length > 0 ? getImage(i?.storage_path) : obi
                    }
                    alt={item.title}
                    style={{
                      objectFit: "cover",
                      height: "100%",
                      inlineSize: "100%",
                      borderRadius: ".5rem",
                      aspectRatio: 16 / 9,
                    }}
                  />
                </Link>
              ))}
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="h2" sx={{ width: "100%" }} textAlign="center">
          No Ads yet
        </Typography>
      )}
    </Grid>
  );
};
function Skeletons() {
  const theme = useTheme();
  const breakpoint = useMediaQuery(
    theme.breakpoints.down("sm", { noSsr: true })
  );
  return (
    <Grid
      item
      container
      flexWrap={"nowrap"}
      overflow="hidden"
      gap={2}
      sx={{ p: { xs: 0, md: 4 } }}
    >
      {Array(breakpoint ? 3 : 7)
        .fill(undefined)
        .map((item, index) => (
          <Grid item xs={10} sm={8} md={4} key={index}>
            <Skeleton
              sx={{ height: "15rem", width: "100%" }}
              animation="wave"
              variant="rectangular"
            />
          </Grid>
        ))}
    </Grid>
  );
}
export default Advert;
