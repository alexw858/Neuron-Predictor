# import necessary libraries
from flask import Flask, render_template, request, jsonify
import pickle
import numpy as np
# for detailed error messages
import logging
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
                        <p style='margin: 10px'>
                            Input resistance: <input type="text" name="input1" placeholder="-200 - 1600">
                        </p>
                        <p style='margin: 10px'>
                            Membrane time constant: <input type="text" name="input2" placeholder="-40 - 280">
                        </p>
                        <p style='margin: 10px'>
                            Resting membrane potential: <input type="text" name="input3" placeholder="-100 - 100">
                        </p>
                        <p style='margin: 10px'>
                            Spike amplitude: <input type="text" name="input4" placeholder="-70 - 120">
                        </p>
                        <p style='margin: 10px'>
                            Spike half-width: <input type="text" name="input5" placeholder="0 - 970">
                        </p>
                        <p style='margin: 10px'>
                            Spike threshold: <input type="text" name="input6" placeholder="-70 - 760">
                        </p>

                        <button type="submit" >Submit</button>
                    </form>
                    <p>Please enter a valid number</p>'''


        filename = 'model/machine_learning3_gradboost.sav'
        model = pickle.load(open(filename, 'rb'))

        # user_data = np.array([ 40., 200.,  80.,  10., 500., -40.])
        user_data = np.array([ input1, input2,  input3,  input4, input5, input6])

        prediction = model.predict(np.array([user_data]))
        output = {"predictions": prediction, "probability": round(model.predict_proba(user_data.reshape(1, -1)).max()*100,2)}

        print('prediction')
        cell = output['predictions'][0]
        probability = output['probability']
        print(cell)
        print(probability)


        return '''
                <form method="POST">
                    <p style='margin: 10px'>
                        Input resistance: <input type="text" name="input1" placeholder="-200 - 1600">
                    </p>
                    <p style='margin: 10px'>
                        Membrane time constant: <input type="text" name="input2" placeholder="-40 - 280">
                    </p>
                    <p style='margin: 10px'>
                        Resting membrane potential: <input type="text" name="input3" placeholder="-100 - 100">
                    </p>
                    <p style='margin: 10px'>
                        Spike amplitude: <input type="text" name="input4" placeholder="-70 - 120">
                    </p>
                    <p style='margin: 10px'>
                        Spike half-width: <input type="text" name="input5" placeholder="0 - 970">
                    </p>
                    <p style='margin: 10px'>
                        Spike threshold: <input type="text" name="input6" placeholder="-70 - 760">
                    </p>

                    <button type="submit" >Submit</button>
                </form>
                <h3 id='cell' >Cell: {}</h3>
                <h3 id='prob' >Probability: {}%</h3>'''.format(cell, probability)

    return '''
            <form method="POST">
                <p style='margin: 10px'>
                    Input resistance: <input type="text" name="input1" placeholder="-200 - 1600">
                </p>
                <p style='margin: 10px'>
                    Membrane time constant: <input type="text" name="input2" placeholder="-40 - 280">
                </p>
                <p style='margin: 10px'>
                    Resting membrane potential: <input type="text" name="input3" placeholder="-100 - 100">
                </p>
                <p style='margin: 10px'>
                    Spike amplitude: <input type="text" name="input4" placeholder="-70 - 120">
                </p>
                <p style='margin: 10px'>
                    Spike half-width: <input type="text" name="input5" placeholder="0 - 970">
                </p>
                <p style='margin: 10px'>
                    Spike threshold: <input type="text" name="input6" placeholder="-70 - 760">
                </p>

                <button type="submit" >Submit</button>
            </form>'''


if __name__ == "__main__":
    app.run(debug=True)

# if error occurs display detailed message
logging.getLogger().addHandler(logging.StreamHandler())