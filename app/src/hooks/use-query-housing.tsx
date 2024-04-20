import { useEffect } from "react";
import { fetchHousingItem } from "@/lib/api";
import { useToast } from "@/components/ui/use-toast";
import { useStore } from "@/lib/store";
import useInterval from "./use-intervals";

function useQueryHousing(id: string) {
  const { toast } = useToast();
  const housingItem = useStore((state) => state.selectedHousing);
  const setSelectedHousing = useStore((state) => state.setSelectedHousing);

    const fetchHousing = async () => {
        try {
          if (!id) {
            // Handle the case when id is undefined, e.g., show an error message or redirect
            throw new Error("Housing ID is not provided");
          }
    
          const housingData = await fetchHousingItem(id); // Fetch housing item data by ID
          setSelectedHousing(housingData);
        } catch (error) {
          toast({
            variant: "destructive",
            title: "Failed to fetch housing item",
            description:
            (error as Error).message ||
            "There was an error loading the housing item. Please try again later.",
        });
        }
      };
    
      useEffect(() => {
        fetchHousing();
      }, [id]);


  return { housingItem };
}

export default useQueryHousing;