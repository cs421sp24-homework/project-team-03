import { Link } from "react-router-dom";
import HousingItem from "./housing-item";
import useQueryHousingItems from "@/hooks/use-query-housing-items";

const HousingItems = () => {
    const { housingItems } = useQueryHousingItems();

    return (
        <div className="flex flex-wrap">
            {housingItems.map((housingItem) => (
                <div key={housingItem.id} style={{ paddingLeft: '8%', paddingRight: '1%', paddingTop: '5%', paddingBottom: '2%' }}>
                    <Link to={`/project-team-03/housings/${housingItem.id}`}>
                        <HousingItem housingItem={housingItem} />
                    </Link>
                </div>
            ))}
        </div>
    );
};
  
export default HousingItems;
