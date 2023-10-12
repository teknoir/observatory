import { styled } from "@mui/material/styles";

const DrawerHeader = styled('div')(({ theme, direction = 'right' }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: direction === 'right' ? 'flex-end' : 'center',
}));

export default DrawerHeader;
