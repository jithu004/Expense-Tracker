"use client";
import React, { useEffect, useState, useCallback, useMemo } from "react";
import { getTransactions } from "@/app/actions/getTransactions";
import { Card, CardContent } from "@/components/ui/card";
import FilterBox from "./FilterBox";
import EditTransactionDialog from "./EditTransactionDialog";
import { updateTransaction } from "@/app/actions/updateTransaction";
import { deleteTransaction } from "@/app/actions/deleteTransaction";
import { useSearch } from "../../_context/SearchContext";
import EmptyState from "../../_components/EmptyState";
import { ReceiptText, Download } from "lucide-react";

export default function TransactionsList({ userId, onTransactionCreated }) {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTx, setSelectedTx] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [displayTotals, setDisplayTotals] = useState({ income: 0, expense: 0 });
  const [filters, setFilters] = useState({
    date: "all",
    category: "all",
    type: "all",
  });
  const { searchTerm } = useSearch();

  const resetFilters = () =>
    setFilters({ date: "all", category: "all", type: "all" });

  const handleOpenDialog = (tx) => {
    setSelectedTx(tx);
    setIsDialogOpen(true);
  };

  const handleSave = async (updatedTx) => {
    const res = await updateTransaction(updatedTx);
    if (res.success) await fetchData();
  };

  const handleDelete = async (tx) => {
    const res = await deleteTransaction(tx.id, tx.type);
    if (res.success) await fetchData();
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

  const filteredTransactions = useMemo(() => {
    return transactions.filter((tx) => {
      const searchMatch = searchTerm
        ? tx.title.toLowerCase().includes(searchTerm.toLowerCase())
        : true;
      const typeMatch = filters.type === "all" || tx.type === filters.type;
      const categoryMatch =
        filters.category === "all" ||
        tx.category?.toLowerCase() === filters.category;
      let dateMatch = true;
      const txDate = new Date(tx.date);
      if (filters.date === "today") {
        dateMatch = txDate.toDateString() === new Date().toDateString();
      } else if (filters.date === "week") {
        dateMatch = isThisWeek(txDate);
      } else if (filters.date === "month") {
        const now = new Date();
        dateMatch =
          txDate.getMonth() === now.getMonth() &&
          txDate.getFullYear() === now.getFullYear();
      }
      return searchMatch && typeMatch && categoryMatch && dateMatch;
    });
  }, [transactions, searchTerm, filters]);

  useEffect(() => {
    let income = 0;
    let expense = 0;
    filteredTransactions.forEach((tx) => {
      if (tx.type === "income") income += Number(tx.amount);
      else expense += Number(tx.amount);
    });
    setDisplayTotals({ income, expense });
  }, [filteredTransactions]);

  const exportToCSV = () => {
    const headers = ["Date", "Name", "Type", "Category", "Amount"];
    const rows = filteredTransactions.map((tx) => [
      new Date(tx.date).toLocaleDateString(),
      tx.title,
      tx.type,
      tx.category,
      tx.amount,
    ]);
    const csv = [headers, ...rows].map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `transactions_${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4">
      {/* Summary cards */}
      <div className="flex items-center justify-between gap-3">
        <Card className="flex-1 bg-slate-100 dark:bg-slate-800 shadow-sm rounded-xl border-green-300">
          <CardContent className="p-3 text-center">
            <h2 className="text-sm font-medium text-black dark:text-white">
              Income
            </h2>
            <p className="text-lg font-bold text-green-700">
              +₹{displayTotals.income.toLocaleString("en-IN")}
            </p>
          </CardContent>
        </Card>
        <Card className="flex-1 bg-slate-100 dark:bg-slate-800 shadow-sm rounded-xl border-red-300">
          <CardContent className="p-3 text-center">
            <h2 className="text-sm font-medium text-black dark:text-white">
              Expenses
            </h2>
            <p className="text-lg font-bold text-red-600">
              -₹{displayTotals.expense.toLocaleString("en-IN")}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters + Export */}
      <div className="space-y-2">
        <FilterBox
          filters={filters}
          setFilters={setFilters}
          resetFilters={resetFilters}
        />
        <div className="flex justify-end">
          <button
            onClick={exportToCSV}
            className="flex items-center gap-2 text-sm text-indigo-600
                       border border-indigo-300 px-3 py-1.5 rounded-md
                       hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors"
          >
            <Download className="h-4 w-4" />
            Export CSV
          </button>
        </div>
      </div>

      {/* Transaction list */}
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
            <div
              key={`${tx.type}-${tx.id}`}
              onClick={() => handleOpenDialog(tx)}
              className="cursor-pointer bg-white dark:bg-slate-800 rounded-xl shadow-sm
                         border border-slate-100 dark:border-slate-700
                         hover:shadow-md hover:border-indigo-200 dark:hover:border-indigo-700
                         transition-all duration-200 p-4 flex items-center justify-between gap-3"
            >
              {/* Left: icon + details */}
              <div className="flex items-center gap-3">
                <div
                  className={`p-2.5 rounded-full shrink-0
                  ${
                    tx.type === "income"
                      ? "bg-green-100 dark:bg-green-900/30"
                      : "bg-red-100 dark:bg-red-900/30"
                  }`}
                >
                  <span className="text-lg">
                    {tx.type === "income"
                      ? "💰"
                      : tx.category === "Food"
                        ? "🍔"
                        : tx.category === "Shopping"
                          ? "🛍️"
                          : tx.category === "Travel"
                            ? "✈️"
                            : tx.category === "Entertainment"
                              ? "🎬"
                              : tx.category === "Bills"
                                ? "📄"
                                : tx.category === "Health"
                                  ? "💊"
                                  : tx.category === "Education"
                                    ? "📚"
                                    : "💸"}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-sm text-gray-800 dark:text-gray-100">
                    {tx.title}
                  </p>
                  <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                    <span className="text-xs text-gray-400">
                      {new Date(tx.date).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full font-medium
                      ${
                        tx.type === "income"
                          ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                          : "bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300"
                      }`}
                    >
                      {tx.category}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right: amount */}
              <div className="text-right shrink-0">
                <p
                  className={`font-bold text-base ${
                    tx.type === "income" ? "text-green-600" : "text-red-500"
                  }`}
                >
                  {tx.type === "expense" ? "-" : "+"}₹
                  {Number(tx.amount).toLocaleString("en-IN")}
                </p>
                <p className="text-xs text-gray-400 capitalize">{tx.type}</p>
              </div>
            </div>
          ))
        ) : (
          <EmptyState
            icon={ReceiptText}
            title={
              transactions.length === 0
                ? "No Transactions Yet"
                : "No Matching Transactions"
            }
            subtitle={
              transactions.length === 0
                ? "Click 'Add Transaction' above to get started."
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
