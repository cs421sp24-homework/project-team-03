import { getPostImageData, uploadPostImage } from "@/lib/api";
import { ImageMetadata } from "@/lib/types";

const useMutationImages = () => {
  const postImagesToData = async (
    images: File[]
  ): Promise<ImageMetadata[]> => {
    // Method 1
    const imageDataArray: Promise<ImageMetadata>[] = images.map(img => 
      uploadPostImage(img)  // returns uploaded image's path in Supabase storage
      .then(path => getPostImageData(path))  // returns image metadata
    );
    return Promise.all(imageDataArray);

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
    // postImagesToURLs
    postImagesToData
  };
}

export default useMutationImages;