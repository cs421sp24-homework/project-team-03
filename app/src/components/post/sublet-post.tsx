import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel";
import PostHeader from "./post-header";
import type { PostWithUserData } from "@/lib/types";

const SubletPost = ({ post }: { post: PostWithUserData }) => {
  const { title, content, user, images } = post;



  return (
    <div id="post" className="rounded-lg" style={{ width: '340px', height: '360px'}}>
      <div className="">
        <PostHeader
          post={post}
          timestamp={post.timestamp}
          user={user}
        />
      </div>
      <div className="overflow-y-auto text-sm" style={{ height: '80%', scrollbarWidth: 'none', }}>
        {images.length > 0 &&
          <div className="relative py-2 ">
          <Carousel>
            <CarouselContent>
              <CarouselItem className="flex justify-center">
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
            <CarouselPrevious className="absolute left-0 z-10 flex items-center justify-center opacity-50" />
            <CarouselNext className="absolute right-0 z-10 flex items-center justify-center opacity-50"  />
        </>
      )}
          </Carousel>
        </div>
        
          }
        <div className="pb-2 text-base font-bold underline">{title}</div>
            <div className=""><strong>Address:</strong> {post.address}</div>
            <div className=""><strong>Cost:</strong> {post.cost}</div>
            <div className="pb-2">{content}</div>
    
      </div>
    </div>
  );
};

export default SubletPost;
