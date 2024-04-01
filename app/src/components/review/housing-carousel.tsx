import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "../ui/carousel";


const HousingCarousel = ({ housingImages }: { housingImages: string[] }) => {
    return (
        <Carousel>
            <CarouselContent>
                <CarouselItem>
                    <img src={housingImages[0]} alt="Main Housing" style={{ maxHeight: '500px', width: 'auto', objectFit: 'contain', margin: 'auto' }} />
                </CarouselItem>
                {housingImages.map((imgUrl, index) => (
                    <CarouselItem key={index}>
                        <img src={imgUrl} alt={`Additional Housing ${index}`} style={{ maxHeight: '500px', width: 'auto', objectFit: 'contain', margin: 'auto' }} />
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    );
};

export default HousingCarousel;