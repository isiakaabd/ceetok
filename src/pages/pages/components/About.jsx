import { Divider, Grid, Skeleton, Typography } from "@mui/material";
import { getDate } from "helpers";
import { useUserProfileQuery } from "redux/slices/authSlice";

const About = (props) => {
  const { data, isLoading } = useUserProfileQuery();

  if (isLoading) return <Skeleton />;
  const { dob, gender, interests, createdAt, occupation } = data;
  return (
    <Grid item container sx={{ background: "#fff", p: 2 }}>
      <Grid item md={8} xs={12}>
        <Grid item container gap={4} flexDirection={"column"} sx={{ py: 2 }}>
          {/* Bio */}
          <Grid>
            <Typography
              variant="secondary"
              fontSize={{ md: "2rem", xs: "1.7rem" }}
              fontWeight={700}
            >
              Bio
            </Typography>
            <Grid item container flexDirection="column" gap={3}>
              <Typography
                fontSize={{ md: "1.7rem", xs: "1.4rem" }}
                fontWeight={600}
              >
                DOB:
                <Typography sx={{ ml: 1 }} variant="span">
                  {getDate(dob) || "No Data yet"}
                </Typography>
              </Typography>
              <Typography
                fontSize={{ md: "1.7rem", xs: "1.4rem" }}
                fontWeight={600}
              >
                Gender:
                <Typography sx={{ ml: 1 }} variant="span">
                  {gender === "m" ? "Male" : "Female" || "No Data yet"}
                </Typography>
              </Typography>
              <Typography
                fontSize={{ md: "1.7rem", xs: "1.4rem" }}
                fontWeight={600}
              >
                Occupation:
                <Typography variant="span" sx={{ ml: 1 }}>
                  {occupation || "No Data yet"}
                </Typography>
              </Typography>
            </Grid>
          </Grid>
          {/* Basic Information */}
          <Grid>
            <Typography
              variant="secondary"
              sx={{ paddingBlock: "1rem" }}
              fontSize={{ md: "2rem", xs: "1.7rem" }}
              fontWeight={700}
            >
              Basic information
            </Typography>

            <Typography
              color="#37D42A"
              fontWeight={700}
              fontSize={{ md: "1.7rem", xs: "1.4rem" }}
            >
              Total Posts
            </Typography>
            <Divider />
            <Grid item container alignItems="center">
              <Typography
                color="secondary"
                fontSize={{ md: "1.7rem", xs: "1.4rem" }}
                fontWeight={600}
              >
                Total Posts{" "}
              </Typography>
              <Typography
                sx={{ ml: "auto", fontSize: { md: "1.7rem", xs: "1.4rem" } }}
              >
                120
              </Typography>
            </Grid>
            <Grid item container alignItems="center">
              <Typography
                color="secondary"
                fontSize={{ md: "1.7rem", xs: "1.4rem" }}
                fontWeight={600}
              >
                Post per Day{" "}
              </Typography>
              <Typography
                sx={{ ml: "auto", fontSize: { md: "1.7rem", xs: "1.4rem" } }}
              >
                0.19
              </Typography>
            </Grid>
            <Divider />
          </Grid>
          {/* Visitor Messages */}
          <Grid>
            <Typography
              color="#37D42A"
              fontWeight={700}
              fontSize={{ md: "1.7rem", xs: "1.4rem" }}
            >
              Visitor Messages
            </Typography>

            <Divider />
            <Grid item container alignItems="center">
              <Typography
                color="secondary"
                fontSize={{ md: "1.7rem", xs: "1.4rem" }}
                fontWeight={600}
              >
                Visitor Messages
              </Typography>
              <Typography
                sx={{ ml: "auto", fontSize: { md: "1.7rem", xs: "1.4rem" } }}
              >
                10
              </Typography>
            </Grid>
            <Grid item container alignItems="center">
              <Typography
                color="secondary"
                fontSize={{ md: "1.7rem", xs: "1.4rem" }}
                fontWeight={600}
              >
                Most Recent Message
              </Typography>
              <Typography sx={{ ml: "auto", fontSize: "1.7rem" }}>2</Typography>
            </Grid>
            <Divider />
          </Grid>
          {/* General information */}
          <Grid>
            <Typography
              color="secondary"
              fontSize={{ md: "1.7rem", xs: "1.4rem" }}
              fontWeight={600}
            >
              General Information
            </Typography>

            <Divider />
            <Grid item container alignItems="center">
              <Typography
                color="secondary"
                fontSize={{ md: "1.7rem", xs: "1.4rem" }}
                fontWeight={600}
              >
                Last Activity
              </Typography>
              <Typography
                sx={{ ml: "auto", fontSize: { md: "1.7rem", xs: "1.4rem" } }}
                fontWeight={600}
                color="secondary"
              >
                10-10-2022
              </Typography>
            </Grid>
            <Grid item container alignItems="center">
              <Typography
                color="secondary"
                fontSize={{ md: "1.7rem", xs: "1.4rem" }}
                fontWeight={600}
              >
                Joined Date
              </Typography>
              <Typography
                color="secondary"
                sx={{ ml: "auto", fontSize: { md: "1.7rem", xs: "1.4rem" } }}
                fontWeight={600}
              >
                {getDate(createdAt) || "No Data yet"}
              </Typography>
            </Grid>
            <Divider />
          </Grid>
          <Grid>
            <Typography
              color="#37D42A"
              fontWeight={700}
              fontSize={{ md: "1.7rem", xs: "1.4rem" }}
            >
              Most ACTIVE IN
            </Typography>

            <Divider />
            <Grid
              item
              container
              display={"grid"}
              gridTemplateColumns={"repeat(2,1fr)"}
            >
              {interests.map((interest) => (
                <Typography
                  color={"secondary"}
                  key={interest}
                  fontWeight={600}
                  fontSize={{ md: "1.7rem", xs: "1.4rem" }}
                >
                  {interest?.slice(0, 1).toUpperCase() + interest?.slice(1)}
                </Typography>
              ))}
            </Grid>

            <Divider />
          </Grid>

          <Grid>
            <Typography
              color="#37D42A"
              fontWeight={700}
              fontSize={{ md: "1.7rem", xs: "1.4rem" }}
            >
              TAGGING STATISTICS
            </Typography>

            <Divider />
            <Grid item container alignItems="center">
              <Typography
                color="secondary"
                fontSize={{ md: "1.7rem", xs: "1.4rem" }}
                fontWeight={600}
              >
                Mentioned
              </Typography>
              <Typography
                sx={{ ml: "auto", fontSize: { md: "1.7rem", xs: "1.4rem" } }}
                fontWeight={600}
                color="secondary"
              >
                20 Post(s)
              </Typography>
            </Grid>
            <Grid item container alignItems="center">
              <Typography
                color="secondary"
                fontSize={{ md: "1.7rem", xs: "1.4rem" }}
                fontWeight={600}
              >
                Tagged
              </Typography>
              <Typography
                sx={{ ml: "auto", fontSize: { md: "1.7rem", xs: "1.4rem" } }}
                fontWeight={600}
                color="secondary"
              >
                102 Thread (s)
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

About.propTypes = {};

export default About;
