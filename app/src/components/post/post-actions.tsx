import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { DotsVerticalIcon } from "@radix-ui/react-icons";
import { useStore } from "@/lib/store";
import { useEffect, useState } from "react";
import useMutationPosts from "@/hooks/use-mutations-posts";
import { Post } from "@/lib/types";
import { EditPostDialog } from "./edit-post-dialog";

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
  const [dropdownState, setDropdownState] = useState(false);

  useEffect(() => {
    if (user && post.userId === userId) {
      setIsOwner(true);
    } else {
      setIsOwner(false);
    }
  }, [user, post.userId, userId]);

  return (
    <DropdownMenu open={dropdownState} onOpenChange={setDropdownState}>
      {isOwner && (
        <DropdownMenuTrigger asChild>
          <Button id="post-actions" variant="ghost" className="h-8 w-8 p-0 data-[state=open]:bg-muted" >
            <DotsVerticalIcon className="w-5 h-5" />
            <span className="sr-only">Open menu</span>
          </Button> 
        </DropdownMenuTrigger>
      )}
      <DropdownMenuContent>

        {isOwner && (
          <><DropdownMenuItem id="delete-btn" className="text-red-500" onClick={() => removePostById(post.id)}>
            Delete
          </DropdownMenuItem>
          <EditPostDialog post={post} setDropdownState={setDropdownState}/></>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
    
  );
};

export default PostActions;
