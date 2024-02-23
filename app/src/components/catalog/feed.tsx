// import { SyntheticEvent, useState } from "react";
import Filter from "./filter";
import Header from "./header";
import HousingItems from "./housingItems";

const Feed = () => {
  
  return (
    <div className="flex flex-col w-full min-h-screen border-x-2 border-slate-400 md:max-w-4xl">
      <Header/>
      <Filter/>
      <div className="flex flex-col items-center" style={{ paddingTop: '3%'}}>
        <div className="border border-slate-600" style={{ borderWidth: '2.5px', width: '84%', height: '100%'}}>
            <img src="https://i.pcmag.com/imagery/articles/01IB0rgNa4lGMBlmLyi0VP6-6..v1611346416.png"></img>
        </div>
      </div>
      <HousingItems />
    </div>
  );
};

export default Feed;