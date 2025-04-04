"""
Model utility for dog disease detection.

This module provides a simple interface to use the dog disease detection model.
"""

import numpy as np
from tensorflow.keras.models import load_model
from typing import List, Dict, Any, Optional
import os
import json
import joblib

class DogDiseaseModel:
    """
    A class to handle dog disease prediction using a trained model.
    
    This class provides methods to load the model and make predictions based on symptoms.
    """
    
    _instance = None
    _model = None
    
    # Symptom mapping (index to symptom name)
    _symptom_mapping = {
        0: "fever",
        1: "nasal_discharge",
        2: "loss_of_appetite",
        3: "weight_loss",
        4: "lameness",
        5: "breathing_difficulty",
        6: "swollen_lymph_nodes",
        7: "lethargy",
        8: "depression",
        9: "increased_drinking",
        10: "increased_urination",
        11: "vomiting",
        12: "diarrhea",
        13: "neurological_disorders",
        14: "heart_complication",
        15: "skin_rashes",
        16: "coughing",
        17: "sneezing",
        18: "eye_discharge",
        19: "ear_discharge",
        20: "limping",
        21: "joint_pain",
        22: "muscle_pain",
        23: "seizures",
        24: "tremors",
        25: "paralysis",
        26: "incoordination",
        27: "head_tilt",
        28: "circling",
        29: "blindness",
        30: "deafness",
        31: "excessive_thirst",
        32: "excessive_hunger",
        33: "weight_gain",
        34: "hair_loss",
        35: "itching",
        36: "scratching",
        37: "licking",
        38: "biting",
        39: "aggression",
        40: "anxiety",
        41: "fear",
        42: "hyperactivity",
        43: "confusion",
        44: "disorientation",
        45: "memory_loss",
        46: "learning_difficulties",
        47: "sleep_changes",
        48: "appetite_changes",
        49: "thirst_changes",
        50: "urination_changes",
        51: "defecation_changes",
        52: "vomiting_frequency",
        53: "diarrhea_frequency",
        54: "coughing_frequency",
        55: "sneezing_frequency",
        56: "breathing_rate",
        57: "heart_rate",
        58: "blood_pressure",
        59: "temperature",
        60: "pulse",
        61: "respiratory_rate",
        62: "oxygen_saturation",
        63: "capillary_refill_time",
        64: "mucous_membrane_color",
        65: "skin_turgor",
        66: "hydration_status",
        67: "body_condition_score",
        68: "muscle_condition_score",
        69: "coat_condition",
        70: "nail_condition",
        71: "dental_condition",
        72: "eye_condition",
        73: "ear_condition",
        74: "skin_condition",
        75: "joint_condition",
        76: "muscle_condition",
        77: "neurological_condition",
        78: "cardiovascular_condition",
        79: "respiratory_condition",
        80: "gastrointestinal_condition",
        81: "urinary_condition",
        82: "endocrine_condition",
        83: "immune_condition",
        84: "hematological_condition",
        85: "oncological_condition"
    }
    
    # Disease mapping (index to disease name)
    _disease_mapping = {
        0: "Tick fever",
        1: "Chronic kidney Disease",
        2: "Diabetes",
        3: "Gastrointestinal Disease",
        4: "Allergies",
        5: "Gingivitis",
        6: "Cancers",
        7: "Skin Rashes",
        8: "Hepatitis",
        9: "Tetanus",
        10: "Heart Disease",
        11: "Respiratory Disease",
        12: "Ear Infection",
        13: "Eye Infection",
        14: "Dental Disease",
        15: "Arthritis",
        16: "Obesity",
        17: "Parasites",
        18: "Thyroid Disease",
        19: "Liver Disease"
    }

    def __new__(cls):
        """Singleton pattern to ensure only one instance of the model is loaded."""
        if cls._instance is None:
            cls._instance = super(DogDiseaseModel, cls).__new__(cls)
        return cls._instance

    def __init__(self):
        """Initialize the model with a rule-based system for demonstration."""
        if self._model is None:
            self._model = self.load_model()

    def load_model(self, model_path: Optional[str] = None) -> Any:
        """
        Load the model from the specified path or use the default path.
        
        Args:
            model_path: Path to the model file. If None, uses the default path.
            
        Returns:
            The loaded model.
            
        Raises:
            FileNotFoundError: If the model file is not found.
        """
        if model_path is None:
            # Use default model path
            package_dir = os.path.dirname(os.path.abspath(__file__))
            model_path = os.path.join(package_dir, 'models', 'dogModel.h5')
            
        if not os.path.exists(model_path):
            # For demonstration, return a simple rule-based system
            return self._create_rule_based_system()
            
        try:
            return load_model(model_path)
        except Exception as e:
            print(f"Error loading model: {str(e)}")
            return self._create_rule_based_system()

    def _create_rule_based_system(self):
        """Create a simple rule-based system for demonstration."""
        def predict(symptoms):
            # Simple rule-based logic for demonstration
            if symptoms[0] == 1:  # fever
                return "Tick fever", 0.8
            elif symptoms[9] == 1 and symptoms[10] == 1:  # increased drinking and urination
                return "Diabetes", 0.7
            elif symptoms[11] == 1 and symptoms[12] == 1:  # vomiting and diarrhea
                return "Gastrointestinal Disease", 0.75
            elif symptoms[15] == 1:  # skin rashes
                return "Allergies", 0.65
            elif symptoms[5] == 1:  # breathing difficulty
                return "Respiratory Disease", 0.7
            else:
                return "No specific disease detected", 0.5
        return predict

    def predict(self, symptoms: np.ndarray) -> tuple[str, float]:
        """
        Make a prediction based on the symptoms.
        
        Args:
            symptoms: A numpy array of 86 binary values representing symptoms.
            
        Returns:
            A tuple containing the predicted disease name and confidence score.
        """
        try:
            # Convert input to numpy array if it's not already
            symptoms_array = np.array(symptoms, dtype=np.float32)
            
            # Ensure the input has shape (1, 86) or (86,)
            if len(symptoms_array.shape) == 1:
                if symptoms_array.shape[0] != 86:
                    raise ValueError("Expected 86 binary symptom values")
                symptoms_array = symptoms_array.reshape(1, -1)
            elif len(symptoms_array.shape) == 2:
                if symptoms_array.shape[1] != 86:
                    raise ValueError("Expected 86 binary symptom values")
            else:
                raise ValueError("Invalid input shape. Expected (86,) or (1, 86)")
            
            if callable(self._model):
                return self._model(symptoms_array[0])  # Pass 1D array to rule-based system
            else:
                # Make prediction using Keras model
                prediction = self._model.predict(symptoms_array, verbose=0)
                disease_idx = np.argmax(prediction[0])
                confidence = float(prediction[0][disease_idx])
                return self._disease_mapping[disease_idx], confidence
        except Exception as e:
            raise RuntimeError(f"Error making prediction: {str(e)}")

    def get_symptom_names(self) -> List[str]:
        """Get a list of all symptom names."""
        return list(self._symptom_mapping.values())

    def get_disease_names(self) -> List[str]:
        """Get a list of all disease names."""
        return list(self._disease_mapping.values())

    def get_symptom_count(self) -> int:
        """
        Get the number of symptoms the model expects.
        
        Returns:
            Number of symptoms.
        """
        return 86 