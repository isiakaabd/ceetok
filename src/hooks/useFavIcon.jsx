import { useEffect } from "react";

function getFaviconEl() {
  return document.getElementById("icon");
}

function useFavIcon(icon) {
  useEffect(() => {
    const favicon = getFaviconEl();
    favicon.href = icon;
  }, [icon]);
}

export default useFavIcon;
