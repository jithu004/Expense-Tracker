"use client";
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUser } from "@clerk/nextjs";
import { getBudgetList } from "@/app/actions/getBudgetList";
import { createTransaction } from "@/app/actions/createTransaction";



function CreateTransaction({ onTransactionCreated }) {
  const { user } = useUser();
  
  const [type, setType] = useState("income"); // income | expense
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [customCategory, setCustomCategory] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [budgetId, setBudgetId] = useState(null);
  const [budgets, setBudgets] = useState([]);

  // predefined categories
  const incomeCategories = ["Salary", "Business", "Gift", "Investment"];
  const expenseCategories = [
    "Food",
    "Travel",
    "Shopping",
    "Bills",
    "Entertainment",
  ];

  // Fetch budgets for dropdown
  useEffect(() => {
    if (user) fetchBudgets();
  }, [user]);

  const fetchBudgets = async () => {
    const result = await getBudgetList(user?.primaryEmailAddress?.emailAddress);
    setBudgets(result);
  };


  
  const handleSubmit = async () => {
    if (!amount) return;

    const finalCategory = category === "custom" ? customCategory : category;

    const payload = {
      type,
      name: name || (type === "income" ? "Untitled Income" : "Untitled Expense"),
      amount: Number(amount),
      category: finalCategory || "General",
      date, // ✅ now backend will use this
      createdBy: user?.primaryEmailAddress?.emailAddress,
      budgetId: type === "expense" ? budgetId : null,
    };

    const res = await createTransaction(payload);

    if (res.success) {
      console.log("Transaction created:", res.transaction);

      // 🔥 Refresh parent transaction list
      if (onTransactionCreated) onTransactionCreated(res.transaction);

      // Reset fields
      setName("");
      setAmount("");
      setCategory("");
      setCustomCategory("");
      setBudgetId(null);
      setDate(new Date().toISOString().split("T")[0]); // reset to today
    } else {
      console.error(res.error);
    }
  };



  return (
    <Dialog>
      <DialogTrigger>
        <div className="h-[40px] w-[100px] rounded-xl bg-primary hover:bg-indigo-300 cursor-pointer flex flex-col items-center mb-5 mr-5 z-10">
          <h2 className="text-white font-bold text-2xl hover:text-indigo-800">
            +
          </h2>
        </div>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Transaction</DialogTitle>
          <DialogDescription>
            Add details about your new transaction below
          </DialogDescription>
        </DialogHeader>

        <div className="mt-5 space-y-4">
          {/* Type Toggle */}
          <div className="flex gap-2">
            <Button
              variant={type === "income" ? "default" : "outline"}
              onClick={() => setType("income")}
            >
              Income
            </Button>
            <Button
              variant={type === "expense" ? "default" : "outline"}
              onClick={() => setType("expense")}
            >
              Expense
            </Button>
          </div>

          {/* ✅ Name */}
          <Input
            type="text"
            placeholder="Name (e.g. Salary, Dinner at restaurant)"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          {/* Amount */}
          <Input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          {/* Category dropdown */}
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
              {(type === "income" ? incomeCategories : expenseCategories).map(
                (cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                )
              )}
              <SelectItem value="custom">Custom</SelectItem>
            </SelectContent>
          </Select>

          {/* Custom Category input */}
          {category === "custom" && (
            <Input
              type="text"
              placeholder="Enter custom category"
              value={customCategory}
              onChange={(e) => setCustomCategory(e.target.value)}
            />
          )}

          {/* Budget dropdown (only for Expense) */}
          {type === "expense" && (
            <Select onValueChange={setBudgetId} value={budgetId || ""}>
              <SelectTrigger>
                <SelectValue placeholder="Select Budget" />
              </SelectTrigger>
              <SelectContent>
                {budgets?.map((budget) => (
                  <SelectItem key={budget.id} value={budget.id.toString()}>
                    {budget.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}

          {/* Date */}
          <Input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button disabled={!amount} onClick={handleSubmit}>
              Create
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default CreateTransaction;
