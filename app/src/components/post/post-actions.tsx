import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { useStore } from "@/lib/store";
import { useEffect, useState } from "react";
import useMutationPosts from "@/hooks/use-mutations-posts";
import { Post } from "@/lib/types";

const PostActions = ({
  post,
  userId,
}: {
  post: Post;
  userId?: number;
}) => {
  const { user } = useStore((state) => state);
  const [isOwner, setIsOwner] = useState(false);
  const { removePostById } = useMutationPosts();

  useEffect(() => {
    if (user && post.userId === userId) {
      setIsOwner(true);
    } else {
      setIsOwner(false);
    }
  }, [user, post.userId, userId]);

  return (
    <DropdownMenu>
      {isOwner && (
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex h-8 w-8 p-0 data-[state=open]:bg-muted">
          <DotsHorizontalIcon className="w-4 h-4" />
          <span className="sr-only">Open menu</span>
        </Button> 
      </DropdownMenuTrigger>
      )}
      <DropdownMenuContent>
        {/* {isOwner && ( <DropdownMenuItem onClick={() => editPostById}>Edit post</DropdownMenuItem>
        )} */}
        {isOwner && (
          <DropdownMenuItem className="text-red-500" onClick={() => removePostById(post.id)}>
            Delete post
          </DropdownMenuItem>
        )}
        {/* <DropdownMenuItem>
          <Link to={`posts/${post.id}`}>Go to post</Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="text-red-500">
          Report post
        </DropdownMenuItem> */}
      </DropdownMenuContent>
    </DropdownMenu>
    
  );
};

export default PostActions;
