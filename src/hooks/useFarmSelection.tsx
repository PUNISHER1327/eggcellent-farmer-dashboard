
import React, { createContext, useContext, useEffect, useState } from 'react';

// Farm interface
export interface Farm {
  id: string;
  name: string;
  location: string;
  chickenCount: number;
  ammoniaLevel: number;
  threshold: number;
  isConveyorOn: boolean;
}

// Default farms
const defaultFarms: Farm[] = [
  {
    id: 'farm1',
    name: 'Green Valley Farm',
    location: 'Bangalore Rural, Karnataka',
    chickenCount: 5000,
    ammoniaLevel: 30,
    threshold: 25,
    isConveyorOn: true,
  },
  {
    id: 'farm2',
    name: 'Sunrise Poultry',
    location: 'Mysore, Karnataka',
    chickenCount: 3500,
    ammoniaLevel: 18,
    threshold: 25,
    isConveyorOn: false,
  },
  {
    id: 'farm3',
    name: 'Golden Eggs Farm',
    location: 'Hassan, Karnataka',
    chickenCount: 6200,
    ammoniaLevel: 28,
    threshold: 25,
    isConveyorOn: true,
  },
  {
    id: 'farm4',
    name: 'River View Poultry',
    location: 'Mangalore, Karnataka',
    chickenCount: 4800,
    ammoniaLevel: 22,
    threshold: 25,
    isConveyorOn: false,
  },
  {
    id: 'farm5',
    name: 'Mountain Top Farm',
    location: 'Chikmagalur, Karnataka',
    chickenCount: 3200,
    ammoniaLevel: 32,
    threshold: 25,
    isConveyorOn: true,
  }
];

// FarmSelection context type
interface FarmSelectionContextType {
  farms: Farm[];
  selectedFarmId: string;
  setSelectedFarmId: (id: string) => void;
  selectedFarm: Farm;
}

const FarmSelectionContext = createContext<FarmSelectionContextType | undefined>(undefined);

export const FarmSelectionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [farms] = useState<Farm[]>(defaultFarms);
  const [selectedFarmId, setSelectedFarmId] = useState<string>('farm1');
  
  // Store selection in localStorage
  useEffect(() => {
    const storedFarmId = localStorage.getItem('selectedFarmId');
    if (storedFarmId && farms.some(farm => farm.id === storedFarmId)) {
      setSelectedFarmId(storedFarmId);
    }
  }, [farms]);
  
  // Update localStorage when selection changes
  useEffect(() => {
    localStorage.setItem('selectedFarmId', selectedFarmId);
  }, [selectedFarmId]);
  
  // Get the currently selected farm
  const selectedFarm = farms.find(farm => farm.id === selectedFarmId) || farms[0];
  
  return (
    <FarmSelectionContext.Provider value={{ farms, selectedFarmId, setSelectedFarmId, selectedFarm }}>
      {children}
    </FarmSelectionContext.Provider>
  );
};

export const useFarmSelection = () => {
  const context = useContext(FarmSelectionContext);
  if (context === undefined) {
    throw new Error('useFarmSelection must be used within a FarmSelectionProvider');
  }
  return context;
};
