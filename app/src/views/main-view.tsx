
import Aside from "@/components/aside";
import Sidebar from "@/components/sidebar";
import Feed from "@/components/catalog/feed";

const MainView = () => {
  return (
    <>
      <Sidebar />
      <Feed />
      <Aside />
    </>
  );
};

export default MainView;
