import { SvgIcon } from "@mui/material";
import React from "react";

function ArrowBack(props) {
  return (
    <SvgIcon viewBox="0 0 29 16" {...props}>
      <path
        d="M0.292893 8.70711C-0.0976311 8.31658 -0.0976311 7.68342 0.292893 7.29289L6.65685 0.928932C7.04738 0.538408 7.68054 0.538408 8.07107 0.928932C8.46159 1.31946 8.46159 1.95262 8.07107 2.34315L2.41421 8L8.07107 13.6569C8.46159 14.0474 8.46159 14.6805 8.07107 15.0711C7.68054 15.4616 7.04738 15.4616 6.65685 15.0711L0.292893 8.70711ZM29 9H1V7H29V9Z"
        fill="#9B9A9A"
      />
    </SvgIcon>
  );
}

export default ArrowBack;
