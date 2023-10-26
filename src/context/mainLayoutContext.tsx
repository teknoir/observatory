import React, { createContext, useState, useContext } from 'react';

type MainLayoutContextValue = {
  isOpenedLeft: boolean;
  isOpenedRight: boolean;
  openLeft: () => void;
  closeLeft: () => void;
  openRight: () => void;
  closeRight: () => void;
}

const defaultValue: MainLayoutContextValue = {
  isOpenedLeft: true,
  isOpenedRight: true,
  openLeft: () => {},
  closeLeft: () => {},
  openRight: () => {},
  closeRight: () => {}
}

const MainLayoutContext = createContext(defaultValue);

interface Props {
  children: React.ReactElement
}
export const MainLayoutProvider = ({ children }: Props) => {
  const [isOpenedLeft, setIsOpenedLeft] = useState(true);
  const [isOpenedRight, setIsOpenedRight] = useState(true);

  const openLeft = () => setIsOpenedLeft(true);

  const closeLeft = () => setIsOpenedLeft(false);

  const closeRight = () => setIsOpenedRight(false);

  const openRight = () => setIsOpenedRight(true);

  const getContextValue = () => ({
    isOpenedLeft,
    isOpenedRight,
    openLeft,
    closeLeft,
    closeRight,
    openRight
  })

  return (
    <MainLayoutContext.Provider value={getContextValue()}>
      {children}
    </MainLayoutContext.Provider>
  )
}
export const useMainLayoutContext = () => {
  return useContext(MainLayoutContext)
}
