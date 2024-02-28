import { Button } from "./ui/button";

// Represents our header of our feed
const Header = () => {
  return (
    <div className="flex justify-center gap-3 p-4 border-b border-slate-400">
      <Button variant={"link"} className="font-semibold">
        Catalog
      </Button>
      <Button variant={"link"} className="font-semibold">
        Feed
      </Button>
    </div>
  );
};

export default Header;
