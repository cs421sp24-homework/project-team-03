import { GoogleMap, Marker, InfoWindowF } from "@react-google-maps/api";
import { PostWithUserData } from "@/lib/types";
import useQueryPosts from "@/hooks/use-query-posts";
import React, { useState } from "react";
import PostInfoWindow from "../post/post-info-window";

const PostMapContainer = () => {
  const { posts } = useQueryPosts();
  const [selectedPost, setSelectedPost] = useState<PostWithUserData | null>(null);

  const handleMarkerClick = (post: PostWithUserData) => {
    setSelectedPost(post === selectedPost ? null : post);
  };


  return (
    <GoogleMap
      mapContainerStyle={{ height: "400px", width: "800px" }}
      center={{ lat: 39.330420, lng: -76.618050 }}
      options={{ controlSize: 25 }}
      zoom={13}
    >
    {posts.map((item: PostWithUserData, index: number) => (
      item.latitude !== undefined &&
      item.longitude !== undefined && (
        <React.Fragment key={index}>
          <Marker
            position={{ lat: item.latitude, lng: item.longitude }}
            onClick={() => handleMarkerClick(item)}
          />
          {selectedPost === item && (
          <InfoWindowF
            onCloseClick={() => setSelectedPost(null)}
            position={{ lat: item.latitude, lng: item.longitude }}
          >
            <div>
              <PostInfoWindow post={item}/>
            </div>
          </InfoWindowF>
          )}
        </React.Fragment>
      )
    ))}
    </GoogleMap>
  );
};

export default PostMapContainer;
