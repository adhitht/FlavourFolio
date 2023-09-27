from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score
from sklearn.model_selection import train_test_split

# Sample food review dataset
reviews = [
    "The pizza tasted amazing, but the service was terrible.",
    "The sushi was excellent, and the presentation was beautiful.",
    "The burger was just okay, nothing special.",
    "The dessert was to die for!"
]

# Corresponding sentiment labels (0 for negative, 1 for positive)
sentiments = [1, 1, 0, 1]

# Custom weights for specific words
custom_weights = {
    "amazing": 2.0,
    "terrible": -2.0,
    "excellent": 2.0,
    "beautiful": 1.5,
    "just okay": 0.5,
    "to die for": 2.5
}

# Initialize TF-IDF vectorizer with custom weights
tfidf_vectorizer = TfidfVectorizer(
    stop_words='english',
    vocabulary=custom_weights.keys(),
    tokenizer=lambda x: x.split(),  # Tokenize by space
    lowercase=True,
    use_idf=False,  # Disable IDF weighting
    norm=None,      # Disable L2 normalization
)

# Fit and transform the reviews
X = tfidf_vectorizer.fit_transform(reviews)

# Apply custom weights to the TF-IDF matrix
for word, weight in custom_weights.items():
    col_idx = tfidf_vectorizer.vocabulary_.get(word)
    if col_idx is not None:
        X[:, col_idx] *= weight

# Split the data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, sentiments, test_size=0.2, random_state=42)

# Train a logistic regression classifier
classifier = LogisticRegression()
classifier.fit(X_train, y_train)

# Make predictions on the test set
y_pred = classifier.predict(X_test)

# Evaluate the model
accuracy = accuracy_score(y_test, y_pred)
print("Accuracy:", accuracy)
