import random
import pickle
import heapq

import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from nltk.tokenize import RegexpTokenizer

import tensorflow as tf
from keras.models import Sequential, load_model
from keras.layers import LSTM, Dense, Activation
from keras.optimizers import RMSprop

# id,title,text,label

text_df = pd.read_csv("data/fake_or_real_news.csv")
# print(text_df)

text = list(text_df.text.values)
joined_text = " ".join(text)
partial_text = joined_text[:100000]

tokenizer = RegexpTokenizer(r"\w+")
tokens = tokenizer.tokenize(partial_text.lower())

# print(len(tokens))

unique_tokens = np.unique(tokens)
unique_token_index = {token: idx for idx, token in enumerate(unique_tokens)}
# print(unique_token_index)

n_words = 10
input_words = []
next_words = []

for i in range(len(tokens) - n_words):
    input_words.append(tokens[i: i + n_words])
    next_words.append(tokens[i + n_words])

X = np.zeros((len(input_words), n_words, len(unique_tokens)), dtype=bool)
y = np.zeros((len(next_words), len(unique_tokens)), dtype=bool)

for i, words in enumerate(input_words):
    for j, word in enumerate(words):
        X[i, j, unique_token_index[word]] = 1
    y[i, unique_token_index[next_words[i]]] = 1

# model = Sequential()
# model.add(LSTM(128, input_shape=(n_words, len(
#     unique_tokens)), return_sequences=True))
# model.add(LSTM(128))
# model.add(Dense(len(unique_tokens)))
# model.add(Activation("softmax"))

# model.compile(loss="categorical_crossentropy", optimizer=RMSprop(
#     learning_rate=0.01), metrics=["accuracy"])
# model.fit(X, y, batch_size=128, epochs=30, shuffle=True)

# model.save("mymodel.h5")
model = load_model("mymodel.h5")


def predict_next_word(input_text, n_best):
    input_text = input_text.lower()
    X = np.zeros((1, n_words, len(unique_tokens)))
    for i, word in enumerate(input_text.split()):
        try:
            X[0, i, unique_token_index[word]] = 1
        except:
            pass
    predictions = model.predict(X)[0]
    result = np.argpartition(predictions, -n_best)[-n_best:]
    # return result
    possible = [unique_tokens[index] for index in result]
    return possible


possible = predict_next_word("he is very", 5)
print(possible)


def generate_text(input_text, n_words, creativity=3):
    word_sequence = input_text.split()
    current = 0
    for _ in range(n_words):
        sub_sequence = " ".join(tokenizer.tokenize(
            " ".join(word_sequence).lower())[current:current+n_words])
        try:
            choice = unique_tokens[random.choice(
                predict_next_word(sub_sequence, creativity))]
        except:
            choice = random.choice(unique_tokens)
        word_sequence.append(choice)
        current += 1
    return " ".join(word_sequence)
