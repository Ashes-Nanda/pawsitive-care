"""
Simple Flask API server for dog disease detection.

This script provides a simple Flask API server that can be used to serve
the dog disease detection model as a REST API.
"""

from flask import Flask, jsonify
from flask_restful import Api, Resource, reqparse
from flask_cors import CORS
import os
import numpy as np
from model_utils import DogDiseaseModel

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes
api = Api(app)

# Initialize the model
model = DogDiseaseModel()

class HealthCheck(Resource):
    def get(self):
        """Health check endpoint."""
        return {'status': 'healthy', 'message': 'API is running'}, 200

class PredictDisease(Resource):
    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument('symptoms', type=list, required=True, 
                                 help='No symptoms provided', location='json')
        super(PredictDisease, self).__init__()

    def post(self):
        """Predict disease based on symptoms."""
        try:
            args = self.reqparse.parse_args()
            symptoms = args['symptoms']
            
            if not symptoms or len(symptoms) != 86:
                return {
                    'status': 'error',
                    'message': 'Invalid symptoms data. Expected 86 binary values.'
                }, 400
                
            # Convert symptoms to numpy array
            symptoms_array = np.array(symptoms, dtype=np.float32)
            
            # Use rule-based system directly
            if symptoms_array[0] == 1:  # fever
                disease_name, confidence = "Tick fever", 0.8
            elif symptoms_array[9] == 1 and symptoms_array[10] == 1:  # increased drinking and urination
                disease_name, confidence = "Diabetes", 0.7
            elif symptoms_array[11] == 1 and symptoms_array[12] == 1:  # vomiting and diarrhea
                disease_name, confidence = "Gastrointestinal Disease", 0.75
            elif symptoms_array[15] == 1:  # skin rashes
                disease_name, confidence = "Allergies", 0.65
            elif symptoms_array[5] == 1:  # breathing difficulty
                disease_name, confidence = "Respiratory Disease", 0.7
            else:
                disease_name, confidence = "No specific disease detected", 0.5
            
            return {
                'status': 'success',
                'disease_name': disease_name,
                'confidence': float(confidence)
            }, 200
            
        except Exception as e:
            app.logger.error(f"Error in predict endpoint: {str(e)}")
            return {
                'status': 'error',
                'message': str(e)
            }, 500

@app.route('/symptoms', methods=['GET'])
def get_symptoms():
    """Get a list of all symptoms."""
    try:
        symptoms = model.get_symptom_names()
        return jsonify({
            'status': 'success',
            'symptoms': symptoms,
            'count': len(symptoms)
        })
    except Exception as e:
        app.logger.error(f"Error in symptoms endpoint: {str(e)}")
        return jsonify({
            'status': 'error',
            'message': str(e)
        }), 500

@app.route('/diseases', methods=['GET'])
def get_diseases():
    """Get a list of all diseases."""
    try:
        diseases = model.get_disease_names()
        return jsonify({
            'status': 'success',
            'diseases': diseases,
            'count': len(diseases)
        })
    except Exception as e:
        app.logger.error(f"Error in diseases endpoint: {str(e)}")
        return jsonify({
            'status': 'error',
            'message': str(e)
        }), 500

# Add resources to API
api.add_resource(HealthCheck, '/health')
api.add_resource(PredictDisease, '/predict')

def run_server(host='0.0.0.0', port=5000, debug=False):
    """Run the Flask server."""
    app.run(host=host, port=port, debug=debug)

if __name__ == '__main__':
    run_server() 