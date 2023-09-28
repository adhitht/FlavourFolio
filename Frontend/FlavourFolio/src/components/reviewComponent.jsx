import React from 'react';
import SingleReviewCard from './singleReviewCard';
import '../styles/reviewComponentStyles.css';
import CommentCard from './CommentCard.jsx';

const ReviewList = (reviews) => {
    return (
        <div className="review-list">
            <h1 className="review-heading">Reviews</h1>
            {reviews.map((review, index) => (
                <SingleReviewCard 
                    key={index}
                    content={review.content}
                    photo={review.photo}
                    name={review.name}
                    rating={review.rating}
                    emoji={review.emoji}
                />
            ))}
        </div>
    );
}

export default ReviewList;


//Pass review like this
/*
    const reviews = [
        {
            content: "Great food and great atmosphere! The chicken tikka masala and garlic naan tasted as if they had come straight from India itself. Because I was so pleased with the entrie I ended up ordering the gulab jamun desert and mango lassi beverage and again I was nothing but pleased! Also the employees and management were all very attentive and they made sure we had everything we needed from beginning to end. The manager Matt personally came around even to check on our experience!",
            photo: "https://images.unsplash.com/photo-1576828831022-ca41d3905fb7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1923&q=80",
            name: "Riya",
            rating: 4.5,
            emoji: "😊"
        },
        {
            content: "Great food and great atmosphere! The chicken tikka masala and garlic naan tasted as if they had come straight from India itself. Because I was so pleased with the entrie I ended up ordering the gulab jamun desert and mango lassi beverage and again I was nothing but pleased! Also the employees and management were all very attentive and they made sure we had everything we needed from beginning to end. The manager Matt personally came around even to check on our experience!",
            photo: "https://images.unsplash.com/photo-1576828831022-ca41d3905fb7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1923&q=80",
            name: "Riya",
            rating: 4.5,
            emoji: "😊"
        },
        {
            content: "Great food and great atmosphere! The chicken tikka masala and garlic naan tasted as if they had come straight from India itself. Because I was so pleased with the entrie I ended up ordering the gulab jamun desert and mango lassi beverage and again I was nothing but pleased! Also the employees and management were all very attentive and they made sure we had everything we needed from beginning to end. The manager Matt personally came around even to check on our experience!",
            photo: "https://images.unsplash.com/photo-1576828831022-ca41d3905fb7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1923&q=80",
            name: "Riya",
            rating: 4.5,
            emoji: "😊"
        }
        //add
    ];
*/
