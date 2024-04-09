import { AvatarIcon, HomeIcon, Pencil2Icon, QuestionMarkCircledIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { AddPostDialog } from "./post/add-post-dialog";
import { useStore } from "@/lib/store";
import { useToast } from "./ui/use-toast";
import Inbox from "./email/inbox";
import { ContactDialog } from "./email/contact-dialog";

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
    <div className="flex flex-col gap-2 p-4">
      <Button variant={"ghost"} size="sm" onClick={handleClickHome}>
        <HomeIcon className="w-5 h-5" />
      </Button>
      {!isPostsView && <Button id="see-posts" variant={"ghost"} size="sm" onClick={handleClickAddPost}>
        <Pencil2Icon className="w-5 h-5" />
      </Button>}
      {isPostsView && <AddPostDialog />}
      {user && <Button id="profile" variant="ghost" size="sm" onClick={handleClickProfile}><AvatarIcon className="w-5 h-5" /></Button>}
      {user && <Inbox />} 
      <ContactDialog/>
    </div>
  );
}

export default Sidebar;
