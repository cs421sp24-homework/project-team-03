import { useEffect } from "react";
import { fetchReviews } from "@/lib/api";
import { useToast } from "@/components/ui/use-toast";
import { useStore } from "@/lib/store";
import useInterval from "./use-intervals";

function useQueryReviews(housingId : string, query?: string) {
  const { toast } = useToast();
  const reviews = useStore((state) => state.reviews);
  const setReviews = useStore((state) => state.setReviews);

  const loadReviews = async () => {
    try {
      const fetchedReviews = await fetchReviews(housingId, query);
      setReviews(fetchedReviews);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to fetch reviews",
        description:
          (error as Error).message ||
          "There was an error loading the reviews. Please try again later.",
      });
    }
  };

  useInterval(() => {
    loadReviews();
  }, 300);

  useEffect(() => {
    loadReviews();
  }, []);

  return { reviews };
}

export default useQueryReviews;
