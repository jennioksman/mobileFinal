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
  const [totalDist, setTotalDist] = useState([])

  return (
    <TotalDistContext.Provider value={{ totalDist, setTotalDist }}>
      {children}
    </TotalDistContext.Provider>
  )
}

export const TotalDurContext = createContext()

export const TotalDurProvider = ({ children }) => {
  const [totalDur, setTotalDur] = useState([])

  return (
    <TotalDurContext.Provider value={{ totalDur, setTotalDur }}>
      {children}
    </TotalDurContext.Provider>
  )
}