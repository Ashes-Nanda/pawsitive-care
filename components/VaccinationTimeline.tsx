"use client";
import React, { useState } from "react";
import { Calendar, Plus, Trash2 } from "lucide-react";

interface Vaccination {
  id: string;
  name: string;
  date: string;
  dueDate: string;
}

export default function VaccinationTimeline() {
  const [vaccinations, setVaccinations] = useState<Vaccination[]>([
    { id: "1", name: "Rabies", date: "2023-06-15", dueDate: "2024-06-15" },
    { id: "2", name: "Distemper", date: "2023-07-01", dueDate: "2024-07-01" },
    { id: "3", name: "Parvovirus", date: "2023-07-15", dueDate: "2024-07-15" },
  ]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newVaccination, setNewVaccination] = useState<Partial<Vaccination>>(
    {}
  );

  const handleAddVaccination = (e: React.FormEvent) => {
    e.preventDefault();
    const id = (vaccinations.length + 1).toString();
    const newVaccinationWithId = { ...newVaccination, id } as Vaccination;
    setVaccinations([...vaccinations, newVaccinationWithId]);
    setNewVaccination({});
    setShowAddForm(false);
  };

  const handleDeleteVaccination = (id: string) => {
    setVaccinations(vaccinations.filter((vax) => vax.id !== id));
  };

  const sortedVaccinations = [...vaccinations].sort(
    (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
  );

  return (
    <div className="glass p-6 rounded-lg">
      <h2 className="text-2xl font-semibold mb-4 text-emerald-400 neon">
        Vaccination Timeline
      </h2>
      <ul className="space-y-4 mb-4">
        {sortedVaccinations.map((vax) => (
          <li
            key={vax.id}
            className="flex items-center justify-between bg-zinc-800 p-3 rounded-md"
          >
            <div>
              <span className="text-emerald-400 font-medium">{vax.name}</span>
              <div className="text-sm text-zinc-400">
                <p>Last: {vax.date}</p>
                <p>Next due: {vax.dueDate}</p>
              </div>
            </div>
            <div className="flex items-center">
              <Calendar className="w-5 h-5 mr-3 text-emerald-400" />
              <button
                onClick={() => handleDeleteVaccination(vax.id)}
                className="text-red-400 hover:text-red-300 transition-colors"
                aria-label="Delete vaccination"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </li>
        ))}
      </ul>
      {!showAddForm ? (
        <button
          onClick={() => setShowAddForm(true)}
          className="w-full bg-black text-white py-2 px-4 rounded-md flex items-center justify-center hover:bg-gray-800 transition-colors"
        >
          <Plus className="w-5 h-5 mr-2" /> Add Vaccination
        </button>
      ) : (
        <form onSubmit={handleAddVaccination} className="space-y-4">
          <input
            type="text"
            placeholder="Vaccination Name"
            value={newVaccination.name || ""}
            onChange={(e) =>
              setNewVaccination({ ...newVaccination, name: e.target.value })
            }
            className="w-full p-2 bg-zinc-800 text-zinc-100 rounded-md border border-zinc-700 focus:border-emerald-500 focus:ring focus:ring-emerald-500 focus:ring-opacity-50"
            required
          />
          <input
            type="date"
            placeholder="Last Vaccination Date"
            value={newVaccination.date || ""}
            onChange={(e) =>
              setNewVaccination({ ...newVaccination, date: e.target.value })
            }
            className="w-full p-2 bg-zinc-800 text-zinc-100 rounded-md border border-zinc-700 focus:border-emerald-500 focus:ring focus:ring-emerald-500 focus:ring-opacity-50"
            required
          />
          <input
            type="date"
            placeholder="Next Due Date"
            value={newVaccination.dueDate || ""}
            onChange={(e) =>
              setNewVaccination({ ...newVaccination, dueDate: e.target.value })
            }
            className="w-full p-2 bg-zinc-800 text-zinc-100 rounded-md border border-zinc-700 focus:border-emerald-500 focus:ring focus:ring-emerald-500 focus:ring-opacity-50"
            required
          />
          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition-colors"
            >
              Add Vaccination
            </button>
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="glass text-red-400 py-2 px-4 rounded-md hover:bg-red-500 hover:bg-opacity-20 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
