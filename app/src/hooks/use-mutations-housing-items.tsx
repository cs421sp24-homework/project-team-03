import { createHousingItem } from "@/lib/api";
import { useStore } from "@/lib/store";
import { useToast } from "@/components/ui/use-toast";

function useMutationHousingItem() {
    const { toast } = useToast();
    const addHousingItem = useStore((state) => state.addHousingItem);

    const addNewHousingItem = async (name: string, address: string, distance: number, price: string, imageURL?: string) => {
        try {
            const newPost = await createHousingItem(name, address, distance, price, imageURL);
            addHousingItem(newPost);
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Failed to create the housing item",
                description:
                (error as Error).message ||
                "There was an error creating the housing item. Please try again later.",
            });
        }
    };

    return { addNewHousingItem };
}

export default useMutationHousingItem;
