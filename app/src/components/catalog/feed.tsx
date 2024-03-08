import Filter from "./filter";
import Header from "./header";
import HousingItems from "./housing-items";
import SearchInput from "./search-input";
import MapContainer from "../map/housing-map-container";

const Feed = () => {
  
  return (
    <div className="flex flex-col w-full min-h-screen border-x-2 border-slate-400 md:max-w-4xl">
      <Header/>
      <div className="flex flex-wrap" style={{ width: '100%', paddingLeft: '8%', paddingTop: '2%' }}>
        <div style={{ paddingRight: '2%'}}>
          <SearchInput/>
        </div>
        <Filter/>
      </div>
      <div className="map-container" style={{ width: '100%', height: '57vh', overflow: 'hidden' }}>
        <MapContainer />
      </div>
      <div className="housing-items-container" style={{ height: '57vh', overflowY: 'auto' }}>
        <HousingItems/>
      </div>
    </div>
  );
};

export default Feed;