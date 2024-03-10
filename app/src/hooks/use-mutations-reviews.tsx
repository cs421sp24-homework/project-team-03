import { useToast } from "@/components/ui/use-toast";
import { createReview, deleteReview } from "@/lib/api";
import { useStore } from "@/lib/store";

function useMutationReviews() {
  const { toast } = useToast();
  const addReview = useStore((state) => state.addReview);
  const removeReview = useStore((state) => state.removeReview);

  const makeReview = async (housingId: string, content: string, rating: number) => {
    try {
      const newReview = await createReview(content, rating, housingId);
      addReview(newReview);
      toast({
        variant: "default",
        title: "Success",
        description: "Review has been successfully created.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to create the review",
        description:
          (error as Error).message ||
          "There was an error creating the review. Please try again later.",
      });
    }
  };

  const removeReviewById = async (housingId: string, reviewId: string) => {
    try {
      await deleteReview(housingId, reviewId);
      removeReview(reviewId);
      toast({
        variant: "default",
        title: "Success",
        description: "Review has been successfully deleted.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to delete the review",
        description:
          (error as Error).message ||
          "There was an error deleting the review. Please try again later.",
      });
    }
  };

  return {
    makeReview,
    removeReviewById,
  };
}

export default useMutationReviews;
