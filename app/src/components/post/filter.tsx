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
import { fetchHousingItems, fetchPosts } from "@/lib/api";
import { Label } from "@radix-ui/react-label";
import { useState } from "react";
import { useStore } from "@/lib/store";

const Filters = () => {
  const [type, setType] = useState("");
  const setPosts = useStore((state) => state.setPosts);

  const handleSave = async () => {
    try {
      // Construct query string based on filter options
      let query = '';
      if (type) {
        query += `type=${type}`;
      }

      // Fetch housing items with the constructed query
      const postItems = await fetchPosts(query);

      // Update housing items in the store
      setPosts(postItems);
    } catch (error) {
      console.error('Error fetching housing items:', error);
    }
  };

  const handleCancel = () => {
    setType("");
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
