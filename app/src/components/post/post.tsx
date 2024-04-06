import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel";
import PostHeader from "./post-header";
import type { PostWithUserData } from "@/lib/types";

const Post = ({ post }: { post: PostWithUserData }) => {
  const { title, content, user, images } = post;

  return (
    <div id="post" className="p-1 rounded-lg" style={{ width: '340px', height: '360px', backgroundColor: 'rgb( 244, 241, 232 )' }}>
      <div className="px-2">
        <PostHeader
          post={post}
          timestamp={post.timestamp}
          user={user}
        />
      </div>
      <div className="px-4 py-2 overflow-y-auto text-sm" style={{ height: '80%', scrollbarWidth: 'none', }}>
        <div className="pb-2 text-base font-bold underline">{title}</div>
          <div className="pl-2">
            <div className="pb-2">{content}</div>
            <div>
              <span className="font-bold">Type: </span>{post.type}
            </div>
            <div>
              <span className="font-bold">Cost: </span>${post.cost}
            </div>
            <div>
              <span className="font-bold">Address: </span>{post.address}
            </div>
          </div>
          {images.length > 0 &&
            <div className="flex justify-center py-2 mx-8">
              <Carousel>
                <CarouselContent>
                  <CarouselItem className="flex justify-centerm">
                    <img 
                      src={images[0]} 
                      style={{ width: '100%', objectFit: 'contain' }}
                    />
                  </CarouselItem>
                  {images.slice(1).map((imgUrl, index) => (
                    <CarouselItem className="flex justify-center" key={index}>
                      <img 
                        src={imgUrl} 
                        alt={`Image ${index+1}`} 
                        style={{ width: '100%', objectFit: 'contain' }}
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                
                {images.length > 1 && (
              <>
                  <CarouselPrevious />
                  <CarouselNext />
              </>
          )}
              </Carousel>
            </div>
          }
      </div>
    </div>
  );
};

export default Post;
