import { housingItems } from "@/lib/data";
import HousingItem from "./housingItem";

const HousingItems = () => {
    return (
        <div className="flex flex-wrap">
            {housingItems.map((housingItem) => (
                <div style={ {paddingLeft: '8%', paddingRight: '1%', paddingTop: '5%', paddingBottom: '2%'}}>
                    <HousingItem housingItem={housingItem} key={housingItem.id} />
                </div>
            ))} 
        </div>
    );
};
  
export default HousingItems;