import { getPostImageURL, uploadPostImage } from "@/lib/api";

const useMutationImages = () => {
  const postImagesToURLs = async (
    images: File[]
  ): Promise<string[]> => {
    // Method 1
    const imageURLs: Promise<string>[] = images.map(img => 
      uploadPostImage(img)                  // get uploaded image's path in Supabase bucket
      .then(path => getPostImageURL(path))  // get PublicUrl of image at path
    );
    return Promise.all(imageURLs);

    // Method 2 (doesn't seem to work)
    // let imageURLs: string[] = [];
    // images.forEach(async (img) => {
    //   const path: string = await uploadPostImage(img); console.log(path);
    //   const url: string = getPostImageURL(path); console.log(url);
    //   imageURLs.push(url);
    // });
    // return imageURLs;
  }

  return {
    postImagesToURLs,
  };
}

export default useMutationImages;