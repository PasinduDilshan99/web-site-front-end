"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

export type User = {
  id: number;
  username: string;
  roles: string[];
  privileges: string[];
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber1: string;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<any>;
  logout: () => Promise<void>;
  hasRole: (role: string) => boolean;
  hasPrivilege: (priv: string) => boolean;
  fetchMe: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  login: async () => {},
  logout: async () => {},
  hasRole: () => false,
  hasPrivilege: () => false,
  fetchMe: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // -----------------------
  // LOGIN
  // -----------------------
  const login = async (username: string, password: string) => {
    const res = await fetch("/api/login", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || "Login failed");
    }

    const responseBody = await res.json();
    const data = responseBody.data; // backend wraps inside data

    // Save uniqueCode in session
    sessionStorage.setItem("uniqueCode", data.uniqueCode);

    // Fetch user details
    await fetchMe();

    return data;
  };

  // -----------------------
  // FETCH USER DETAILS
  // -----------------------
  const fetchMe = async () => {
    const code = sessionStorage.getItem("uniqueCode");

    if (!code) {
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("http://localhost:8080/felicita/api/v0/auth/me", {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        const responseBody = await res.json();
        const data = responseBody.data;

        setUser({
          id: data.id,
          username: data.username,
          roles: data.roles,
          privileges: data.privileges,
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          mobileNumber1: data.mobileNumber1,
        });

      } else {
        setUser(null);
        sessionStorage.removeItem("uniqueCode");
      }
    } catch (error) {
      console.error("Failed to fetch user:", error);
      setUser(null);
      sessionStorage.removeItem("uniqueCode");
      logout()
    } finally {
      setLoading(false);
    }
  };

  // -----------------------
  // LOGOUT
  // -----------------------
  const logout = async () => {
    try {
      await fetch("http://localhost:8080/felicita/api/v0/auth/logout", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
    } catch (err) {
      console.error("Logout failed:", err);
    }

    sessionStorage.removeItem("uniqueCode");
    setUser(null);
  };

  useEffect(() => {
    fetchMe();
  }, []);

  const hasRole = (role: string) => user?.roles?.includes(role) ?? false;
  const hasPrivilege = (priv: string) => user?.privileges?.includes(priv) ?? false;

  return (
    <AuthContext.Provider
      value={{ user, loading, login, logout, hasRole, hasPrivilege, fetchMe }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
