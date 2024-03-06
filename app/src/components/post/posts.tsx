import { useStore } from "@/lib/store";
import Post from "./post";
import useQueryPosts from "@/hooks/use-query-posts";

const Posts = () => {
  const { posts } = useQueryPosts();
  const selectedPostId = useStore((state) => state.selectedPostId);

  return (
    <div className="flex flex-wrap">
      {posts.map((post) => (
        <div key={post.id} style={{ paddingLeft: '8%', paddingRight: '1%', paddingTop: '5%', paddingBottom: '2%' }}>
          <Post post={post} />
          {post.id === selectedPostId}
        </div>
      ))}
    </div>
  );
};

export default Posts;
