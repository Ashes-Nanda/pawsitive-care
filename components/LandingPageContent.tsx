import React from "react";
import { motion } from "framer-motion";
import { TailTrackerCard } from "./TailTrackerCard";

const LandingPageContent: React.FC = () => {
  const handleConnectTailTracker = () => {
    // Handle connect TailTracker logic
  };

  return (
    <div className="min-h-screen bg-background text-white font-montserrat">
      {/* Header Section */}
      <header className="bg-dark text-white p-6">
        <h1 className="text-4xl font-roboto">Welcome to Pawsitive Care Hub</h1>
      </header>

      <main className="container mx-auto p-6">
        {/* Patient Overview Section */}
        <section className="mb-8">
          <h2 className="text-3xl font-roboto mb-4">Patient Overview</h2>
          <div className="bg-card text-white p-6 rounded-lg shadow-lg">
            {/* Patient Overview Content */}
            <p className="text-white">Detailed patient information goes here.</p>
          </div>
        </section>

        {/* Medical Records Section */}
        <section className="mb-8">
          <h2 className="text-3xl font-roboto mb-4">Medical Records</h2>
          <div className="bg-card text-white p-6 rounded-lg shadow-lg">
            {/* Medical Records Content */}
            <p className="text-white">Upload and view medical records here.</p>
          </div>
        </section>

        {/* Vital Signs Section */}
        <section className="mb-8">
          <h2 className="text-3xl font-roboto mb-4">Vital Signs</h2>
          <div className="bg-card text-white p-6 rounded-lg shadow-lg">
            <div className="mb-4">
              <h3 className="text-2xl font-roboto text-white">Heart Rate</h3>
              <p className="text-lg font-bold text-white">72 bpm</p>
            </div>
            <div className="mb-4">
              <h3 className="text-2xl font-roboto text-white">Blood Pressure</h3>
              <p className="text-lg font-bold text-white">120/80 mmHg</p>
            </div>
            <div className="mb-4">
              <h3 className="text-2xl font-roboto text-white">Temperature</h3>
              <p className="text-lg font-bold text-white">98.6°F</p>
            </div>
          </div>
        </section>

        {/* Tail Tracker Section */}
        <motion.div
          className="w-full md:w-96 bg-card text-white p-6 rounded-lg shadow-lg"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <TailTrackerCard onConnect={handleConnectTailTracker} />
        </motion.div>

        {/* Connect Tail Tracker Button */}
        <button className="mt-6 bg-primary text-white hover:bg-accent hover:shadow-lg transition-all duration-300 p-3 rounded-md">
          Connect Tail Tracker
        </button>
      </main>
    </div>
  );
};

export default LandingPageContent;
