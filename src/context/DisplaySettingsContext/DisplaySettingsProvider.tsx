import { ReactNode, useState } from 'react';
import { DisplaySettingsContext } from './DisplaySettingsContext';

export const DisplaySettingsProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [boundaryBoxesChecked, setBoundaryBoxesChecked] = useState(true);
  const [objectLabelsChecked, setObjectLabelsChecked] = useState(false);
  const [colorFillBoxesChecked, setColorFillBoxesChecked] = useState(false);

  return (
    <DisplaySettingsContext.Provider
      value={{
        boundaryBoxesChecked,
        setBoundaryBoxesChecked,
        objectLabelsChecked,
        setObjectLabelsChecked,
        colorFillBoxesChecked,
        setColorFillBoxesChecked,
      }}
    >
      {children}
    </DisplaySettingsContext.Provider>
  );
};

export default DisplaySettingsProvider;
