import Tab from '@mui/material/Tab';
import { styled } from '@mui/material/styles';

interface StyledTabProps {
  label: string;
}

const TabComponent = styled((props: StyledTabProps) => <Tab disableRipple {...props} />)(
  () => ({
    textTransform: 'none',
  }),
);

export default TabComponent;
