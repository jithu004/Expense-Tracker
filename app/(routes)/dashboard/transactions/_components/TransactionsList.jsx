"use client";
import React, { useEffect, useState, useCallback } from "react";
import { getTransactions } from "@/app/actions/getTransactions";
import { Card, CardContent } from "@/components/ui/card";
import CreateTransaction from "./CreateTransaction";
import FilterBox from "./FilterBox";
import EditTransactionDialog from "./EditTransactionDialog";
import { updateTransaction } from "@/app/actions/updateTransaction";
import { deleteTransaction } from "@/app/actions/deleteTransaction";

export default function TransactionsList({ userId }) {
  const [transactions, setTransactions] = useState([]);
  const [totals, setTotals] = useState({ income: 0, expense: 0 });
  const [loading, setLoading] = useState(true);
  const [selectedTx, setSelectedTx] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // filters state
  const [filters, setFilters] = useState({
    date: "all",
    category: "all",
    type: "all",
  });

  const resetFilters = () => {
    setFilters({ date: "all", category: "all", type: "all" });
  };

  const handleOpenDialog = (tx) => {
    setSelectedTx(tx);
    setIsDialogOpen(true);
  };

  const handleSave = async (updatedTx) => {
    const res = await updateTransaction(updatedTx);
    if (res.success) {
      await fetchData(); // refresh list
    }
  };

  const handleDelete = async (tx) => {
    const res = await deleteTransaction(tx.id, tx.type);
    if (res.success) {
      await fetchData(); // refresh list
    }
  };

  const fetchData = useCallback(async () => {
    if (!userId) return;
    setLoading(true);

    const result = await getTransactions(userId);
    setTransactions(result.transactions || []);
    setTotals({
      income: result.totalIncome || 0,
      expense: result.totalExpenses || 0,
    });

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

  return (
    <div className="p-4 space-y-4">
      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-20">
        <CreateTransaction onTransactionCreated={fetchData} />
      </div>

      {/* Totals compact on mobile */}
      <div className="flex items-center justify-between gap-3">
        <Card className="flex-1 bg-slate-100 shadow-sm rounded-xl border-green-300">
          <CardContent className="p-3 text-center">
            <h2 className="text-sm font-medium text-black">Income</h2>
            <p className="text-lg font-bold text-green-700">
              +₹{totals.income}
            </p>
          </CardContent>
        </Card>

        <Card className="flex-1 bg-slate-100 shadow-sm rounded-xl border-red-300">
          <CardContent className="p-3 text-center">
            <h2 className="text-sm font-medium text-black">Expenses</h2>
            <p className="text-lg font-bold text-red-600">
              -₹{totals.expense}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* FilterBox slimmer */}
      <div className="px-1">
        <FilterBox
          filters={filters}
          setFilters={setFilters}
          resetFilters={resetFilters}
        />
      </div>

      {/* Transactions */}
      <div className="space-y-3 pb-16">
        {loading
          ? [1, 2, 3].map((i) => (
              <div
                key={i}
                className="w-full bg-slate-200 rounded-xl h-[70px] animate-pulse"
              />
            ))
          : transactions
              .filter((tx) => {
                if (filters.type !== "all" && tx.type !== filters.type)
                  return false;
                if (
                  filters.category !== "all" &&
                  tx.category?.toLowerCase() !== filters.category
                )
                  return false;

                const txDate = new Date(tx.date);
                if (filters.date === "today") {
                  if (txDate.toDateString() !== new Date().toDateString())
                    return false;
                }
                if (filters.date === "week" && !isThisWeek(txDate))
                  return false;
                if (filters.date === "month") {
                  const now = new Date();
                  if (
                    txDate.getMonth() !== now.getMonth() ||
                    txDate.getFullYear() !== now.getFullYear()
                  )
                    return false;
                }
                return true;
              })
              .map((tx) => (
                <Card
                  key={`${tx.type}-${tx.id}`}
                  onClick={() => handleOpenDialog(tx)}
                  className={`cursor-pointer rounded-xl shadow-sm ${
                    tx.type === "income"
                      ? "bg-white border border-green-500"
                      : "bg-white border border-red-500"
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
                        tx.type === "income" ? "text-green-700" : "text-red-600"
                      }`}
                    >
                      {tx.type === "expense" ? "-" : "+"}
                      {tx.amount}
                    </p>
                  </CardContent>
                </Card>
              ))}
      </div>

      {/* Edit dialog */}
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
