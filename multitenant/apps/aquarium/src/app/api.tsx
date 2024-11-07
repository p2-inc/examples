// src/api/ApiContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { ApiManager } from '@multitenant/api-manager';
import { getOidc } from '../main';

// Create the context
const ApiContext = createContext<ApiManager | null>(null);

// Create a provider component
export const ApiProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [apiManager, setApiManager] = useState<ApiManager | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeApiManager = async () => {
      const oidc = await getOidc();
      const manager = new ApiManager();
      await manager.initialize({ oidc: oidc }); // Initialize the API manager asynchronously
      setApiManager(manager);
      setIsLoading(false);
    };

    initializeApiManager();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <ApiContext.Provider value={apiManager}>{children}</ApiContext.Provider>
  );
};

// Custom hook to use the API manager in components
export const useApiManager = () => {
  const context = useContext(ApiContext);
  if (!context) {
    throw new Error('useApiManager must be used within an ApiProvider');
  }
  return context;
};
