import React, { createContext, useContext, useState } from 'react';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [data, setData] = useState({ id: null, request: null });

  const setFormData = (id, request) => {
    setData({ id, request });
  };

  return (
    <DataContext.Provider value={{ data, setFormData }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  return useContext(DataContext);
};