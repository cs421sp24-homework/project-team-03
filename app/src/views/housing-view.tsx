import Aside from "@/components/aside";
import Sidebar from "@/components/sidebar";
import { useParams } from "react-router-dom";
import HousingItemWithReviews from "@/components/review/housing-item-with-review";
import useQueryHousing from "@/hooks/use-query-housing";

const HousingView = () => {
  const { id } = useParams(); // Get the housing ID from the URL
  if (!id) {
    return <div>Invalid housing ID</div>;
  }
  const { housingItem } = useQueryHousing(id);

  if (!housingItem || !id) {
    return <div>Loading...</div>; // Or any loading indicator you prefer
  }

  return (
    <>
      <Sidebar isPostsView={false}/>
      <HousingItemWithReviews housingItem={housingItem} />
      <Aside />
    </>
  );
};

export default HousingView;
