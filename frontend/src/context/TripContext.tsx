// src/context/TripContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the trip data type
export interface TripData {
  startLocation: string;
  destination: string;
  travelMode: string;
  departureDate: string;
  travelers: string;
  timestamp: string;
}

// Define context type
interface TripContextType {
  currentTrip: TripData | null;
  savedTrips: TripData[];
  setCurrentTrip: (data: TripData) => void;
  saveCurrentTrip: () => void;
  removeSavedTrip: (index: number) => void;
}

// Create context
const TripContext = createContext<TripContextType | undefined>(undefined);

// Provider component
export const TripProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentTrip, setCurrentTrip] = useState<TripData | null>(null);
  const [savedTrips, setSavedTrips] = useState<TripData[]>(() => {
    // Optionally load from localStorage
    const saved = localStorage.getItem("savedTrips");
    return saved ? JSON.parse(saved) : [];
  });

  const saveCurrentTrip = () => {
    if (!currentTrip) return;
    const updated = [...savedTrips, currentTrip];
    setSavedTrips(updated);
    localStorage.setItem("savedTrips", JSON.stringify(updated)); // optional persistence
    alert(`✅ Trip to ${currentTrip.destination} saved!`);
  };

  const removeSavedTrip = (index: number) => {
    const updated = savedTrips.filter((_, i) => i !== index);
    setSavedTrips(updated);
    localStorage.setItem("savedTrips", JSON.stringify(updated));
    alert("🗑️ Trip removed.");
  };

  return (
    <TripContext.Provider
      value={{
        currentTrip,
        savedTrips,
        setCurrentTrip,
        saveCurrentTrip,
        removeSavedTrip,
      }}
    >
      {children}
    </TripContext.Provider>
  );
};

// Custom hook to use the context
export const useTrip = (): TripContextType => {
  const context = useContext(TripContext);
  if (!context) {
    throw new Error("useTrip must be used within a TripProvider");
  }
  return context;
};