import { useEffect } from "react";
import { fetchPosts } from "@/lib/api";
import { useStore } from "@/lib/store";
import { useToast } from "@/components/ui/use-toast";

function useQueryPosts() {
  const { toast } = useToast();
  const posts = useStore((state) => state.posts);
  const setPosts = useStore((state) => state.setPosts);

  const loadPosts = async () => {
    try {
      const fetchedPosts = await fetchPosts();
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
