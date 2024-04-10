import { useEffect } from "react";
import { fetchUser } from "@/lib/api";
import { useToast } from "@/components/ui/use-toast";
import { useStore } from "@/lib/store";
import useInterval from "./use-intervals";

function useQueryUserReviews(email : string) {
  const { toast } = useToast();
  const userReviews = useStore((state) => state.userReviews);
  const setUserReviews = useStore((state) => state.setUserReviews);

  const loadUserReviews = async () => {
    try {
      const fetchedUser = await fetchUser(email);
      const fetchedUserReviews = fetchedUser.reviews
      if (fetchedUserReviews === undefined) {
        setUserReviews([])
      } else {
        setUserReviews(fetchedUserReviews);
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to fetch user reviews",
        description:
          (error as Error).message ||
          "There was an error loading the user's reviews. Please try again later.",
      });
    }
  };

  
  useInterval(() => {
    loadUserReviews();
  }, 300);
  

  useEffect(() => {
    loadUserReviews();
  }, []);

  return { userReviews };
}

export default useQueryUserReviews;