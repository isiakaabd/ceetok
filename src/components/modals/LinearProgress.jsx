import { useState } from "react";
import { Box, Slider } from "@mui/material";
import { styled } from "@mui/material/styles";

const marks = [
  {
    value: 0,
    label: "0",
  },
  {
    value: 30,
    label: "N1,000",
  },
  {
    value: 60,
    label: "N2,000",
  },
  {
    value: 90,
    label: "N5,000",
  },
];

function valuetext(value) {
  return `N${value}`;
}
const PrettoSlider = styled(({ ...rest }) => <Slider {...rest} />)(
  ({ theme }) => ({
    color: "#FF9B04",
    height: 8,
    "& .MuiSlider-track": {
      border: "none",
    },
    "& .MuiSlider-thumb": {
      height: 24,
      width: 24,
      backgroundColor: "#FF9B04",
      border: "2px solid currentColor",
      "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
        boxShadow: "inherit",
      },
      "&:before": {
        display: "none",
      },
    },
    "& .MuiSlider-valueLabel": {
      lineHeight: 1.2,
      fontSize: 12,
      background: "unset",
      padding: 0,
      width: 32,
      height: 32,
      borderRadius: "50% 50% 50% 0",
      backgroundColor: "#FF9B04",
      transformOrigin: "bottom left",
      transform: "translate(50%, -100%) rotate(-45deg) scale(0)",
      "&:before": { display: "none" },
      "&.MuiSlider-valueLabelOpen": {
        transform: "translate(50%, -100%) rotate(-45deg) scale(1)",
      },
      "& > *": {
        transform: "rotate(45deg)",
      },
    },
  })
);

export default function DiscreteSliderMarks() {
  return (
    <Box sx={{ width: "100%" }}>
      <PrettoSlider
        aria-label="Custom marks"
        defaultValue={30}
        getAriaValueText={valuetext}
        step={10}
        valueLabelDisplay="auto"
        marks={marks}
      />
    </Box>
  );
}
