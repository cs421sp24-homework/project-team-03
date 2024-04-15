import { AvatarIcon, Pencil2Icon } from "@radix-ui/react-icons";
import { useNavigate } from "react-router-dom";
import { useStore } from "@/lib/store";
import Inbox from "../email/inbox";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";
import { PostTypeDialog } from "./post-type-dialog";
import PostAside from "./post-aside";
import { ContactDialog } from "../email/contact-dialog";

type SideBarProps = {
  isPostsView: true | false;
};

function PostSidebar({ isPostsView }: SideBarProps) {
  const navigate = useNavigate();
  const user = useStore((state) => state.user);
  const { toast } = useToast();
  let jhed = "";

  if (user) {
    jhed = user.email.split("@")[0];
  }

  const handleClickHome = () => {
    navigate("/");
  };

  const handleClickPosts = () => {
    navigate("/posts");
  };

  const handleClickProfile = () => {
    navigate(`/users/${jhed}`);
  };

  const handleClickAddPost = () => {
    if (user) {
      // User is logged in, go to posts page
      handleClickPosts();
    } else {
      // User is not logged in, show message
      toast({
        variant: "destructive",
        title: "Sorry! You have to log in to view posts! 🙁",
        description: `Please log in to continue.`,
      });
    }
  };

  return (
    <div className="sticky top-0 z-10 px-10 py-5 text-black bg-white border-b border-gray-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
        <Button variant={"ghost"} size="sm" onClick={handleClickHome}>
          <span className="text-lg font-bold text-slate-500 ">Our App</span>
          </Button>
        </div>
        <div className="flex">
          {isPostsView && <PostTypeDialog />}
          {!isPostsView && (
            <Button id="see-posts" variant={"ghost"} size="sm" onClick={handleClickAddPost}>
              <Pencil2Icon className="w-5 h-5" />
            </Button>
          )}
          
          
          {user && (
            <Button id="profile" variant="ghost" size="sm" onClick={handleClickProfile}>
              <AvatarIcon className="w-5 h-5" />
            </Button>
          )}
          <ContactDialog/>
          <div className="flex px-2">{user && <Inbox />}</div>
          
          <PostAside />
        </div>
      </div>
    </div>
  );
}

export default PostSidebar;
