import { Grid, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { loginActionSocial } from "redux/reducers/authReducer";

const Socials = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const accessToken = searchParams.get("accessToken");
  const refreshToken = searchParams.get("refreshToken");

  useEffect(() => {
    if (accessToken) {
      const x = {
        accessToken,
        refreshToken,
      };

      dispatch(loginActionSocial(x));
      setTimeout(() => navigate("/"), 3000);
    }
    //eslint-disable-next-line
  }, [accessToken, refreshToken]);

  return (
    <Grid item container justifyContent={"center"}>
      <Typography variant="h2">Welcome!!</Typography>
    </Grid>
  );
};

export default Socials;
