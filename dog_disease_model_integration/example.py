"""
Example script demonstrating how to use the dog disease detection model.

This script shows how to use the DogDiseaseModel class directly in a Python application.
"""

from model_utils import DogDiseaseModel

def main():
    # Initialize the model
    model = DogDiseaseModel()
    
    # Example symptoms (86 binary values)
    # 1 = symptom present, 0 = symptom absent
    symptoms = [
        1,  # Fever
        1,  # Nasal Discharge
        0,  # Loss of appetite
        0,  # Weight Loss
        1,  # Lameness
        0,  # Breathing Difficulty
        0,  # Swollen Lymph nodes
        1,  # Lethargy
        0,  # Depression
        1,  # Increased drinking
        1,  # Increased urination
        0,  # Vomiting
        0,  # Diarrhea
        1,  # Neurological Disorders
        0,  # Heart Complication
        0,  # Skin Rashes
    ]
    
    # Add remaining symptoms to make it 86 values
    symptoms.extend([0] * (86 - len(symptoms)))
    
    # Make prediction
    try:
        result = model.predict(symptoms)
        print(f"Predicted Disease: {result['name']}")
        print(f"Confidence: {result['confidence']:.2f}")
    except Exception as e:
        print(f"Error: {str(e)}")
    
    # Get all symptom names
    print("\nAll Symptoms:")
    for i, symptom in enumerate(model.get_symptom_names()):
        print(f"{i}: {symptom}")
    
    # Get all disease names
    print("\nAll Diseases:")
    for i, disease in enumerate(model.get_disease_names()):
        print(f"{i}: {disease}")

if __name__ == "__main__":
    main() 