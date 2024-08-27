import { createContext, ReactNode, useContext, useState } from 'react';
import { AlertTypes, EventLabels } from 'ts/types';

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

const defaultLabels: EventLabels[] = [];

const defaultValue: DisplayFiltersContextValue = {
  filters: {
    types: defaultTypes,
    labels: defaultLabels,
  },
  setFilters: () => {},
};

const DisplayFiltersContext = createContext(defaultValue);

interface Props {
  children: ReactNode;
}

export const DisplayFiltersProvider = ({ children }: Props) => {
  const [filters, setFilters] = useState({
    types: defaultTypes,
    labels: defaultLabels,
  });
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
