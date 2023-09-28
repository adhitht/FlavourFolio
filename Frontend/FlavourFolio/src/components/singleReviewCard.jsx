import React from 'react';
import PropTypes from 'prop-types';
import '../styles/singleReviewCardStyles.css'

const SingleReviewCard = ({ content, photo, name, rating, emoji }) => {
    return (
        <div className="card-container">
            <div className="card">
                <p>{content}</p>
                <div className="feedback-line">
                    <span className="emoji">😊</span>
                    <span className="feedback-text">Riya feels good about this place.</span>
                </div>
                <div className="user-profile">
                    <div className="photo-container">
                        <img src={photo} alt={`${name}'s photo`} className="user-photo"/>
                    </div>
                    <div className="info-container">
                        <div className="name">{name}</div>
                        <div className="rating-container">
                            <span className="star">★</span>
                            <span className="rating">{rating}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

SingleReviewCard.propTypes = {
    content: PropTypes.string.isRequired,
    photo: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    emoji: PropTypes.string.isRequired
};

export default SingleReviewCard;
