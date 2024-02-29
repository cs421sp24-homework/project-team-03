
import Aside from "@/components/aside";
import Feed from "@/components/feed";
import Sidebar from "@/components/sidebar";


const PostView = () => {
  return (
    <>
      <Sidebar isPostsView={true} />
      <Feed />
      <Aside />
    </>
  );
};

export default PostView;
