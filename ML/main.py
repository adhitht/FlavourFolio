import nltk
from nltk.sentiment.vader import SentimentIntensityAnalyzer

# Download VADER lexicon and initialize the sentiment analyzer
nltk.download('vader_lexicon')
sia = SentimentIntensityAnalyzer()

# Sample text for sentiment analysis
# text = "I love this restaurant! The food is amazing."
text = "The food is not tasty at all"

# Analyze sentiment
sentiment_scores = sia.polarity_scores(text)

# Determine sentiment based on the compound score
compound_score = sentiment_scores['compound']

if compound_score >= 0.05:
    sentiment = "Positive"
elif compound_score <= -0.05:
    sentiment = "Negative"
else:
    sentiment = "Neutral"

# Print sentiment and sentiment scores
print(f"Sentiment: {sentiment}")
print(f"Sentiment Scores: {sentiment_scores}")
