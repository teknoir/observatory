import { styled } from '@mui/material/styles';
import { DrawerProps as MuiDrawerProps } from '@mui/material/Drawer/Drawer';

interface DrawerHeaderProps extends MuiDrawerProps {
  direction?: string;
}

const DrawerHeader = styled('div')<DrawerHeaderProps>(
  ({ theme, direction = 'right' }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: direction === 'right' ? 'flex-end' : 'center',
  })
);

export default DrawerHeader;
