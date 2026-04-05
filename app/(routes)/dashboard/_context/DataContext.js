"use client";
import React, { createContext, useState, useContext, useCallback } from 'react';
import { getTransactions } from '@/app/actions/getTransactions';
import { getDashboardData } from '@/app/actions/getDashboardData';

const DataContext = createContext(null);

export const DataProvider = ({ children, userId }) => {
  const [transactions, setTransactions] = useState([]);
  const [dashboardData, setDashboardData] = useState(null);
  const [loadingTransactions, setLoadingTransactions] = useState(false);
  const [loadingDashboard, setLoadingDashboard] = useState(false);

  const refreshTransactions = useCallback(async () => {
    if (!userId) return;
    setLoadingTransactions(true);
    const result = await getTransactions(userId);
    setTransactions(result.transactions || []);
    setLoadingTransactions(false);
  }, [userId]);

  const refreshDashboard = useCallback(async () => {
    if (!userId) return;
    setLoadingDashboard(true);
    const result = await getDashboardData(userId);
    if (result.success) setDashboardData(result);
    setLoadingDashboard(false);
  }, [userId]);

  return (
    <DataContext.Provider value={{
      transactions, loadingTransactions, refreshTransactions,
      dashboardData, loadingDashboard, refreshDashboard,
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) throw new Error('useData must be used within DataProvider');
  return context;
};