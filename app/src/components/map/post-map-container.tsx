import { GoogleMap, Marker } from "@react-google-maps/api";
import { PostWithUserData } from "@/lib/types";
import useQueryPosts from "@/hooks/use-query-posts";

const PostMapContainer = () => {
  const { posts } = useQueryPosts();

  return (
    <GoogleMap
      mapContainerStyle={{ height: "400px", width: "800px" }}
      center={{ lat: 39.330420, lng: -76.618050 }}
      zoom={13}
    >
      {posts.map((item: PostWithUserData, index: number) => (
        item.latitude !== undefined &&
        item.longitude !== undefined && (
          <Marker
            key={index}
            position={{ lat: item.latitude, lng: item.longitude }}
          />
        )
      ))}
    </GoogleMap>
  );
};

export default PostMapContainer;
