# import necessary libraries
from flask import Flask, render_template, request, jsonify
import pickle
import numpy as np

# create instance of Flask app
app = Flask(__name__)

# create route that renders index.html template
@app.route("/")
def echo():
    return render_template("index.html")

@app.route("/files/brain")
def brain():
    return app.send_static_file('Brain.obj')

@app.route('/post', methods = ['GET', 'POST'])
def post():
    if request.method == 'POST':  #this block is only entered when the form is submitted
        try:
            input1 = float(request.form.get('input1'))
            input2 = float(request.form['input2'])
            input3 = float(request.form['input3'])
            input4 = float(request.form['input4'])
            input5 = float(request.form['input5'])
            input6 = float(request.form['input6'])

        except:
            return '''
                    <form method="POST">
                  Input resistance: <input type="float" name="input1" placeholder="-200 - 1600"><br>
                  Memnbrane time constant: <input type="float" name="input2" placeholder="-40 - 280"><br>
                  Resting membrance potential: <input type="float" name="input3" placeholder="-100 - 100"><br>
                  Spike amplitude: <input type="float" name="input4" placeholder="-70 - 120"><br>
                  Spike halfwidth: <input type="float" name="input5" placeholder="0 - 970"><br>
                  Spike threshold: <input type="float" name="input6" placeholder="-70 - 760"><br>

                  <input type="submit" value="Submit"><br>
              </form>
                                  <p>enter a valid number</p>
                    '''


        filename = 'model/machine_learning3_gradboost.sav'
        forest_model = pickle.load(open(filename, 'rb'))

        # user_data = np.array([ 40., 200.,  80.,  10., 500., -40.])
        user_data = np.array([ input1, input2,  input3,  input4, input5, input6])

        prediction = forest_model.predict(np.array([user_data]))
        output = {"predictions": prediction, "probability": round(forest_model.predict_proba(user_data.reshape(1, -1)).max()*100,2)}

        print('prediction')
        cell = output['predictions'][0]
        probability = output['probability']
        print(cell)
        print(probability)


        return '''
                  <form method="POST">
                  Input resistance: <input type="float" name="input1" placeholder="-200 - 1600"><br>
                  Memnbrane time constant: <input type="float" name="input2" placeholder="-40 - 280"><br>
                  Resting membrance potential: <input type="float" name="input3" placeholder="-100 - 100"><br>
                  Spike amplitude: <input type="float" name="input4" placeholder="-70 - 120"><br>
                  Spike halfwidth: <input type="float" name="input5" placeholder="0 - 970"><br>
                  Spike threshold: <input type="float" name="input6" placeholder="-70 - 760"><br>

                  <input type="submit" value="Submit"><br>
              </form>
              <h1 id='cell' >Cell: {}</h1>
                  <h1 id='prob' >Probability: {}</h1>
                  '''.format(cell, probability)

    return '''<form method="POST">
                  Input resistance: <input type="float" name="input1" placeholder="-200 - 1600"><br>
                  Memnbrane time constant: <input type="float" name="input2" placeholder="-40 - 280"><br>
                  Resting membrance potential: <input type="float" name="input3" placeholder="-100 - 100"><br>
                  Spike amplitude: <input type="float" name="input4" placeholder="-70 - 120"><br>
                  Spike halfwidth: <input type="float" name="input5" placeholder="0 - 970"><br>
                  Spike threshold: <input type="float" name="input6" placeholder="-70 - 760"><br>

                  <input type="submit" value="Submit"><br>
              </form>'''



if __name__ == "__main__":
    app.run(debug=True)
