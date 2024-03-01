// import { Button } from "@/components/ui/button";
// import { ChatBubbleIcon, HeartIcon } from "@radix-ui/react-icons";
// import PostActions from "./post-actions";
// import { SyntheticEvent, useEffect, useState } from "react";
// import { useStore } from "@/lib/store";
import { Post } from "@/lib/types";
import PostActions from "./post-actions";
// eslint-disable-next-line @typescript-eslint/no-unused-vars

const PostFooter = ({
  post,
}: {
  post: Post;
}) => {
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
      <span className="w-5 h-5"> 
        Address: {post.address}
      </span>
      <span className="w-5 h-5">
        Type: {post.type}
      </span>
      <PostActions post={post} userId={post.userId} />
    </div>
  );
};

export default PostFooter;
