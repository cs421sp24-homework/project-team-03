
import Aside from "@/components/aside";
import Feed from "@/components/feed";
import Sidebar from "@/components/sidebar";
import { useStore } from "@/lib/store";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


const PostView = () => {
  const user = useStore((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/project-team-03/");
    }
  }, [user, navigate]);

  return (
    <>
      <Sidebar isPostsView={true} />
      <Feed />
      <Aside />
    </>
  );
};

export default PostView;
