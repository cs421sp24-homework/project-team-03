import PostHeader from "./post-header";
import type { PostWithUserData } from "@/lib/types";

const Post = ({ post }: { post: PostWithUserData }) => {
  const { title, content, user } = post;

  return (
    <div className="p-1 rounded-lg" style={{ width: '340px', height: '360px', backgroundColor: 'rgb( 244, 241, 232 )' }}>
      <PostHeader
        post={post}
        timestamp={post.timestamp}
        user={user}
      />
      <div className="text-sm px-4">
        <div className="pb-4 text-base font-bold underline">{title}</div>
        <div className="pb-4">{content}</div>
        <div>
          <span className="font-bold">Type: </span>{post.type}
        </div>
        <div>
          <span className="font-bold">Cost: </span>${post.cost}
        </div>
        <div>
          <span className="font-bold">Address: </span>{post.address}
        </div>
      </div>

    </div>
  );
};

export default Post;
