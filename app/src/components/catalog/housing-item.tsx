import { HousingItem as HousingItemType } from "@/lib/types";
import StarRating from "./star-rating";
import HousingFooter from "./housing-footer";
import { Link } from "react-router-dom";

type HousingItemProps = {
    housingItem: HousingItemType;
}

const HousingItem = (props: HousingItemProps) => {
    const { housingItem } = props;
    return (
        <div className="p-5 border border-slate-500" style={{ borderWidth: '2.5px', width: '340px', height: '360px', backgroundColor: 'rgba(0, 0, 0, 0.075)' }}>
            <div>
            <Link to={`/housings/${housingItem.id}`}>
                <>
                <div className="border border-slate-600" style={{ borderWidth: '1.5px', width: '95%', height: '40%', paddingTop: '' }}>
                    <img src={housingItem.imageURL} alt="Housing Item" style={{ width: '277px', height: '190px', objectFit: 'cover' }}></img>
                </div>
                <div id="housing-name" style={{fontWeight: 'bold', paddingTop: '3%'}}>
                    {housingItem.name}
                </div>
                <div style={{fontSize: '13px'}}>
                    {housingItem.address}
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}> 
                    <StarRating rating={housingItem.avgRating} />
                    <span style={{ marginLeft: '0.4rem', fontSize: '15px' }}> | {housingItem.reviewCount} reviews</span>
                </div>
                <div style={{paddingTop: '3%'}}>   
                    <hr className="w-7/8 border-t-2 border-dotted border-gray-500 mb-2" />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', fontSize: '13px'}}> 
                    <div id="price-tag" style={{ fontWeight: 'bold'}}>{housingItem.price}</div>
                    <span id="distance-tag" style={{ marginLeft: '0.4rem'}}> | <span style={{ fontWeight: 'bold'}}>{housingItem.distance} miles</span> from JHU Homewood</span>
                </div>
                </> </Link>
                {/* <div style={{ display: 'flex', justifyContent: 'flex-end' }}> */}
                    
                {/* </div> */}
            </div>
            <HousingFooter housingItem={housingItem} />
        </div>
    );
};
  
export default HousingItem;