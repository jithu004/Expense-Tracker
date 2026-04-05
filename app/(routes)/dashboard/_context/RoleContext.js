"use client";
import React, { createContext, useState, useContext } from 'react';

export const RoleContext = createContext(null);

export const RoleProvider = ({ children }) => {
  const [role, setRole] = useState(
    typeof window !== 'undefined' 
      ? localStorage.getItem('userRole') || 'admin' 
      : 'admin'
  );

  const updateRole = (newRole) => {
    setRole(newRole);
    localStorage.setItem('userRole', newRole);
  };

  return (
    <RoleContext.Provider value={{ role, setRole: updateRole }}>
      {children}
    </RoleContext.Provider>
  );
};

export const useRole = () => {
  const context = useContext(RoleContext);
  if (!context) throw new Error('useRole must be used within a RoleProvider');
  return context;
};