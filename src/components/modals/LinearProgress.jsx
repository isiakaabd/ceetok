import { useState } from "react";
import { Box, Slider } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useFormikContext } from "formik/dist";
const marks = [
  {
    value: 20,
    label: "N1,000",
  },
  {
    value: 40,
    label: "N2,000",
  },
  {
    value: 60,
    label: "N3,000",
  },
  {
    value: 80,
    label: "N4,000",
  },
  {
    value: 100,
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
  const { setFieldValue } = useFormikContext();
  return (
    <Box sx={{ width: "100%" }}>
      <PrettoSlider
        aria-label="Custom marks"
        defaultValue={50}
        getAriaValueText={valuetext}
        step={10}
        name="slide"
        onChange={(_, value) => setFieldValue("slide", value)}
        valueLabelDisplay="auto"
        marks={marks}
      />
    </Box>
  );
}
