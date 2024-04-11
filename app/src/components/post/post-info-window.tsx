import { Post } from "@/lib/types";

type PostInfoWindowProps = {
  post: Post;
}

const PostInfoWindow = (props: PostInfoWindowProps) => {
  const { post } = props;
  return (
    <div id={`info-window-${post.id}`}>
      <div style={{fontWeight: "bold"}}>{post.title}</div>
      <div>{post.address}</div>
      <div style={{ display:"flex"}}>
        <div>Cost: ${post.cost}</div>
      </div>
    </div>
  );
}

export default PostInfoWindow