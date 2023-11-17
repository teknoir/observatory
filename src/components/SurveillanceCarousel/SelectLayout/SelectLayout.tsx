import { useContext, useState } from 'react';
import { SelectChangeEvent } from '@mui/material/Select';
import Select from 'muiComponents/Select/Select';
import allCamerasIcon from 'assets/icons/allCamerasIcon.svg';
import dynamicCarouselIcon from 'assets/icons/dynamicCarouselIcon.svg';
import generalIcon from 'assets/icons/generalIcon.svg';
import { HomeContext } from 'context/HomeContext/HomeContext';
import { CarouselMode, LabelSize } from 'ts/types';
import styles from './SelectLayout.module.scss';

// TODO: Replace icons
const options = [
  {
    label: 'General',
    value: CarouselMode.General,
    icon: generalIcon,
  },
  {
    label: 'Dynamic Carousel',
    value: CarouselMode.AlternativeView,
    icon: dynamicCarouselIcon,
  },
  {
    label: 'All Cameras',
    value: CarouselMode.AllCamerasView,
    icon: allCamerasIcon,
  },
];

function SelectLayout() {
  const { layout, setLayout } = useContext(HomeContext);
  const [selectOption, setSelectOption] = useState(CarouselMode.General);

  function handleSelectChange(e: SelectChangeEvent<unknown>) {
    setSelectOption(e.target.value as CarouselMode);
    setLayout(e.target.value as CarouselMode);
  }

  return (
    <div className={styles.root}>
      <Select
        label=""
        value={layout || selectOption}
        options={options}
        onChange={handleSelectChange}
        labelSize={LabelSize.medium}
      />
    </div>
  );
}

export default SelectLayout;
