import re

def sentiment_analysis(text, positive_words, negative_words, neutral_words):
  """
  Performs sentiment analysis on a given text using a custom list of positive, negative, and neutral words and gives score on a scale of -1 to 1.

  Args:
    text: The text to be analyzed.
    positive_words: A list of positive words.
    negative_words: A list of negative words.
    neutral_words: A list of neutral words.

  Returns:
    A float indicating the sentiment of the text, on a scale of -1 to 1, where -1 is negative and 1 is positive.
  """

  # Preprocess the text by converting it to lowercase and removing punctuation.
  text = text.lower()
  text = re.sub(r'[^\w\s]', '', text)

  # Tokenize the text into a list of words.
  words = text.split()

  # Initialize the sentiment score.
  sentiment_score = 0

  # Iterate over the words in the text and count the number of positive, negative, and neutral words.
  for word in words:
    if word in positive_words:
      sentiment_score += 1
    elif word in negative_words:
      sentiment_score -= 1

  # Normalize the sentiment score to a scale of -1 to 1.
  sentiment_score = sentiment_score / len(words)

  # Return the sentiment score.
  return sentiment_score

# Example usage:

positive_words = ["good", "great", "excellent", "happy", "love"]
negative_words = ["bad", "terrible", "awful", "hate", "sad"]
neutral_words = ["the", "of", "and", "to", "a"]

text = "I had a really food from Chicken Dhaba."

sentiment_score = sentiment_analysis(text, positive_words, negative_words, neutral_words)

print(sentiment_score)