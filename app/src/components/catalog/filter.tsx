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
import { fetchHousingItems } from "@/lib/api";
import { Label } from "@radix-ui/react-label";
import { useState } from "react";
import { useStore } from "@/lib/store";

const Filters = () => {
  const [distance, setDistance] = useState(1);
  const [price, setPrice] = useState("");
  const setHousingItems = useStore((state) => state.setHousingItems);

  const handleSave = async () => {
    try {
      // Construct query string based on filter options
      let query = '';
      if (price) {
        query += `&price=${price}`;
      }
      if (distance) {
        query += `&maxDistance=${distance}`;
      }

      // Fetch housing items with the constructed query
      const housingItems = await fetchHousingItems(query);

      // Update housing items in the store
      setHousingItems(housingItems);
    } catch (error) {
      console.error('Error fetching housing items:', error);
    }
  };

  const handleCancel = () => {
    setDistance(1);
    setPrice("");
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
          <Label htmlFor="price" className="col-span-2">Max Price</Label>
          <select
            id="price"
            value={price}
            onChange={(e) => {
              setPrice(e.target.value);
            }}
            className="h-8 col-span-4"
          >
            <option value="">All</option>
            <option value="$">Low ($)</option>
            <option value="$$">Medium ($$)</option>
            <option value="$$$">High ($$$)</option>
          </select>
        </div>
            <div className="grid items-center grid-cols-4 gap-4">
              <Label htmlFor="distance"> Max Distance (Miles)</Label>
              <input
                type="number"
                id="distance"
                value={distance}
                onChange={(e) => {
                  setDistance(Number(e.target.value));
                }}
                min="0"
                step="0.1"
                className="h-8 col-span-4 px-2 border rounded-md"
              />
            </div>
            
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

export default Filters;