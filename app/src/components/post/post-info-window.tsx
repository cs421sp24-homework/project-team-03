import { Link } from "react-router-dom";
import PostAvatar from "./post-avatar";
import PostHeader from "./post-header";
import type { PostWithUserData } from "@/lib/types";

const PostInfoWindow = ({ post }: { post: PostWithUserData }) => {
  const { title, content, user } = post;

  const avatar = user?.avatar;
  const firstName = user?.firstName;
  const lastName = user?.lastName;
  const jhed = user?.email.split("@")[0]; // Extract jhed from email

  return (
    <div className="border border-slate-500" style={{ borderWidth: '2.5px', width: '340px', height: '360px', backgroundColor: 'rgb( 244, 241, 232 )' }}>
      <div className="flex">
        <div className="p-4">
          <Link to={`/users/${jhed}`}>
            <PostAvatar imageUrl={avatar} displayName={`${firstName} ${lastName}`} />
          </Link>
        </div>
        <div className="w-full pr-4 pt-7">
          <PostHeader
            name={`${firstName} ${lastName}`}
            timestamp={post.timestamp}
          />
          <div className="my-4 font-bold underline">{title}</div>
          <div className="my-4">{content}</div>
          <div className="flex flex-col mb-8">
        <span className="mr-4">
          Cost: ${post.cost}
        </span>
        <span className="mr-4">
          Address: {post.address}
        </span>
        <span className="mr-4">
          Type: {post.type}
        </span>
        
      </div>
        </div>
      </div>
    </div>
  );
};

export default PostInfoWindow;
