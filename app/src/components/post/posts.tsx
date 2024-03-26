import { useStore } from "@/lib/store";
import Post from "./post";
import useQueryPosts from "@/hooks/use-query-posts";

const Posts = () => {
  const { posts } = useQueryPosts();
  const selectedPostId = useStore((state) => state.selectedPostId);

  return (
    <div className="grid grid-cols-2 px-10 py-5">
      {posts.map((post) => (
        <div key={post.id} className="flex justify-center p-5">
          <Post post={post} />
          {post.id === selectedPostId}
        </div>
      ))}
    </div>
  );
};

export default Posts;
