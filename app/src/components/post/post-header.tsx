import { Post, User } from "@/lib/types";
import PostActions from "./post-actions";
import { useStore } from "@/lib/store";
import { Link } from "react-router-dom";
import PostAvatar from "./post-avatar";

type PostHeaderProps = {
  post: Post;
  timestamp?: string; // post's timestamp
  user?: User;
};

const PostHeader = ({ 
  post, 
  timestamp, 
  user 
}: PostHeaderProps) => {
  const userLogged = useStore((state) => state.user);
  const avatar = user?.avatar;
  const jhed = user?.email.split("@")[0]; // Extract jhed from email
  const firstName = user?.firstName;
  const lastName = user?.lastName;
  const formattedTimestamp = timestamp ? new Date(timestamp).toLocaleString() : '';

  return (
    <div className="flex justify-between p-2">
      <div className="flex">
        <div className="p-2">
          <Link to={`/users/${jhed}`}>
            <PostAvatar imageUrl={avatar} displayName={`${firstName} ${lastName}`} />
          </Link>
        </div>
        <div className="p-2">
          <Link to={`/users/${jhed}`}>
            <div id="username-area" className="font-medium leading-none hover:underline">
              {`${firstName} ${lastName}`}
            </div>
          </Link>
          <div className="inline-block align-baseline text-sm text-muted-foreground">
            {formattedTimestamp}
          </div>
        </div>  
      </div>
      {(user?.id === userLogged?.id) && (
        <div className="p-2">
          <PostActions post={post} userId={post.userId} />
        </div>
      )}
    </div>
  );
};

export default PostHeader;
