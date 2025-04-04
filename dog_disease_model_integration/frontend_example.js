/**
 * Dog Disease Detection Model - Frontend Integration Example
 * 
 * This file demonstrates how to integrate the dog disease detection model
 * with a frontend application using the Flask API server.
 */

// API base URL
const API_BASE_URL = 'http://localhost:5000';

/**
 * Check if the API is running
 * @returns {Promise<Object>} API health status
 */
async function checkApiHealth() {
  try {
    const response = await fetch(`${API_BASE_URL}/health`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error checking API health:', error);
    return { status: 'error', message: error.message };
  }
}

/**
 * Get a list of all symptoms
 * @returns {Promise<Object>} List of symptoms
 */
async function getSymptoms() {
  try {
    const response = await fetch(`${API_BASE_URL}/symptoms`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error getting symptoms:', error);
    return { status: 'error', message: error.message };
  }
}

/**
 * Get a list of all diseases
 * @returns {Promise<Object>} List of diseases
 */
async function getDiseases() {
  try {
    const response = await fetch(`${API_BASE_URL}/diseases`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error getting diseases:', error);
    return { status: 'error', message: error.message };
  }
}

/**
 * Predict disease based on symptoms
 * @param {Array<number>} symptoms - Array of 86 binary values (0 or 1)
 * @returns {Promise<Object>} Prediction result
 */
async function predictDisease(symptoms) {
  try {
    // Ensure symptoms array has exactly 86 values
    if (symptoms.length !== 86) {
      return { 
        status: 'error', 
        message: `Symptoms array must have exactly 86 values, got ${symptoms.length}` 
      };
    }

    const response = await fetch(`${API_BASE_URL}/predict`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ symptoms }),
    });
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error predicting disease:', error);
    return { status: 'error', message: error.message };
  }
}

/**
 * Example usage
 */
async function example() {
  // Check API health
  const health = await checkApiHealth();
  console.log('API Health:', health);
  
  if (health.status !== 'success') {
    console.error('API is not running. Please start the Flask server.');
    return;
  }
  
  // Get symptoms and diseases
  const symptomsData = await getSymptoms();
  const diseasesData = await getDiseases();
  
  console.log('Symptoms:', symptomsData);
  console.log('Diseases:', diseasesData);
  
  // Example symptoms (86 binary values)
  // 1 = symptom present, 0 = symptom absent
  const symptoms = [
    1,  // Fever
    1,  // Nasal Discharge
    0,  // Loss of appetite
    0,  // Weight Loss
    1,  // Lameness
    0,  // Breathing Difficulty
    0,  // Swollen Lymph nodes
    1,  // Lethargy
    0,  // Depression
    1,  // Increased drinking
    1,  // Increased urination
    0,  // Vomiting
    0,  // Diarrhea
    1,  // Neurological Disorders
    0,  // Heart Complication
    0,  // Skin Rashes
  ];
  
  // Add remaining symptoms to make it 86 values
  while (symptoms.length < 86) {
    symptoms.push(0);
  }
  
  // Make prediction
  const result = await predictDisease(symptoms);
  
  if (result.status === 'success') {
    console.log(`Predicted Disease: ${result.disease_name}`);
    console.log(`Confidence: ${result.confidence}`);
  } else {
    console.error(`Error: ${result.message}`);
  }
}

// Run the example
example(); 