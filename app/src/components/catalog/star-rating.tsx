type StarRatingProps = {
    rating: number;
}

const StarRating = (props: StarRatingProps) => {
    const { rating } = props;
    const totalStars = 5;
    const filledStars = rating;
    // const filledStars = Math.round(rating * totalStars / 100);

    return (
        <div>
            {[...Array(totalStars)].map((_, index) => {
                return (
                    <span key={index}>
                        {index < filledStars ? '★' : '☆'}
                    </span>
                );
            })}
        </div>
    );
};

export default StarRating;