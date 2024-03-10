import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu";
  import { Button } from "@/components/ui/button";
  import { DotsVerticalIcon } from "@radix-ui/react-icons";
  import { useStore } from "@/lib/store";
  import { useEffect, useState } from "react";
  import {ReviewWithUserData } from "@/lib/types";
import useMutationReviews from "@/hooks/use-mutations-reviews";
  
  const ReviewActions = ({ review }: { review: ReviewWithUserData }) => {
    const { user } = useStore((state) => state);
    const [isOwner, setIsOwner] = useState(true);
    const { removeReviewById } = useMutationReviews();
    
    useEffect(() => {
      if (user && review.user.id === user.id) {
        setIsOwner(true);
      } else {
        setIsOwner(false);
      }
    }, [user, review.user.id, user?.id]);
    
  
    return (
      <DropdownMenu>
        {isOwner && (
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="flex h-8 w-8 p-0 data-[state=open]:bg-muted">
            <DotsVerticalIcon className="w-4 h-4" />
            <span className="sr-only">Open menu</span>
          </Button> 
        </DropdownMenuTrigger>
        )}
        <DropdownMenuContent>
          {isOwner && (
            <DropdownMenuItem className="text-red-500" onClick={() =>removeReviewById(review.housingId, review.id)}>
              Delete review
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      
    );
  };
  
  export default ReviewActions;