import PostAvatar from "./post-avatar";
import PostHeader from "./post-header";
import PostFooter from "./post-footer";
import type { PostWithUserData } from "@/lib/types";

const Post = ({ post }: { post: PostWithUserData }) => {
  const { content, user, createdAt } = post;

  // The code below uses Optional Chaining (?.) and Nullish Coalescing (??)
  const avatar = user?.avatar;
  const firstName = user?.firstName;
  const lastName = user?.lastName;

  return (
    <div className="flex border-b border-slate-400">
      <div className="p-4">
        <PostAvatar imageUrl={avatar} displayName={`${firstName} ${lastName}`} />
      </div>
      <div className="w-full pt-4 pr-4">
        <PostHeader
          name={`${firstName} ${lastName}`}
          timestamp={createdAt}
        />
        <div className="my-4">{content}</div>
        <PostFooter post={post} fullName={`${firstName} ${lastName}`} />
      </div>
    </div>
  );
};

export default Post;
