"use client";
import React, { useEffect, useState } from "react";
import CreateBudget from "./CreateBudget";
import { useUser } from "@clerk/nextjs";
import { getBudgetList } from "../../../../actions/getBudgetList";
import BudgetItem from "./BudgetItem";
import EditBudget from "./EditBudget";
import { useSearch } from "@/app/(routes)/dashboard/_context/SearchContext";
import EmptyState from "../../_components/EmptyState"; // Import the new component
import { PiggyBank } from "lucide-react";

function BudgetList() {
  const [budgetList, setBudgetList] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const [selectedBudget, setSelectedBudget] = useState(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const { user } = useUser();
  const { searchTerm } = useSearch();

  useEffect(() => {
    if (user) {
      fetchBudgetList();
    }
  }, [user]);

  const fetchBudgetList = async () => {
    setLoading(true);
    const result = await getBudgetList(
      user?.primaryEmailAddress?.emailAddress
    );
    setBudgetList(result);
    setLoading(false);
  };

  const handleBudgetItemClick = (budget) => {
    setSelectedBudget(budget);
    setIsEditDialogOpen(true);
  };

  const filteredBudgetList = searchTerm
    ? budgetList.filter((budget) =>
        budget.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : budgetList;

  return (
    <div className="mt-7">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <CreateBudget refreshData={fetchBudgetList} />
        {loading
          ? [1, 2, 3, 4, 5].map((item, index) => (
              <div
                key={index}
                className="w-full bg-slate-200 rounded-lg h-[150px] animate-pulse"
              ></div>
            ))
          : filteredBudgetList.map((budget) => (
              <div
                key={budget.id}
                onDoubleClick={() => handleBudgetItemClick(budget)}
              >
                <BudgetItem budget={budget} />
              </div>
            ))}
      </div>

      {/* FIX: Show EmptyState when not loading and the list is empty */}
      {!loading && budgetList.length > 0 && filteredBudgetList.length === 0 && (
        <EmptyState
          icon={PiggyBank}
          title="No Budgets Found"
          subtitle="Try adjusting your search or create a new budget."
        />
      )}

      {!loading && budgetList.length === 0 && (
        <EmptyState
          icon={PiggyBank}
          title="No Budgets Created Yet"
          subtitle="Click on 'Create Budget' to get started."
        />
      )}

      <EditBudget
        budget={selectedBudget}
        open={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        onUpdate={fetchBudgetList}
      />
    </div>
  );
}

export default BudgetList;