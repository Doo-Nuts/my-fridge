// src/hooks/useSafeLocation.ts
import { useLocation } from "react-router-dom";

export const useSafeLocation = () => {
  const location = useLocation();

  if (typeof window === "undefined") {
    // SSR일 땐 기본 pathname만 반환
    return { pathname: "/" };
  }

  return location;
};
