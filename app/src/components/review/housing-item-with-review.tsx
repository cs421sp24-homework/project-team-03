import { HousingItem } from "@/lib/types";
import HousingExpanded from "./housing-expanded";
import Header from "./header";
import Reviews from "./reviews";
import { useStore } from "@/lib/store";
import { useEffect, useState } from "react";
import { fetchReviews } from "@/lib/api";

type HousingProps = {
    housingItem: HousingItem;
};

const HousingItemWithReviews = ({ housingItem }: HousingProps) => {
  const user = useStore((state) => state.user);
  const [sortBy, setSortBy] = useState(""); // State to hold the sorting criteria
  const setReviews = useStore((state) => state.setReviews);
  const [query, setQuery] = useState("");

  // Function to fetch reviews with sorting criteria
  const fetchSortedReviews = async (sortCriteria: string) => {
    try {
      // Construct query string based on sort option
      setQuery("");
      if (sortBy) {
        setQuery(`&sortBy=${sortCriteria}`);
      }
      console.log("This is query:", query)
      // Fetch reviews with the constructed query
      const fetchedReviews = await fetchReviews(housingItem.id, query);
      console.log(fetchedReviews)
      setReviews(fetchedReviews);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  // useEffect to trigger fetchSortedReviews when sortBy changes
  useEffect(() => {
    if (sortBy !== "") {
      fetchSortedReviews(sortBy);
    }
  }, [sortBy]);

     return (
    <div className="flex flex-col w-full min-h-screen border-x-2 border-slate-400 md:max-w-4xl">
      <div className="inline-block">
        <HousingExpanded housingItem={housingItem} />
      </div>
      <Header housingId={housingItem.id} />
        <div className="px-4 py-2">
          <select
            className="sort-button rounded text-center"
            aria-label="Sort"
            style={{ width: "60px", backgroundColor: "", border: "1px solid black"}}
            value={sortBy}
            onChange={(e) => {
              console.log("This is the e.target.value:", e.target.value)
              setSortBy(e.target.value)
            }}
          >
            <option value="">Sort</option>
            <option value="popularity">Popularity &#128077;</option>
            <option value="recency">Recency &#x1F550;</option>
            {/* Add more sorting options here */}
          </select>        
        </div>
      <div className="w-full">
        {user ? (
          housingItem.reviewCount > 0 ? (
            <div>
              <Reviews housingId={housingItem.id} query={query}/>
            </div>
          ) : (
            <p className="text-center text-gray-500">No reviews yet.</p>
          )
        ) : (
          <p className="text-center text-gray-500">
            You must be logged in to see reviews.
          </p>
        )}
      </div>
    </div>
  );
};
  
export default HousingItemWithReviews;
  