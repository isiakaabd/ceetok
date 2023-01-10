import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import images from "assets";
import Pen from "assets/svgs/Pen";

export default function ProfileImage() {
  return (
    <Badge
      overlap="circular"
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      badgeContent={<Pen sx={{ fill: "#37D42A" }} />}
    >
      <Avatar
        alt="Travis Howard"
        src={images.dp}
        sx={{ width: "10rem", height: "10rem", objectFit: "contain" }}
      />
    </Badge>
  );
}
