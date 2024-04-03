import { useToast } from "@/components/ui/use-toast";
import { createPost, deletePost, editPost } from "@/lib/api";
import { useStore } from "@/lib/store";
import { PostType } from "@/lib/types";

function useMutationPosts() {
    const { toast } = useToast();
    const removePost = useStore((state) => state.removePost);
    const addPost = useStore((state) => state.addPosts);
    const postEdit = useStore((state) => state.setEditPosts);

    const removePostById = async (postId: string) => {
        try {
            await deletePost(postId);
            removePost(postId);
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Failed to delete the post",
                description:
                    (error as Error).message ||
                    "There was an error deleting the post. Please try again later.",
            });
        }
    };

    const makeNewPost = async (
        title: string,
        content: string,
        cost: number,
        address: string,
        type: PostType,
        // images: File[],
        image?: string,
    ) => {
        try {
            // let imageURLs: string[] = [];
            // if (images.length !== 0) {
            //     imageURLs = await uploadPostImages(images);
            // }
            const newPost = await createPost(title, content, cost, address, type, image);
            addPost(newPost);
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Failed to create the post",
                description:
                    (error as Error).message ||
                    "There was an error creating the post. Please try again later.",
            });
        }
    };

    const editPostById = async (
        postId: string,
        title?: string,
        content?: string,
        cost?: number,
        address?: string,
        type?: PostType,
        image?: string,
    ) => {
        try {
            const postEdited = await editPost(postId, title, content, cost, address, image, type);
            if (postEdited) postEdit(postEdited);
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Failed to edit the post",
                description:
                    (error as Error).message ||
                    "There was an error editing the post. Please try again later.",
            });
        }
    };

    return {
        removePostById,
        makeNewPost,
        editPostById,
    };

}

export default useMutationPosts;