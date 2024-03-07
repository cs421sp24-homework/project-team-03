import { useEffect } from "react";
import { fetchPosts } from "@/lib/api";
import { useStore } from "@/lib/store";
import { useToast } from "@/components/ui/use-toast";
import { getAddressCoordinates } from "@/lib/map";

function useQueryPosts() {
  const { toast } = useToast();
  const posts = useStore((state) => state.posts);
  const setPosts = useStore((state) => state.setPosts);

  const loadPosts = async () => {
    try {
      const fetchedPosts = await fetchPosts();

      for (const item of fetchedPosts) {
        const { address } = item;
        const coordinates = await getAddressCoordinates(address);
        if (coordinates) {
          item.latitude = coordinates.lat;
          item.longitude = coordinates.lng;
        }
      }

      setPosts(fetchedPosts);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to fetch posts",
        description:
          (error as Error).message ||
          "There was an error loading the posts. Please try again later.",
      });
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  return { posts };
}

export default useQueryPosts;
