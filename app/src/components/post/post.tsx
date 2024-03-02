import PostAvatar from "./post-avatar";
import PostHeader from "./post-header";
import PostFooter from "./post-footer";
import type { PostWithUserData } from "@/lib/types";

const Post = ({ post }: { post: PostWithUserData }) => {
  const { content, user} = post;

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
          //timestamp={createdAt}
        />
        {/* <div>
          <h2>Preview: {images} </h2>
          <img src={images} alt="Preview" />
        </div> */}
        <div className="my-12">{content}</div>
        <PostFooter post={post} user={user} />
      </div>
    </div>
  );
};

export default Post;
