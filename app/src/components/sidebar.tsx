import { HomeIcon, Pencil2Icon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { AddPostDialog } from "./post/add-post-dialog";

type SideBarProps = {
  isPostsView: true | false;
};

function Sidebar({ isPostsView }: SideBarProps) {
  const navigate = useNavigate();

  const handleClickHome = () => {
    navigate("/");
  };

  const handleClickPosts = () => {
    navigate("/posts");
  };
  
  return (
    <div className="flex flex-col gap-2 p-4">
      <Button variant={"ghost"} size="sm" onClick={handleClickHome}>
        <HomeIcon className="w-5 h-5" />
      </Button>
      {!isPostsView && <Button variant={"ghost"} size="sm" onClick={handleClickPosts}>
        <Pencil2Icon className="w-5 h-5" />
      </Button>}
      {isPostsView && <AddPostDialog />}
    </div>
  );
}

export default Sidebar;
