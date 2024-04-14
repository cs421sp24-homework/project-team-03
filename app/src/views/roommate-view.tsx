import PostSidebar from "@/components/post/post-sidebar";
import RoommateFeed from "@/components/post/roommate-feed";
import { useStore } from "@/lib/store";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


const RoommateView = () => {
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
        <RoommateFeed />
      </div>
    </div>
  );
};

export default RoommateView;