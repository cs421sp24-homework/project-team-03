import Aside from "@/components/aside";
import Sidebar from "@/components/sidebar";
import HousingItemComponent from "@/components/catalog/housing-item";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchHousingItem } from "@/lib/api"; // Assuming you have a fetchHousingItem function
import type { HousingItem } from "@/lib/types"; // Import the HousingItem type

const HousingView = () => {
  const { id } = useParams(); // Get the housing ID from the URL
  const [housingItem, setHousingItem] = useState<HousingItem | null>(null); // Specify the type

  useEffect(() => {
    const fetchHousing = async () => {
      try {
        if (!id) {
          // Handle the case when id is undefined, e.g., show an error message or redirect
          throw new Error("Housing ID is not provided");
        }

        const housingData = await fetchHousingItem(id); // Fetch housing item data by ID
        setHousingItem(housingData);
      } catch (error) {
        console.error("Error fetching housing item:", error);
      }
    };

    fetchHousing();
  }, [id]);

  if (!housingItem) {
    return <div>Loading...</div>; // Or any loading indicator you prefer
  }

  return (
    <>
      <Sidebar isPostsView={false}/>
      <HousingItemComponent housingItem={housingItem} />
      <Aside />
    </>
  );
};

export default HousingView;
