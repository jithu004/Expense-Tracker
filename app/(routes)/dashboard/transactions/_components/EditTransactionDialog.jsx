"use client";
import React, { useState, useEffect } from "react";
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
import { useRole } from "../../_context/RoleContext";

function EditTransactionDialog({
  open,
  onClose,
  transaction,
  onSave,
  onDelete,
}) {
  // ALL hooks must be at the top — never after a conditional return
  const { role } = useRole();
  const [form, setForm] = useState(transaction || {});

  useEffect(() => {
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
          <DialogTitle>
            {role === "viewer" ? "Transaction Details" : "Edit Transaction"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-2">
          <Input
            name="title"
            value={form.title || ""}
            onChange={handleChange}
            placeholder="Title"
            disabled={role === "viewer"}
          />
          <Input
            name="amount"
            type="number"
            value={form.amount || ""}
            onChange={handleChange}
            placeholder="Amount"
            disabled={role === "viewer"}
          />
          <Input
            name="category"
            value={form.category || ""}
            onChange={handleChange}
            placeholder="Category"
            disabled={role === "viewer"}
          />
        </div>

        <DialogFooter className="flex justify-between mt-4">
          {role === "admin" ? (
            <>
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
                      onClick={handleDelete}
                    >
                      Yes, Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
              <Button onClick={handleSave}>Save</Button>
            </>
          ) : (
            // Viewer — close button only
            <Button variant="outline" onClick={onClose} className="ml-auto">
              Close
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default EditTransactionDialog;
