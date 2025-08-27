"use client";
// FIX: Import useMemo
import React, { useEffect, useState, useCallback, useMemo } from "react";
import { getTransactions } from "@/app/actions/getTransactions";
import { Card, CardContent } from "@/components/ui/card";
import CreateTransaction from "./CreateTransaction";
import FilterBox from "./FilterBox";
import EditTransactionDialog from "./EditTransactionDialog";
import { updateTransaction } from "@/app/actions/updateTransaction";
import { deleteTransaction } from "@/app/actions/deleteTransaction";
import { useSearch } from "../../_context/SearchContext";
import EmptyState from "../../_components/EmptyState";
import { ReceiptText } from "lucide-react";

export default function TransactionsList({ userId }) {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTx, setSelectedTx] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { searchTerm } = useSearch();

  const [displayTotals, setDisplayTotals] = useState({ income: 0, expense: 0 });

  const [filters, setFilters] = useState({
    date: "all",
    category: "all",
    type: "all",
  });

  const resetFilters = () => {
    setFilters({ date: 'all', category: 'all', type: 'all' });
  };
  const handleOpenDialog = (tx) => {
    setSelectedTx(tx);
    setIsDialogOpen(true);
  };
  const handleSave = async (updatedTx) => {
    const res = await updateTransaction(updatedTx);
    if (res.success) {
      await fetchData();
    }
  };
  const handleDelete = async (tx) => {
    const res = await deleteTransaction(tx.id, tx.type);
    if (res.success) {
      await fetchData();
    }
  };

  const fetchData = useCallback(async () => {
    if (!userId) return;
    setLoading(true);
    const result = await getTransactions(userId);
    setTransactions(result.transactions || []);
    setLoading(false);
  }, [userId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const isThisWeek = (date) => {
    const now = new Date();
    const txDate = new Date(date);
    const weekStart = new Date(now.setDate(now.getDate() - now.getDay()));
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 7);
    return txDate >= weekStart && txDate < weekEnd;
  };

  // FIX: Wrap the filtering logic in useMemo
  const filteredTransactions = useMemo(() => {
    return transactions.filter((tx) => {
      const searchMatch = searchTerm
        ? tx.title.toLowerCase().includes(searchTerm.toLowerCase())
        : true;
      const typeMatch = filters.type === 'all' || tx.type === filters.type;
      const categoryMatch = filters.category === 'all' || tx.category?.toLowerCase() === filters.category;
      let dateMatch = true;
      const txDate = new Date(tx.date);
      if (filters.date === 'today') {
        dateMatch = txDate.toDateString() === new Date().toDateString();
      } else if (filters.date === 'week') {
        dateMatch = isThisWeek(txDate);
      } else if (filters.date === 'month') {
        const now = new Date();
        dateMatch = txDate.getMonth() === now.getMonth() && txDate.getFullYear() === now.getFullYear();
      }
      return searchMatch && typeMatch && categoryMatch && dateMatch;
    });
    // FIX: Provide dependencies for useMemo
  }, [transactions, searchTerm, filters]);

  useEffect(() => {
    const calculateTotals = () => {
      let income = 0;
      let expense = 0;

      filteredTransactions.forEach(tx => {
        if (tx.type === 'income') {
          income += Number(tx.amount);
        } else {
          expense += Number(tx.amount);
        }
      });
      setDisplayTotals({ income, expense });
    };

    calculateTotals();
  }, [filteredTransactions]);

  return (
    <div className="p-4 space-y-4">
      <div className="fixed bottom-6 right-6 z-20">
        <CreateTransaction onTransactionCreated={fetchData} />
      </div>
      <div className="flex items-center justify-between gap-3">
        <Card className="flex-1 bg-slate-100 dark:bg-slate-800 shadow-sm rounded-xl border-green-300">
          <CardContent className="p-3 text-center">
            <h2 className="text-sm font-medium text-black dark:text-white">Income</h2>
            <p className="text-lg font-bold text-green-700">+₹{displayTotals.income}</p>
          </CardContent>
        </Card>
        <Card className="flex-1 bg-slate-100 dark:bg-slate-800 shadow-sm rounded-xl border-red-300">
          <CardContent className="p-3 text-center">
            <h2 className="text-sm font-medium text-black dark:text-white">Expenses</h2>
            <p className="text-lg font-bold text-red-600">-₹{displayTotals.expense}</p>
          </CardContent>
        </Card>
      </div>
      <div className="px-1">
        <FilterBox
          filters={filters}
          setFilters={setFilters}
          resetFilters={resetFilters}
        />
      </div>
      <div className="space-y-3 pb-16">
        {loading ? (
          [1, 2, 3].map((i) => (
            <div
              key={i}
              className="w-full bg-slate-200 dark:bg-slate-700 rounded-xl h-[70px] animate-pulse"
            />
          ))
        ) : filteredTransactions.length > 0 ? (
          filteredTransactions.map((tx) => (
            <Card
              key={`${tx.type}-${tx.id}`}
              onClick={() => handleOpenDialog(tx)}
              className={`cursor-pointer rounded-xl shadow-sm ${
                tx.type === 'income' ? 'border border-green-500' : 'border border-red-500'
              }`}
            >
              <CardContent className="p-3 flex justify-between items-center">
                <div>
                  <h3 className="text-sm font-semibold">{tx.title}</h3>
                  <p className="text-xs text-gray-500">
                    {new Date(tx.date).toLocaleDateString()}
                  </p>
                  <p className="text-xs text-gray-500">{tx.category}</p>
                </div>
                <p
                  className={`text-base font-bold ${
                    tx.type === 'income' ? 'text-green-700' : 'text-red-600'
                  }`}
                >
                  {tx.type === 'expense' ? '-' : '+'}
                  {tx.amount}
                </p>
              </CardContent>
            </Card>
          ))
        ) : (
          <EmptyState
            icon={ReceiptText}
            title={transactions.length === 0 ? "No Transactions Yet" : "No Matching Transactions"}
            subtitle={
              transactions.length === 0
                ? "Click the '+' button to add your first transaction."
                : "Try adjusting your search or filters."
            }
          />
        )}
      </div>
      <EditTransactionDialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        transaction={selectedTx}
        onSave={handleSave}
        onDelete={handleDelete}
      />
    </div>
  );
}