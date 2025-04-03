import { checkAdminRole } from "@/lib/api/checkAdminRole";
import { useEffect, useState } from "react";

export const useAdminRole = () => {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  const verifyAdminRole = async () => {
    const result = await checkAdminRole();
    setIsAdmin(result.isAdmin);
  };

  useEffect(() => {
    verifyAdminRole();

    const handleLogin = () => {
      verifyAdminRole();
    };

    window.addEventListener("login", handleLogin);
    return () => window.removeEventListener("login", handleLogin);
  }, []);

  return { isAdmin };
};
