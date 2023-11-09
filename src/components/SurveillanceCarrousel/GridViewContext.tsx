import { createContext, useState, ReactNode } from 'react';

export const GridViewContext = createContext({});

interface Props {
  children: ReactNode;
}

function GridViewProvider({ children }: Props) {
  const [gridView, setGridView] = useState('one-camera');

  return (
    <GridViewContext.Provider
      value={{
        gridView,
        setGridView,
      }}
    >
      {children}
    </GridViewContext.Provider>
  );
}

export default GridViewProvider;
