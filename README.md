# BC_Proj003

## Project Overview

A web application was created using machine learning to train a model on predicting neuron types based on firing characteristics.  The data was aquired from [NeuroElectro](https://www.neuroelectro.org/) and was used to train a Gradient Boosting model from the scikit-learn library.  After training the model on 80% of the data (filtered down to the top 6 firing characteristics with the most data), it predicted the correct neuron type with 86% accuracy.

A Heroku web application was created with this model and can be accessed here: [Neuron Predictor](https://neuron-pred.herokuapp.com/)

The landing page
<p align="left"> 
  <img src="https://github.com/alexw858/BC_Proj003/blob/alexBranch/screenshots/neuron_pred_landing_page.png" width="500"/>
 </p>

 After entering data into the 6 input fields, the app makes a prediction
 <p align="left"> 
  <img src="https://github.com/alexw858/BC_Proj003/blob/alexBranch/screenshots/neuron_pred_output.png" width="500"/>
 </p>