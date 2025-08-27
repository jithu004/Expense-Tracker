"use client";
import React, { useState } from "react";
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
import EmojiPicker from "emoji-picker-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { createBudget } from "@/app/actions/createBudgets";
import { useUser } from "@clerk/nextjs";

function CreateBudget({ refreshData }) {
  const { user } = useUser();
  const [emojiIcon, setEmojiIcon] = useState("🙂");
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
  
  // FIX: Initialize state with an empty string to make inputs controlled
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");

  const onCreateBudget = async () => {
    const result = await createBudget({
      name,
      amount,
      createdBy: user?.primaryEmailAddress?.emailAddress,
      icon: emojiIcon,
    });

    if (result) {
      refreshData();
      toast("New Budget Created!");
      // Also reset the state after creation
      setName("");
      setAmount("");
      setEmojiIcon("🙂");
    }
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <div className="bg-slate-100 dark:bg-slate-800 p-10 rounded-md items-center flex flex-col cursor-pointer hover:shadow-md border-2 border-dashed dark:border-slate-700">
            <h2 className="text-3xl dark:text-white">+</h2>
            <h2 className="dark:text-white">Create Budget</h2>
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Budget</DialogTitle>
            <DialogDescription>
              Add details about your new budget below.
            </DialogDescription>
          </DialogHeader>

          <div className="mt-5 space-y-4">
            <div>
              <Button
                onClick={() => setOpenEmojiPicker(!openEmojiPicker)}
                variant={"outline"}
                size="lg"
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
              <h2 className="text-black dark:text-white my-1 font-medium">Budget Name</h2>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g Room Decor"
              />
            </div>

            <div>
              <h2 className="text-black dark:text-white my-1 font-medium">Budget Amount</h2>
              <Input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="e.g 5000"
              />
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button
                onClick={onCreateBudget}
                disabled={!(name && amount)}
                className="mt-5 w-full"
              >
                Create Budget
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateBudget;