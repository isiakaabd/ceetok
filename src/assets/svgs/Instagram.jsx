import { SvgIcon } from "@mui/material";
import React from "react";

function Instagram(props) {
  return (
    <SvgIcon viewBox="0 0 25 25" {...props}>
      <svg viewBox="0 0 25 25" fill="none">
        <rect
          x="0.888672"
          y="0.308594"
          width="24.0741"
          height="24.3827"
          fill="url(#pattern0)"
        />
        <defs>
          <pattern
            id="pattern0"
            patternContentUnits="objectBoundingBox"
            width="1"
            height="1"
          >
            <use
              xlink:href="#image0_258_4639"
              transform="translate(-0.00641028) scale(0.000989083 0.000976562)"
            />
          </pattern>
          {/* <image id="image0_258_4639" width="1024" height="1024" /> */}
        </defs>
      </svg>
    </SvgIcon>
  );
}

export default Instagram;
