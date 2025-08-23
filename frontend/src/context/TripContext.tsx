// src/context/TripContext.tsx

import React, { createContext, useContext, useState, ReactNode } from "react";

export interface TripData {
  id?: string;
  startLocation: string;
  destination: string;
  travelMode: string;
  departureDate: string;
  travelers: string;
  timestamp: string;
}

interface TripContextType {
  currentTrip: TripData | null;
  savedTrips: TripData[];
  sharedTrips: Record<string, TripData>; // id → trip
  setCurrentTrip: (data: TripData) => void;
  saveCurrentTrip: () => void;
  removeSavedTrip: (index: number) => void;
  createShareableLink: () => string;
  getTripById: (id: string) => TripData | null;
}

const TripContext = createContext<TripContextType | undefined>(undefined);

export const TripProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentTrip, setCurrentTrip] = useState<TripData | null>(null);
  
  const [savedTrips, setSavedTrips] = useState<TripData[]>(() => {
    const saved = localStorage.getItem("savedTrips");
    return saved ? JSON.parse(saved) : [];
  });

  const [sharedTrips, setSharedTrips] = useState<Record<string, TripData>>(() => {
    const shared = localStorage.getItem("sharedTrips");
    return shared ? JSON.parse(shared) : {};
  });

  const saveCurrentTrip = () => {
    if (!currentTrip) return;
    const trip = { ...currentTrip, id: generateId() };
    const updated = [...savedTrips, trip];
    setSavedTrips(updated);
    localStorage.setItem("savedTrips", JSON.stringify(updated));
    alert(`✅ Trip to ${trip.destination} saved!`);
  };

  const removeSavedTrip = (index: number) => {
    const updated = savedTrips.filter((_, i) => i !== index);
    setSavedTrips(updated);
    localStorage.setItem("savedTrips", JSON.stringify(updated));
    alert("🗑️ Trip removed.");
  };

  const generateId = () => Math.random().toString(36).substring(2, 9);

  const createShareableLink = (): string => {
    if (!currentTrip) throw new Error("No trip to share");
    
    const id = generateId();
    const trip = { ...currentTrip, id };
    
    const newShared = { ...sharedTrips, [id]: trip };
    setSharedTrips(newShared);
    localStorage.setItem("sharedTrips", JSON.stringify(newShared));
    
    return `${window.location.origin}/trip/${id}`;
  };

  const getTripById = (id: string): TripData | null => {
    const shared = localStorage.getItem("sharedTrips");
    const sharedTrips = shared ? JSON.parse(shared) : {};
    return sharedTrips[id] || null;
  };

  return (
    <TripContext.Provider
      value={{
        currentTrip,
        savedTrips,
        sharedTrips,
        setCurrentTrip,
        saveCurrentTrip,
        removeSavedTrip,
        createShareableLink,
        getTripById,
      }}
    >
      {children}
    </TripContext.Provider>
  );
};

export const useTrip = (): TripContextType => {
  const context = useContext(TripContext);
  if (!context) throw new Error("useTrip must be used within a TripProvider");
  return context;
};