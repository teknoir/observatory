import { createContext, ReactNode, useContext, useState } from 'react';
import { AlertTypes, EventLabels } from 'ts/types';
// import { useLocalStorage } from 'usehooks-ts';

// type DisplaySettingsContextValue = {
//   boundaryBoxesChecked: boolean;
//   setBoundaryBoxesChecked: (
//     value: ((prevState: boolean) => boolean) | boolean
//   ) => void;
//   objectLabelsChecked: boolean;
//   setObjectLabelsChecked: (
//     value: ((prevState: boolean) => boolean) | boolean
//   ) => void;
//   colorFillBoxesChecked: boolean;
//   setColorFillBoxesChecked: (
//     value: ((prevState: boolean) => boolean) | boolean
//   ) => void;
// };

// const defaultValue: DisplaySettingsContextValue = {
//   boundaryBoxesChecked: true,
//   setBoundaryBoxesChecked: () => {},
//   objectLabelsChecked: false,
//   setObjectLabelsChecked: () => {},
//   colorFillBoxesChecked: false,
//   setColorFillBoxesChecked: () => {},
// };

type Filters = {
  types: AlertTypes[];
  labels: EventLabels[];
};

type DisplayFiltersContextValue = {
  filters: Filters;
  setFilters: (value: ((prevState: Filters) => Filters) | Filters) => void;
};

const defaultTypes = [
  AlertTypes.Theft,
  AlertTypes.Loitering,
  AlertTypes.OnGround,
];

const defaultLabels = [EventLabels.Person, EventLabels.Car];

const defaultValue: DisplayFiltersContextValue = {
  filters: {
    types: defaultTypes,
    labels: defaultLabels,
  },
  setFilters: () => {},
};

// const localStorageNamespace = 'displaySettings';
// const getLocalStorageKey = (key: string) => `${localStorageNamespace}.${key}`;
const DisplayFiltersContext = createContext(defaultValue);

interface Props {
  children: ReactNode;
}

export const DisplayFiltersProvider = ({ children }: Props) => {
  // const [filters, setFilters] = useState(true);
  const [filters, setFilters] = useState({
    types: defaultTypes,
    labels: defaultLabels,
  });
  // const [boundaryBoxesChecked, setBoundaryBoxesChecked] = useLocalStorage(
  //   getLocalStorageKey('boundaryBoxesChecked'),
  //   true
  // );
  // const [objectLabelsChecked, setObjectLabelsChecked] = useLocalStorage(
  //   getLocalStorageKey('objectLabelsChecked'),
  //   false
  // );
  // const [colorFillBoxesChecked, setColorFillBoxesChecked] = useLocalStorage(
  //   getLocalStorageKey('colorFillBoxesChecked'),
  //   false
  // );

  // const getContextValue = () => ({
  //   boundaryBoxesChecked,
  //   setBoundaryBoxesChecked,
  //   objectLabelsChecked,
  //   setObjectLabelsChecked,
  //   colorFillBoxesChecked,
  //   setColorFillBoxesChecked,
  // });
  const getContextValue = () => ({
    filters,
    setFilters,
  });

  return (
    <DisplayFiltersContext.Provider value={getContextValue()}>
      {children}
    </DisplayFiltersContext.Provider>
  );
};

export const useDisplayFiltersContext = () => {
  return useContext(DisplayFiltersContext);
};
