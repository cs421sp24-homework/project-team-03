
type PostHeaderProps = {
  name: string; // author's display name
  timestamp?: string; // post's timestamp
};

const PostHeader = ({ name, timestamp }: PostHeaderProps) => {
  const formattedTimestamp = timestamp ? new Date(timestamp).toLocaleString() : '';
  return (
    <div className="flex flex-col">
      <div>
        <p id="username-area" className="text-md font-medium leading-none">{name}</p>
      </div>
      <p className="text-sm text-muted-foreground">
        {formattedTimestamp}
      </p>
    </div>
  );
};

export default PostHeader;
