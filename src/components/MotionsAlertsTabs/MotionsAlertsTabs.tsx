import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import TabPanel from "muiComponents/TabPanel/TabPanel";
import { a11yProps } from "utils/mui";
import AlertsList from "components/AlertsList/AlertsList";
import MotionsList from "components/MotionsList/MotionsList";

const MotionsAlertsTabs = () => {
  const [value, setValue] = React.useState(0);

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" variant="fullWidth">
          <Tab label="Alerts" {...a11yProps(0)} />
          <Tab label="Motions" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <AlertsList />
        {/*<AlertsList peripheralId={"parkinglot2"} />*/}
      </TabPanel>
      <TabPanel value={value} index={1}>
        <MotionsList />
      </TabPanel>
    </Box>
  );
}

export default MotionsAlertsTabs;
