import { createContext, useState } from "react";

export const GridViewContext = createContext({})

function GridViewProvider({ children }) {

  const [gridView, setGridView] = useState("one-camera")

  return (
    <GridViewContext.Provider value={{
      gridView,
      setGridView
    }}>
      {children}
    </GridViewContext.Provider>

  )
}

export default GridViewProvider
