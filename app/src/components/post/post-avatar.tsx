import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utils";

type PostAvatarProps = {
  imageUrl?: string; // author's profile image
  displayName: string; // author's display name
};

function PostAvatar({ imageUrl, displayName }: PostAvatarProps) {
  return (
    <Avatar className="hover:opacity-90" style={{ width: '40px', height: '40px', border: '1px solid #000'}}>
      <AvatarImage src={imageUrl} style={{ width: '100%', height: '100%' }} />
      <AvatarFallback style={{ fontSize: '24px' }}>{getInitials(displayName)}</AvatarFallback>
    </Avatar>
  );
}

export default PostAvatar;
