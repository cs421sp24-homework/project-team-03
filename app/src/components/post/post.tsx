import { Link } from "react-router-dom";
import PostAvatar from "./post-avatar";
import PostHeader from "./post-header";
import PostFooter from "./post-footer";
import type { PostWithUserData } from "@/lib/types";

const Post = ({ post }: { post: PostWithUserData }) => {
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
        <div className="w-full pt-7 pr-4">
          <PostHeader
            name={`${firstName} ${lastName}`}
            timestamp={post.timestamp}
          />
          <div className="my-4 font-bold underline">{title}</div>
          <div className="my-4">{content}</div>
          <PostFooter post={post} user={user} />
        </div>
      </div>
    </div>
  );
};

export default Post;
