import { useEffect } from "react";

function getFaviconEl() {
  return document.getElementById("icon");
}

function useFavIcon(icon) {
  useEffect(() => {
    console.log(getFaviconEl());
    const favicon = getFaviconEl();
    favicon.href = icon;
  }, [icon]);
}

export default useFavIcon;
