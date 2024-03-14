
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
import { PostType } from "@/lib/types";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

export const AddPostDialog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [cost, setCost] = useState(0);
  const [address, setAddress] = useState("");
  const [type, setType] = useState<PostType | null>(null);
  const [image, setImage] = useState<string>("");
  const { makeNewPost } = useMutationPosts();
  const { toast } = useToast();
  const user = useStore((state) => state.user);

  const handleSave = async () => {
    if (!title || !content || !address || !type) {
      toast({
        variant: "destructive",
        title: "Sorry! All fields (except Image URL) must be completed! 🙁",
        description: `Please enter the missing fields of the post.`,
      });
      handleCancel()
      return;
    }
    if (cost === 0 || cost < 0) {
      toast({
        variant: "destructive",
        title: "Sorry! The cost must be a valid number! 🙁",
        description: `Please enter an integer, greater than 0`,
      });
      handleCancel()
      return;
    }
    await makeNewPost(title, content, cost, address, type, image);
    setImage("");
    setTitle("");
    setContent("");
    setCost(0);
    setAddress("");
  };

  const handleCancel = () => {
    setImage("");
    setTitle("");
    setContent("");
    setCost(0);
    setAddress("");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button id="add-post-button" aria-label={"Make a Post"} variant="default" size="sm">
          <PlusCircledIcon className="w-5 h-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]" style={{ maxHeight: '600px', overflowY: 'auto' }}>
        <DialogHeader>
          <DialogTitle>Add Post</DialogTitle>
          <DialogDescription>
            {user
              ? "Provide the information of your post here."
              : "Please login to make a post."}
          </DialogDescription>
        </DialogHeader>
        {user && (
          <div className="grid gap-4 py-4">
            {/* Other form fields */}
            <div className="grid items-center grid-cols-4 gap-4">
              <Label htmlFor="type">Type</Label>
              <select
                id="type"
                className="col-span-4"
                onChange={(e) => {
                  setType(e.target.value as PostType);
                }}
              >
                <option value="">Select a post type...</option>
                <option value="Roommate">Looking for Roommate</option>
                <option value="Sublet">Looking for Subletter</option>
                <option value="Housing">Looking for Housing</option>
              </select>
            </div>
            {/* Textarea and other form fields */}
          </div>
        )}
        {user && (
          <div className="grid gap-4 py-4">
            <div className="grid items-center grid-cols-4 gap-4">
              <Label htmlFor="title">Title</Label>
              <Textarea
                id="title"
                value={title}
                className="h-0 col-span-4"
                style={{ resize: 'none' }}
                placeholder="Type your title here."
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
            </div>
          </div>
        )}
        {user && (
          <div className="grid gap-4 py-4">
            <div className="grid items-center grid-cols-4 gap-4">
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                value={content}
                className="col-span-4 h-30"
                style={{ resize: 'none' }}
                placeholder="Type your content here."
                onChange={(e) => {
                  setContent(e.target.value);
                }}
              />
            </div>
          </div>
        )}
        {/* {user && (
          <div className="grid gap-4 py-4">
            <div className="grid items-center grid-cols-4 gap-4">
              <Label htmlFor="image">Image URL (Optional)</Label>
              <Textarea
                id="image"
                value={image}
                className="h-0 col-span-4"
                style={{ resize: 'none' }}
                placeholder="Type your URL here."
                onChange={(e) => {
                  setImage(e.target.value);
                  console.log(e.target.value)
                }}
              />
            </div>
          </div>
        )} */}
        {user && (
          <div className="grid gap-4 py-4">
            <div className="grid items-center grid-cols-4 gap-4">
              <Label htmlFor="cost">Cost 
                <div>(Please enter an integer)</div>
              </Label>
              <Input
                id="cost"
                type="number"
                onChange={(e) => setCost(Number(e.target.value))}
              />
            </div>
          </div>
        )}
        {user && (
          <div className="grid gap-4 py-4">
            <div className="grid items-center grid-cols-4 gap-4">
              <Label htmlFor="address">Address</Label>
              <Textarea
                id="address"
                value={address}
                className="col-span-4"
                style={{ resize: 'none' }}
                placeholder="Type your address here."
                onChange={(e) => {
                  setAddress(e.target.value);
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
                Submit
              </Button>
            </DialogClose>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
