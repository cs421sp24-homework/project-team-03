import { Link } from "react-router-dom";
import Posts from "./posts";
import SearchInput from "./search-input";

const Feed = () => {
  return (
    <div className="flex flex-col w-screen h-full min-h-screen border-x-2 border-slate-400">
      <div className="gap-5 mt-5" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>   
        <div className="whitespace-nowrap" style={{ fontSize: '40px', fontWeight: 'bold' }}>
              I am looking for...
        </div>
      </div>
      <div className="gap-5" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <SearchInput />
      </div>
      


 {/* Posts section */}
      <div className= "px-16 py-5">
        <div className="mt-5">
          <div className="whitespace-nowrap" style={{ fontSize: '20px', fontWeight: 'bold'}}>
            Roommates:
          </div>
          <div className="flex overflow-x-auto">
            <Posts type={"Roommate"}/>
          </div>
        </div>

        <div className="mt-10">
        <Link to={`/posts/sublets`}>
          <div className="whitespace-nowrap hover:underline" style={{ fontSize: '20px', fontWeight: 'bold'}}>
            Subletting:
          </div>
          </Link>
          <div className="flex overflow-x-auto">
            <Posts type={"Sublet"}/>
          </div>
        </div>

        <div className="mt-10">
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