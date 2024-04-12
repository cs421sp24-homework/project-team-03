import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utils";

type UserAvatarProps = {
  imageUrl?: string; // author's profile image
  displayName: string; // author's display name
};

function UserAvatar({ imageUrl, displayName }: UserAvatarProps) {
  return (
    <Avatar style={{ width: '200px', height: '200px', border: '1px solid #000'}}>
      <AvatarImage src={imageUrl} style={{ width: '100%', height: '100%' }} />
      <AvatarFallback style={{ fontSize: '75px' }}>{getInitials(displayName)}</AvatarFallback>
    </Avatar>
  );
}

export default UserAvatar;
