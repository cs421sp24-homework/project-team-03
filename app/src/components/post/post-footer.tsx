// import { Button } from "@/components/ui/button";
// import { ChatBubbleIcon, HeartIcon } from "@radix-ui/react-icons";
// import PostActions from "./post-actions";
// import { SyntheticEvent, useEffect, useState } from "react";
// import { useStore } from "@/lib/store";
import { Post, User } from "@/lib/types";
import PostActions from "./post-actions";
import { useStore } from "@/lib/store";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const PostFooter = ({
  post,
  user,
}: {
  post: Post;
  user?: User;
}) => {
  const userLogged = useStore((state) => state.user)
  // const selectedPostId = useStore((state) => state.selectedPostId);
  // const setSelectedPostId = useStore((state) => state.setSelectedPostId);
  // const clearSelectedPostId = useStore((state) => state.clearSelectedPostId);
  // const showComments = (event: SyntheticEvent) => {
  //   event.preventDefault();
  //   if (selectedPostId === postId) {
  //     clearSelectedPostId();
  //   } else {
  //     setSelectedPostId(postId);
  //   }
  // };
  return (
    <div className="flex justify-between mb-8">
      {/* <Button variant="ghost" size="sm" onClick={() => setLikes(likes + 1)}>
        <HeartIcon className="w-5 h-5" />
        {likes > 0 && <sup>{likes}</sup>}
      </Button>*/}
      <span className="w-5 h-5">
        Cost: ${post.cost}
      </span>
      <span className="w-25 h-5">
        Address: {post.address}
      </span>
      <span className="w-5 h-5">
        Type: {post.type}
      </span>
      {(user?.id == userLogged?.id) ? <PostActions post={post} userId={post.userId} /> : <span className="w-5 h-5"></span>}
    </div>
  );
};
export default PostFooter;