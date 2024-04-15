import PostSidebar from "@/components/post/post-sidebar";
import SubletFeed from "@/components/post/sublet-feed";
import { useStore } from "@/lib/store";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


const SubletView = () => {
  const user = useStore((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className="flex flex-col h-screen">
      <PostSidebar isPostsView={false} />
      <div>
        <SubletFeed />
      </div>
    </div>
  );
};

export default SubletView;