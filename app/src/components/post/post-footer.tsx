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
    const userLogged = useStore((state) => state.user);
  
    return (
      <div className="flex flex-col mb-8" id="post-footer">
        <span className="mr-4">
          Cost: ${post.cost}
        </span>
        <span className="mr-4">
          Address: {post.address}
        </span>
        <span className="mr-4">
          Type: {post.type}
        </span>
        {(user?.id === userLogged?.id) && (
          <div className="ml-auto">
          <PostActions post={post} userId={post.userId} />
          </div>
        )}
      </div>
    );
  };
  export default PostFooter;
  