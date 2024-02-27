
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
import { Textarea } from "../ui/textarea";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import useMutationPosts from "@/hooks/use-mutations-posts";
import { useToast } from "@/components/ui/use-toast";
import { useStore } from "@/lib/store";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";

export const AddPostDialog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [cost, setCost] = useState(0);
  const [address, setAddress] = useState("");
  const [type, setType] = useState(null);
  const [image, setImage] = useState("");
  const { makeNewPost } = useMutationPosts();
  const { toast } = useToast();
  const user = useStore((state) => state.user);

  const handleSave = async () => {
    if (!title || !content || !cost || !address || !type) {
      toast({
        variant: "destructive",
        title: "Sorry! Content cannot be empty! 🙁",
        description: `Please enter the missing fields of the post.`,
      });
      return;
    }
    await makeNewPost(title, content, cost, address, type, image);
    setTitle("");
    setContent("");
    setCost(0);
    setAddress("");

  };

  const handleCancel = () => {
    setContent("");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button aria-label={"Make a Post"} variant="default" size="sm">
          <PlusCircledIcon className="w-5 h-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Add Post</DialogTitle>
          <DialogDescription>
            {user
              ? "Provide the content of your post here."
              : "Please login to make a post."}
          </DialogDescription>
        </DialogHeader>
        {user && (
          <div className="grid gap-4 py-4">
            {/* Other form fields */}
            <div className="grid items-center grid-cols-4 gap-4">
              {/* Checkbox for selecting post type */}
              <Checkbox
                id="type"
                value="looking for roommate"
                onChange={(e) => {
                  setType(e.target.value);
                }}
              />
              <label htmlFor="type">Looking for Roommate</label>
              <Checkbox
                id="type"
                value="looking for subletter"
                onChange={(e) => {
                  setType(e.target.value);
                }}
              />
              <label htmlFor="type">Looking for Subletter</label>
              <Checkbox
                id="type"
                value="looking for housing"
                onChange={(e) => {
                  setType(e.target.value);
                }}
              />
              <label htmlFor="type">Looking for Housing</label>
            </div>
            {/* Textarea and other form fields */}
          </div>
        )}
        {user && (
          <div className="grid gap-4 py-4">
            <div className="grid items-center grid-cols-4 gap-4">
              <Textarea
                id="content"
                value={content}
                className="col-span-4"
                onChange={(e) => {
                  setContent(e.target.value);
                }}
              />
            </div>
          </div>
        )}
        <DialogFooter>
          {!user && (
            <DialogClose asChild>
              <Button>Okay</Button>
            </DialogClose>
          )}
          {user && (
            <DialogClose asChild>
              <Button variant={"secondary"} type="reset" onClick={handleCancel}>
                Cancel
              </Button>
            </DialogClose>
          )}
          {user && (
            <DialogClose asChild>
              <Button type="submit" onClick={handleSave}>
                Save
              </Button>
            </DialogClose>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
