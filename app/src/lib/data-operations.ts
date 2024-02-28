import useMutationHousingItem from "@/hooks/use-mutations-housing-items";
import { housingItems } from "@/lib/data";

export async function addHousingItemsToBackend() {
    for (const item of housingItems) {
        try {
            await useMutationHousingItem(item);
        } catch (error) {
            console.log(`Failed to add ${item.name}: ${(error as Error).message}`);
        }
    }
}