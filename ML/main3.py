# Sample food-related vocabulary list
food_vocabulary = ["pizza", "sushi", "burger", "delicious", "spicy", "ambiance"]

# Sample food reviews (replace with your actual data)
food_reviews = [
    "The pizza at this place is amazing.",
    "I didn't like the pasta dish I ordered.",
    "The sushi was fresh and delicious.",
    "The restaurant has a great selection of vegan options.",
]

# Initialize feature vectors
feature_vectors = []

# Extract custom features based on food vocabulary
for review in food_reviews:
    feature_vector = [0] * len(food_vocabulary)  # Initialize all values to 0
    words = review.lower().split()  # Tokenize and convert to lowercase
    for i, word in enumerate(food_vocabulary):
        if word in words:
            feature_vector[i] = words.count(word)
    feature_vectors.append(feature_vector)

# Print the feature vectors for the sample reviews
for i, review in enumerate(food_reviews):
    print(f"Review {i + 1} - Custom Features: {feature_vectors[i]}")
