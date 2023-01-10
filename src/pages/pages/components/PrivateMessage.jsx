import PropTypes from "prop-types";
import { ReplyAllOutlined } from "@mui/icons-material";
import { Avatar, Grid, IconButton, Typography, Checkbox } from "@mui/material";
import DeleteIcon from "assets/svgs/DeleteIcon";
import { Link } from "react-router-dom";
import Dots from "assets/svgs/Dots";
import { Details } from "../Post";
import Reply from "assets/svgs/Reply";
import Mail from "assets/svgs/Mail";

const PrivateMessage = () => {
  const icons = [
    {
      title: "Reply",
      Icon: Reply,
      link: "",
    },
    {
      title: "Chat",
      Icon: Mail,
      link: "",
    },
  ];
  return (
    <Grid item container gap={1} justifyContent="space-between">
      {Array(20)
        .fill(undefined)
        .map((item, index) => (
          <Grid
            item
            md={5.8}
            sm={12}
            key={index}
            sx={{
              cursor: "pointer",
              p: { md: 1, xs: 0.5 },
              ":hover": {
                backgroundColor: "rgba(0, 0, 0, 0.04)",
                borderRadius: ".5rem",
              },
            }}
          >
            <Grid container flexWrap="nowrap">
              <Grid item sx={{ mr: 2 }}>
                <Avatar>N</Avatar>
              </Grid>

              {/* right */}
              <Grid item container>
                <Grid item container flexWrap="nowrap">
                  <Grid item>
                    <Grid flexDirection="column" container>
                      <Typography
                        color="#9B9A9A"
                        fontWeight={700}
                        fontSize={{ md: "1.6rem", xs: "1.3rem" }}
                      >
                        Glad4real
                        <Typography
                          variant="span"
                          fontWeight={400}
                          fontSize={{ md: "1.4rem", xs: "1rem" }}
                        >
                          - 4th Nov, 2022 12:45pm
                        </Typography>
                      </Typography>
                    </Grid>
                  </Grid>

                  <Grid item sx={{ ml: { md: 2, xs: "auto" } }}>
                    <Grid container flexWrap="nowrap" alignItems="center">
                      <IconButton>
                        <Dots sx={{ fontSize: { md: "1.5rem", xs: "1rem" } }} />
                      </IconButton>
                      <Checkbox
                        defaultChecked
                        sx={{
                          "& .MuiSvgIcon-root": {
                            fontSize: { md: "2.5rem", sm: "2rem" },
                            color: "#9B9A9A",
                          },
                        }}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Typography
                  color="secondary"
                  fontSize={{ md: "1.5rem", xs: "1.2rem" }}
                  fontWeight={600}
                  sx={{ mt: 1 }}
                >
                  Send a me a message when you see this victor
                </Typography>
                <Grid item xs={7} md={5}>
                  <Details icons={icons} handleShare={{}} />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        ))}
    </Grid>
  );
};

export default PrivateMessage;
