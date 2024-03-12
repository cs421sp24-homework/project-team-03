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

const Filters = () => {
  const [type, setType] = useState("");
  const [maxCost, setMaxCost] = useState("");
  const setPosts = useStore((state) => state.setPosts);

  const handleSave = async () => {
    try {
      // Construct query string based on filter options
      let query = '';
      if (type) {
        query += `&type=${type}`;
      }
      if (maxCost) {
        query += `&cost=${maxCost}`;
      }

      // Fetch posts with the constructed query
      const postItems = await fetchPosts(query);

      // Update posts in the store
      setPosts(postItems);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const handleCancel = () => {
    setType("");
    setMaxCost("");
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button aria-label={"Filter"} variant="default" size="sm">
            Filter
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[525px]" style={{ maxHeight: '600px', overflowY: 'auto' }}>
          <DialogHeader>
            <DialogTitle>Filter Options</DialogTitle>
            <DialogDescription>
              Adjust filters as needed.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid items-center grid-cols-4 gap-4">
              <Label htmlFor="type" className="col-span-2">Type</Label>
              <select
                id="type"
                value={type}
                onChange={(e) => {
                  setType(e.target.value);
                }}
                className="h-8 col-span-4"
              >
                <option value="">All</option>
                <option value="Roommate">Roommate</option>
                <option value="Sublet">Sublet</option>
                <option value="Housing">Housing</option>
              </select>
            </div>
            <div className="grid items-center grid-cols-4 gap-4">
              <Label htmlFor="maxCost" className="col-span-2">Max Cost</Label>
              <input
                type="number"
                id="maxCost"
                value={maxCost}
                onChange={(e) => {
                  setMaxCost(Number(e.target.value));
                }}
                min="0"
                step="0.01"
                className="h-8 col-span-4 px-2 border rounded-md"
              />
            </div>
          </div>
          <DialogClose asChild>
            <DialogFooter>
              <Button onClick={handleSave}>Submit</Button>
              <Button variant={"secondary"} type="reset" onClick={handleCancel}>Close</Button>
            </DialogFooter>
          </DialogClose>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Filters;
