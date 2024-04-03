import { getPostImageURL, uploadPostImage } from "@/lib/api";

const useMutationImages = () => {
  const postImagesToURLs = async (
    images: File[]
  ): Promise<string[]> => {
    const imageURLs: Promise<string>[] = images.map(img => 
      uploadPostImage(img)                  // get uploaded image's path in Supabase bucket
      .then(path => getPostImageURL(path))  // get PublicUrl of image at path
    );

    return Promise.all(imageURLs);
  }

  return {
    postImagesToURLs,
  };
}

export default useMutationImages;