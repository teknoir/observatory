import React from 'react';
import BoxComponent from '@mui/material/Box';
import Typography from '@mui/material/Typography';

interface Props {
  children: React.ReactElement;
}
const Box = ({ children }: Props) => (
  <BoxComponent sx={{ p: 2, border: '1px solid #fff' }}>
    {children}
  </BoxComponent>
);

export default function Types() {
  return (
    <BoxComponent sx={{ display: 'flex' }}>
      <BoxComponent sx={{ width: '100%', maxWidth: 500, marginRight: 8 }}>
        <Typography variant="h6" gutterBottom>
          Suisse Intl’l
        </Typography>

        <Box>
          <Typography variant="DisplayLarge">Display/Large</Typography>
        </Box>

        <Box>
          <Typography variant="DisplayMedium">Display/Medium</Typography>
        </Box>

        <Box>
          <Typography variant="DisplaySmall">Display/Small</Typography>
        </Box>

        <Box>
          <Typography variant="HeadlineLarge">Headline/Large</Typography>
        </Box>

        <Box>
          <Typography variant="HeadlineMedium">Headline/Medium</Typography>
        </Box>

        <Box>
          <Typography variant="HeadlineSmall">Headline/Small</Typography>
        </Box>

        <Box>
          <Typography variant="TitleLarge">Title/Large</Typography>
        </Box>

        <Box>
          <Typography variant="TitleMedium">Title/Medium</Typography>
        </Box>

        <Box>
          <Typography variant="TitleSmall">Title/Small</Typography>
        </Box>

        <Box>
          <Typography variant="BodyLarge">Body/Large</Typography>
        </Box>

        <Box>
          <Typography variant="BodyMedium">Body/Medium</Typography>
        </Box>

        <Box>
          <Typography variant="BodySmall">Body/Small</Typography>
        </Box>
      </BoxComponent>

      <BoxComponent sx={{ width: '100%', maxWidth: 500 }}>
        <Typography variant="h6" gutterBottom>
          ABC Diatype Mono
        </Typography>

        <Box>
          <Typography variant="LabelXLBold">Label/XL Bold</Typography>
        </Box>

        <Box>
          <Typography variant="LabelXL">Label/XL</Typography>
        </Box>

        <Box>
          <Typography variant="LabelLargeBold">Label/Large Bold</Typography>
        </Box>

        <Box>
          <Typography variant="LabelLarge">Label/Large</Typography>
        </Box>

        <Box>
          <Typography variant="LabelMediumBold">Label/Medium Bold</Typography>
        </Box>

        <Box>
          <Typography variant="LabelMedium">Label/Medium</Typography>
        </Box>

        <Box>
          <Typography variant="LabelSmall">Label/Small</Typography>
        </Box>

        <Box>
          <Typography variant="LabelXS">Label/XS</Typography>
        </Box>
      </BoxComponent>
    </BoxComponent>
  );
}
