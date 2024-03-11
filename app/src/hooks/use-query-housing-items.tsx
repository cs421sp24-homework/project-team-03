import { useEffect } from "react";
import { fetchHousingItems } from "@/lib/api";
import { useToast } from "@/components/ui/use-toast";
import { useStore } from "@/lib/store";
import useInterval from "./use-intervals";

function useQueryHousingItems() {
  const { toast } = useToast();
  const housingItems = useStore((state) => state.housingItems);
  const setHousingItems = useStore((state) => state.setHousingItems);

    const loadHousingItems = async () => {
        try {
            const fetchedHousingItems = await fetchHousingItems();
            setHousingItems(fetchedHousingItems);
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Failed to fetch housing items",
                description:
                (error as Error).message ||
                "There was an error loading the housing items. Please try again later.",
            });
        }
    };

    useInterval(() => {
      loadHousingItems();
    }, 300);

  useEffect(() => {
    loadHousingItems();
  }, []);

  return { housingItems };
}

export default useQueryHousingItems;