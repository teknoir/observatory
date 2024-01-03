import React, { createContext, useState, useEffect, useContext } from 'react';
import { useWindowSize } from 'usehooks-ts';
import styleVariables from 'enums/styleVariables.module.scss';

type MainLayoutContextValue = {
  isOpenedLeft: boolean;
  isOpenedRight: boolean;
  isSmall: boolean;
  openLeft: () => void;
  closeLeft: () => void;
  openRight: () => void;
  closeRight: () => void;
};

const defaultValue: MainLayoutContextValue = {
  isOpenedLeft: true,
  isOpenedRight: true,
  isSmall: false,
  openLeft: () => {},
  closeLeft: () => {},
  openRight: () => {},
  closeRight: () => {},
};

const MainLayoutContext = createContext(defaultValue);

interface Props {
  children: React.ReactElement;
}
export const MainLayoutProvider = ({ children }: Props) => {
  const { width } = useWindowSize();
  const [isOpenedLeft, setIsOpenedLeft] = useState(true);
  const [isOpenedRight, setIsOpenedRight] = useState(true);

  const isSmall = width < parseInt(styleVariables.smallSize);

  const openLeft = () => setIsOpenedLeft(true);

  const closeLeft = () => setIsOpenedLeft(false);

  const closeRight = () => setIsOpenedRight(false);

  const openRight = () => setIsOpenedRight(true);

  useEffect(() => {
    if (isSmall) {
      closeLeft();
      closeRight();
    } else {
      openLeft();
      openRight();
    }
  }, [isSmall]);

  const getContextValue = () => ({
    isOpenedLeft,
    isOpenedRight,
    isSmall,
    openLeft,
    closeLeft,
    closeRight,
    openRight,
  });

  return (
    <MainLayoutContext.Provider value={getContextValue()}>
      {children}
    </MainLayoutContext.Provider>
  );
};
export const useMainLayoutContext = () => {
  return useContext(MainLayoutContext);
};
