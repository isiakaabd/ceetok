import { useState } from "react";
import { Chip, Typography, Grid } from "@mui/material";
import NotificationModal from "./modals/NotificationModal";
import { Formik, Form, useFormikContext, Field } from "formik/dist";
import FormikControl from "validation/FormikControl";
import CustomButton from "./CustomButton";
import PaymentModal from "./modals/PaymentModal";
const ChipItem = ({
  item,
  borderColor,
  color,
  name,
  backgroundColor,
  onChange,
  ...rest
}) => {
  const { setFieldValue, values } = useFormikContext();
  const [variant, setVariant] = useState(values.interests.includes(item));
  const addToArray = () => {
    if (!variant) {
      setFieldValue(
        "interests",

        [...values.interests, item]
      );
      setVariant(!variant);
    } else {
      setFieldValue(
        "interests",
        values.interests.filter((ite) => item !== ite)
      );
    }
    setVariant(!variant);
  };
  const [openCustom, setOpenCustom] = useState(false);
  const [openPaymentModal, setOpenPaymentModal] = useState(false);
  return (
    <>
      <Chip
        variant={variant ? "filled" : "outlined"}
        label={item}
        sx={{
          fontSize: "1.2rem",
          fontWeight: 600,
          borderColor: borderColor ? borderColor : "#37D42A",
          color: color ? color : "#37D42A",
          "&.MuiChip-filled": {
            color: "#fff",
            fontWeight: 600,
            backgroundColor: backgroundColor ? backgroundColor : "#37D42A",
          },
        }}
        {...rest}
        onClick={() => {
          if (item === "Custom") {
            setOpenCustom(true);
          }
          addToArray();
        }}
      />
      <NotificationModal
        isOpen={openCustom}
        width={{ md: "30vw", xs: "95vw", sm: "60vw" }}
        handleClose={() => setOpenCustom(false)}
      >
        <Grid item container>
          <Typography
            color="#FF9B04"
            fontWeight={700}
            width="100%"
            sx={{ my: 3 }}
            textAlign="center"
            fontSize={{ md: "1.7rem", xs: "1.4rem" }}
          >
            Customize Duration
          </Typography>
          <Formik initialValues={{ from: "", to: "" }}>
            <Form>
              <Grid item container gap={2}>
                <Grid item container>
                  <FormikControl
                    control="input"
                    name="from"
                    placeholder="From"
                  />
                </Grid>
                <Grid item container>
                  <FormikControl control="input" name="to" placeholder="To" />
                </Grid>
                <Grid item container sx={{ mt: 3 }}>
                  <CustomButton
                    title="Proceed"
                    width="100%"
                    borderRadius="0.5em"
                    onClick={() => {
                      setOpenCustom(false);
                      setTimeout(() => {
                        setOpenPaymentModal(true);
                      }, 300);
                    }}
                  />
                </Grid>
              </Grid>
            </Form>
          </Formik>
        </Grid>
      </NotificationModal>

      <PaymentModal
        open={openPaymentModal}
        handleClose={() => setOpenPaymentModal(false)}
      />
    </>
  );
};

export default ChipItem;
