import { HousingItem } from "@/lib/types";
import HousingExpanded from "./housing-expanded";
import Header from "../components/review/header";
import Reviews from "../components/review/reviews";
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
      // Fetch reviews with the constructed query
      const fetchedReviews = await fetchReviews(housingItem.id, query);
      setReviews(fetchedReviews);
    } catch (error) {
      return null;
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
      <Header housingId={housingItem.id} sortBy={sortBy} setSortBy={setSortBy} />
      <div className="w-full">
        {user ? (
          housingItem.reviewCount >= 0 ? (
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
  