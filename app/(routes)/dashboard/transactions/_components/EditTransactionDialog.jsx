"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function EditTransactionDialog({
  open,
  onClose,
  transaction,
  onSave,
  onDelete,
}) {
  const [form, setForm] = React.useState(transaction || {});

  React.useEffect(() => {
    setForm(transaction || {});
  }, [transaction]);
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSave = () => {
    onSave(form);
    toast.success("Transaction updated successfully!");
    onClose();
    };
  const handleDelete = () => {
  onDelete(transaction);
   toast.error("Transaction deleted!");
  onClose();
};
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="rounded-2xl">
        <DialogHeader>
          <DialogTitle>Edit Transaction</DialogTitle>
        </DialogHeader>

        {/* Form Fields */}
        <div className="space-y-4 mt-2">
          <Input
            name="title"
            value={form.title || ""}
            onChange={handleChange}
            placeholder="Title"
          />
          <Input
            name="amount"
            type="number"
            value={form.amount || ""}
            onChange={handleChange}
            placeholder="Amount"
          />
          <Input
            name="category"
            value={form.category || ""}
            onChange={handleChange}
            placeholder="Category"
          />
        </div>

        <DialogFooter className="flex justify-between mt-4">
          {/* Delete with confirmation */}
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">Delete</Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="rounded-2xl">
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. The transaction will be
                  permanently deleted.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  className="bg-red-600 hover:bg-red-700"
                  onClick={() => handleDelete(transaction)}
                >
                  Yes, Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          {/* Save button */}
          <Button onClick={handleSave}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default EditTransactionDialog;
