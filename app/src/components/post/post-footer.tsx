import { useEffect, useState } from 'react';
import { HeartFilledIcon, HeartIcon } from '@radix-ui/react-icons';
import { PostWithUserData } from '@/lib/types';
import { checkIfFavorite, favoritePost, unfavoritePost } from '@/lib/api';
import { useStore } from '@/lib/store';

interface PostFooterProps {
  post: PostWithUserData; 
}

const PostFooter = ({ post }: PostFooterProps) => {
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
        const isLiked = await checkIfFavorite(user.id, post.id);
        setLiked(isLiked);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchLikedStatus();
  }, [user, post.id]);

  const handleLike = async () => {
    if (!user) {
      setLiked(false);
      return;
    }
    
    try { 
      if (liked) {
        // If the post is already liked, unfavorite it
        await unfavoritePost(user.id, post.id);
      } else {
        // If the post is not liked, favorite it
        await favoritePost(user.id, post.id);
      }
      // Toggle the liked state after the API call is successful
      setLiked(!liked);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="post-footer">
      <button className="like-button" onClick={handleLike}>
      {liked ? <HeartFilledIcon className='ml-1 h-5 w-6' color="#ff0000" /> : <HeartIcon className='ml-1 h-5 w-6' color="grey" />}
      </button>
    </div>
  );
};

export default PostFooter;
