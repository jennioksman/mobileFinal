import React, { createContext, useState } from 'react'

export const TotalDurContext = createContext()

export const TotalDurProvider = ({ children }) => {
  const [totalDur, setTotalDur] = useState([])

  return (
    <TotalDurContext.Provider value={{ totalDur, setTotalDur }}>
      {children}
    </TotalDurContext.Provider>
  )
}