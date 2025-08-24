"use client";
import React, { useEffect, useState } from "react";
import { getTransactions } from "@/app/actions/getTransactions";
import { Card, CardContent } from "@/components/ui/card";

export default function TransactionsList({ userId }) {
  const [transactions, setTransactions] = useState([]);
  const [totals, setTotals] = useState({ income: 0, expense: 0 });

  useEffect(() => {
    async function fetchData() {
      if (!userId) return;

      const result = await getTransactions(userId);

      setTransactions(result.transactions || []);
      setTotals({
        income: result.totalIncome || 0,
        expense: result.totalExpenses || 0,
      });
    }

    fetchData();
  }, [userId]);

  return (
    <div className="p-6 space-y-6">
      {/* Totals */}
      <div className="grid grid-cols-2 gap-6">
        <Card className="bg-slate-100 shadow-md rounded-2xl border-green-300">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold text-black">
              Total Income
            </h2>
            <p className="text-2xl font-bold mt-2 text-black">
              +₹{totals.income}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-slate-100 shadow-md rounded-2xl border-red-300">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold text-black">
              Total Expenses
            </h2>
            <p className="text-2xl font-bold mt-2 text-black">
              -₹{totals.expense}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Transaction Cards */}
      <div className="space-y-4">
        {transactions.length === 0
          ? [1, 2, 3, 4, 5].map((item, index) => {
              return (
                <div
                  key={index}
                  className="w-full bg-slate-200 rounded-2xl h-[100px] animate-pulse"
                />
              );
            })
          : transactions.map((tx) => (
              <Card
                key={`${tx.type}-${tx.id}`}
                className={`shadow-md rounded-2xl ${
                  tx.type === "income"
                    ? "bg-white border border-green-300"
                    : "bg-white border border-red-300"
                }`}
              >
                <CardContent className="p-4 flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-semibold">{tx.title}</h3>
                    <p className="text-sm text-gray-500">
                      {new Date(tx.date).toLocaleDateString()}
                    </p>
                  </div>
                  <p
                    className={`text-xl font-bold ${
                      tx.type === "income" ? "text-shadow-black" : "text-shadow-black"
                    }`}
                  >
                    ₹{tx.amount}
                  </p>
                </CardContent>
              </Card>
            ))}
      </div>
    </div>
  );
}
