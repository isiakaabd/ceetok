import { Grid } from "@mui/material";
import { BackIcon } from "components";
import SettingsTab from "pages/pages/components/SettingsTab";

const Settings = () => {
  return (
    <Grid item container sx={{ paddingInline: { xs: "1rem", md: "4rem" } }}>
      <BackIcon text={"Back to Profile"} />

      <Grid item container sx={{ mt: 3 }}>
        <SettingsTab />
      </Grid>
    </Grid>
  );
};

export default Settings;
