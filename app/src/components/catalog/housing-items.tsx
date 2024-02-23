import { housingItems } from "@/lib/data";
import HousingItem from "./housing-item";

const HousingItems = () => {
    return (
        <div className="flex flex-wrap">
            {housingItems.map((housingItem) => (
                <div key={housingItem.id} style={ {paddingLeft: '8%', paddingRight: '1%', paddingTop: '5%', paddingBottom: '2%'}}>
                    <HousingItem housingItem={housingItem} />
                </div>
            ))} 
        </div>
    );
};
  
export default HousingItems;