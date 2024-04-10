import { useStore } from "@/lib/store";
import Post from "./post";
import useQueryPosts from "@/hooks/use-query-posts";
import { PostType } from "@/lib/types";

const Posts = ({type}: {type: PostType}) => {
  const { posts } = useQueryPosts();
  const selectedPostId = useStore((state) => state.selectedPostId);
  const filteredPosts = posts.filter((post) => (post.type == type));


  return (
    <div className="flex gap-4 px-10 py-5">
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
