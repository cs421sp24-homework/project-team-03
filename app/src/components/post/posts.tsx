import { useStore } from "@/lib/store";
import Post from "./post";
import useQueryPosts from "@/hooks/use-query-posts";
import { PostType } from "@/lib/types";

const Posts = ({type, isOwner}: {type: PostType, isOwner?: string}) => {
  const { posts } = useQueryPosts();
  const selectedPostId = useStore((state) => state.selectedPostId);
  const filteredPosts = posts.filter((post) => (post.type == type));
  const user = useStore((state) => state.user);
  const filteredUserPosts = filteredPosts.filter((post) => (post.user?.email == user?.email))
  const filteredOtherUserPosts = filteredPosts.filter((post) => (post.user?.email !== user?.email))

  if (isOwner == "mine") {

    if (filteredUserPosts.length === 0) {
      return <div className="text-center">No Posts to Show</div>;
    }
  
    return (
      <div className="flex gap-10">
        {filteredUserPosts.map((post) => (
          <div key={post.id} className="flex justify-center py-5">
            <Post post={post} />
            {post.id === selectedPostId}
          </div>
        ))}
      </div>
    );
  } else if (isOwner == "other") {

    if (filteredOtherUserPosts.length === 0) {
      return <div className="text-center">No Posts to Show</div>;
    }
  

    return (
      <div className="flex gap-10">
        {filteredOtherUserPosts.map((post) => (
          <div key={post.id} className="flex justify-center py-5">
            <Post post={post} />
            {post.id === selectedPostId}
          </div>
        ))}
      </div>
    );
  }

  if (filteredPosts.length === 0) {
    return <div className="text-center">No Posts to Show</div>;
  }


  return (

    <div className="flex gap-10">
      {filteredPosts.map((post) => (
        <div key={post.id} className="flex justify-center py-5">
          <Post post={post} />
          {post.id === selectedPostId}
        </div>
      ))}
    </div>
  );
};

export default Posts;
