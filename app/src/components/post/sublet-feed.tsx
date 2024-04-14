import PostMapContainer from "../map/post-map-container";
import Posts from "./posts";

const SubletFeed = () => {
  return (
    <div className="flex flex-col w-screen h-full min-h-screen border-x-2 border-slate-400">
      <div className="gap-5 mt-5" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>   
        <div className="whitespace-nowrap" style={{ fontSize: '40px', fontWeight: 'bold' }}>
              Find Sublets
        </div>
      </div>

      <div className="flex justify-center pt-4" style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
        <PostMapContainer />
      </div>


      <div className= "px-16 py-5">

      <div className="mt-10">
        <div className="whitespace-nowrap" style={{ fontSize: '20px', fontWeight: 'bold'}}>
            My Posts:
          </div>
          <div className="flex overflow-x-auto">
            <Posts type={"Sublet"} isOwner={"mine"}/>
          </div>
        </div>

        <div className="mt-10">
        <div className="whitespace-nowrap" style={{ fontSize: '20px', fontWeight: 'bold'}}>
            Community:
          </div>
          <div className="flex overflow-x-auto">
            <Posts type={"Sublet"} isOwner={"other"}/>
          </div>
        </div>

      </div>
    </div>
  );
};

export default SubletFeed;