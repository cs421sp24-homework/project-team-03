type StarRatingProps = {
    rating: number;
}

const StarRating = (props: StarRatingProps) => {
    const { rating } = props;
    const totalStars = 5;
    // .4 and below rounds down, .5 and above rounds up
    const filledStars = Math.floor(rating) + (rating % 1 >= 0.5 ? 1 : 0);

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