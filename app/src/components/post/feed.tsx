import Posts from "./posts";
import SearchInput from "../catalog/search-input";
import PostMapContainer from "../map/post-map-container";

const Feed = () => {
  return (
    <div className="flex flex-col w-full min-h-screen border-x-2 border-slate-400 md:max-w-4xl">
      <div style={{fontSize: '50px', fontWeight: 'bold', paddingLeft: '10%', paddingTop: '5%', textDecoration: 'underline'}}>
            Community Posts
        </div>
      <div className="flex flex-wrap" style={{ width: '100%', paddingLeft: '8%', paddingTop: '2%' }}>
        <div style={{ paddingRight: '2%'}}>
          <SearchInput/>
        </div>
        {/* //<Filter/> */}
      </div>
      <div className="map-container" style={{ width: '100%', height: '57vh', overflow: 'hidden' }}>
        < PostMapContainer/>
      </div>
      <div style={{ borderBottom: '2px solid black', width: '100%', paddingTop: '2%'}}></div> {/* Line underneath Filter */}
      <Posts />
    </div>
  );
};

export default Feed;
