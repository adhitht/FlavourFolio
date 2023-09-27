import re

def sentiment_analysis(text, positive_words, negative_words, neutral_words):
  """
  Performs sentiment analysis on a given text using a custom list of positive, negative, and neutral words and gives score on a scale of -1 to 1, even if the list of positive and negative is not part of the input sentence.

  Args:
    text: The text to be analyzed.
    positive_words: A list of positive words.
    positive_weight: The weight to be given to positive words.
    negative_words: A list of negative words.
    negative_weight: The weight to be given to negative words.
    neutral_words: A list of neutral words.
    neutral_weight: The weight to be given to neutral words.

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
      sentiment_score += positive_weight
    elif word in negative_words:
      sentiment_score -= negative_weight
    else:
      sentiment_score += neutral_weight

  # Normalize the sentiment score to a scale of -1 to 1.
  sentiment_score = sentiment_score / len(words)

  # Return the sentiment score.
  return sentiment_score

# Example usage:

positive_words = ["good", "great", "excellent", "happy", "love"]
positive_weight = 1.0
negative_words = ["bad", "terrible", "awful", "hate", "sad"]
negative_weight = -1.0
neutral_words = ["the", "of", "and", "to", "a"]
neutral_weight = 0.0

text = "I had a funny day today!"

sentiment_score = sentiment_analysis(text, positive_words, negative_words, neutral_words)

print(sentiment_score)