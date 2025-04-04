import sys
import os

# Add the dog_disease_model_integration directory to Python path
current_dir = os.path.dirname(os.path.abspath(__file__))
sys.path.append(os.path.join(current_dir, 'dog_disease_model_integration'))

from api_server import run_server

if __name__ == '__main__':
    print("Starting Dog Disease Detection API server...")
    print("Server will be available at http://localhost:5000")
    run_server(host='localhost', port=5000, debug=True) 