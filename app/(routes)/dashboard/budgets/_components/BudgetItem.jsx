import React from "react";

function BudgetItem({ budget }) {
  const progress =
    budget.amount > 0 ? (budget.totalspend / budget.amount) * 100 : 0;

  return (
    <div className="p-5 border rounded-lg hover:shadow-md cursor-pointer bg-white dark:bg-slate-900">
      <div className="flex gap-2 items-center justify-between">
        <div className="flex gap-2 items-center">
          <h2 className="text-2xl px-4 p-2 bg-slate-100 dark:bg-slate-700 rounded-full">
            {budget?.icon}
          </h2>
          <div>
            <h2 className="font-bold">{budget?.name}</h2>
            <h2 className="text-sm text-gray-500">
              {budget.totalItem} item(s)
            </h2>
          </div>
        </div>
        <h2 className="font-bold text-primary text-lg">₹{budget.amount}</h2>
      </div>
      <div className="mt-5">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm text-slate-400">
            ₹{budget.totalspend ? budget.totalspend : 0} Spent
          </h2>
          <h2 className="text-sm text-slate-400">
            ₹{budget.amount - (budget.totalspend ? budget.totalspend : 0)}{" "}
            Remaining
          </h2>
        </div>
        <div className="w-full bg-slate-300 dark:bg-slate-700 h-2 rounded-full">
          <div
            className={`h-2 rounded-full transition-all duration-500
              ${
                progress >= 100
                  ? "bg-red-500"
                  : progress >= 80
                    ? "bg-orange-400"
                    : progress >= 50
                      ? "bg-yellow-400"
                      : "bg-indigo-500"
              }`}
            style={{ width: `${progress > 100 ? 100 : progress}%` }}
          ></div>
        </div>

        {/* Status badges — added right after progress bar */}
        {progress >= 100 && (
          <p className="text-xs text-red-500 font-semibold mt-1 flex items-center gap-1">
            ⚠️ Over budget!
          </p>
        )}
        {progress >= 80 && progress < 100 && (
          <p className="text-xs text-orange-500 font-medium mt-1">
            🔶 Almost at limit
          </p>
        )}
      </div>
    </div>
  );
}

export default BudgetItem;
