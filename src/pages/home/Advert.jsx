import images from "assets";
import { Grid, Skeleton, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useGetAdsQuery } from "redux/slices/adsSlice";
import { link } from "helpers";
const Advert = () => {
  const { image01, image02, image03 } = images;
  const { data: allAds, isLoading } = useGetAdsQuery();
  const imgArr = [image01, image02, image03];
  console.log(allAds);
  if (isLoading) return <Skeleton />;
  return (
    <Grid item container sx={{ paddingInline: { xs: "1rem", md: "4rem" } }}>
      <Grid
        item
        container
        gap={2}
        alignItems="center"
        sx={{ p: { md: 4, xs: 0 }, justifyContent: { md: "left" } }}
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
      {allAds.ads?.length > 0 ? (
        <Grid
          item
          container
          // gap={2}
          justifyContent="space-between"
          flexWrap={"nowrap"}
        >
          {allAds?.ads?.map((item) => (
            <Grid item xs={3.8}>
              {console.log(item)}
              <img
                src={`${link}${item.media[0]?.storage_path}`}
                alt={item.title}
                style={{ objectFit: "contain", height: "100%", width: "100%" }}
              />
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

export default Advert;
