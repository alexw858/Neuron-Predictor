# import necessary libraries
from flask import Flask, render_template, request

# create instance of Flask app
app = Flask(__name__)

# create route that renders index.html template
@app.route("/")
def echo():
    return render_template("index.html")

@app.route("/files/brain")
def sendBrain():
    return app.send_static_file('js/Brain.obj')

@app.route("/machine_learning")
def machine_learning():
    import pandas as pd
    neuro = pd.read_csv("Alex/all_neuron_data.csv")
    words = ["CA1", "CA3"]
    for i, row in neuro.iterrows():
        if any(word in row["Cell Type"] for word in words):
    #         print("true")0
            neuro.loc[i, "Area"] = "Hippocampus"
    #         row["Area"] = "Hippocampus"
        else:
            neuro.loc[i, "Area"] = "other"
            row["Area"] = "other"
    categorized_df = pd.get_dummies(neuro, columns=["Measurement"])
    hippo_df = categorized_df.loc[categorized_df["Area"] == "Hippocampus"]
    X=hippo_df.drop(["Cell Type", "Area"], axis=1)
    y=hippo_df["Cell Type"]

    from sklearn.model_selection import train_test_split
    from sklearn.preprocessing import LabelEncoder, StandardScaler
    from keras.utils import to_categorical

    X_train, X_test, y_train, y_test = train_test_split(
        X, y, random_state=1, stratify=y)
    X_scaler = StandardScaler().fit(X_train)
    X_train_scaled = X_scaler.transform(X_train)
    X_test_scaled = X_scaler.transform(X_test)

    # Step 1: Label-encode data set
    label_encoder = LabelEncoder()
    label_encoder.fit(y_train)
    encoded_y_train = label_encoder.transform(y_train)
    encoded_y_test = label_encoder.transform(y_test)

    # Step 2: Convert encoded labels to one-hot-encoding
    y_train_categorical = to_categorical(encoded_y_train)
    y_test_categorical = to_categorical(encoded_y_test)

    from keras.models import Sequential
    from keras.layers import Dense

    # Create model and add layers
    model = Sequential()
    model.add(Dense(units=100, activation='relu', input_dim=53))
    model.add(Dense(units=100, activation='relu'))
    model.add(Dense(units=13, activation='softmax'))

    # Compile and fit the model
    model.compile(optimizer='adam',
        loss='categorical_crossentropy',
        metrics=['accuracy'])
    model.fit(
        X_train_scaled,
        y_train_categorical,
        epochs=60,
        shuffle=True,
        verbose=2
    )

    # Quantify trained model
    model_loss, model_accuracy = model.evaluate(
        X_test_scaled, y_test_categorical, verbose=2)
    print(
        f"Normal Neural Network - Loss: {model_loss}, Accuracy: {model_accuracy}")



    if __name__ == "__main__":
        app.run(debug=True)
