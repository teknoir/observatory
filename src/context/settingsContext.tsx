import React, {
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
} from 'react';
import { useLocalStorage } from 'usehooks-ts';
import { AlertTypes, EventLabels } from 'ts/types';

const namespace = import.meta.env.VITE_NAMESPACE || 'default';

const filterDefaultTypes: AlertTypes[] = [
  AlertTypes.Theft,
  AlertTypes.Loitering,
  AlertTypes.OnGround,
];
const filterDefaultLabels: EventLabels[] = [];
type Filter = {
  types: AlertTypes[];
  labels: EventLabels[];
};
const filterStorageKey = `settings_filter_${namespace}`;

type SettingsContextValue = {
  filter: Filter;
  setFilter: Dispatch<SetStateAction<Filter>>;
};

const defaultValue: SettingsContextValue = {
  filter: {
    types: filterDefaultTypes,
    labels: filterDefaultLabels,
  },
  setFilter: () => {},
};

const SettingsContext = createContext(defaultValue);

interface Props {
  children: React.ReactElement;
}
export const SettingsProvider = ({ children }: Props) => {
  const [filter, setFilter] = useLocalStorage<Filter>(filterStorageKey, {
    types: filterDefaultTypes,
    labels: filterDefaultLabels,
  });

  const getContextValue = () => ({
    filter,
    setFilter,
  });

  return (
    <SettingsContext.Provider value={getContextValue()}>
      {children}
    </SettingsContext.Provider>
  );
};
export const useSettingsContext = () => {
  return useContext(SettingsContext);
};
