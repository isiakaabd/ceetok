import { Grid, Typography } from "@mui/material";

import { Formik, Form } from "formik/dist";
import FormikControl from "validation/FormikControl";
import { CustomButton } from "components";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useRecoverTokenMutation } from "redux/slices/authSlice";
import { toast } from "react-toastify";
import { useEffect } from "react";
const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const [recoverToken, { isLoading }] = useRecoverTokenMutation();
  const token = searchParams.get("token");
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await recoverToken({
        token,
      });
      if (data) toast.success(data);
      if (error) toast.error(error);
      setTimeout(() => {
        navigate({
          pathname: "/auth/new-password",
          search: `?token=${token}`,
        });
      }, 3000);
    };
    fetchData();
    //eslint-disable-next-line
  }, []);

  const handleSubmit = async (values) => {
    const { token } = values;
    const { data, error } = await recoverToken({
      token,
    });
    if (data) toast.success(data);
    if (error) toast.error(error);
    setTimeout(() => {
      navigate({
        pathname: "/auth/new-password",
        search: `?token=${token}`,
      });
    }, 3000);
  };
  return (
    <Grid container>
      <Grid item md={4} xs={10} sx={{ width: "100%", mx: "auto", flex: 1 }}>
        <Grid
          container
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
        >
          <Typography
            sx={{
              fontSize: { md: "2.5rem", xs: "1.9rem" },
              my: 5,
              mb: 2,
              fontWeight: 700,
              color: "#464646",
              textAlign: "center",
            }}
          >
            Confirm Token and Reset Password
          </Typography>

          <Formik initialValues={{ token }} onSubmit={handleSubmit}>
            <Form style={{ width: "100%" }}>
              <Grid item container sx={{ mb: 2 }}>
                <Grid
                  item
                  gap={2}
                  container
                  flexDirection="column"
                  alignItems="center"
                >
                  <Grid item container sx={{ display: "none" }}>
                    <FormikControl
                      control="input"
                      name={"token"}
                      disabled={true}
                    />
                  </Grid>{" "}
                  <CustomButton
                    isSubmitting={isLoading}
                    title="Confirm Token"
                    type="submit"
                  />
                </Grid>
              </Grid>
            </Form>
          </Formik>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ResetPassword;
