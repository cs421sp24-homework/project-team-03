type StarRatingProps = {
    rating: number;
    setRating?: (rating: number) => void; // Optional setRating function
  };
  
  const StarRating = ({ rating, setRating }: StarRatingProps) => {
    const totalStars = 5;
  
    return (
      <div>
        {[...Array(totalStars)].map((_, index) => {
          const starRating = index + 1;
          return (
            <span
              className={`star star-${starRating}`}
              key={index}
              style={{ cursor: 'pointer' }}
              onClick={() => setRating && setRating(starRating)}
            >
              {starRating <= rating ? '★' : '☆'}
            </span>
          );
        })}
      </div>
    );
  };
  
  export default StarRating;
  