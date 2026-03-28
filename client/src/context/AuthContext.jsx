import { createContext, useContext, useEffect, useState } from "react";
import { getCurrentUser, loginUser, logoutUser, registerUser } from "../api/authApi";

const AuthContext = createContext(null);
const TOKEN_KEY = "chefsatlas_auth_token";

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY));
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(Boolean(localStorage.getItem(TOKEN_KEY)));

  useEffect(() => {
    let mounted = true;

    async function loadUser() {
      if (!token) {
        setUser(null);
        setAuthLoading(false);
        return;
      }

      setAuthLoading(true);

      try {
        const response = await getCurrentUser(token);
        if (mounted) {
          setUser(response.user);
        }
      } catch (error) {
        localStorage.removeItem(TOKEN_KEY);
        if (mounted) {
          setToken(null);
          setUser(null);
        }
      } finally {
        if (mounted) {
          setAuthLoading(false);
        }
      }
    }

    loadUser();

    return () => {
      mounted = false;
    };
  }, [token]);

  async function signUp(formData) {
    const response = await registerUser(formData);
    localStorage.setItem(TOKEN_KEY, response.token);
    setToken(response.token);
    setUser(response.user);
    return response;
  }

  async function signIn(formData) {
    const response = await loginUser(formData);
    localStorage.setItem(TOKEN_KEY, response.token);
    setToken(response.token);
    setUser(response.user);
    return response;
  }

  async function signOut() {
    try {
      if (token) {
        await logoutUser(token);
      }
    } catch (error) {
      // Clear local auth state even if the backend token is already invalid.
    } finally {
      localStorage.removeItem(TOKEN_KEY);
      setToken(null);
      setUser(null);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        isAuthenticated: Boolean(token && user),
        authLoading,
        signUp,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider.");
  }

  return context;
}
