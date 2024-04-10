import Posts from "./posts";
import SearchInput from "./search-input";

const Feed = () => {
  return (
    <div className="flex flex-col w-screen h-full min-h-screen border-x-2 border-slate-400">

      <div className="gap-5" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>   
        <div className="whitespace-nowrap" style={{ fontSize: '40px', fontWeight: 'bold' }}>
              I am looking for...
        </div>
      </div>
      <div className="gap-5" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <SearchInput />
        {/*<Filter /> */}
      </div>
      


      {/* Posts section */}
      <div className= "flex-1 px-10 py-5">
        <div>
        <div className="whitespace-nowrap" style={{ fontSize: '20px', fontWeight: 'bold'}}>
              Roommates:
        </div>
          <div className="flex overflow-x-auto">
            <Posts type={"Roommate"}/>
          </div>
          </div>
          <div>
        <div className="whitespace-nowrap" style={{ fontSize: '20px', fontWeight: 'bold'}}>
              Subletting:
        </div>
          <div className="flex overflow-x-auto">
            <Posts type={"Sublet"}/>
          </div>
          </div>

          <div>
        <div className="whitespace-nowrap" style={{ fontSize: '20px', fontWeight: 'bold' }}>
              Housing:
        </div>
          <div className="flex overflow-x-auto">
            <Posts type={"Housing"}/>
          </div>
          </div>
        
        
      </div>
    </div>
  );
};

export default Feed;