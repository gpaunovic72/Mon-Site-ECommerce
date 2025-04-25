import { useEffect, useState } from "react";
import { useAdminRole } from "./useAdminRole";

export const useAuthStatus = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const { isAdmin } = useAdminRole();

  const checkLoginStatus = async () => {
    try {
      const response = await fetch("/api/auth/checkRole", {
        credentials: "include",
      });
      const data = await response.json();
      setIsLoggedIn(data.isLoggedIn);
    } catch (error) {
      console.error("Erreur lors de la vérification du rôle:", error);
      setIsLoggedIn(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      setIsLoggedIn(false);
      window.dispatchEvent(new Event("login"));
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
    }
  };

  // Vérifier l'état de connexion au chargement
  useEffect(() => {
    checkLoginStatus();
  }, []);

  // Écouter les changements de token
  useEffect(() => {
    const handleLoginChange = () => {
      checkLoginStatus();
    };

    window.addEventListener("login", handleLoginChange);
    return () => window.removeEventListener("login", handleLoginChange);
  }, []);

  return { isLoggedIn, isAdmin, handleLogout };
};
