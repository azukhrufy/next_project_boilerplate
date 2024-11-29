import { createContext, useContext, useState, useEffect } from "react";
// import { setCookie, getCookie, deleteCookie } from "react-cookie";
import api from "@/lib/axios";
import authService from "@/services/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    const loadUser = async () => {
      const accessToken = localStorage.getItem("accessToken");
      if (accessToken) {
        const USER_ID = localStorage.getItem("userId");
        try {
          const { data } = await api.get(`/v1/users/${USER_ID}`);
          setUser(data);
        } catch (error) {
          console.error("Failed to load user:", error);
        }
      }
      setLoading(false);
    };

    loadUser();
  }, []);

  const login = async (email, password) => {
    const { data } = await authService.loginWithPassword(email, password);
    localStorage.setItem("accessToken", data.tokens.access.token, {
      path: "/",
    });
    localStorage.setItem("refreshToken", data.tokens.refresh.token, {
      path: "/",
    });
    localStorage.setItem("userId", data.user.id, {
      path: "/",
    });
    setUser(data.user);
  };

  const logout = async () => {
    await api.post("/v1/auth/logout", {
      refreshToken: localStorage.getItem("refreshToken"),
    });
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
