"use client";
import React, { createContext, useState, useContext, useEffect } from "react";

export const RoleContext = createContext(null);

export const RoleProvider = ({ children }) => {
  const [role, setRole] = useState("admin"); // always start with 'admin' on server

  // load from localStorage only after mount (client only)
  useEffect(() => {
    const saved = localStorage.getItem("userRole");
    if (saved) setRole(saved);
  }, []);

  const updateRole = (newRole) => {
    setRole(newRole);
    localStorage.setItem("userRole", newRole);
  };

  return (
    <RoleContext.Provider value={{ role, setRole: updateRole }}>
      {children}
    </RoleContext.Provider>
  );
};

export const useRole = () => {
  const context = useContext(RoleContext);
  if (!context) throw new Error("useRole must be used within a RoleProvider");
  return context;
};
