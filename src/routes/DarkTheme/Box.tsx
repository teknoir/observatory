import Box from '@mui/material/Box';

export default function BoxComponent({ children }) {
  return (
    <Box component="div" sx={{ p: 4, marginBottom: 2,  border: '1px dashed grey' }}>
      {children}
    </Box>
  );
}