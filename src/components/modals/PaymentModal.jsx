import NotificationModal from "./NotificationModal";
import { Typography, Grid } from "@mui/material";
import images from "assets";
const PaymentModal = ({ open, handleClose, state }) => {
  return (
    <NotificationModal
      isOpen={open}
      handleClose={handleClose}
      width={{ md: "40vw", xs: "95vw", sm: "60vw" }}
    >
      <Typography
        color="#9B9A9A"
        fontWeight={700}
        width="100%"
        sx={{ my: 1, textAlign: "center" }}
        fontSize={{ md: "1.7rem", xs: "1.3rem" }}
      >
        Payment
      </Typography>
      <Typography
        width="100%"
        textAlign="center"
        color="#FF9B04"
        sx={{ my: 3 }}
        fontSize={{ md: "2rem", xs: "1.6rem" }}
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
      >
        <Typography
          color="#636262"
          fontWeight={700}
          fontSize={{ md: "1.7rem", xs: "1.2rem" }}
        >
          Duration:{" "}
          <Typography variant="span" fontWeight={400}>
            {state?.annoucement && state?.annoucement[0]}
          </Typography>
        </Typography>
        <Typography
          color="#636262"
          fontWeight={700}
          fontSize={{ md: "1.7rem", xs: "1.2rem" }}
        >
          Budget:{" "}
          <Typography variant="span" fontWeight={400}>
            N{(+state?.slide * 50).toLocaleString()}
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
        <img
          src={images.payment}
          style={{ objectFit: "contain", width: "100%", cursor: "pointer" }}
          alt="payment"
        />
      </Grid>
    </NotificationModal>
  );
};

PaymentModal.propTypes = {};

export default PaymentModal;
