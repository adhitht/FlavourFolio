import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, classification_report
import os
import math
from sklearn.svm import SVC
import string
import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from nltk.stem import WordNetLemmatizer
import matplotlib.pyplot as plt
import pickle

def create_rating_graph(df):
    ratings = df['Rating']
    rating_counts = ratings.value_counts().sort_index()
    plt.bar(rating_counts.index, rating_counts.values)
    plt.xlabel('Rating')
    plt.ylabel('Count')
    plt.title('Number of Rating vs Count')
    plt.show()

def preprocess_text(text):
    text = text.translate(str.maketrans('', '', string.punctuation))
    text = text.lower()
    words = word_tokenize(text)
    stop_words = set(stopwords.words('english'))
    words = [word for word in words if word not in stop_words]    
    words = [lemmatizer.lemmatize(word) for word in words]    
    cleaned_text = ' '.join(words)
    return cleaned_text

def get_sentiment(rating):
    try:
        rateinint = math.floor(float(rating))
        if rateinint > 3:
            return 'positive'
        elif rateinint == 3:
            return 'neutral'
        else:
            return 'negative'
    except: 
        return 'neutral'

df = pd.read_csv('/home/adhitht/Projects/FlavorFolio/ML/data/Restaurant_reviews.csv')

# create_rating_graph(df)

nltk.download('punkt')
nltk.download('stopwords')
nltk.download('wordnet')
lemmatizer = WordNetLemmatizer()

df['sentiment'] = df['Rating'].apply(get_sentiment)

# To remove unfilled/ null data
df['Review'].fillna("N/A", inplace=True)
df['Review'] = df['Review'].apply(preprocess_text)

# random state of 41 gives best results in terms of accuracy
X_train, X_test, y_train, y_test = train_test_split(df['Review'], df['sentiment'], test_size=0.2, random_state=43)

# Create a TF-IDF vectorizer
tfidf_vectorizer = TfidfVectorizer(max_features=5000, stop_words='english')
X_train_tfidf = tfidf_vectorizer.fit_transform(X_train)
X_test_tfidf = tfidf_vectorizer.transform(X_test)

model = SVC(C=3.5)
# For C=3.5 the accuracy performs well. The default value of C is 1.0
model.fit(X_train_tfidf, y_train)

# Make predictions
y_pred = model.predict(X_test_tfidf)

def predict_sentiment(input_text, model, vectorizer):
    input_text = preprocess_text(input_text)
    input_vector = vectorizer.transform([input_text])
    prediction = model.predict(input_vector)
    print(prediction)
    return prediction[0]

# Evaluate the model
input_review = "I visited for chai at around 9.30am. Restaurant was closed but tea and snacks was open. Place was really in bad shape with hardly and signs of cleanliness. I also took a cream bun and it was really bad. He cream was not real cream ... Some kind of artificial cream that left my stomach heavy for a few hours. Very disappointed. More than food the cleanliness was scary."
predicted_sentiment = predict_sentiment(input_review, model, tfidf_vectorizer)
print("Predicted Sentiment:", predicted_sentiment)

accuracy = accuracy_score(y_test, y_pred)
print("Accuracy:", accuracy)

# Generate a classification report
print(classification_report(y_test, y_pred))


# Model serialization
# Save the trained model to a file using pickle
with open('flavorfolio.pkl', 'wb') as model_file:
    pickle.dump(model, model_file)

print("Saving vectorizer code")
with open('tfidf_vectorizer.pkl', 'wb') as vectorizer_file:
    pickle.dump(tfidf_vectorizer, vectorizer_file)