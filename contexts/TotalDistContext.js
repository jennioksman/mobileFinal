import React, { createContext, useState } from 'react'

export const TotalDistContext = createContext()

export const TotalDistProvider = ({ children }) => {
  const [totalDist, setTotalDist] = useState([])

  return (
    <TotalDistContext.Provider value={{ totalDist, setTotalDist }}>
      {children}
    </TotalDistContext.Provider>
  )
}