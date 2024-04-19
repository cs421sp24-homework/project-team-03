import { useEffect, useState } from 'react';
import { HeartFilledIcon, HeartIcon } from '@radix-ui/react-icons';
import { checkIfFavoriteHousing, favoriteHousing, unfavoriteHousing } from '@/lib/api';
import { useStore } from '@/lib/store';
import { HousingItem as HousingItemType } from "@/lib/types";

type HousingFooterProps = {
  housingItem: HousingItemType;
}

const HousingFooter = ({ housingItem }: HousingFooterProps) => {
  const [liked, setLiked] = useState(false);
  const user = useStore(state => state.user);

  useEffect(() => {
    // Return early if user is null
    if (!user) {
      setLiked(false);
      return;
    }

    const fetchLikedStatus = async () => {
      try {
        // Call the API method to check if the user has liked the post
        const isLiked = await checkIfFavoriteHousing(user.id, housingItem.id);
        setLiked(isLiked);
      } catch (error) {
        return;
      }
    };

    fetchLikedStatus();
  }, [user, housingItem.id]);

  const handleLike = async () => {
    if (!user) {
      setLiked(false);
      return;
    }
    
    try { 
      if (liked) {
        // If the post is already liked, unfavorite it
        await unfavoriteHousing(user.id, housingItem.id);
      } else {
        // If the post is not liked, favorite it
        await favoriteHousing(user.id, housingItem.id);
      }
      // Toggle the liked state after the API call is successful
      setLiked(!liked);
    } catch (error) {
      return;
    }
  };

  return (
    <>
      <button className="like-button" onClick={handleLike} style={{ display: 'flex', justifyContent: 'flex-end'}}>
      {liked ? <HeartFilledIcon className='h-5 w-8' color="#ff0000" /> : <HeartIcon className='ml-1 h-5 w-8' color="grey" />}
      </button>
    </>
  );
};

export default HousingFooter;
