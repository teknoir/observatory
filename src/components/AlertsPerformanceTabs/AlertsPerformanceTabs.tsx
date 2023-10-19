import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Box from '@mui/material/Box';
import Tab from 'muiComponents/Tab/Tab';
import TabPanel from "muiComponents/TabPanel/TabPanel";
import { a11yProps } from "utils/mui";
import AlertsList from "components/AlertsList";
import Performance from "components/Performance/Performance";

interface Props {
  peripheralId?: string;
}

const AlertsPerformanceTabs = ({ peripheralId = '' }: Props) => {
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
          <Tab label="Performance" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <AlertsList peripheralId={peripheralId} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Performance />
      </TabPanel>
    </Box>
  );
}

export default AlertsPerformanceTabs;
