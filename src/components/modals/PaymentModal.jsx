import NotificationModal from "./NotificationModal";
import { Typography, Grid, Skeleton } from "@mui/material";
import images from "assets";
import { FlutterWaveButton, closePaymentModal } from "flutterwave-react-v3";
import { toast } from "react-toastify";
import { useValidateAnnoucementMutation } from "redux/slices/annoucementSlice";
import { useUserProfileQuery } from "redux/slices/authSlice";
const PaymentModal = ({ open, handleClose, data }) => {
  const { data: profile, isLoading } = useUserProfileQuery();
  const [validatePayment] = useValidateAnnoucementMutation();
  const config = {
    public_key: "FLWPUBK_TEST-692e93515a83fe4c4ca8bd1dcc3e3b14-X",
    tx_ref: data?.payment?.id,
    amount: data?.payment?.amount,
    currency: "NGN",
    payment_options: "card",
    customer: {
      email: profile?.email,
      phone_number: profile?.phone,
      name: profile?.full_name,
    },
    customizations: {
      title: "CeeTook",
      description: "Payment for Annoucement",
      logo: images.logo,
    },
  };

  const fwConfig = {
    ...config,
    text: "Pay with Flutterwave!",
    callback: async (response) => {
      console.log(response);
      const { data: dt, error } = await validatePayment({
        payment_id: data?.payment?.id,
      });
      if (error) {
        toast.error(error);
      }
      console.log(dt);
      closePaymentModal(); // this will close the modal programmatically
    },
    onClose: () => {},
  };
  if (isLoading) return <Skeleton />;
  return (
    <NotificationModal
      isOpen={open}
      handleClose={handleClose}
      width={{ md: "40vw", xs: "95vw", sm: "60vw" }}
    >
      <Typography
        // color="#9B9A9A"
        fontWeight={700}
        width="100%"
        sx={{ textAlign: "center" }}
        fontSize={{ md: "2.5rem", xs: "2rem" }}
      >
        Payment
      </Typography>
      <Typography
        width="100%"
        textAlign="center"
        color="#FF9B04"
        fontSize={{ md: "2rem", xs: "1.8rem" }}
      >
        Announcement Summary
      </Typography>

      <Grid
        item
        container
        flexDirection={"column"}
        alignItems="center"
        justifyContent={"center"}
        gap={2}
        sx={{ mt: 2 }}
      >
        <Typography
          color="#636262"
          fontWeight={700}
          fontSize={{ md: "1.7rem", xs: "1.2rem" }}
        >
          Duration:{" "}
          <Typography variant="span" fontWeight={600}>
            {`${data?.duration} days`}
          </Typography>
        </Typography>
        <Typography
          color="#636262"
          fontWeight={700}
          fontSize={{ md: "1.7rem", xs: "1.2rem" }}
        >
          Budget:{" "}
          <Typography variant="span" fontWeight={600}>
            N{data?.payment?.amount}
          </Typography>
        </Typography>
      </Grid>
      <Grid item container sx={{ p: 2 }}>
        <Typography
          fontWeight={700}
          sx={{ width: "100%", textAlign: "center" }}
        >
          Payment Option
        </Typography>

        <Grid item container sx={{ mt: 2 }}>
          <FlutterWaveButton className="payment_btn" {...fwConfig} />
        </Grid>
      </Grid>
    </NotificationModal>
  );
};

PaymentModal.propTypes = {};

export default PaymentModal;
