import React, { createContext, useState, useEffect, useContext } from 'react';
import { useWindowSize } from 'usehooks-ts';
import styleVariables from 'enums/styleVariables.module.scss';

type MainLayoutContextValue = {
  isOpenedLeft: boolean;
  isOpenedRight: boolean;
  isOpenedRightOverlay: boolean;
  isOpenedRightBar: boolean;
  isSmall: boolean;
  openLeft: () => void;
  closeLeft: () => void;
  openRight: () => void;
  closeRight: () => void;
  openRightOverlay: () => void;
  closeRightOverlay: () => void;
};

const defaultValue: MainLayoutContextValue = {
  isOpenedLeft: true,
  isOpenedRight: true,
  isOpenedRightOverlay: false,
  isOpenedRightBar: true,
  isSmall: false,
  openLeft: () => {},
  closeLeft: () => {},
  openRight: () => {},
  closeRight: () => {},
  openRightOverlay: () => {},
  closeRightOverlay: () => {},
};

const MainLayoutContext = createContext(defaultValue);

interface Props {
  children: React.ReactElement;
}
export const MainLayoutProvider = ({ children }: Props) => {
  const { width } = useWindowSize();
  const [isOpenedLeft, setIsOpenedLeft] = useState(true);
  const [isOpenedRight, setIsOpenedRight] = useState(true);
  const [isOpenedRightOverlay, setIsOpenedRightOverlay] = useState(false);

  const isSmall = width < parseInt(styleVariables.smallSize);

  const openLeft = () => setIsOpenedLeft(true);

  const closeLeft = () => setIsOpenedLeft(false);

  const closeRight = () => setIsOpenedRight(false);

  const openRight = () => setIsOpenedRight(true);

  const closeRightOverlay = () => setIsOpenedRightOverlay(false);

  const openRightOverlay = () => setIsOpenedRightOverlay(true);

  const isOpenedRightBar = isOpenedRight || isOpenedRightOverlay;

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
    isOpenedRightOverlay,
    isOpenedRightBar,
    isSmall,
    openLeft,
    closeLeft,
    closeRight,
    openRight,
    closeRightOverlay,
    openRightOverlay,
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
