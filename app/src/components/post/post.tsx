import PostHeader from "./post-header";
import type { PostWithUserData } from "@/lib/types";

const Post = ({ post }: { post: PostWithUserData }) => {
  const { title, content, user } = post;
  const SRC = "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg";

  return (
    <div className="p-1 rounded-lg" style={{ width: '340px', height: '360px', backgroundColor: 'rgb( 244, 241, 232 )' }}>
      <div className="px-2">
        <PostHeader
          post={post}
          timestamp={post.timestamp}
          user={user}
        />
      </div>
      <div className="text-sm py-2 px-4 overflow-y-auto" style={{ height: '80%', scrollbarWidth: 'none', }}>
        <div className="pb-2 text-base font-bold underline">{title}</div>
          <div className="pl-2">
            <div className="pb-2">{content}</div>
            <div>
              <span className="font-bold">Type: </span>{post.type}
            </div>
            <div>
              <span className="font-bold">Cost: </span>${post.cost}
            </div>
            <div>
              <span className="font-bold">Address: </span>{post.address}
            </div>
            <div className="flex justify-center py-2">
              <img className="rounded w-0.8" src={SRC}/>
            </div>
          </div>
      </div>
    </div>
  );
};

export default Post;
