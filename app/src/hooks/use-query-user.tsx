import { useEffect } from "react";
import { fetchUser } from "@/lib/api";
import { useToast } from "@/components/ui/use-toast";
import { useStore } from "@/lib/store";
import useInterval from "./use-intervals";

function useQueryUser(email : string) {
  const { toast } = useToast();
  const currentUser = useStore((state) => state.user);
  // const setUser = useStore((state) => state.setUser);

  const loadUser = async () => {
    try {
      await fetchUser(email);
      // const fetchedUser = await fetchUser(email);
      // setUser(fetchedUser)
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to fetch user",
        description:
          (error as Error).message ||
          "There was an error loading the user. Please try again later.",
      });
    }
  };

  useInterval(() => {
    loadUser();
  }, 300);
  

  useEffect(() => {
    loadUser();
  }, []);

  return { currentUser };
}

export default useQueryUser;