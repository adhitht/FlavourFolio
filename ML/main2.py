from sklearn.feature_extraction.text import TfidfVectorizer

# Sample food reviews (replace with your actual data)
food_reviews = [
    "The pizza at this place is amazing.",
    "I didn't like the pasta dish I ordered.",
    "The sushi was fresh and delicious.",
    "The restaurant has a great selection of vegan options.",
]

# Initialize the TF-IDF vectorizer
vectorizer = TfidfVectorizer(max_features=1000,  # You can adjust max_features as needed
                             stop_words='english',  # Remove common stop words
                             ngram_range=(1, 2))  # Include unigrams and bigrams

# Fit and transform the reviews to obtain TF-IDF features
tfidf_features = vectorizer.fit_transform(food_reviews)

# Convert the TF-IDF features to a dense array
tfidf_features_array = tfidf_features.toarray()

# Print the feature names (words or terms)
feature_names = vectorizer.get_feature_names_out()
print("Feature Names:", feature_names)

# Print the TF-IDF features for the sample reviews
print("TF-IDF Features for Sample Reviews:")
for i, review in enumerate(food_reviews):
    print(f"Review {i + 1}:")
    for feature, value in zip(feature_names, tfidf_features_array[i]):
        if value > 0:
            print(f"{feature}: {value:.2f}")
    print()
