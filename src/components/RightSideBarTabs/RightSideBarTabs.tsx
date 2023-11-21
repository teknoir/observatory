import { useState, SyntheticEvent } from 'react';
import { useLocation, useParams, matchRoutes } from 'react-router-dom';
import Tabs from '@mui/material/Tabs';
import Box from '@mui/material/Box';
import Tab from 'muiComponents/Tab/Tab';
import TabPanel from 'muiComponents/TabPanel/TabPanel';
import AlertsList from 'components/AlertsList';
import MotionsList from 'components/MotionsList';
import Performance from 'components/Performance/Performance';
import { a11yProps } from 'utils/mui';
import styleVariables from 'enums/styleVariables.module.scss';
import APP_URLS from 'enums/urls';

const RightSideBarTabs = () => {
  const location = useLocation();
  const { peripheralId } = useParams();
  const [value, setValue] = useState(0);

  const isAlertPage = !!matchRoutes([{ path: APP_URLS.alerts }], location);

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: styleVariables.deepSpaceBlack }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          variant="fullWidth"
          sx={{
            '& .MuiTabs-indicator': {
              display: 'none',
            },
          }}
        >
          <Tab label="Alerts" {...a11yProps(0)} />
          <Tab
            label={isAlertPage ? 'Performance' : 'Motions'}
            {...a11yProps(1)}
          />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <AlertsList peripheralId={peripheralId} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        {isAlertPage ? <Performance /> : <MotionsList />}
      </TabPanel>
    </Box>
  );
};

export default RightSideBarTabs;
