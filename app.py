# import necessary libraries
from flask import Flask, render_template, request

# create instance of Flask app
app = Flask(__name__)

# create route that renders index.html template
@app.route("/")
def echo():
    return render_template("index.html")

@app.route("/files/brain")
def brain():
    return app.send_static_file('Brain.obj')

@app.route("/result")
def result():
    return "12345"


if __name__ == "__main__":
    app.run(debug=True)
