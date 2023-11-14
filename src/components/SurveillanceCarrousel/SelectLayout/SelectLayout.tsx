import { useContext, useState } from 'react';
import { SelectChangeEvent } from '@mui/material/Select';
import GridOn from '@mui/icons-material/GridOn';
import GridView from '@mui/icons-material/GridView';
import Select from 'muiComponents/Select/Select';
import { HomeContext } from 'context/HomeContext/HomeContext';
import { CarouselMode } from 'ts/types';
import styles from './SelectLayout.module.scss';

// TODO: Replace icons
const options = [
  {
    label: 'General',
    value: CarouselMode.General,
    icon: <GridOn fontSize="small" />,
  },
  {
    label: 'Alternative View',
    value: CarouselMode.AlternativeView,
    icon: <GridView fontSize="small" />,
  },
];

function SelectLayout() {
  const { setLayout } = useContext(HomeContext);
  const [selectOption, setSelectOption] = useState(CarouselMode.General);

  function handleSelectChange(e: SelectChangeEvent<unknown>) {
    setSelectOption(e.target.value as CarouselMode);
    setLayout(e.target.value as CarouselMode);
  }

  return (
    <div className={styles.root}>
      <Select
        label=""
        value={selectOption}
        options={options}
        onChange={handleSelectChange}
      />
    </div>
  );
}

export default SelectLayout;
