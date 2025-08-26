"use client";
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import EmojiPicker from "emoji-picker-react";
import { toast } from "sonner";
import { updateBudget } from "@/app/actions/updateBudget";
import { deleteBudget } from "@/app/actions/deleteBudget";

function EditBudget({ budget, open, onClose, onUpdate }) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [emojiIcon, setEmojiIcon] = useState("");
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);

  useEffect(() => {
    if (budget) {
      setName(budget.name);
      setAmount(budget.amount);
      setEmojiIcon(budget.icon);
    }
  }, [budget]);

  const handleUpdateBudget = async () => {
    const updatedData = { name, amount, icon: emojiIcon };
    const result = await updateBudget(budget, updatedData);
    if (result.success) {
      toast.success("Budget updated successfully!");
      onUpdate();
      onClose();
    } else {
      toast.error(result.error);
    }
  };

  const handleDeleteBudget = async () => {
    const result = await deleteBudget(budget.id);
    if (result.success) {
      toast.error("Budget deleted!");
      onUpdate();
      onClose();
    } else {
      toast.error(result.error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Budget</DialogTitle>
        </DialogHeader>
        <div className="mt-5 space-y-4">
          <div>
            <Button
              variant="outline"
              size="lg"
              onClick={() => setOpenEmojiPicker(!openEmojiPicker)}
            >
              {emojiIcon}
            </Button>
            {openEmojiPicker && (
              <div className="absolute z-50">
                <EmojiPicker
                  onEmojiClick={(e) => {
                    setEmojiIcon(e.emoji);
                    setOpenEmojiPicker(false);
                  }}
                />
              </div>
            )}
          </div>
          <div>
            <h2 className="text-black dark:text-white my-1 font-medium">
              Budget Name
            </h2>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Groceries"
            />
          </div>
          <div>
            <h2 className="text-black dark:text-white my-1 font-medium">
              Budget Amount
            </h2>
            <Input
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              placeholder="e.g., 5000"
            />
          </div>
        </div>
        <DialogFooter className="flex justify-between mt-4">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">Delete</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will permanently delete your budget and all associated
                  expenses.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  className="bg-red-600 hover:bg-red-700"
                  onClick={handleDeleteBudget}
                >
                  Yes, Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <Button onClick={handleUpdateBudget} disabled={!(name && amount)}>
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default EditBudget;