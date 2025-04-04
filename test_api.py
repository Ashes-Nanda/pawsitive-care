import requests
import json
import numpy as np

def test_health():
    """Test the health endpoint."""
    response = requests.get('http://localhost:5000/health')
    print(f"Health check status: {response.status_code}")
    print(f"Response: {response.json()}")

def make_prediction(symptoms):
    """Make a prediction with the given symptoms."""
    response = requests.post(
        'http://localhost:5000/predict',
        json={'symptoms': symptoms.tolist()},
        headers={'Content-Type': 'application/json'}
    )
    
    print(f"Predict status: {response.status_code}")
    if response.status_code == 200:
        print(f"Response: {response.json()}")
    else:
        print(f"Error: {response.text}")
    print()

def test_predict():
    """Test the predict endpoint with different symptom combinations."""
    print("\nTesting different symptom combinations:")
    
    # Test case 1: Fever only
    print("Test case 1: Fever only")
    symptoms = np.zeros(86, dtype=np.float32)
    symptoms[0] = 1  # fever
    make_prediction(symptoms)
    
    # Test case 2: Diabetes symptoms
    print("Test case 2: Diabetes symptoms")
    symptoms = np.zeros(86, dtype=np.float32)
    symptoms[9] = 1  # increased drinking
    symptoms[10] = 1  # increased urination
    make_prediction(symptoms)
    
    # Test case 3: Gastrointestinal symptoms
    print("Test case 3: Gastrointestinal symptoms")
    symptoms = np.zeros(86, dtype=np.float32)
    symptoms[11] = 1  # vomiting
    symptoms[12] = 1  # diarrhea
    make_prediction(symptoms)
    
    # Test case 4: Skin condition
    print("Test case 4: Skin condition")
    symptoms = np.zeros(86, dtype=np.float32)
    symptoms[15] = 1  # skin rashes
    make_prediction(symptoms)
    
    # Test case 5: Respiratory condition
    print("Test case 5: Respiratory condition")
    symptoms = np.zeros(86, dtype=np.float32)
    symptoms[5] = 1  # breathing difficulty
    make_prediction(symptoms)
    
    # Test case 6: No specific symptoms
    print("Test case 6: No specific symptoms")
    symptoms = np.zeros(86, dtype=np.float32)
    make_prediction(symptoms)

if __name__ == '__main__':
    print("Testing Dog Disease Detection API...")
    test_health()
    test_predict() 