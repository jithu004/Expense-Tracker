"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function FilterBox({ filters, setFilters, resetFilters }) {
  return (
    <div className="bg-slate-100 shadow-md rounded-2xl p-4 flex flex-wrap gap-4 items-center justify-between">
      {/* Date Filter */}
      <div className="w-[200px]">
        <Select
          value={filters.date}
          onValueChange={(val) => setFilters({ ...filters, date: val })}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Date Range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Time</SelectItem>
            <SelectItem value="today">Today</SelectItem>
            <SelectItem value="week">This Week</SelectItem>
            <SelectItem value="month">This Month</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Category Filter */}
      <div className="w-[200px]">
        <Select
          value={filters.category}
          onValueChange={(val) => setFilters({ ...filters, category: val })}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="food">Food</SelectItem>
            <SelectItem value="entertainment">Entertainment</SelectItem>
            <SelectItem value="shopping">Shopping</SelectItem>
            <SelectItem value="bills">Bills</SelectItem>
            <SelectItem value="others">Others</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Type Filter */}
      <div className="flex gap-2">
        {["all", "income", "expense"].map((type) => (
          <Button
            key={type}
            variant={filters.type === type ? "default" : "outline"}
            onClick={() => setFilters({ ...filters, type })}
            className="capitalize"
          >
            {type}
          </Button>
        ))}
      </div>

      {/* Reset Button */}
      <Button variant="destructive" onClick={resetFilters}>
        Reset
      </Button>
    </div>
  );
}
