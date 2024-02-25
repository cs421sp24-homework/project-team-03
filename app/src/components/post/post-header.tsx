import { formatTimestamp } from "@/lib/utils";

type PostHeaderProps = {
  name: string; // author's display name
  timestamp: string; // post's timestamp
};

const PostHeader = ({ name, timestamp }: PostHeaderProps) => {
  return (
    <div className="flex justify-between">
      <div>
        <p className="text-sm font-medium leading-none">{name}</p>
      </div>
      <p className="text-sm text-muted-foreground">
        {formatTimestamp(timestamp)}
      </p>
    </div>
  );
};

export default PostHeader;
