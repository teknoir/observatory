import { useContext, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SelectChangeEvent } from '@mui/material/Select';
import Select from 'muiComponents/Select/Select';
import allCamerasIcon from 'assets/icons/allCamerasIcon.svg';
import dynamicCarouselIcon from 'assets/icons/dynamicCarouselIcon.svg';
import generalIcon from 'assets/icons/generalIcon.svg';
import { HomeContext } from 'context/HomeContext/HomeContext';
import Icon from 'components/Icon/Icon';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { CarouselMode, IconSizes, LabelSize } from 'ts/types';
import styles from './SelectLayout.module.scss';
import { useMainLayoutContext } from 'context/mainLayoutContext.tsx';

// TODO: Replace icons
const options = [
  {
    label: 'General',
    value: CarouselMode.General,
    icon: <Icon icon={generalIcon} size={IconSizes.lg} />,
  },
  {
    label: 'Dynamic Carousel',
    value: CarouselMode.AlternativeView,
    icon: <Icon icon={dynamicCarouselIcon} size={IconSizes.lg} />,
  },
  {
    label: 'All Cameras',
    value: CarouselMode.AllCamerasView,
    icon: <Icon icon={allCamerasIcon} size={IconSizes.lg} />,
  },
  {
    label: 'Display Settings',
    value: CarouselMode.SideSettingsView,
    icon: <SettingsOutlinedIcon />,
  },
];

function SelectLayout() {
  const { layout, setLayout } = useContext(HomeContext);
  const [selectOption, setSelectOption] = useState(CarouselMode.General);
  const [searchParams, setSearchParams] = useSearchParams();
  const { isOpenedRightOverlay, openRightOverlay, closeRightOverlay } =
    useMainLayoutContext();

  function handleSelectChange(e: SelectChangeEvent<unknown>) {
    const { value } = e.target;
    setSelectOption(value as CarouselMode);

    if (value !== CarouselMode.SideSettingsView) {
      setLayout(value as CarouselMode);
    }
    syncUrlParams(value as CarouselMode);
  }

  const syncUrlParams = (value: CarouselMode) => {
    if (value === CarouselMode.AllCamerasView) {
      searchParams.set('hideMotionsAlerts', 'true');
    } else if (value === CarouselMode.SideSettingsView) {
      if (!isOpenedRightOverlay) {
        openRightOverlay();
      } else {
        closeRightOverlay();
      }
    } else {
      searchParams.delete('hideMotionsAlerts');
    }
    setSearchParams(searchParams);
  };

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
