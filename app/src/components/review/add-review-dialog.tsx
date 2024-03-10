import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { useStore } from "@/lib/store";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import useMutationReviews from "@/hooks/use-mutations-reviews";
import { Pencil2Icon } from "@radix-ui/react-icons";
import StarRating from "./star-rating";

export const AddReviewDialog = ({ housingId }: { housingId: string }) => {
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(0);
  const { makeReview } = useMutationReviews();
  const { toast } = useToast();
  const user = useStore((state) => state.user);

  const handleSave = async () => {
    if (!content || rating === 0) {
      toast({
        variant: "destructive",
        title: "Sorry! The review content and/or rating is required! 🙁",
        description: "Please enter your review before submitting.",
      });
      return;
    }

    await makeReview(housingId, content, rating);
    setContent("");
    setRating(0);
  };

  const handleCancel = async () => {
    setContent("");
    setRating(0);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="ml-4 px-4 py-2 border border-black rounded-full hover:bg-black hover:text-white transition ease-in-out duration-200" variant={"ghost"} size="lg">
            <Pencil2Icon className="w-5 h-5 p-1" /> Add Review
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Review</DialogTitle>
          <DialogDescription>
            {user ? "Share your experience here." : "Please login to write a review."}
          </DialogDescription>
        </DialogHeader>
        {user && (
          <div className="py-1">
            <div className="gap-4">
            <Label htmlFor="rating">Your Rating</Label>
            <StarRating rating={rating} setRating={setRating} />
          </div>
            <div className=" py-3 gap-4">
              <Label htmlFor="content">Your Review</Label>
              <Textarea
                id="content"
                value={content}
                className="col-span-4 h-30"
                placeholder="Type your review here."
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
            <>
              <DialogClose asChild>
                <Button variant={"secondary"} onClick={handleCancel}>Cancel</Button>
              </DialogClose>
              <DialogClose asChild>
                <Button type="submit" onClick={handleSave}>
                  Submit
                </Button>
              </DialogClose>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
