export interface Pet {
  id: string;
  name: string;
  species: string;
  breed: string;
  age: number;
  weight: number;
  medicalConditions?: string[];
  medications?: string[];
  allergies?: string[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  pets: Pet[];
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: 'appointment' | 'reminder' | 'alert' | 'system';
}

export interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
  read: boolean;
}

