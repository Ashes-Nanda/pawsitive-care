import React, { useState, useEffect } from 'react'
import { Search } from 'lucide-react'
import BreedCard from './BreedCard'

const breeds = [
  {
    id: 1,
    name: 'Labrador Retriever',
    image: 'https://images.unsplash.com/photo-1579213838058-efb9019f2cba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    description: 'Friendly, active and outgoing, Labrador Retrievers are ideal family companions.',
    temperament: 'Friendly, Active, Outgoing',
    size: 'Large',
    weight: '55-80 lbs',
    coatType: 'Short, dense, water-resistant double coat',
    lifespan: '10-12 years',
    healthIssues: ['Hip dysplasia', 'Elbow dysplasia', 'Progressive Retinal Atrophy (PRA)'],
    careRequirements: 'Regular exercise, grooming, and mental stimulation'
  },
  {
    id: 2,
    name: 'German Shepherd',
    image: 'https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    description: 'German Shepherds are intelligent, versatile, and loyal dogs known for their strength, agility, and obedience. They excel in various roles, from family companions to working dogs in law enforcement and search and rescue.',
    temperament: 'Confident, Courageous, Smart, Loyal, Obedient',
    size: 'Large',
    weight: '50-90 lbs (male), 50-70 lbs (female)',
    coatType: 'Double coat with medium-length outer coat and dense undercoat',
    lifespan: '7-10 years',
    healthIssues: [
      'Hip dysplasia',
      'Elbow dysplasia',
      'Bloat (Gastric Dilatation-Volvulus)',
      'Degenerative Myelopathy',
      'Exocrine Pancreatic Insufficiency'
    ],
    careRequirements: 'German Shepherds need regular exercise (at least 1-2 hours daily), mental stimulation through training and interactive toys, consistent grooming to manage shedding, and a high-quality diet appropriate for their age and activity level. Regular vet check-ups are essential to monitor for breed-specific health issues.'
  },
  {
    id: 3,
    name: 'Golden Retriever',
    image: 'https://images.unsplash.com/photo-1633722715365-d2f01ede0e41?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    description: 'Intelligent, friendly, and devoted, Golden Retrievers are excellent family dogs and working companions.',
    temperament: 'Friendly, Intelligent, Devoted',
    size: 'Large',
    weight: '55-75 lbs',
    coatType: 'Dense, water-repellent double coat',
    lifespan: '10-12 years',
    healthIssues: ['Hip dysplasia', 'Cancer', 'Eye disorders'],
    careRequirements: 'Regular exercise, grooming, and mental stimulation'
  },
  {
    id: 4,
    name: 'French Bulldog',
    image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    description: 'Adaptable, playful, and charming, French Bulldogs are popular companion dogs for urban dwellers.',
    temperament: 'Adaptable, Playful, Smart',
    size: 'Small',
    weight: '16-28 lbs',
    coatType: 'Short, smooth coat',
    lifespan: '10-12 years',
    healthIssues: ['Brachycephalic syndrome', 'Hip dysplasia', 'Allergies'],
    careRequirements: 'Moderate exercise, regular grooming, and temperature control'
  },
  {
    id: 5,
    name: 'Beagle',
    image: 'https://images.unsplash.com/photo-1505628346881-b72b27e84530?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    description: 'Merry, friendly, and curious, Beagles are excellent family dogs and skilled scent hounds.',
    temperament: 'Merry, Friendly, Curious',
    size: 'Small to Medium',
    weight: '20-30 lbs',
    coatType: 'Short, dense double coat',
    lifespan: '10-15 years',
    healthIssues: ['Hip dysplasia', 'Eye disorders', 'Hypothyroidism'],
    careRequirements: 'Regular exercise, mental stimulation, and grooming'
  },
  {
    id: 7,
    name: 'Boxer',
    image: 'https://images.unsplash.com/photo-1543071220-6ee5bf71a54e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    description: 'Playful, patient, and protective, Boxers are excellent family dogs and natural guardians.',
    temperament: 'Playful, Patient, Protective',
    size: 'Medium to Large',
    weight: '50-80 lbs',
    coatType: 'Short, smooth coat',
    lifespan: '10-12 years',
    healthIssues: ['Cancer', 'Heart conditions', 'Hip dysplasia'],
    careRequirements: 'Regular exercise, minimal grooming, and mental stimulation'
  },
  {
    id: 8,
    name: 'Rottweiler',
    image: 'https://images.unsplash.com/photo-1567752881298-894bb81f9379?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    description: 'Confident, courageous, and loyal, Rottweilers are powerful working dogs and devoted family companions.',
    temperament: 'Confident, Courageous, Loyal',
    size: 'Large',
    weight: '80-135 lbs',
    coatType: 'Short, dense double coat',
    lifespan: '8-10 years',
    healthIssues: ['Hip dysplasia', 'Elbow dysplasia', 'Cancer'],
    careRequirements: 'Regular exercise, training, and moderate grooming'
  },
  {
    id: 9,
    name: 'Dachshund',
    image: 'https://images.unsplash.com/photo-1612195583950-b8fd34c87093?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    description: 'Clever, lively, and courageous, Dachshunds are charming companions with a big-dog personality.',
    temperament: 'Clever, Lively, Courageous',
    size: 'Small',
    weight: '16-32 lbs',
    coatType: 'Smooth, wirehaired, or long-haired',
    lifespan: '12-16 years',
    healthIssues: ['Intervertebral Disc Disease', 'Patellar luxation', 'Eye problems'],
    careRequirements: 'Moderate exercise, regular grooming, and weight management'
  },
  {
    id: 10,
    name: 'Siberian Husky',
    image: 'https://images.unsplash.com/photo-1605568427561-40dd23c2acea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    description: 'Friendly, outgoing, and athletic, Siberian Huskies are beautiful sled dogs and active family companions.',
    temperament: 'Friendly, Outgoing, Athletic',
    size: 'Medium',
    weight: '35-60 lbs',
    coatType: 'Thick double coat',
    lifespan: '12-14 years',
    healthIssues: ['Hip dysplasia', 'Eye problems', 'Hypothyroidism'],
    careRequirements: 'Extensive exercise, regular grooming, and mental stimulation'
  },
  {
    id: 11,
    name: 'Chihuahua',
    image: 'https://images.unsplash.com/photo-1605639156481-244775d6f803?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    description: 'Charming, graceful, and sassy, Chihuahuas are tiny dogs with big personalities.',
    temperament: 'Charming, Graceful, Sassy',
    size: 'Toy',
    weight: '2-6 lbs',
    coatType: 'Smooth or long coat',
    lifespan: '14-16 years',
    healthIssues: ['Dental problems', 'Patellar luxation', 'Heart issues'],
    careRequirements: 'Moderate exercise, dental care, and protection from cold'
  },
  {
    id: 12,
    name: 'Shih Tzu',
    image: 'https://images.unsplash.com/photo-1600804340584-c7db2eacf0bf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    description: 'Affectionate, playful, and outgoing, Shih Tzus are charming companion dogs.',
    temperament: 'Affectionate, Playful, Outgoing',
    size: 'Toy',
    weight: '9-16 lbs',
    coatType: 'Long, silky double coat',
    lifespan: '10-18 years',
    healthIssues: ['Brachycephalic syndrome', 'Eye problems', 'Hip dysplasia'],
    careRequirements: 'Regular grooming, moderate exercise, and dental care'
  },
  {
    id: 13,
    name: 'Great Dane',
    image: 'https://images.unsplash.com/photo-1534361960057-19889db9621e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    description: 'Gentle giants with a friendly nature, Great Danes are patient and loving family companions.',
    temperament: 'Gentle, Friendly, Patient',
    size: 'Giant',
    weight: '110-175 lbs',
    coatType: 'Short, smooth coat',
    lifespan: '7-10 years',
    healthIssues: ['Bloat', 'Hip dysplasia', 'Heart problems'],
    careRequirements: 'Moderate exercise, basic grooming, and space management'
  },
  {
    id: 14,
    name: 'Australian Shepherd',
    image: 'https://images.unsplash.com/photo-1531071953202-4a8ad2a61bfa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    description: 'Intelligent, work-oriented, and exuberant, Australian Shepherds are versatile herding dogs and active companions.',
    temperament: 'Intelligent, Work-oriented, Exuberant',
    size: 'Medium',
    weight: '40-65 lbs',
    coatType: 'Medium-length double coat',
    lifespan: '12-15 years',
    healthIssues: ['Hip dysplasia', 'Eye problems', 'Epilepsy'],
    careRequirements: 'Extensive exercise, mental stimulation, and regular grooming'
  },
  {
    id: 15,
    name: 'Doberman Pinscher',
    image: 'https://images.unsplash.com/photo-1636578191869-6c9d64a0c0d0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    description: 'Loyal, fearless, and alert, Doberman Pinschers are intelligent working dogs and devoted family protectors.',
    temperament: 'Loyal, Fearless, Alert',
    size: 'Large',
    weight: '60-100 lbs',
    coatType: 'Short, smooth coat',
    lifespan: '10-12 years',
    healthIssues: ['Dilated cardiomyopathy', 'Hip dysplasia', 'von Willebrand\'s disease'],
    careRequirements: 'Regular exercise, basic grooming, and mental stimulation'
  },
  {
    id: 16,
    name: 'Miniature Schnauzer',
    image: 'https://images.unsplash.com/photo-1591946614720-90a587da4a36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    description: 'Friendly, smart, and obedient, Miniature Schnauzers are spirited companions with a charming personality.',
    temperament: 'Friendly, Smart, Obedient',
    size: 'Small',
    weight: '11-20 lbs',
    coatType: 'Double coat with wiry outer layer',
    lifespan: '12-15 years',
    healthIssues: ['Urinary stones', 'Eye problems', 'Pancreatitis'],
    careRequirements: 'Regular exercise, professional grooming, and mental stimulation'
  },
  {
    id: 17,
    name: 'Pembroke Welsh Corgi',
    image: 'https://images.unsplash.com/photo-1612536057832-2ff7ead58194?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    description: 'Smart, alert, and affectionate, Pembroke Welsh Corgis are lively herding dogs and devoted family companions.',
    temperament: 'Smart, Alert, Affectionate',
    size: 'Small',
    weight: '25-30 lbs',
    coatType: 'Thick double coat',
    lifespan: '12-13 years',
    healthIssues: ['Hip dysplasia', 'Eye problems', 'Degenerative myelopathy'],
    careRequirements: 'Regular exercise, grooming, and weight management'
  },
  {
    id: 18,
    name: 'Bernese Mountain Dog',
    image: 'https://images.unsplash.com/photo-1568572933382-74d440642117?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    description: 'Gentle, calm, and strong, Bernese Mountain Dogs are large working dogs and affectionate family companions.',
    temperament: 'Gentle, Calm, Strong',
    size: 'Large',
    weight: '70-115 lbs',
    coatType: 'Thick, long double coat',
    lifespan: '7-10 years',
    healthIssues: ['Cancer', 'Hip and elbow dysplasia', 'Bloat'],
    careRequirements: 'Moderate exercise, regular grooming, and cool environment'
  },
  {
    id: 19,
    name: 'Cavalier King Charles Spaniel',
    image: 'https://images.unsplash.com/photo-1626398394876-299e3a5f1fb1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    description: 'Gentle, affectionate, and graceful, Cavalier King Charles Spaniels are charming companion dogs.',
    temperament: 'Gentle, Affectionate, Graceful',
    size: 'Small',
    weight: '13-18 lbs',
    coatType: 'Medium-length silky coat',
    lifespan: '9-14 years',
    healthIssues: ['Mitral valve disease', 'Syringomyelia', 'Hip dysplasia'],
    careRequirements: 'Moderate exercise, regular grooming, and companionship'
  },
  {
    id: 20,
    name: 'Border Collie',
    image: 'https://images.unsplash.com/photo-1503256207526-0d5d80fa2f47?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    description: 'Intelligent, energetic, and agile, Border Collies are highly trainable herding dogs and excel in various dog sports.',
    temperament: 'Intelligent, Energetic, Agile',
    size: 'Medium',
    weight: '30-55 lbs',
    coatType: 'Double coat, can be rough or smooth',
    lifespan: '12-15 years',
    healthIssues: ['Hip dysplasia', 'Eye problems', 'Epilepsy'],
    careRequirements: 'Extensive exercise, mental stimulation, and regular grooming'
  }
]

export default function BreedInfo() {
  const [search, setSearch] = useState('')
  const [filteredBreeds, setFilteredBreeds] = useState(breeds)

  useEffect(() => {
    const filtered = breeds.filter(breed =>
      breed.name.toLowerCase().includes(search.toLowerCase())
    )
    setFilteredBreeds(filtered)
  }, [search])

  return (
    <div className="glass p-6 rounded-lg">
      <h2 className="text-2xl font-semibold mb-4 text-emerald-400 neon">Breed Information</h2>
      
      <div className="mb-4 relative">
        <input
          type="text"
          placeholder="Search breeds..."
          className="w-full p-2 pl-10 bg-zinc-800 text-zinc-100 rounded-md border border-zinc-700 focus:border-emerald-500 focus:ring focus:ring-emerald-500 focus:ring-opacity-50"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Search className="absolute left-3 top-2.5 text-emerald-400" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredBreeds.map(breed => (
          <BreedCard key={breed.id} breed={breed} />
        ))}
      </div>
    </div>
  )
}

