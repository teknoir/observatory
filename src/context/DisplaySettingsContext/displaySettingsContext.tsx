import { createContext, ReactNode, useContext, useState } from 'react';
import { useLocalStorage } from 'usehooks-ts';
import { EventLabels } from 'ts/types.ts';

type DisplaySettingsContextValue = {
  boundaryBoxesChecked: boolean;
  setBoundaryBoxesChecked: (
    value: ((prevState: boolean) => boolean) | boolean
  ) => void;
  objectLabelsChecked: boolean;
  setObjectLabelsChecked: (
    value: ((prevState: boolean) => boolean) | boolean
  ) => void;
  colorFillBoxesChecked: boolean;
  setColorFillBoxesChecked: (
    value: ((prevState: boolean) => boolean) | boolean
  ) => void;
  objectsFilterChecked: Record<string, boolean>;
  setObjectsFilterChecked: (value: { [key: string]: boolean }) => void;
};

const defaultValue: DisplaySettingsContextValue = {
  boundaryBoxesChecked: true,
  setBoundaryBoxesChecked: () => {},
  objectLabelsChecked: false,
  setObjectLabelsChecked: () => {},
  colorFillBoxesChecked: false,
  setColorFillBoxesChecked: () => {},
  objectsFilterChecked: {},
  setObjectsFilterChecked: () => {},
};

const localStorageNamespace = 'displaySettings';
const getLocalStorageKey = (key: string) => `${localStorageNamespace}.${key}`;
const DisplaySettingsContext = createContext(defaultValue);

interface Props {
  children: ReactNode;
}

export const DisplaySettingsProvider = ({ children }: Props) => {
  const [boundaryBoxesChecked, setBoundaryBoxesChecked] = useLocalStorage(
    getLocalStorageKey('boundaryBoxesChecked'),
    true
  );
  const [objectLabelsChecked, setObjectLabelsChecked] = useLocalStorage(
    getLocalStorageKey('objectLabelsChecked'),
    false
  );
  const [colorFillBoxesChecked, setColorFillBoxesChecked] = useLocalStorage(
    getLocalStorageKey('colorFillBoxesChecked'),
    false
  );
  const [objectsFilterChecked, setObjectsFilterChecked] = useState(
    Object.keys(EventLabels).reduce(
      (acc, label) => {
        // initial values true for all labels
        acc[label] = true;
        return acc;
      },
      {} as Record<string, boolean>
    )
  );

  const getContextValue = () => ({
    boundaryBoxesChecked,
    setBoundaryBoxesChecked,
    objectLabelsChecked,
    setObjectLabelsChecked,
    colorFillBoxesChecked,
    setColorFillBoxesChecked,
    objectsFilterChecked,
    setObjectsFilterChecked,
  });

  return (
    <DisplaySettingsContext.Provider value={getContextValue()}>
      {children}
    </DisplaySettingsContext.Provider>
  );
};

export const useDisplaySettingsContext = () => {
  return useContext(DisplaySettingsContext);
};
