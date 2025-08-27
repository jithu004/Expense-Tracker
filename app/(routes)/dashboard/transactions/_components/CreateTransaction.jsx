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
// FIX: Import 'buttonVariants' from the button component and 'cn' utility
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
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
import { Plus } from "lucide-react";

function CreateTransaction({ onTransactionCreated }) {
  const { user } = useUser();

  const [type, setType] = useState("expense");
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [customCategory, setCustomCategory] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [budgetId, setBudgetId] = useState(null);
  const [budgets, setBudgets] = useState([]);

  const incomeCategories = ["Salary", "Business", "Gift", "Investment"];
  const expenseCategories = [
    "Food",
    "Travel",
    "Shopping",
    "Bills",
    "Entertainment",
  ];

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
      name:
        name || (type === "income" ? "Untitled Income" : "Untitled Expense"),
      amount: Number(amount),
      category: finalCategory || "General",
      date,
      createdBy: user?.primaryEmailAddress?.emailAddress,
      budgetId: type === "expense" ? budgetId : null,
    };
    const res = await createTransaction(payload);
    if (res.success) {
      if (onTransactionCreated) onTransactionCreated(res.transaction);
      setName("");
      setAmount("");
      setCategory("");
      setCustomCategory("");
      setBudgetId(null);
      setDate(new Date().toISOString().split("T")[0]);
    } else {
      console.error(res.error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {/* FIX: Replaced the <Button> component with a standard <button> tag */}
        <button
          className={cn(
            buttonVariants({ size: "icon" }),
            `h-20 w-20 rounded-full bg-indigo-600 shadow-lg
             hover:rounded-xl hover:bg-indigo-700
             transition-all duration-300 ease-in-out
             animate-pulse-glow`
          )}
        >
          <Plus className="size-10" strokeWidth={3} />
        </button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Transaction</DialogTitle>
          <DialogDescription>
            Add details about your new transaction below
          </DialogDescription>
        </DialogHeader>
        <div className="mt-5 space-y-4">
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
          <Input
            type="text"
            placeholder="Name (e.g. Salary, Dinner at restaurant)"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
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
          {category === "custom" && (
            <Input
              type="text"
              placeholder="Enter custom category"
              value={customCategory}
              onChange={(e) => setCustomCategory(e.target.value)}
            />
          )}
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