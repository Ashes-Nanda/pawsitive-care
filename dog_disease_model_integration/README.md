# Dog Disease Detection Model Integration

This package provides a simple interface to use the dog disease detection model in other Python applications or web services.

## Contents

- `models/dogModel.h5`: The trained model file
- `model_utils.py`: Python module with the `DogDiseaseModel` class
- `api_server.py`: Simple Flask API server
- `example.py`: Example script demonstrating how to use the model
- `requirements.txt`: Required Python packages

## Installation

1. Copy the entire `dog_disease_model_integration` folder to your project.
2. Install the required dependencies:

```bash
pip install -r dog_disease_model_integration/requirements.txt
```

## Usage

### Option 1: Use as a Python Module

```python
from dog_disease_model_integration.model_utils import DogDiseaseModel

# Initialize the model
model = DogDiseaseModel()

# Example symptoms (86 binary values)
# 1 = symptom present, 0 = symptom absent
symptoms = [1, 1, 0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 0, 1, 0, 0]
# Add remaining symptoms to make it 86 values
symptoms.extend([0] * (86 - len(symptoms)))

# Make prediction
try:
    result = model.predict(symptoms)
    print(f"Predicted Disease: {result['name']}")
    print(f"Confidence: {result['confidence']:.2f}")
except Exception as e:
    print(f"Error: {str(e)}")
```

### Option 2: Run as a Flask API Server

```bash
# From the parent directory of dog_disease_model_integration
python -m dog_disease_model_integration.api_server
```

This will start a Flask server on http://localhost:5000 with the following endpoints:

- `GET /health`: Health check endpoint
- `POST /predict`: Predict disease based on symptoms
- `GET /symptoms`: Get a list of all symptoms
- `GET /diseases`: Get a list of all diseases

### Option 3: Run the Example Script

```bash
# From the parent directory of dog_disease_model_integration
python -m dog_disease_model_integration.example
```

## API Endpoints

### Health Check

```
GET /health
```

Response:
```json
{
    "status": "success",
    "message": "Dog Disease Detection API is running"
}
```

### Predict Disease

```
POST /predict
Content-Type: application/json

{
    "symptoms": [1, 1, 0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 0, 1, 0, 0, ...]
}
```

Response:
```json
{
    "status": "success",
    "disease_class": 1,
    "disease_name": "Chronic kidney Disease",
    "confidence": 0.95
}
```

### Get Symptoms

```
GET /symptoms
```

Response:
```json
{
    "status": "success",
    "symptoms": ["fever", "nasal_discharge", ...],
    "count": 86
}
```

### Get Diseases

```
GET /diseases
```

Response:
```json
{
    "status": "success",
    "diseases": ["Tick fever", "Chronic kidney Disease", ...],
    "count": 20
}
```

## Frontend Integration

To integrate with a frontend application, you can use the Flask API server and make HTTP requests to the endpoints. Here's an example using JavaScript:

```javascript
// Example using fetch API
async function predictDisease(symptoms) {
  try {
    const response = await fetch('http://localhost:5000/predict', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ symptoms }),
    });
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    return { status: 'error', message: error.message };
  }
}

// Example usage
const symptoms = [1, 1, 0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 0, 1, 0, 0];
// Add remaining symptoms to make it 86 values
while (symptoms.length < 86) {
  symptoms.push(0);
}

predictDisease(symptoms)
  .then(result => {
    if (result.status === 'success') {
      console.log(`Predicted Disease: ${result.disease_name}`);
      console.log(`Confidence: ${result.confidence}`);
    } else {
      console.error(`Error: ${result.message}`);
    }
  });
```

## Notes

- The model expects exactly 86 binary values (0 or 1) representing symptoms.
- The model returns a disease class, disease name, and confidence score.
- The model is loaded lazily, so it's only loaded when the first prediction is made. 