import React, { createContext, useState } from 'react'

export const DataContext = createContext()

export const DataProvider = ({ children }) => {
  const [data, setData] = useState([])

  return (
    <DataContext.Provider value={{ data, setData }}>
      {children}
    </DataContext.Provider>
  );
};

export const TotalDistContext = createContext()

export const TotalDistProvider = ({ children }) => {
  const [totalDist, setTotalDist] = useState({
    ensurance: 0,
    strenght: 0,
    body: 0
  })

  return (
    <TotalDistContext.Provider value={{ totalDist, setTotalDist }}>
      {children}
    </TotalDistContext.Provider>
  );
}

export const TotalDurContext = createContext()

export const TotalDurProvider = ({ children }) => {
  const [totalDur, setTotalDur] = useState({
    ensurance: 0,
    strenght: 0,
    body: 0
  });

  return (
    <TotalDurContext.Provider value={{ totalDur, setTotalDur }}>
      {children}
    </TotalDurContext.Provider>
  )
}