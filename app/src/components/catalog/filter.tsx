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
import { fetchHousingItemsWithFilters, fetchHousingItems } from "@/lib/api";
import { Label } from "@radix-ui/react-label";
import { useState } from "react";
import { useStore } from "@/lib/store";
import { useToast } from "../ui/use-toast";

const DeckActions = () => {
  const [rating, setRating] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);
  const [distance, setDistance] = useState(0);
  const [price, setPrice] = useState("");
  const setHousingItems = useStore((state) => state.setHousingItems);
  const { toast } = useToast();

  const handleSave = async () => {
    // Condition where no filters are applied but submitted
    if (rating === 0 && reviewCount === 0 && distance === 0 && price === "") {
      fetchHousingItems();
      return;
    }
    try {
      const newhousingItems = await fetchHousingItemsWithFilters(
        rating !== 0 ? rating : undefined, // Pass null if rating is 0
        reviewCount !== 0 ? reviewCount : undefined, // Pass null if reviewCount is 0
        distance !== 0 ? distance : undefined, // Pass null if distance is 0
        price !== "" ? price : undefined // Pass null if price is empty string
      );
      setHousingItems(newhousingItems);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to load the housing items",
        description:
        (error as Error).message ||
        "There was an error loading the filtered housing items. Please try again later.",
    });
    }
  };

  const handleCancel = () => {
    setRating(0);
    setReviewCount(0);
    setDistance(0);
    setPrice("");
  };

  const handleResetClick = () => {
    // Call the API method when the button is clicked
    fetchHousingItems()
        .then(response => {
            // Handle the response if necessary
            setHousingItems(response);
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
            <div className="grid items-center grid-cols-4 gap-4">
              <Label htmlFor="rating" className="col-span-2">Average Rating <span style={{ color: 'gold' }}>&#9733;</span></Label>
              <input
                type="range"
                id="rating"
                value={rating}
                onChange={(e) => {
                  setRating(parseInt(e.target.value, 10));
                }}
                min="0"
                max="5"
                step="1"
                list="ratingMarkers"
                className="h-8 col-span-4"
              />
              <datalist id="ratingMarkers"> {/* Define the datalist */}
                <option value="0" label="0"></option>
                <option value="1" label="1"></option>
                <option value="2" label="2"></option>
                <option value="3" label="3"></option>
                <option value="4" label="4"></option>
                <option value="5" label="5"></option>
              </datalist>
            </div>
            <div className="grid items-center grid-cols-4 gap-4">
              <Label htmlFor="distance">Distance (Miles)</Label>
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
            <div className="grid items-center grid-cols-4 gap-4">
              <Label htmlFor="reviewCount">Review Count</Label>
              <input
                type="number"
                id="reviewCount"
                value={reviewCount}
                onChange={(e) => {
                  setReviewCount(parseInt(e.target.value, 10));
                }}
                min="0"
                className="h-8 col-span-4 px-2 border rounded-md"
              />
            </div>
            {/* Other form fields */}
            <div className="grid items-center grid-cols-4 gap-4">
              <Label htmlFor="type">Price</Label>
              <select
                id="type"
                className="col-span-4"
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
              >
                <option value="">Select a price range...</option>
                <option value="$">&lt;1200 ($/month)</option>
                <option value="$$">1200-1500 ($/month)</option>
                <option value="$$$">&gt;1500 ($/month)</option>
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
