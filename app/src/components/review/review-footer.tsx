import { ReviewWithUserData } from "@/lib/types";
import { useStore } from "@/lib/store";
import { ArrowUpIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";
import ReviewActions from "./review-actions";

const ReviewFooter = ({ review }: { review: ReviewWithUserData }) => {
    const {user} = review;
    const userLogged = useStore((state) => state.user);
    const {upvoteCount} = review;
  
    return (
        <div className="px-2 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <span className="text-black p-2">Was this helpful?</span>
          <Button variant={"ghost"} className="hover:bg-blue-100">
              Yes<ArrowUpIcon className="ml-1 h-5 w-5" /> {`(${upvoteCount})`}
          </Button>
        </div>
        <div>
          {(user.id === userLogged?.id) && (
          <div className="ml-auto">
          <ReviewActions review={review} />
          </div>
        )}
        </div>
      </div>
    );
  };
  export default ReviewFooter;