import { Zoom, Tooltip, tooltipClasses, styled } from "@mui/material";

const LightTooltip = styled(({ className, ...props }) => (
  <Tooltip
    {...props}
    arrow
    classes={{ popper: className }}
    TransitionComponent={Zoom}
  />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "rgb(55, 212, 42)",
    fontWeight: 600,
    color: "#fff",
    boxShadow: theme.shadows[1],
    fontSize: "1.5em",
  },
}));

export default function CustomizedTooltips({ children, title }) {
  return (
    <div>
      <LightTooltip title={title}>{children}</LightTooltip>
    </div>
  );
}
