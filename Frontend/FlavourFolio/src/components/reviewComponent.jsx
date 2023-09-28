import SingleReviewCard from './singleReviewCard';
import '../styles/reviewComponentStyles.css';
const ReviewList = ({reviews}) => {
    return (
        <div className="review-list">
            <h1 className="review-heading">Reviews</h1>
            {reviews && reviews.map((review, index) => (
                <SingleReviewCard 
                    key={index}
                    content={review.review}
                    photo={review.photo}
                    name={review.display_name}
                    rating={review.rating}
                    sentimental_score={review.sentimental_score}
                />
            ))}
        </div>
    );
}

export default ReviewList;
