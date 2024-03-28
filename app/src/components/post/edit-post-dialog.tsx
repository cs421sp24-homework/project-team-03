import React, { useState } from "react";
import { Button } from "@/components/ui/button";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import useMutationPosts from "@/hooks/use-mutations-posts";
import { PostWithUserData } from "@/lib/types";
import { PostType } from "@/lib/types";

export const EditPostDialog = ({
  post,
  setDropdownState,
}: {
  post: PostWithUserData;
  setDropdownState: (b: boolean) => void;
}) => {
  const [newTitle, setNewTitle] = useState(post.title);
  const [newContent, setNewContent] = useState(post.content);
  const [newCost, setNewCost] = useState(post.cost);
  const [newAddress, setNewAddress] = useState(post.address);
  const [newType, setNewType] = useState(post.type);
  
  const { editPostById } = useMutationPosts();
  const { toast } = useToast();
  const [dialogueState, setDialogueState] = useState(false);

  const handleSave = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    if (!newTitle || !newContent || !newAddress) {
      toast({
        variant: "destructive",
        title: "Sorry! Fields cannot be empty! 🙁",
        description: "Please fill out all fields for your post.",
      });
      return;
    }

    await editPostById(post.id, newTitle, newContent, newCost, newAddress, newType );
    setNewTitle("");
    setNewContent("");
    setNewAddress("");
    setNewCost(0);
    setDropdownState(false);
    setDialogueState(false);
  };

  const handleCancel = (event: React.SyntheticEvent) => {
    event.preventDefault();
    setNewTitle(post.title);
    setNewContent(post.content);
    setNewAddress(post.address);
    setNewCost(post.cost);
    setDropdownState(false);
    setDialogueState(false);
  };

  return (
    <Dialog open={dialogueState} onOpenChange={setDialogueState}>
      <DialogTrigger asChild>
        <Button aria-label="Edit Post" variant="ghost" size="sm">
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Post</DialogTitle>
          <DialogDescription>
            Edit the title and content of your post here.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid items-center grid-cols-4 gap-4">
            <Label htmlFor="newTitle" className="text-right">
              New Title
            </Label>
            <Input
              id="newTitle"
              value={newTitle}
              className="col-span-3"
              onChange={(e) => {
                setNewTitle(e.target.value);
              }}
            />
          </div>
          <div className="grid items-center grid-cols-4 gap-4">
            <Label htmlFor="newContent" className="text-right">
              New Content
            </Label>
            <Textarea
              id="newContent"
              value={newContent}
              className="col-span-3"
              onChange={(e) => {
                setNewContent(e.target.value);
              }}
            />
          </div>
            <div className="grid items-center grid-cols-4 gap-4">
              <Label htmlFor="cost">New Cost
                <div>(Please enter an integer)</div>
              </Label>
              <Input
                id="cost"
                type="number"
                onChange={(e) => setNewCost(Number(e.target.value))}
              />
          </div>
          <div className="grid items-center grid-cols-4 gap-4">
              <Label htmlFor="address"> New Address</Label>
              <Textarea
                id="address"
                value={newAddress}
                className="col-span-4"
                style={{ resize: 'none' }}
                placeholder="Type your address here."
                onChange={(e) => {
                  setNewAddress(e.target.value);
                }}
              />
            </div>

            <div className="grid items-center grid-cols-4 gap-4">
              <Label htmlFor="type">New Type</Label>
              <select
                id="type"
                className="col-span-4"
                onChange={(e) => {
                  setNewType(e.target.value as PostType);
                }}
              >
                <option value="">Select a post type...</option>
                <option id="Roommate" value="Roommate">Looking for Roommate</option>
                <option id="Sublet" value="Sublet">Looking for Subletter</option>
                <option id="Housing" value="Housing">Looking for Housing</option>
              </select>
            </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary" type="reset" onClick={handleCancel}>
              Cancel
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button type="submit" onClick={handleSave}>
              Save
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
