import HousingsFeed from "@/components/post/housings-post-feed";
import PostSidebar from "@/components/post/post-sidebar";
import { useStore } from "@/lib/store";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


const HousingsPostView = () => {
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
        <HousingsFeed />
      </div>
    </div>
  );
};

export default HousingsPostView;