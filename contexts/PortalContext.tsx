'use client';
import React, { createContext, useContext, useState, ReactNode } from 'react';

const PortalContext = createContext<any>(null);

export const PortalProvider = ({ children }: { children: ReactNode }) => {
  const [portalData, setPortalData] = useState({});

  return (
    <PortalContext.Provider value={{ portalData, setPortalData }}>
      {children}
    </PortalContext.Provider>
  );
};

export const usePortal = () => useContext(PortalContext);
