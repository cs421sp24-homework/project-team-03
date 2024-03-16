import { HousingItem } from "@/lib/types";
import StarRating from "./star-rating";

type HousingInfoWindowProps = {
  housingItem: HousingItem;
}

const HousingInfoWindow = (props: HousingInfoWindowProps) => {
  const { housingItem } = props;
  return (
    <div id={`info-window-${housingItem.id}`}>
      <div style={{fontWeight: "bold"}}>{housingItem.name}</div>
      <div>{housingItem.address}</div>
      <div style={{ display:"flex"}}>
        <StarRating rating={housingItem.avgRating} />
        <span style={{ marginLeft: '0.2rem', fontSize: '15px'}}> | {housingItem.reviewCount} reviews</span>
      </div>
      <div style={{ display:"flex"}}>
        <div style={{ fontWeight: 'bold'}}>{housingItem.price}</div>
        <span style={{ marginLeft: '0.4rem'}}> | <span style={{ fontWeight: 'bold'}}>{housingItem.distance} miles</span> from JHU Homewood</span>
      </div>
    </div>
  );
}

export default HousingInfoWindow