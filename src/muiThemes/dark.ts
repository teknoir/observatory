import { CSSProperties } from 'react';
import { createTheme } from '@mui/material/styles';
import { blue } from '@mui/material/colors';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: blue[700],
    },
  },
  typography: {
    button: {
      textTransform: 'none',
    },
    DisplayLarge: {
      fontFamily: 'SuisseIntl-Light',
      fontSize: '56px',
      lineHeight: '64px',
      letterSpacing: '-0.25px',
    },
    DisplayMedium: {
      fontFamily: 'SuisseIntl-Light',
      fontSize: '44px',
      lineHeight: '52px',
    },
    DisplaySmall: {
      fontFamily: 'SuisseIntl-Light',
      fontSize: '36px',
      lineHeight: '44px',
    },
    HeadlineLarge: {
      fontFamily: 'SuisseIntl-Light',
      fontSize: '32px',
      lineHeight: '40px',
    },
    HeadlineMedium: {
      fontFamily: 'SuisseIntl-Light',
      fontSize: '28px',
      lineHeight: '36px',
    },
    HeadlineSmall: {
      fontFamily: 'SuisseIntl-Light',
      fontSize: '24px',
      lineHeight: '32px',
    },
    TitleLarge: {
      fontFamily: 'SuisseIntl-Regular',
      fontSize: '22px',
      lineHeight: '28px',
    },
    TitleMedium: {
      fontFamily: 'SuisseIntl-Regular',
      fontSize: '16px',
      lineHeight: '24px',
      letterSpacing: '0.15px',
    },
    TitleSmall: {
      fontFamily: 'SuisseIntl-Regular',
      fontSize: '14px',
      lineHeight: '20px',
      letterSpacing: '0.1px',
    },
    BodyLarge: {
      fontFamily: 'SuisseIntl-Regular',
      fontSize: '16px',
      lineHeight: '24px',
      letterSpacing: '0.1px',
    },
    BodyMedium: {
      fontFamily: 'SuisseIntl-Regular',
      fontSize: '14px',
      lineHeight: '20px',
      letterSpacing: '0.25px',
    },
    BodySmall: {
      fontFamily: 'SuisseIntl-Regular',
      fontSize: '12px',
      lineHeight: '16px',
    },
    LabelXLBold: {
      fontFamily: 'ABCDiatypeMono-Medium',
      fontSize: '16px',
      lineHeight: '22px',
      letterSpacing: '0.1px',
    },
    LabelXL: {
      fontFamily: 'ABCDiatypeMono-Regular',
      fontSize: '16px',
      lineHeight: '22px',
      letterSpacing: '0.1px',
    },
    LabelLargeBold: {
      fontFamily: 'ABCDiatypeMono-Medium',
      fontSize: '14px',
      lineHeight: '20px',
      letterSpacing: '0.1px',
    },
    LabelLarge: {
      fontFamily: 'ABCDiatypeMono-Regular',
      fontSize: '14px',
      lineHeight: '20px',
      letterSpacing: '0.1px',
    },
    LabelMediumBold: {
      fontFamily: 'ABCDiatypeMono-Medium',
      fontSize: '12px',
      lineHeight: '16px',
      letterSpacing: '0.5px',
    },
    LabelMedium: {
      fontFamily: 'ABCDiatypeMono-Regular',
      fontSize: '12px',
      lineHeight: '16px',
      letterSpacing: '0.5px',
    },
    LabelSmall: {
      fontFamily: 'ABCDiatypeMono-Medium',
      fontSize: '11px',
      lineHeight: '16px',
      letterSpacing: '0.5px',
    },
    LabelXS: {
      fontFamily: 'ABCDiatypeMono-Regular',
      fontSize: '10px',
      lineHeight: '16px',
    },
  },
});

declare module '@mui/material/styles' {
  interface TypographyVariants {
    DisplayLarge: CSSProperties;
    DisplayMedium: CSSProperties;
    DisplaySmall: CSSProperties;
    HeadlineLarge: CSSProperties;
    HeadlineMedium: CSSProperties;
    HeadlineSmall: CSSProperties;
    TitleLarge: CSSProperties;
    TitleMedium: CSSProperties;
    TitleSmall: CSSProperties;
    BodyLarge: CSSProperties;
    BodyMedium: CSSProperties;
    BodySmall: CSSProperties;
    LabelXLBold: CSSProperties;
    LabelXL: CSSProperties;
    LabelLargeBold: CSSProperties;
    LabelLarge: CSSProperties;
    LabelMediumBold: CSSProperties;
    LabelMedium: CSSProperties;
    LabelSmall: CSSProperties;
    LabelXS: CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    DisplayLarge?: CSSProperties;
    DisplayMedium?: CSSProperties;
    DisplaySmall?: CSSProperties;
    HeadlineLarge?: CSSProperties;
    HeadlineMedium?: CSSProperties;
    HeadlineSmall?: CSSProperties;
    TitleLarge?: CSSProperties;
    TitleMedium?: CSSProperties;
    TitleSmall?: CSSProperties;
    BodyLarge?: CSSProperties;
    BodyMedium?: CSSProperties;
    BodySmall?: CSSProperties;
    LabelXLBold?: CSSProperties;
    LabelXL?: CSSProperties;
    LabelLargeBold?: CSSProperties;
    LabelLarge?: CSSProperties;
    LabelMediumBold?: CSSProperties;
    LabelMedium?: CSSProperties;
    LabelSmall?: CSSProperties;
    LabelXS?: CSSProperties;
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    DisplayLarge: true;
    DisplayMedium: true;
    DisplaySmall: true;
    HeadlineLarge: true;
    HeadlineMedium: true;
    HeadlineSmall: true;
    TitleLarge: true;
    TitleMedium: true;
    TitleSmall: true;
    BodyLarge: true;
    BodyMedium: true;
    BodySmall: true;
    LabelXLBold: true;
    LabelXL: true;
    LabelLargeBold: true;
    LabelLarge: true;
    LabelMediumBold: true;
    LabelMedium: true;
    LabelSmall: true;
    LabelXS: true;
  }
}

export default darkTheme;
