import { ReactNode } from "react";
import Box from '@mui/material/Box';

interface Props {
  children: ReactNode;
}

export default function BoxComponent({ children }: Props) {
  return (
    <Box component="div" sx={{ p: 4, marginBottom: 2,  border: '1px dashed grey' }}>
      {children}
    </Box>
  );
}