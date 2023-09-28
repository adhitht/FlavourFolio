import string
import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from nltk.stem import WordNetLemmatizer
import pickle
import sys

lemmatizer = WordNetLemmatizer()
def preprocess_text(text):
    text = text.translate(str.maketrans('', '', string.punctuation))
    text = text.lower()
    words = word_tokenize(text)
    stop_words = set(stopwords.words('english'))
    words = [word for word in words if word not in stop_words]    
    words = [lemmatizer.lemmatize(word) for word in words]    
    cleaned_text = ' '.join(words)
    return cleaned_text

def predict_sentiment(input_text, model, vectorizer):
    input_text = preprocess_text(input_text)
    input_vector = vectorizer.transform([input_text])
    prediction = model.predict(input_vector)
    return prediction[0]

with open('flavorfolio.pkl', 'rb') as model_file:
    loaded_model = pickle.load(model_file)

with open('tfidf_vectorizer.pkl', 'rb') as vectorizer_file:
    tfidf_vectorizer = pickle.load(vectorizer_file)

# input_review = input("give me the review")
# predicted_sentiment = predict_sentiment(input_review, loaded_model, tfidf_vectorizer)
# print("Predicted Sentiment:", predicted_sentiment)

if __name__ == "__main__":
    input_data = sys.argv[1]
    result = predict_sentiment(input_data, loaded_model, tfidf_vectorizer)
    print(result)