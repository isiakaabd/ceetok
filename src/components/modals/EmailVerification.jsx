import { Grid, Typography } from "@mui/material";
import { useState } from "react";
// import { CustomButton } from "";
import { CloseOutlined } from "@mui/icons-material";
// import Modals from "components/Modal";
import VerifyPage from "./VerifyPage";

const EmailVerification = ({ handleClose }) => {
  const [showVerifyPage, setShowVerifyPage] = useState(false);
  return (
    <>
      <Grid
        item
        container
        flexDirection="column"
        sx={{ mt: 1, height: "100%" }}
      >
        <Grid item>
          <CloseOutlined
            onClick={handleClose}
            style={{ color: "#000", fontSize: 20, cursor: "pointer" }}
          />
        </Grid>
        <Grid item xs={9} sx={{ margin: "auto", flex: 1 }}>
          <Grid
            container
            alignItems="center"
            justifyContent="space-between"
            flexDirection="column"
            gap={2}
          >
            <Typography
              sx={{
                fontSize: { md: "3rem", xs: "2.4rem" },
                my: 2,
                fontWeight: 700,
                color: "#464646",
              }}
            >
              Email Verification
            </Typography>
            <Typography
              sx={{ fontSize: "1.7rem", color: "#9B9A9A", fontWeight: 500 }}
            >
              We have just sent you an e-mail.
            </Typography>
            <Typography
              sx={{
                fontSize: "1.7rem",
                color: "#9B9A9A",
                fontWeight: 500,
                textAlign: "center",
              }}
            >
              Please check your inbox to find the e-mail and complete your
              registration. Please check your spam folder if you cannot find it
              in your inbox.
            </Typography>
            <Typography
              sx={{
                fontSize: "1.7rem",
                color: "#9B9A9A",
                fontWeight: 500,
                textAlign: "center",
              }}
            >
              Didn’t get any mail?{" "}
              <Typography
                variant="span"
                sx={{
                  color: "#37D42A",
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                RESEND CONFIRMATION
              </Typography>
            </Typography>
            <Grid
              item
              container
              justifyContent="center"
              alignItems="center"
              sx={{ mt: 2, cursor: "pointer" }}
              gap={3}
            >
              <Typography>
                {" "}
                {/* onClick={() => setShowVerifyPage(true)} */}
                Verified Already?
              </Typography>
              {/* <CustomButton */}
              {/* // onClick={() => setShowCreatePassword(true)
              // }
              > 
                Login
              </CustomButton>*/}
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {showVerifyPage && (
        <VerifyPage
          handleClose={() => {
            //   handleClose();
            setShowVerifyPage(false);
          }}
          isOpen={showVerifyPage}
        />
      )}
    </>
  );
};

export default EmailVerification;
