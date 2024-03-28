import { useEffect, useState } from "react";
import { fetchReviews } from "@/lib/api";
import { useStore } from "@/lib/store";

const Sorting = ({ housingId }: { housingId: string }) => {
  const [sortBy, setSortBy] = useState(""); // State to hold the sorting criteria
  const setReviews = useStore((state) => state.setReviews);

  // Function to fetch reviews with sorting criteria
  const fetchSortedReviews = async (sortCriteria: string) => {
    try {
      // Construct query string based on sort option
      let query = '';
      if (sortBy) {
        query += `&sortBy=${sortCriteria}`;
      }
      // Fetch reviews with the constructed query
      const fetchedReviews = await fetchReviews(housingId, query);
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
  }, []);

  return (
    <div className="px-4 py-2">
      <select
        className="sort-button rounded text-center"
        aria-label="Sort"
        style={{ width: "60px", backgroundColor: "", border: "1px solid black"}}
        value={sortBy}
        onChange={(e) => {
          setSortBy(e.target.value)
        }}
      >
        <option value="">Sort</option>
        <option value="popularity">Popularity &#128077;</option>
        <option value="recency">Recency &#x1F550;</option>
        {/* Add more sorting options here */}
      </select>      
    </div>
  );
};

export default Sorting;
