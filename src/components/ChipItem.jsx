import { useState } from "react";
import { Chip } from "@mui/material";
const ChipItem = ({ item }) => {
  const [variant, setVariant] = useState(false);
  return (
    <Chip
      variant={variant ? "filled" : "outlined"}
      label={item}
      sx={{
        fontSize: "1.2rem",
        fontWeight: 600,
        borderColor: "#37D42A",
        color: "#37D42A",
        "&.MuiChip-filled": {
          color: "#fff",
          fontWeight: 600,
          backgroundColor: "#37D42A",
        },
      }}
      onClick={() => setVariant(!variant)}
    />
  );
};

export default ChipItem;
