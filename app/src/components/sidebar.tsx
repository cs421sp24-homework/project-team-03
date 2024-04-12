import { AvatarIcon, HomeIcon, Pencil2Icon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { useStore } from "@/lib/store";
import { useToast } from "./ui/use-toast";
import Inbox from "./email/inbox";
import { ContactDialog } from "./email/contact-dialog";
import { PostTypeDialog } from "./post/post-type-dialog";

type SideBarProps = {
  isPostsView: true | false;
};

function Sidebar({ isPostsView }: SideBarProps) {
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
    navigate(`/users/${jhed}`)
  }

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
    <div className="flex flex-col gap-2 p-4 ">
      <Button variant={"ghost"} size="sm" onClick={handleClickHome}>
        <HomeIcon className="w-5 h-5" />
      </Button>
      {!isPostsView && <Button id="see-posts" variant={"ghost"} size="sm" onClick={handleClickAddPost}>
        <Pencil2Icon className="w-5 h-5" />
      </Button>}
      {isPostsView && <PostTypeDialog />}
      {user && <Button id="profile" variant="ghost" size="sm" onClick={handleClickProfile}><AvatarIcon className="w-5 h-5" /></Button>}
      {user && <Inbox />} 
      <ContactDialog/>
    </div>
  );
}

export default Sidebar;
