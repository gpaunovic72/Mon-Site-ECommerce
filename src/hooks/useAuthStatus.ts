import { useEffect, useState } from "react";
import { useAdminRole } from "./useAdminRole";

export const useAuthStatus = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const { isAdmin } = useAdminRole();

  const checkLoginStatus = () => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    window.dispatchEvent(new Event("login"));
  };

  useEffect(() => {
    checkLoginStatus();
  }, []);

  // Écouter les changements de token
  useEffect(() => {
    const handleStorageChange = () => {
      checkLoginStatus();
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("login", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("login", handleStorageChange);
    };
  }, []);

  return { isLoggedIn, isAdmin, handleLogout };
};
