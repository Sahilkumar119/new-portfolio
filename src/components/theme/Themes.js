import { createMuiTheme, responsiveFontSizes } from '@material-ui/core';

const font = "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";

const sharedTypography = {
  fontFamily: font,
  fontSize: 16,
  htmlFontSize: 16,
  h1: { fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.0 },
  h2: { fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.08 },
  h3: { fontWeight: 700, letterSpacing: '-0.025em', lineHeight: 1.15 },
  h4: { fontWeight: 600, letterSpacing: '-0.02em', lineHeight: 1.2 },
  h5: { fontWeight: 500, letterSpacing: '-0.01em', lineHeight: 1.3, fontFamily: font },
  h6: { fontWeight: 500, letterSpacing: '-0.01em' },
  body1: { fontWeight: 400, lineHeight: 1.65, letterSpacing: '-0.005em', fontFamily: font },
  body2: { fontWeight: 400, lineHeight: 1.55 },
  overline: { fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase' },
};

const overrides = (dark) => ({
  MuiCssBaseline: {
    '@global': {
      'html, body': {
        fontFamily: font,
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale',
      },
    },
  },
  MuiIconButton: {
    root: {
      borderRadius: '12px',
      transition: 'all 250ms cubic-bezier(0.34, 1.56, 0.64, 1)',
      '&:hover': {
        backgroundColor: dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.04)',
        transform: 'scale(1.08)',
      },
    },
  },
  MuiFab: {
    root: {
      width: '42px',
      height: '42px',
      minHeight: '42px',
      fontSize: '1.05rem',
      borderRadius: '12px',
      background: dark ? 'rgba(255,255,255,0.07)' : 'rgba(255,255,255,0.6)',
      backdropFilter: 'blur(16px)',
      border: `1px solid ${dark ? 'rgba(255,255,255,0.11)' : 'rgba(255,255,255,0.75)'}`,
      boxShadow: dark
        ? '0 4px 20px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.07)'
        : '0 4px 20px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.9)',
      transition: 'all 250ms cubic-bezier(0.34, 1.56, 0.64, 1)',
      '&:hover': {
        transform: 'scale(1.08) translateY(-2px)',
        boxShadow: dark
          ? '0 8px 32px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.1)'
          : '0 8px 32px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.95)',
      },
    },
    primary: {
      color: dark ? 'rgba(255,255,255,0.88)' : 'rgba(0,0,0,0.78)',
      backgroundColor: 'transparent',
      '&:hover': { backgroundColor: 'transparent' },
    },
  },
  MuiSpeedDialAction: {
    fab: {
      color: dark ? 'rgba(255,255,255,0.82)' : 'rgba(0,0,0,0.72)',
      background: dark ? 'rgba(255,255,255,0.07)' : 'rgba(255,255,255,0.65)',
      backdropFilter: 'blur(16px)',
      border: `1px solid ${dark ? 'rgba(255,255,255,0.11)' : 'rgba(255,255,255,0.75)'}`,
      borderRadius: '12px',
      transition: 'all 250ms cubic-bezier(0.34, 1.56, 0.64, 1)',
      margin: '0',
      marginBottom: '10px',
      '&:hover': {
        background: dark ? 'rgba(10,132,255,0.22)' : 'rgba(0,102,255,0.1)',
        color: dark ? '#0A84FF' : '#0066FF',
        transform: 'scale(1.1)',
      },
    },
  },
  MuiTooltip: {
    tooltip: {
      fontFamily: font,
      backgroundColor: dark ? 'rgba(22,22,28,0.92)' : 'rgba(255,255,255,0.92)',
      color: dark ? 'rgba(255,255,255,0.88)' : 'rgba(0,0,0,0.82)',
      fontSize: '0.72rem',
      fontWeight: 500,
      letterSpacing: '0.01em',
      backdropFilter: 'blur(12px)',
      border: `1px solid ${dark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.07)'}`,
      boxShadow: dark ? '0 8px 32px rgba(0,0,0,0.5)' : '0 8px 32px rgba(0,0,0,0.07)',
      padding: '5px 11px',
      borderRadius: '8px',
    },
    arrow: {
      color: dark ? 'rgba(22,22,28,0.92)' : 'rgba(255,255,255,0.92)',
    },
  },
  MuiDivider: {
    root: {
      backgroundColor: dark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.07)',
    },
  },
});

export const LightTheme = responsiveFontSizes(
  createMuiTheme({
    palette: {
      type: 'light',
      primary:    { main: '#0066FF' },
      secondary:  { main: '#BF5AF2' },
      background: { default: 'rgba(245,245,247,1)' },
      foreground: { default: 'rgba(0,0,0,0.92)' },
    },
    typography: sharedTypography,
    overrides: overrides(false),
  })
);

export const DarkTheme = responsiveFontSizes(
  createMuiTheme({
    palette: {
      type: 'dark',
      primary:    { main: '#0A84FF' },
      secondary:  { main: '#BF5AF2' },
      background: { default: 'rgba(10,10,12,1)' },
      foreground: { default: 'rgba(255,255,255,0.95)' },
    },
    typography: sharedTypography,
    overrides: overrides(true),
  })
);

export const primary   = '#0A84FF';
export const secondary = '#BF5AF2';
export const black     = '#0a0a0c';
export const white     = '#f5f5f7';
