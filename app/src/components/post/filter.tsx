import { Button } from "@/components/catalog/button";
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
import { fetchPosts } from "@/lib/api";
import { Label } from "@radix-ui/react-label";
import { useState } from "react";
import { useStore } from "@/lib/store";
import { PostType } from "@/lib/types";
import { Input } from "../ui/input";

const DeckActions = () => {
  const [cost, setCost] = useState(0);
  const [type, setType] = useState<PostType | null>(null);
  const setFilteredPosts = useStore((state) => state.setPosts);

  const handleSave = async () => {
    // Condition where no filters are applied but submitted
    const posts = await fetchPosts();
    let filteredPosts = posts;

    // Apply filtering based on cost
    if (cost > 0) {
      filteredPosts = posts.filter(post => post.cost <= cost);
    }
    if (type !== null) {
      filteredPosts = filteredPosts.filter(post => post.type === type);
    }
    setFilteredPosts(filteredPosts);
  };

  const handleCancel = () => {
    setCost(0);
    setType(null);
  };

  const handleResetClick = () => {
    // Call the API method when the button is clicked
    fetchPosts()
        .then(response => {
            // Handle the response if necessary
            setFilteredPosts(response);
            console.log(response);
        })
        .catch(error => {
            // Handle errors if necessary
            console.error('Error fetching housing items:', error);
        });
};

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button aria-label={"Filter"} variant="default" size="sm">
            Filter
          </Button>
        </DialogTrigger>
        <Button
            aria-label={"Reset"}
            variant="default"
            size="sm"
            style={{ backgroundColor: '#c62828', color: 'white', marginLeft: '10px' }} 
            onClick={handleResetClick}
          >
            Reset
          </Button>
        <DialogContent className="sm:max-w-[525px]" style={{ maxHeight: '600px', overflowY: 'auto' }}>
          <DialogHeader>
            <DialogTitle>Filter Options</DialogTitle>
            <DialogDescription>
              Adjust filters as needed.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
          <div className="grid gap-4 py-4">
            <div className="grid items-center grid-cols-4 gap-4">
              <Label htmlFor="cost">Cost 
                <div>(Please enter an integer)</div>
              </Label>
              <Input
                type="number"
                onChange={(e) => setCost(Number(e.target.value))}
              />
            </div>
          </div>
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
          <DialogClose asChild>
            <DialogFooter>
              <Button onClick={handleSave}>
                  Submit
                </Button>
              <Button variant={"secondary"} type="reset" onClick={handleCancel}>Close</Button>
            </DialogFooter>
          </DialogClose>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DeckActions;
