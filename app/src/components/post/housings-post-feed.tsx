import Posts from "./posts";

const HousingsFeed = () => {
  return (
    <div className="flex flex-col w-screen h-full min-h-screen border-x-2 border-slate-400">
      <div className="gap-5 mt-5" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>   
        <div className="whitespace-nowrap" style={{ fontSize: '40px', fontWeight: 'bold' }}>
              Find Housing!
        </div>
      </div>



      <div className= "px-16 py-5">

      <div className="mt-10">
        <div className="whitespace-nowrap" style={{ fontSize: '20px', fontWeight: 'bold'}}>
            My Posts:
          </div>
          <div className="flex overflow-x-auto">
            <Posts type={"Housing"} isOwner={"mine"}/>
          </div>
        </div>

        <div className="mt-10">
        <div className="whitespace-nowrap" style={{ fontSize: '20px', fontWeight: 'bold'}}>
            Community:
          </div>
          <div className="flex overflow-x-auto">
            <Posts type={"Housing"} isOwner={"other"}/>
          </div>
        </div>

      </div>
    </div>
  );
};

export default HousingsFeed;