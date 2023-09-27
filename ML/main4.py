from textblob import TextBlob

# Define your custom positive and negative words
positive_words = ["amazing", "delicious", "excellent", "awesome"]
negative_words = ["terrible", "horrible", "disgusting", "awful"]
neutral_words = ["ok", "fine", "average"]

# Sample food reviews (replace with your actual data)
food_reviews = [
    "The pizza at this place is amazing.",
    "I didn't like the pasta dish I ordered.",
    "The sushi was just ok.",
    "The burger was terrible.",
]

# Perform sentiment analysis with custom words
sentiments = []

for review in food_reviews:
    # Create a TextBlob object for each review
    analysis = TextBlob(review.lower())
    
    # Calculate a custom sentiment score based on positive and negative words
    custom_sentiment = 0
    for word in analysis.words:
        if word in positive_words:
            custom_sentiment += 1
        elif word in negative_words:
            custom_sentiment -= 1
    
    # Assign sentiment labels based on the custom score
    if custom_sentiment > 0:
        sentiment = "Positive"
    elif custom_sentiment < 0:
        sentiment = "Negative"
    else:
        sentiment = "Neutral"
    
    sentiments.append((review, sentiment))

# Print the results
for review, sentiment in sentiments:
    print(f"Review: {review}")
    print(f"Sentiment: {sentiment}")
    print()
