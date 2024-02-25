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
import { Link } from "react-router-dom";

const PostActions = ({
  postId,
  userId,
}: {
  postId: string;
  username?: string;
}) => {
  const { user } = useStore((state) => state);
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    if (user && user.username === username) {
      setIsOwner(true);
    } else {
      setIsOwner(false);
    }
  }, [user, username]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm">
          <DotsHorizontalIcon className="w-5 h-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {isOwner && <DropdownMenuItem>Edit post</DropdownMenuItem>}
        {isOwner && (
          <DropdownMenuItem onClick={() => deletePostById(postId)}>
            Delete post
          </DropdownMenuItem>
        )}
        <DropdownMenuItem>
          <Link to={`posts/${postId}`}>Go to post</Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="text-red-500">
          Report post
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default PostActions;
